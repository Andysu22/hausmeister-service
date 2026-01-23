import React, { useState, useEffect, useRef } from 'react';
import CookieBanner from './CookieBanner'; 
import Impressum from './Impressum';
import Datenschutz from './Datenschutz';
import mapPlaceholder from './assets/googlemaps.jpg'; 

// --- PLUGINS ---
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from  "react-datepicker";
import { de } from 'date-fns/locale/de'; 
registerLocale('de', de);

// TELEFON PLUGIN
import PhoneInput from 'react-phone-number-input/input';
import { getCountries, getCountryCallingCode } from 'react-phone-number-input/input';
import dePhone from 'react-phone-number-input/locale/de';
import flags from 'react-phone-number-input/flags';

import { Turnstile } from '@marsidev/react-turnstile';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, faTimes, faBars, faMapMarkerAlt, faPhone, faEnvelope, faPaperPlane, 
  faChevronDown, faLock, faCalendarAlt, faHandshake, faEnvelopeOpenText, faUser, faBuilding, faBriefcase
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY || '0x4AAAAAACMZYCHiONmr4bkm'; 

// --- 1. CUSTOM SELECT (Kategorien) - FIX: Clipping & Masking ---
const CustomSelect = ({ options, value, onChange, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedOption = options.find(opt => opt.value === value);

  return (
    <div className="relative" ref={dropdownRef}>
       <div 
         onClick={() => setIsOpen(!isOpen)}
         className={`w-full bg-slate-50 border cursor-pointer rounded-lg px-4 py-3 h-[52px] flex items-center justify-between transition-all select-none
           ${isOpen ? 'border-emerald-500 ring-2 ring-emerald-500/20 bg-white' : 'border-slate-200 hover:border-emerald-400'}
         `}
       >
          <span className={`${selectedOption ? 'text-slate-800 font-medium' : 'text-slate-400'}`}>
             {selectedOption ? selectedOption.label : placeholder}
          </span>
          <div className={`text-slate-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
             <FontAwesomeIcon icon={faChevronDown} size="sm" />
          </div>
       </div>

       {/* FIX: Trennung von Container (Form/Radius) und Inhalt (Scroll) */}
       {isOpen && (
         <div className="absolute z-50 top-full left-0 right-0 mt-2 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden animate-fade-in-up">
            <div className="max-h-60 overflow-y-auto">
              {options.map((option) => (
                <div 
                  key={option.value}
                  onClick={() => { onChange(option.value); setIsOpen(false); }}
                  className={`px-4 py-3 cursor-pointer flex items-center justify-between transition-colors
                    ${value === option.value ? 'bg-emerald-50 text-emerald-700 font-bold' : 'text-slate-600 hover:bg-slate-50'}
                  `}
                >
                  {option.label}
                  {value === option.value && <FontAwesomeIcon icon={faCheck} className="text-emerald-600"/>}
                </div>
              ))}
            </div>
         </div>
       )}
    </div>
  );
};

// --- 2. CUSTOM COUNTRY SELECT - FIX: h-full für sauberen Sitz ---
const CountrySelect = ({ value, onChange, labels }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  const priorityCountries = ['DE', 'AT', 'CH', 'NL', 'PL', 'FR', 'BE', 'LU', 'DK'];
  const allCountries = getCountries();
  const sortedCountries = [
    ...priorityCountries,
    ...allCountries.filter(c => !priorityCountries.includes(c))
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
            setIsOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const FlagComponent = flags[value];

  return (
    <div className="relative h-full" ref={dropdownRef}>
        {/* FIX: h-full statt h-[52px], damit es nicht übersteht */}
        <div 
            onClick={() => setIsOpen(!isOpen)}
            className={`h-full bg-slate-100 border-r border-slate-200 px-3 flex items-center gap-2 cursor-pointer hover:bg-slate-200 transition-colors rounded-l-lg`}
        >
            {FlagComponent && <FlagComponent title={value} className="w-6 h-4 shadow-sm" />}
            <FontAwesomeIcon icon={faChevronDown} size="xs" className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </div>

        {/* FIX: Trennung von Container (Radius/Hidden) und Scrollbar */}
        {isOpen && (
            <div className="absolute z-50 top-full left-0 w-[300px] mt-2 bg-white border border-slate-100 rounded-xl shadow-xl overflow-hidden animate-fade-in-up">
                <div className="max-h-60 overflow-y-auto">
                  {sortedCountries.map((countryCode) => {
                      const Flag = flags[countryCode];
                      const countryName = labels[countryCode] || countryCode;
                      const isSelected = value === countryCode;
                      
                      return (
                          <div 
                              key={countryCode}
                              onClick={() => { onChange(countryCode); setIsOpen(false); }}
                              className={`px-4 py-3 cursor-pointer flex items-center gap-3 transition-colors text-sm
                                  ${isSelected ? 'bg-emerald-50 text-emerald-900 font-bold' : 'text-slate-700 hover:bg-slate-50'}
                              `}
                          >
                              {Flag && <Flag className="w-5 h-3.5 shadow-sm flex-shrink-0" />}
                              <span className="truncate">{countryName}</span>
                              <span className="text-slate-400 text-xs ml-auto">+{getCountryCallingCode(countryCode)}</span>
                          </div>
                      );
                  })}
                </div>
            </div>
        )}
    </div>
  );
};

// --- HELPER COMPONENTS ---

const PhoneInputField = ({ country, phone, onCountryChange, onPhoneChange }) => (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-800">Telefonnummer <span className="text-slate-400 font-normal">(Optional)</span></label>
      <div className="flex w-full bg-slate-50 border border-slate-200 rounded-lg focus-within:ring-2 focus-within:ring-emerald-500/20 focus-within:border-emerald-500 transition-all h-[52px]">
          <CountrySelect 
              value={country} 
              onChange={onCountryChange} 
              labels={dePhone}
          />
          <PhoneInput
             country={country}
             value={phone}
             onChange={onPhoneChange}
             placeholder="151 1234567"
             className="flex-1 bg-transparent px-4 font-medium text-slate-800 outline-none h-full placeholder-slate-400"
          />
      </div>
    </div>
);

// ZUERST: Diese kleine Hilfs-Komponente definieren (am besten direkt über DateInputField oder außerhalb der App Funktion)
// Sie sorgt dafür, dass das Feld wie ein Input aussieht, aber technisch ein Button ist (keine Tastatur!)
const CustomDateInput = React.forwardRef(({ value, onClick, placeholder }, ref) => (
  <button
    type="button"
    onClick={onClick}
    ref={ref}
    className="w-full text-left relative bg-slate-50 border border-slate-200 rounded-lg px-4 h-[52px] flex items-center focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all cursor-pointer"
  >
    <span className={`font-medium ${value ? 'text-slate-800' : 'text-slate-400'}`}>
      {value || placeholder}
    </span>
    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
       <FontAwesomeIcon icon={faCalendarAlt} />
    </div>
  </button>
));

// DANN: Das eigentliche Input Feld
const DateInputField = ({ selectedDate, onChange }) => (
    <div className="space-y-2">
      <label className="text-sm font-bold text-slate-800">Wunschtermin <span className="text-emerald-600">*</span></label>
      <div className="relative w-full">
         <DatePicker 
            selected={selectedDate} 
            onChange={onChange} 
            locale="de"
            minDate={new Date()}
            dateFormat="dd.MM.yyyy"
            placeholderText="Datum auswählen"
            // Hier nutzen wir unseren Button als Input-Ersatz
            customInput={<CustomDateInput placeholder="Datum auswählen" />}
            wrapperClassName="w-full"
            required
         />
      </div>
   </div>
);


function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showNav, setShowNav] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  const [formData, setFormData] = useState({
    customerType: 'private',
    company: '',
    name: '',
    email: '',
    phone: '',
    country: 'DE', 
    date: null, 
    category: '',
    message: '',
    privacy: false
  });
  const [formStatus, setFormStatus] = useState(null); 
  const [turnstileToken, setTurnstileToken] = useState(null); 
  
  const [consent, setConsent] = useState(null);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [legalPage, setLegalPage] = useState(null);
  const [openFaqIndex, setOpenFaqIndex] = useState(null); 

  const waNumber = "4915561915890";
  const waLink = `https://wa.me/${waNumber}?text=Hallo,%20ich%20habe%20eine%20Anfrage...`;

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== 'undefined') {
        if (window.scrollY > lastScrollY && window.scrollY > 100) { setShowNav(false); } 
        else { setShowNav(true); }
        setLastScrollY(window.scrollY);
      }
    };
    window.addEventListener('scroll', controlNavbar);
    return () => window.removeEventListener('scroll', controlNavbar);
  }, [lastScrollY]);

  useEffect(() => {
    if (legalPage) { document.body.style.overflow = 'hidden'; } 
    else { document.body.style.overflow = 'unset'; }
    return () => { document.body.style.overflow = 'unset'; };
  }, [legalPage]);

  useEffect(() => {
    const stored = localStorage.getItem('cookie-consent');
    if (stored) { setConsent(stored); } 
    else { setTimeout(() => setIsBannerOpen(true), 500); }
  }, []);

  const handleConsentChange = (status) => setConsent(status);
  const requestConsent = () => setIsBannerOpen(true);
  
  const handleWhatsAppClick = (e) => {
    if (consent === 'all') return; 
    e.preventDefault(); 
    setIsBannerOpen(true); 
  };

  const toggleFaq = (index) => setOpenFaqIndex(openFaqIndex === index ? null : index);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleCustomerTypeChange = (type) => setFormData(prev => ({ ...prev, customerType: type }));
  const handleDateChange = (date) => setFormData(prev => ({ ...prev, date: date }));
  const handleCategoryChange = (val) => setFormData(prev => ({ ...prev, category: val }));

  const handleCountryChange = (countryCode) => {
      if(countryCode) setFormData(prev => ({ ...prev, country: countryCode }));
  }
  const handlePhoneChange = (value) => {
      setFormData(prev => ({ ...prev, phone: value }));
  }

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!turnstileToken && TURNSTILE_SITE_KEY !== 'DEIN_CLOUDFLARE_SITE_KEY_HIER') {
      alert("Bitte bestätigen Sie, dass Sie ein Mensch sind (Captcha).");
      return;
    }
    setFormStatus('sending');
    setTimeout(() => {
      setFormStatus('success');
      setFormData({ 
        customerType: 'private', company: '', name: '', email: '', phone: '', country: 'DE',
        date: null, category: '', message: '', privacy: false 
      });
      setTurnstileToken(null); 
      setTimeout(() => setFormStatus(null), 5000);
    }, 1500);
  };

  const categoryOptions = [
    { value: 'garten', label: 'Gartenpflege' },
    { value: 'reinigung', label: 'Reinigung' },
    { value: 'technik', label: 'Hausmeistertätigkeit' },
    { value: 'winter', label: 'Winterdienst' },
    { value: 'sonstiges', label: 'Sonstiges' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-emerald-200 overflow-x-hidden w-full">
      {legalPage === 'impressum' && <Impressum onClose={() => setLegalPage(null)} />}
      {legalPage === 'datenschutz' && <Datenschutz onClose={() => setLegalPage(null)} />}

      <CookieBanner isOpen={isBannerOpen} onClose={() => setIsBannerOpen(false)} onConsentChange={handleConsentChange} />

      <a href={waLink} target="_blank" rel="noopener noreferrer" onClick={handleWhatsAppClick} 
        className="fixed bottom-6 right-6 z-[60] bg-[#25D366] hover:bg-[#20ba5a] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105" title="WhatsApp Chat">
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>

      {/* --- HEADER --- */}
      <nav className={`fixed top-0 w-full z-50 h-20 border-b border-slate-100 bg-white/95 backdrop-blur-md shadow-sm transition-transform duration-300 ease-in-out ${showNav ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-700 text-white rounded flex items-center justify-center font-bold text-xl group-hover:bg-emerald-800 transition shadow-sm">M</div>
            <div className="leading-none">
              <span className="block font-black text-xl text-slate-900 uppercase">MEIER</span>
              <span className="block text-xs font-bold text-emerald-700 uppercase tracking-widest">Objektservice</span>
            </div>
          </a>
          <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wide text-slate-600">
             <a href="#leistungen" className="hover:text-emerald-700 transition">Leistungen</a>
             <a href="#ablauf" className="hover:text-emerald-700 transition">Ablauf</a>
             <a href="#projekte" className="hover:text-emerald-700 transition">Referenzen</a>
             <a href="#kontakt" className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded transition shadow-md hover:shadow-lg">Angebot anfordern</a>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-800 text-2xl p-2"><FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} /></button>
        </div>
        {isMenuOpen && (
           <div className="md:hidden absolute top-20 left-0 w-full bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-fade-in-down z-40">
              <a href="#leistungen" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-700 py-2 border-b border-slate-50">Leistungen</a>
              <a href="#ablauf" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-700 py-2 border-b border-slate-50">Ablauf</a>
              <a href="#projekte" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-700 py-2 border-b border-slate-50">Referenzen</a>
              <a href="#kontakt" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-700 py-2">Kontakt</a>
           </div>
        )}
      </nav>

      {/* --- HERO --- */}
      <header className="relative bg-slate-900 overflow-hidden h-[600px] flex items-center w-full">
         <div className="absolute inset-0">
            <img src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1920&auto=format&fit=crop" alt="Hintergrund" className="w-full h-full object-cover opacity-40"/>
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent"></div>
         </div>
         <div className="relative max-w-7xl mx-auto px-4 w-full pt-10">
            <div className="max-w-3xl">
               <div className="inline-block bg-emerald-600/90 backdrop-blur text-white text-xs font-bold px-3 py-1 rounded mb-6 uppercase tracking-wider border border-emerald-500/30">Ihr Partner in Delbrück & Umgebung</div>
               <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-6 drop-shadow-lg">Sicher. Sauber. <br/><span className="text-emerald-400">Sorglos.</span></h1>
               <p className="text-xl text-slate-300 mb-10 max-w-lg font-medium leading-relaxed">Ihr Hausmeister für alle Fälle. Gartenpflege, Reinigung und Technik aus einer Hand.</p>
               <div className="flex flex-col sm:flex-row gap-4">
                  <a href="#kontakt" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded font-bold text-lg transition-all flex items-center justify-center gap-2 shadow-lg hover:shadow-emerald-900/50">Kostenloses Angebot</a>
                  <a href="tel:+4915561915890" className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white border border-white/30 px-8 py-4 rounded font-bold text-lg transition-all flex items-center justify-center gap-2"><FontAwesomeIcon icon={faPhone} /> 0155 619 158 90</a>
               </div>
            </div>
         </div>
      </header>

      {/* --- ABLAUF --- */}
      <section id="ablauf" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
               <span className="text-emerald-700 font-bold uppercase tracking-wider text-sm">Der Weg zum Ziel</span>
               <h2 className="text-3xl md:text-4xl font-black text-slate-900 mt-2">So funktioniert's</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
               <div className="text-center group">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl rotate-3 flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm group-hover:rotate-6 transition-transform duration-300"><FontAwesomeIcon icon={faEnvelopeOpenText} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">1. Anfrage senden</h3>
                  <p className="text-slate-600 leading-relaxed px-4">Füllen Sie einfach das Formular unten aus. Wir melden uns umgehend bei Ihnen.</p>
               </div>
               <div className="text-center group">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl -rotate-2 flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm group-hover:-rotate-6 transition-transform duration-300"><FontAwesomeIcon icon={faHandshake} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">2. Angebot erhalten</h3>
                  <p className="text-slate-600 leading-relaxed px-4">Wir erstellen ein transparentes Festpreis-Angebot. Keine versteckten Kosten.</p>
               </div>
               <div className="text-center group">
                  <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl rotate-1 flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm group-hover:rotate-3 transition-transform duration-300"><FontAwesomeIcon icon={faCalendarAlt} /></div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">3. Erledigt</h3>
                  <p className="text-slate-600 leading-relaxed px-4">Zum Wunschtermin legen wir los. Sie müssen sich um nichts weiter kümmern.</p>
               </div>
            </div>
         </div>
      </section>

      {/* --- LEISTUNGEN --- */}
      <section id="leistungen" className="py-24 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
            <div className="mb-16 text-center">
               <span className="text-emerald-700 font-bold uppercase tracking-wider text-sm">Unser Service</span>
               <h2 className="text-4xl font-black text-slate-900 mt-2">Alles aus einer Hand.</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
                  <div className="h-64 overflow-hidden relative">
                     <img src="https://plus.unsplash.com/premium_photo-1747911361940-5188c161ff7b?q=80&w=1170&auto=format&fit=crop" alt="Garten" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                     <div className="absolute bottom-0 left-0 bg-emerald-700 text-white px-5 py-2 text-sm font-bold uppercase tracking-wide rounded-tr-lg">Garten</div>
                  </div>
                  <div className="p-8">
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Grünpflege</h3>
                     <p className="text-slate-600 mb-6 leading-relaxed">Ein gepflegter Garten ist die Visitenkarte Ihrer Immobilie. Wir bringen das richtige Gerät mit.</p>
                     <ul className="space-y-3 text-slate-700 font-medium">
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-emerald-600"/> Rasenmähen & Vertikutieren</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-emerald-600"/> Heckenschnitt & Formgebung</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-emerald-600"/> Grünschnitt-Entsorgung</li>
                     </ul>
                  </div>
               </div>
               <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
                  <div className="h-64 overflow-hidden relative">
                     <img src="https://plus.unsplash.com/premium_photo-1676810457640-77cea17fb530?q=80&w=1170&auto=format&fit=crop" alt="Innen" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                     <div className="absolute bottom-0 left-0 bg-blue-700 text-white px-5 py-2 text-sm font-bold uppercase tracking-wide rounded-tr-lg">Innen</div>
                  </div>
                  <div className="p-8">
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Reinigung</h3>
                     <p className="text-slate-600 mb-6 leading-relaxed">Sauberkeit für zufriedene Bewohner. Gründlich, regelmäßig und zuverlässig.</p>
                     <ul className="space-y-3 text-slate-700 font-medium">
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-blue-600"/> Treppenhausreinigung</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-blue-600"/> Fensterreinigung</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-blue-600"/> Keller & Tiefgarage</li>
                     </ul>
                  </div>
               </div>
               <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
                  <div className="h-64 overflow-hidden relative">
                     <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop" alt="Technik" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                     <div className="absolute bottom-0 left-0 bg-slate-700 text-white px-5 py-2 text-sm font-bold uppercase tracking-wide rounded-tr-lg">Technik</div>
                  </div>
                  <div className="p-8">
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Hausmeister</h3>
                     <p className="text-slate-600 mb-6 leading-relaxed">Wir sind vor Ort, wenn es klemmt. Kleine Reparaturen erledigen wir sofort.</p>
                     <ul className="space-y-3 text-slate-700 font-medium">
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-slate-600"/> Leuchtmittelwechsel</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-slate-600"/> Zählerstände prüfen</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-slate-600"/> Mülltonnendienst</li>
                     </ul>
                  </div>
               </div>
               <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200">
                  <div className="h-64 overflow-hidden relative">
                     <img src="https://images.unsplash.com/photo-1613082364903-9ff4734f5dd1?q=80&w=1170&auto=format&fit=crop" alt="Winter" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                     <div className="absolute bottom-0 left-0 bg-cyan-700 text-white px-5 py-2 text-sm font-bold uppercase tracking-wide rounded-tr-lg">Winter</div>
                  </div>
                  <div className="p-8">
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Winterdienst</h3>
                     <p className="text-slate-600 mb-6 leading-relaxed">Verkehrssichere Wege nach Satzung. Wir räumen, während Sie noch schlafen.</p>
                     <ul className="space-y-3 text-slate-700 font-medium">
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-cyan-600"/> Räumung & Streuen</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-cyan-600"/> Haftpflichtversicherung</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-cyan-600"/> 24h Bereitschaft</li>
                     </ul>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* --- REFERENZEN --- */}
      <section id="projekte" className="py-24 bg-white">
         <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-12">
               <span className="text-emerald-700 font-bold uppercase tracking-wider text-sm">Vertrauen</span>
               <h2 className="text-3xl font-black text-slate-900 mt-2">Lokale Partner</h2>
            </div>
            <div className="bg-slate-50 rounded-2xl p-8 md:p-12 border border-slate-100 flex flex-col md:flex-row items-center gap-10">
               <div className="w-full md:w-1/2 h-64 md:h-80 bg-white rounded-xl overflow-hidden shadow-md relative group">
                  <div className="absolute inset-0 bg-slate-200 flex items-center justify-center text-slate-400"><FontAwesomeIcon icon={faHandshake} size="3x" /></div>
                  <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-6">
                     <div className="text-white font-bold text-lg">Öffentliche Einrichtungen</div>
                     <div className="text-emerald-300 text-sm">Grünpflege & Instandhaltung</div>
                  </div>
               </div>
               <div className="w-full md:w-1/2">
                  <div className="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-3 py-1 rounded mb-4">Referenz-Highlight</div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Kommunale & Gewerbliche Pflege</h3>
                  <p className="text-slate-600 mb-6 leading-relaxed">Wir unterstützen lokale Institutionen und Gewerbetreibende in Delbrück bei der Pflege ihrer Außenanlagen. Zuverlässigkeit und ein repräsentatives Erscheinungsbild stehen dabei an erster Stelle.</p>
                  <ul className="space-y-2 mb-8">
                     <li className="flex items-center gap-3 text-slate-700 font-medium"><FontAwesomeIcon icon={faCheck} className="text-emerald-600"/> Rasenpflege Großflächen</li>
                     <li className="flex items-center gap-3 text-slate-700 font-medium"><FontAwesomeIcon icon={faCheck} className="text-emerald-600"/> Sauberhaltung von Zufahrten</li>
                  </ul>
               </div>
            </div>
         </div>
      </section>

      {/* --- FAQ SECTION --- */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
         <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-12">
               <h2 className="text-3xl font-black text-slate-900">Häufige Fragen</h2>
               <p className="text-slate-600 mt-2">Kurz und knapp erklärt.</p>
            </div>
            <div className="space-y-4">
               {[
                  { q: "In welchem Gebiet sind Sie tätig?", a: "Unser Kerngebiet ist Delbrück. Wir fahren aber auch Paderborn, Hövelhof und Rietberg an (ca. 50km Umkreis)." },
                  { q: "Bringen Sie eigene Geräte mit?", a: "Ja, wir arbeiten ausschließlich mit unseren eigenen Profi-Geräten (Aufsitzmäher, Heckenscheren, Reinigungsmaschinen)." },
                  { q: "Wie schnell bekomme ich ein Angebot?", a: "In der Regel innerhalb von 24-48 Stunden nach der Besichtigung." },
                  { q: "Übernehmen Sie auch einmalige Aufträge?", a: "Ja, z.B. für eine Grundreinigung oder einen einmaligen Heckenschnitt im Herbst." }
               ].map((faq, index) => (
                  <div key={index} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
                     <button onClick={() => toggleFaq(index)} className="w-full flex justify-between items-center p-5 text-left font-bold text-slate-800 hover:bg-slate-50 transition">
                        {faq.q}
                        <FontAwesomeIcon icon={faChevronDown} className={`text-slate-400 transition-transform ${openFaqIndex === index ? 'rotate-180' : ''}`} />
                     </button>
                     <div className={`px-5 text-slate-600 text-sm leading-relaxed overflow-hidden transition-all duration-300 ${openFaqIndex === index ? 'max-h-40 py-4 border-t border-slate-100' : 'max-h-0'}`}>
                        {faq.a}
                     </div>
                  </div>
               ))}
            </div>
         </div>
      </section>

      {/* --- KONTAKT FORMULAR --- */}
      <section id="kontakt" className="py-24 bg-white relative">
         <div className="max-w-4xl mx-auto px-4">
            <div className="text-center mb-12">
               <span className="text-emerald-700 font-bold uppercase tracking-wider text-sm">Jetzt anfragen</span>
               <h2 className="text-4xl font-black text-slate-900 mt-2">Wie können wir helfen?</h2>
            </div>
            
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-slate-100 relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-bl-full -mr-10 -mt-10 z-0"></div>

               {formStatus === 'success' ? (
                 <div className="text-center py-16">
                    <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl animate-bounce"><FontAwesomeIcon icon={faCheck} /></div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Vielen Dank!</h3>
                    <p className="text-slate-600">Ihre Nachricht wurde erfolgreich gesendet. Wir melden uns in Kürze.</p>
                 </div>
               ) : (
                 <form className="space-y-6 relative z-10" onSubmit={handleFormSubmit}>
                    
                    {/* TYPE SELECTION */}
                    <div className="flex gap-4 p-1 bg-slate-100 rounded-xl w-fit mx-auto mb-6">
                       <button type="button" onClick={() => handleCustomerTypeChange('private')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${formData.customerType === 'private' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}><FontAwesomeIcon icon={faUser} className="mr-2"/> Privat</button>
                       <button type="button" onClick={() => handleCustomerTypeChange('business')} className={`px-6 py-2 rounded-lg text-sm font-bold transition-all ${formData.customerType === 'business' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}><FontAwesomeIcon icon={faBuilding} className="mr-2"/> Gewerblich</button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                       {/* NAME */}
                       <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-800">Ihr Name <span className="text-emerald-600">*</span></label>
                          <div className="relative">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><FontAwesomeIcon icon={faUser} /></div>
                             <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Max Mustermann" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 h-[52px] focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
                          </div>
                       </div>
                       
                       {/* COMPANY / EMAIL */}
                       {formData.customerType === 'business' ? (
                          <div className="space-y-2 animate-fade-in-down">
                             <label className="text-sm font-bold text-slate-800">Firmenname <span className="text-slate-400 font-normal">(Optional)</span></label>
                             <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><FontAwesomeIcon icon={faBriefcase} /></div>
                                <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Muster GmbH" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 h-[52px] focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                             </div>
                          </div>
                       ) : (
                          <div className="space-y-2">
                             <label className="text-sm font-bold text-slate-800">E-Mail Adresse <span className="text-emerald-600">*</span></label>
                             <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><FontAwesomeIcon icon={faEnvelope} /></div>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="max@beispiel.de" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 h-[52px] focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
                             </div>
                          </div>
                       )}
                    </div>

                    {/* BUSINESS ROWS */}
                    {formData.customerType === 'business' && (
                        <div className="grid md:grid-cols-2 gap-6 animate-fade-in-down">
                           <div className="space-y-2">
                             <label className="text-sm font-bold text-slate-800">E-Mail Adresse <span className="text-emerald-600">*</span></label>
                             <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400"><FontAwesomeIcon icon={faEnvelope} /></div>
                                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="max@beispiel.de" className="w-full bg-slate-50 border border-slate-200 rounded-lg pl-10 pr-4 py-3 h-[52px] focus:ring-2 focus:ring-emerald-500 outline-none transition" required />
                             </div>
                           </div>
                           <PhoneInputField country={formData.country} phone={formData.phone} onCountryChange={handleCountryChange} onPhoneChange={handlePhoneChange} />
                        </div>
                    )}

                    {/* PRIVATE ROWS */}
                    {formData.customerType === 'private' && (
                        <div className="grid md:grid-cols-2 gap-6">
                           <PhoneInputField country={formData.country} phone={formData.phone} onCountryChange={handleCountryChange} onPhoneChange={handlePhoneChange} />
                           <DateInputField selectedDate={formData.date} onChange={handleDateChange} />
                        </div>
                    )}

                    {/* DATE FOR BUSINESS */}
                    {formData.customerType === 'business' && (
                       <DateInputField selectedDate={formData.date} onChange={handleDateChange} />
                    )}

                    {/* CATEGORY */}
                    <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-800">Worum geht es? <span className="text-emerald-600">*</span></label>
                        <CustomSelect 
                           options={categoryOptions}
                           value={formData.category}
                           onChange={handleCategoryChange}
                           placeholder="Bitte wählen..."
                        />
                         {/* Hidden Input for HTML5 Validation */}
                         <input type="text" className="h-0 w-0 opacity-0 absolute" value={formData.category} required onChange={() => {}} onInvalid={(e) => e.target.setCustomValidity('Bitte wählen Sie eine Kategorie.')} onInput={(e) => e.target.setCustomValidity('')} tabIndex={-1}/>
                    </div>

                    <div className="space-y-2">
                       <label className="text-sm font-bold text-slate-800">Nachricht <span className="text-slate-400 font-normal">(Optional)</span></label>
                       <textarea name="message" value={formData.message} onChange={handleInputChange} rows="4" placeholder="Beschreiben Sie kurz Ihr Anliegen..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"></textarea>
                    </div>

                    <div className="flex items-start gap-3 pt-2 bg-slate-50 p-4 rounded-lg border border-slate-100">
                      <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleInputChange} id="privacy" className="mt-1 w-4 h-4 text-emerald-600 border-slate-300 rounded focus:ring-emerald-500 cursor-pointer" required />
                      <label htmlFor="privacy" className="text-xs text-slate-500 leading-relaxed cursor-pointer select-none">
                        Ich stimme zu, dass meine Angaben zur Kontaktaufnahme gespeichert werden.
                        Ich habe die <button type="button" onClick={() => setLegalPage('datenschutz')} className="text-emerald-600 hover:underline font-bold">Datenschutzerklärung</button> gelesen.
                      </label>
                    </div>

                    <div className="flex justify-center py-2 mt-4">
                      <Turnstile siteKey={TURNSTILE_SITE_KEY} onSuccess={(token) => setTurnstileToken(token)} options={{ theme: 'light', size: 'normal' }} />
                    </div>

                    <button type="submit" disabled={formStatus === 'sending'} className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-lg text-lg transition shadow-lg flex items-center justify-center gap-2 transform active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
                       {formStatus === 'sending' ? 'Wird gesendet...' : <><FontAwesomeIcon icon={faPaperPlane} /> Kostenlos anfragen</>}
                    </button>
                 </form>
               )}
            </div>
         </div>
      </section>

      {/* --- STANDORT & FOOTER --- */}
      <section id="gebiet" className="bg-slate-50 border-t border-slate-200">
         <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
            <div className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-white">
               <span className="text-emerald-700 font-bold uppercase tracking-wider mb-2 text-sm">Einsatzgebiet</span>
               <h3 className="text-3xl font-black text-slate-900 mb-6">Hier sind wir unterwegs.</h3>
               <p className="text-slate-600 text-lg mb-8 leading-relaxed">Unser Hauptsitz in Delbrück ermöglicht uns kurze Anfahrtswege im gesamten Kreis Paderborn.</p>
               <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 bg-slate-50 p-5 rounded-lg border border-slate-100">
                     <div className="w-10 h-10 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl"/></div>
                     <div><div className="font-bold text-slate-900">Delbrück (Zentrale)</div><div className="text-sm text-slate-500">Lange Straße 1, 33129 Delbrück</div></div>
                  </div>
               </div>
            </div>
            <div className="md:w-1/2 bg-slate-200 relative h-[400px] md:h-auto overflow-hidden group">
               {consent === 'all' ? (
                 <iframe width="100%" height="100%" style={{border:0}} loading="lazy" allowFullScreen src="https://maps.google.com/maps?q=Delbr%C3%BCck&t=&z=11&ie=UTF8&iwloc=&output=embed" title="Standort Delbrück" className="absolute inset-0"></iframe>
               ) : (
                 <>
                    <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: `url(${mapPlaceholder})`, filter: 'blur(8px)'}}></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm text-center p-8 z-10">
                        <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 text-emerald-600 shadow-lg"><FontAwesomeIcon icon={faLock} size="2x" /></div>
                        <h4 className="text-lg font-bold text-slate-800 mb-2">Karte deaktiviert</h4>
                        <p className="text-slate-600 text-sm max-w-xs mb-6 font-medium">Bitte akzeptieren Sie Cookies, um die Karte zu sehen (Datenschutz).</p>
                        <button onClick={requestConsent} className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-700 transition shadow-md hover:shadow-lg transform hover:-translate-y-0.5">Karte freischalten</button>
                    </div>
                 </>
               )}
            </div>
         </div>
      </section>

      <footer className="bg-[#1a1a1a] text-neutral-400 py-16 border-t border-neutral-800 text-sm">
         <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
            <div className="md:col-span-2">
               <div className="text-white font-black text-xl uppercase tracking-wider mb-4 flex items-center gap-2">
                  <div className="w-8 h-8 bg-emerald-700 rounded flex items-center justify-center">M</div> Meier Objektservice
               </div>
               <p className="max-w-xs leading-relaxed mb-6">Ihr Partner für gepflegte Immobilien in Delbrück und OWL. Gründlich, pünktlich und fair kalkuliert.</p>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Leistungen</h4>
               <ul className="space-y-2">
                  <li><a href="#leistungen" className="hover:text-emerald-500 transition">Gartenpflege</a></li>
                  <li><a href="#leistungen" className="hover:text-emerald-500 transition">Treppenhausreinigung</a></li>
                  <li><a href="#leistungen" className="hover:text-emerald-500 transition">Winterdienst</a></li>
                  <li><a href="#leistungen" className="hover:text-emerald-500 transition">Reparaturen</a></li>
               </ul>
            </div>
            <div>
               <h4 className="text-white font-bold mb-4 uppercase tracking-wider text-xs">Rechtliches</h4>
               <ul className="space-y-2">
                  <li><button onClick={() => setLegalPage('impressum')} className="hover:text-emerald-500 transition text-left">Impressum</button></li>
                  <li><button onClick={() => setLegalPage('datenschutz')} className="hover:text-emerald-500 transition text-left">Datenschutz</button></li>
                  <li><button onClick={() => setIsBannerOpen(true)} className="text-left hover:text-emerald-500 transition">Cookie-Einstellungen</button></li>
               </ul>
            </div>
         </div>
         <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-neutral-800 text-center md:text-left text-neutral-600 text-xs">© {new Date().getFullYear()} Meier Objektservice. Alle Rechte vorbehalten.</div>
      </footer>
    </div>
  );
}

export default App;