import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

// Wir empfangen 'isOpen' als Prop von der App
const CookieBanner = ({ isOpen, onConsentChange, onClose }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setAnimateIn(true), 10);
    } else {
      setAnimateIn(false);
    }
  }, [isOpen]);

  const handleDecision = (decision) => {
    setAnimateIn(false);
    setTimeout(() => {
      localStorage.setItem('cookie-consent', decision);
      onConsentChange(decision);
      onClose(); 
    }, 500);
  };

  if (!isOpen && !animateIn) return null; 

  return (
    <div 
      className={`
        fixed bottom-4 z-[9999] 
        /* Mobile: Links und Rechts Abstand */
        left-4 right-4 
        /* Desktop (ab md): Links/Rechts 0 und Margin Auto zum Zentrieren */
        md:left-0 md:right-0 md:mx-auto md:max-w-md 
        transition-transform duration-500 ease-in-out 
        ${animateIn ? 'translate-y-0' : 'translate-y-[150%]'}
      `}
    >
      <div className="bg-white text-slate-800 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.15)] border border-slate-200 overflow-hidden">
        
        <div className="p-6">
          <h3 className="font-bold text-lg mb-2 text-slate-900">Datenschutz</h3>
          
          <p className="text-xs leading-relaxed text-slate-500 mb-4">
            Wir nutzen Google Maps & WhatsApp. Damit diese funktionieren, klicken Sie bitte auf <span className="font-bold text-emerald-700">"Alle akzeptieren"</span>. 
            Ohne Zustimmung bleiben die Funktionen deaktiviert.
            
            <button 
              onClick={() => setShowDetails(!showDetails)} 
              className="ml-2 text-emerald-600 font-bold hover:underline inline-flex items-center gap-1"
            >
              {showDetails ? 'Verbergen' : 'Details'}
              <FontAwesomeIcon icon={showDetails ? faChevronUp : faChevronDown} size="xs"/>
            </button>
          </p>

          {showDetails && (
            <div className="mb-4 bg-slate-50 p-3 rounded-lg text-[10px] text-slate-500 border border-slate-100 animate-fade-in-down">
              <ul className="space-y-2">
                <li className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Essenziell</span> 
                  <span className="bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-bold text-[9px]">Immer an</span>
                </li>
                <li className="flex justify-between items-center">
                  <span className="font-bold text-slate-700">Externe Medien</span> 
                  <span className="text-slate-400">Google Maps, WhatsApp</span>
                </li>
              </ul>
              <p className="mt-2 text-[9px] text-slate-400 leading-tight">
                Daten werden ggf. in die USA (Google/Meta) übertragen.
              </p>
            </div>
          )}

          <div className="flex flex-col gap-2">
            <button 
              onClick={() => handleDecision('all')}
              className="w-full py-3 rounded-xl font-bold text-sm bg-emerald-700 text-white hover:bg-emerald-800 active:scale-95 transition-all shadow-md shadow-emerald-900/10"
            >
              Alle akzeptieren
            </button>
            
            <div className="grid grid-cols-2 gap-2">
              <button 
                onClick={() => handleDecision('essential')}
                className="py-2.5 rounded-xl font-medium text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all"
              >
                Nur Notwendige
              </button>
              <button 
                onClick={() => handleDecision('reject')}
                className="py-2.5 rounded-xl font-medium text-xs bg-slate-100 text-slate-600 hover:bg-slate-200 active:scale-95 transition-all"
              >
                Ablehnen
              </button>
            </div>
          </div>

          <div className="mt-4 flex justify-center gap-4 text-[10px] text-slate-400">
             <a href="#datenschutz" className="hover:text-emerald-600 transition-colors">Datenschutzerklärung</a>
             <a href="#impressum" className="hover:text-emerald-600 transition-colors">Impressum</a>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CookieBanner;