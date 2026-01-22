import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Datenschutz = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto animate-fade-in">
      <div className="max-w-3xl mx-auto px-4 py-12 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 bg-slate-100 hover:bg-slate-200 text-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h1 className="text-3xl font-black text-slate-900 mb-8">Datenschutzerklärung</h1>

        <div className="space-y-6 text-slate-700 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-bold mb-1">Allgemeine Hinweise</h3>
            <p>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">2. Hosting</h2>
            <p>
              Wir hosten die Inhalte unserer Website bei einem externen Anbieter. Personenbezogene Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Webseitenzugriffe und sonstige Daten handeln, die über eine Website generiert werden.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="font-bold mb-1">Datenschutz</h3>
            <p>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <h3 className="font-bold mt-4 mb-1">Hinweis zur verantwortlichen Stelle</h3>
            <p>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br /><br />
              Meier Objektservice<br />
              Lange Straße 1<br />
              33129 Delbrück<br /><br />
              Telefon: 0155 619 158 90<br />
              E-Mail: info@meier-objektservice.de
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">4. Datenerfassung auf dieser Website</h2>
            <h3 className="font-bold mb-1">Kontaktformular</h3>
            <p>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
            </p>
            <h3 className="font-bold mt-4 mb-1">Anfrage per E-Mail, Telefon</h3>
            <p>
              Wenn Sie uns per E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold text-slate-900 mb-2">5. Plugins und Tools</h2>
            <h3 className="font-bold mb-1">Google Maps</h3>
            <p>
              Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
              Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung. Wenn Google Maps aktiviert ist, kann Google zum Zwecke der einheitlichen Darstellung der Schriftarten Google Fonts verwenden.
              Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar.
            </p>
            
            <h3 className="font-bold mt-4 mb-1">WhatsApp Kontakt</h3>
            <p>
              Wir bieten Ihnen die Möglichkeit, uns per WhatsApp zu kontaktieren. Wenn Sie diesen Dienst nutzen, werden Daten an WhatsApp (Meta Platforms Ireland Limited) übertragen. Bitte beachten Sie, dass WhatsApp Zugriff auf Adressbuchdaten haben kann und Daten in die USA überträgt. Die Nutzung erfolgt freiwillig.
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

export default Datenschutz;