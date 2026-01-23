import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCookieBite, faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';

// Props hinzugefügt: onOpenImpressum, onOpenDatenschutz
const CookieBanner = ({ isOpen, onClose, onConsentChange, onOpenImpressum, onOpenDatenschutz }) => {
  const [detailsOpen, setDetailsOpen] = useState(false);

  if (!isOpen) return null;

  const handleAcceptAll = () => {
    localStorage.setItem('cookie-consent', 'all');
    onConsentChange('all');
    onClose();
  };

  const handleDecline = () => {
    localStorage.setItem('cookie-consent', 'essential');
    onConsentChange('essential');
    onClose();
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-[100] p-4 md:p-6 flex justify-center items-end pointer-events-none">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-100 p-6 md:p-8 max-w-4xl w-full pointer-events-auto transform transition-all duration-500 ease-out translate-y-0 opacity-100 animate-slide-up">
        
        <div className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Icon */}
          <div className="hidden md:flex bg-emerald-50 text-emerald-600 w-16 h-16 rounded-2xl items-center justify-center shrink-0">
             <FontAwesomeIcon icon={faCookieBite} size="2x" />
          </div>

          <div className="flex-1">
             <h3 className="text-xl font-bold text-slate-900 mb-2 flex items-center gap-3">
                <span className="md:hidden text-emerald-600"><FontAwesomeIcon icon={faCookieBite}/></span>
                Wir nutzen Cookies
             </h3>
             <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Wir verwenden Cookies, um Ihnen das beste Erlebnis auf unserer Website zu bieten. 
                Dazu zählen Cookies für den Betrieb der Seite sowie solche für anonyme Statistikzwecke, 
                Komfort-Einstellungen (z.B. Google Maps) oder zur Anzeige personalisierter Inhalte. 
                <br className="mb-2 block"/>
                Weitere Informationen finden Sie in unserer{" "}
                <button onClick={onOpenDatenschutz} className="text-emerald-600 font-bold hover:underline">
                  Datenschutzerklärung
                </button>{" "}
                und im{" "}
                <button onClick={onOpenImpressum} className="text-emerald-600 font-bold hover:underline">
                  Impressum
                </button>.
             </p>

             {detailsOpen && (
               <div className="mb-6 bg-slate-50 p-4 rounded-xl text-sm space-y-3 border border-slate-100 animate-fade-in">
                  <div className="flex items-start gap-3">
                     <div className="text-emerald-600 mt-0.5"><FontAwesomeIcon icon={faCheck} /></div>
                     <div>
                        <span className="font-bold text-slate-800 block">Notwendig</span>
                        <span className="text-slate-500 text-xs">Technisch erforderliche Cookies für die Grundfunktionen.</span>
                     </div>
                  </div>
                  <div className="flex items-start gap-3">
                     <div className="text-emerald-600 mt-0.5"><FontAwesomeIcon icon={faCheck} /></div>
                     <div>
                        <span className="font-bold text-slate-800 block">Funktional (Maps, Medien)</span>
                        <span className="text-slate-500 text-xs">Ermöglicht das Laden von Karten (Google Maps) und externen Inhalten.</span>
                     </div>
                  </div>
               </div>
             )}

             <div className="flex flex-col sm:flex-row gap-3">
                <button 
                  onClick={handleAcceptAll}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-xl font-bold text-sm transition-all shadow-lg shadow-emerald-200 flex-1"
                >
                  Alles akzeptieren
                </button>
                <button 
                  onClick={handleDecline}
                  className="bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 px-6 py-3 rounded-xl font-bold text-sm transition-all flex-1"
                >
                  Nur Essenzielle
                </button>
                <button 
                  onClick={() => setDetailsOpen(!detailsOpen)}
                  className="text-slate-400 hover:text-slate-600 text-xs font-medium px-4 py-3 underline decoration-slate-300 underline-offset-4 transition-colors"
                >
                  {detailsOpen ? 'Details verbergen' : 'Details anzeigen'}
                </button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CookieBanner;