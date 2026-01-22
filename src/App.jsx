import React, { useState, useEffect } from 'react';
import CookieBanner from './CookieBanner'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faCheck, 
  faTimes, 
  faBars,
  faMapMarkerAlt,
  faClock,
  faPhone,
  faEnvelope,
  faArrowRight,
  faPaperPlane,
  faChevronDown,
  faLock
} from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("+49 ");
  
  // GLOBALER COOKIE STATE (Vom Banner gesteuert)
  // 'all' = Alles erlaubt (Maps sichtbar, WhatsApp geht)
  const [consent, setConsent] = useState(null);
  
  // Steuerung des Banners
  const [isBannerOpen, setIsBannerOpen] = useState(false);

  // WhatsApp Konfiguration
  const waNumber = "4915561915890";
  const waLink = `https://wa.me/${waNumber}?text=Hallo,%20ich%20habe%20eine%20Anfrage...`;

  useEffect(() => {
    // Prüfen beim Laden der Seite
    const stored = localStorage.getItem('cookie-consent');
    if (stored) {
      setConsent(stored);
    } else {
      // Wenn noch nichts gespeichert ist -> Banner nach kurzer Zeit öffnen
      setTimeout(() => setIsBannerOpen(true), 500);
    }
  }, []);

  const handleConsentChange = (status) => {
    setConsent(status);
  };

  // Wird aufgerufen, wenn User auf "Karte aktivieren" klickt
  const requestConsent = () => {
    setIsBannerOpen(true);
  };

  // Klick auf den WhatsApp Button
  const handleWhatsAppClick = (e) => {
    // Wenn global alles erlaubt ist, direkt öffnen
    if (consent === 'all') {
      return; 
    }
    // Sonst: Link blockieren und Banner öffnen
    e.preventDefault(); 
    setIsBannerOpen(true); 
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-emerald-200">
      
      {/* --- COOKIE BANNER --- */}
      <CookieBanner 
        isOpen={isBannerOpen} 
        onClose={() => setIsBannerOpen(false)}
        onConsentChange={handleConsentChange} 
      />

      {/* --- WHATSAPP FLOATING BUTTON --- */}
      <a 
        href={waLink}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleWhatsAppClick} 
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] hover:bg-[#20ba5a] text-white w-14 h-14 sm:w-16 sm:h-16 rounded-full shadow-2xl flex items-center justify-center transition-transform hover:scale-105"
        title="Direkt WhatsApp schreiben"
      >
        <FontAwesomeIcon icon={faWhatsapp} size="2x" />
      </a>

      {/* --- TOP BAR --- */}
      <div className="bg-slate-900 text-slate-400 py-2 text-xs sm:text-sm border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex gap-4">
             <span className="flex items-center gap-2"><FontAwesomeIcon icon={faMapMarkerAlt} className="text-emerald-500"/> 33129 Delbrück + 100km</span>
             <span className="hidden md:flex items-center gap-2"><FontAwesomeIcon icon={faClock} className="text-emerald-500"/> Mo-Fr: 7-18 Uhr</span>
          </div>
          <a href="mailto:info@meier.de" className="hover:text-white transition flex items-center gap-2">
            <FontAwesomeIcon icon={faEnvelope} /> info@meier-objektservice.de
          </a>
        </div>
      </div>

      {/* --- NAVIGATION --- */}
      <nav className="bg-white shadow-sm sticky top-0 z-30 h-20 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 h-full flex justify-between items-center">
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-emerald-700 text-white rounded flex items-center justify-center font-bold text-xl group-hover:bg-emerald-800 transition shadow-sm">M</div>
            <div className="leading-none">
              <span className="block font-black text-xl text-slate-900 uppercase">MEIER</span>
              <span className="block text-xs font-bold text-emerald-700 uppercase tracking-widest">Objektservice</span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-8 font-bold text-sm uppercase tracking-wide text-slate-600">
             <a href="#leistungen" className="hover:text-emerald-700 transition">Was wir tun</a>
             <a href="#kontakt" className="hover:text-emerald-700 transition">Kontakt</a>
             <a href="#gebiet" className="hover:text-emerald-700 transition">Standort</a>
             <a href="#kontakt" className="bg-emerald-700 hover:bg-emerald-800 text-white px-5 py-2.5 rounded transition shadow-md hover:shadow-lg">
               Angebot
             </a>
          </div>

          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden text-slate-800 text-2xl p-2">
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} />
          </button>
        </div>

        {isMenuOpen && (
           <div className="md:hidden absolute top-20 left-0 w-full bg-white border-t border-slate-100 shadow-xl p-4 flex flex-col gap-4 animate-fade-in-down">
              <a href="#leistungen" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-700 py-2 border-b border-slate-50">Leistungen</a>
              <a href="#kontakt" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-700 py-2 border-b border-slate-50">Kontakt</a>
              <a href="#gebiet" onClick={() => setIsMenuOpen(false)} className="font-bold text-slate-700 py-2 border-b border-slate-50">Gebiet</a>
           </div>
        )}
      </nav>

      {/* --- HERO SECTION --- */}
      <header className="relative bg-slate-900 overflow-hidden h-[600px] flex items-center">
         <div className="absolute inset-0">
            <img 
               src="https://images.unsplash.com/photo-1558449028-b53a39d100fc?q=80&w=1920&auto=format&fit=crop" 
               alt="Werkzeug Hintergrund" 
               className="w-full h-full object-cover opacity-50"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>
         </div>

         <div className="relative max-w-7xl mx-auto px-4 w-full pt-10">
            <div className="max-w-2xl">
               <div className="inline-block bg-emerald-600 text-white text-xs font-bold px-3 py-1 rounded mb-4 uppercase tracking-wider">
                 Verfügbar in Delbrück & Umgebung
               </div>
               <h1 className="text-5xl md:text-7xl font-black text-white leading-none mb-6 drop-shadow-lg">
                  Wir packen an.<br/>
                  <span className="text-emerald-400">Sie lehnen sich zurück.</span>
               </h1>
               <p className="text-xl text-slate-200 mb-10 max-w-lg font-medium leading-relaxed">
                  Ihr Hausmeister für alle Fälle. Gartenpflege, Reinigung und Technik aus einer Hand. 
                  Ehrlich, direkt und sauber.
               </p>
               
               <div className="flex flex-row gap-4">
                  <a href="#kontakt" className="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-4 rounded font-bold text-lg transition-colors flex items-center justify-center gap-2 min-w-[160px]">
                     Online Anfrage
                  </a>
                  <a href="tel:+4915561915890" className="bg-white hover:bg-slate-100 text-slate-900 px-8 py-4 rounded font-bold text-lg transition-colors flex items-center justify-center gap-2 min-w-[160px]">
                     <FontAwesomeIcon icon={faPhone} className="text-slate-900"/> Anrufen
                  </a>
               </div>
            </div>
         </div>
      </header>

      {/* --- LEISTUNGEN --- */}
      <section id="leistungen" className="py-24 bg-slate-50">
         <div className="max-w-7xl mx-auto px-4">
            <div className="mb-16">
               <h2 className="text-4xl font-black text-slate-900 uppercase mb-4">Das wird erledigt.</h2>
               <div className="h-1 w-24 bg-emerald-600"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {/* Card 1: Garten */}
               <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition duration-300">
                  <div className="h-64 overflow-hidden relative">
                     <img src="https://plus.unsplash.com/premium_photo-1747911361940-5188c161ff7b?q=80&w=1170&auto=format&fit=crop" alt="Rasenmähen" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                     <div className="absolute bottom-0 left-0 bg-emerald-700 text-white px-4 py-1 text-sm font-bold uppercase">Garten</div>
                  </div>
                  <div className="p-8">
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Draußen & Grün</h3>
                     <p className="text-slate-600 mb-6 leading-relaxed">
                        Ein gepflegter Garten ist die Visitenkarte Ihrer Immobilie. Wir bringen das richtige Gerät mit – vom Aufsitzmäher bis zur Heckenschere.
                     </p>
                     <ul className="space-y-2 text-slate-700 font-medium border-t border-slate-100 pt-4">
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-emerald-600"/> Rasenmähen (auch Großflächen)</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-emerald-600"/> Heckenschnitt & Formgebung</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-emerald-600"/> Laub & Grünschnitt Entsorgung</li>
                     </ul>
                  </div>
               </div>
               
               {/* Card 2: Innen */}
               <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition duration-300">
                  <div className="h-64 overflow-hidden relative">
                     <img src="https://plus.unsplash.com/premium_photo-1676810457640-77cea17fb530?q=80&w=1170&auto=format&fit=crop" alt="Treppenhaus" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                     <div className="absolute bottom-0 left-0 bg-blue-600 text-white px-4 py-1 text-sm font-bold uppercase">Innen</div>
                  </div>
                  <div className="p-8">
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Drinnen & Sauber</h3>
                     <p className="text-slate-600 mb-6 leading-relaxed">Wir sorgen für Sauberkeit in Treppenhaus und Gemeinschaftsräumen.</p>
                     <ul className="space-y-2 text-slate-700 font-medium border-t border-slate-100 pt-4">
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-blue-600"/> Treppenhausreinigung</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-blue-600"/> Fensterreinigung</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-blue-600"/> Tiefgaragen & Keller</li>
                     </ul>
                  </div>
               </div>
               
               {/* Card 3: Technik */}
               <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition duration-300">
                  <div className="h-64 overflow-hidden relative">
                     <img src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=800&auto=format&fit=crop" alt="Werkzeug" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                     <div className="absolute bottom-0 left-0 bg-slate-600 text-white px-4 py-1 text-sm font-bold uppercase">Technik</div>
                  </div>
                  <div className="p-8">
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Reparatur & Kontrolle</h3>
                     <p className="text-slate-600 mb-6 leading-relaxed">Wir sind vor Ort, wenn es klemmt. Kleine Reparaturen erledigen wir sofort.</p>
                     <ul className="space-y-2 text-slate-700 font-medium border-t border-slate-100 pt-4">
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-slate-600"/> Leuchtmittelwechsel</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-slate-600"/> Zählerstände prüfen</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-slate-600"/> Mülltonnendienst</li>
                     </ul>
                  </div>
               </div>

               {/* Card 4: Winter */}
               <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-200 transition duration-300">
                  <div className="h-64 overflow-hidden relative">
                     <img src="https://images.unsplash.com/photo-1613082364903-9ff4734f5dd1?q=80&w=1170&auto=format&fit=crop" alt="Schnee" className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                     <div className="absolute bottom-0 left-0 bg-cyan-600 text-white px-4 py-1 text-sm font-bold uppercase">Winter</div>
                  </div>
                  <div className="p-8">
                     <h3 className="text-2xl font-bold text-slate-900 mb-3">Eis & Schnee</h3>
                     <p className="text-slate-600 mb-6 leading-relaxed">Sichere Wege im Winter nach aktueller Satzung.</p>
                     <ul className="space-y-2 text-slate-700 font-medium border-t border-slate-100 pt-4">
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-cyan-600"/> Räumung & Streuen</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-cyan-600"/> Haftpflicht inklusive</li>
                        <li className="flex items-center gap-3"><FontAwesomeIcon icon={faCheck} className="text-cyan-600"/> 24h Bereitschaft</li>
                     </ul>
                  </div>
               </div>
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
            
            <div className="bg-white p-6 md:p-10 rounded-2xl shadow-xl border border-slate-100">
               <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-800">Ihr Name</label>
                        <input type="text" placeholder="Max Mustermann" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-800">E-Mail Adresse</label>
                        <input type="email" placeholder="max@beispiel.de" className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                     </div>
                  </div>
                  <div className="grid md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-800">Telefonnummer</label>
                        <input type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition" />
                     </div>
                     <div className="space-y-2">
                        <label className="text-sm font-bold text-slate-800">Kategorie</label>
                        <div className="relative">
                           <select className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 appearance-none focus:ring-2 focus:ring-emerald-500 outline-none cursor-pointer">
                              <option value="" disabled selected>Bitte wählen...</option>
                              <option value="garten">Gartenpflege</option>
                              <option value="reinigung">Reinigung</option>
                              <option value="technik">Technik</option>
                              <option value="winter">Winterdienst</option>
                              <option value="sonstiges">Sonstiges</option>
                           </select>
                           <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-500"><FontAwesomeIcon icon={faChevronDown} size="sm" /></div>
                        </div>
                     </div>
                  </div>
                  <div className="space-y-2">
                     <label className="text-sm font-bold text-slate-800">Nachricht</label>
                     <textarea rows="4" placeholder="Ihr Anliegen..." className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition resize-none"></textarea>
                  </div>
                  <button className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold py-4 rounded-lg text-lg transition shadow-lg flex items-center justify-center gap-2">
                     <FontAwesomeIcon icon={faPaperPlane} /> Anfrage absenden
                  </button>
               </form>
            </div>
         </div>
      </section>

      {/* --- STANDORT & KARTE (DSGVO KONFORM) --- */}
      <section id="gebiet" className="bg-slate-50 border-t border-slate-200">
         <div className="flex flex-col md:flex-row h-auto md:h-[500px]">
            <div className="md:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-slate-50">
               <span className="text-emerald-700 font-bold uppercase tracking-wider mb-2 text-sm">Einsatzgebiet</span>
               <h3 className="text-3xl font-black text-slate-900 mb-6">Hier sind wir unterwegs.</h3>
               <p className="text-slate-600 text-lg mb-8 leading-relaxed">
                  Unser Hauptsitz in Delbrück ermöglicht uns kurze Anfahrtswege im gesamten Kreis Paderborn. 
               </p>
               <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-sm border border-slate-100">
                     <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center">
                        <FontAwesomeIcon icon={faMapMarkerAlt} className="text-xl"/>
                     </div>
                     <div>
                        <div className="font-bold text-slate-900">Delbrück (Zentrale)</div>
                        <div className="text-sm text-slate-500">Lange Straße 1, 33129 Delbrück</div>
                     </div>
                  </div>
               </div>
            </div>

            {/* --- GOOGLE MAPS WRAPPER --- */}
            <div className="md:w-1/2 bg-slate-200 relative h-[400px] md:h-auto overflow-hidden">
               {consent === 'all' ? (
                 <iframe 
                   width="100%" 
                   height="100%" 
                   style={{border:0}}
                   loading="lazy" 
                   allowFullScreen 
                   src="https://maps.google.com/maps?q=Delbr%C3%BCck&t=&z=11&ie=UTF8&iwloc=&output=embed"
                   title="Standort Delbrück"
                   className="absolute inset-0"
                 ></iframe>
               ) : (
                 <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-center p-8">
                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mb-4 text-slate-400">
                       <FontAwesomeIcon icon={faLock} size="2x" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-700 mb-2">Karte deaktiviert</h4>
                    <p className="text-slate-500 text-sm max-w-xs mb-6">
                       Aus Datenschutzgründen (DSGVO) wird Google Maps erst geladen, wenn Sie allen Cookies zustimmen.
                    </p>
                    <button 
                       onClick={requestConsent} 
                       className="bg-emerald-600 text-white px-6 py-2.5 rounded-lg font-bold text-sm hover:bg-emerald-700 transition shadow-md"
                    >
                       Karte aktivieren
                    </button>
                 </div>
               )}
            </div>
         </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="bg-[#1a1a1a] text-neutral-400 py-12 border-t border-neutral-800 text-sm">
         <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between gap-8">
            <div>
               <div className="text-white font-bold uppercase tracking-wider mb-4">Meier Objektservice</div>
               <p>Ihr Partner in Delbrück & OWL.</p>
            </div>
            <div className="flex flex-col gap-2">
               <a href="#" className="hover:text-emerald-500 transition">Impressum</a>
               <a href="#" className="hover:text-emerald-500 transition">Datenschutz</a>
               <button onClick={() => setIsBannerOpen(true)} className="text-left hover:text-emerald-500 transition">Cookie-Einstellungen</button>
            </div>
            <div className="text-neutral-500">
               © {new Date().getFullYear()} Meier Objektservice.
            </div>
         </div>
      </footer>
    </div>
  );
}

export default App;