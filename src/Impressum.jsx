import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Impressum = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 py-12 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 bg-slate-100 hover:bg-slate-200 text-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h1 className="text-3xl font-black text-slate-900 mb-8">Impressum</h1>

        <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Angaben gemäß § 5 TMG</h2>
            <p>
              <strong>Meier Objektservice</strong><br />
              Lange Straße 1<br />
              33129 Delbrück
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Kontakt</h2>
            <p>
              Telefon: 0155 619 158 90<br />
              E-Mail: info@meier-objektservice.de
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Umsatzsteuer-ID</h2>
            <p>
              Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br />
              DE 123 456 789 (Hier deine Nummer eintragen)
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Redaktionell verantwortlich</h2>
            <p>
              Max Mustermann (Dein Name)<br />
              Lange Straße 1<br />
              33129 Delbrück
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">EU-Streitschlichtung</h2>
            <p>
              Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: 
              <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline"> https://ec.europa.eu/consumers/odr/</a>.<br />
              Unsere E-Mail-Adresse finden Sie oben im Impressum.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
            <p>
              Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </p>
          </section>
        </div>
        
        <div className="mt-12 pt-8 border-t border-slate-200 text-center">
            <button onClick={onClose} className="text-emerald-600 font-bold hover:underline">Zurück zur Webseite</button>
        </div>
      </div>
    </div>
  );
};

export default Impressum;