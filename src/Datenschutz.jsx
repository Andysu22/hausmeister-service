import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

const Datenschutz = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[9999] bg-white overflow-y-auto animate-fade-in">
      <div className="max-w-4xl mx-auto px-6 py-12 relative">
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 bg-slate-100 hover:bg-slate-200 text-slate-600 w-10 h-10 rounded-full flex items-center justify-center transition"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <h1 className="text-3xl font-black text-slate-900 mb-8">Datenschutzerklärung</h1>

        <div className="space-y-8 text-slate-700 text-sm leading-relaxed">
          
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">1. Datenschutz auf einen Blick</h2>
            <h3 className="font-bold mb-2 text-slate-800">Allgemeine Hinweise</h3>
            <p className="mb-4">
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können.
            </p>
            <h3 className="font-bold mb-2 text-slate-800">Datenerfassung auf dieser Website</h3>
            <p className="mb-2"><strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br/>
            Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.</p>
            <p className="mb-2"><strong>Wie erfassen wir Ihre Daten?</strong><br/>
            Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).</p>
            <p className="mb-2"><strong>Wofür nutzen wir Ihre Daten?</strong><br/>
            Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.</p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">2. Hosting</h2>
            <p className="mb-4">
              Wir hosten die Inhalte unserer Website bei einem externen Anbieter (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
            </p>
            <p className="mb-4">
              Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
            <p className="italic text-xs">
              Wir setzen folgenden Hoster ein: 1&1 IONOS SE, Elgendorfer Str. 57, 56410 Montabaur
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">3. Allgemeine Hinweise und Pflichtinformationen</h2>
            <h3 className="font-bold mb-2 text-slate-800">Datenschutz</h3>
            <p className="mb-4">
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
            </p>
            <h3 className="font-bold mb-2 text-slate-800">Hinweis zur verantwortlichen Stelle</h3>
            <p className="mb-4">
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br/><br/>
              <strong>Meier Objektservice</strong><br/>
              Lange Straße 1<br/>
              33129 Delbrück<br/><br/>
              Telefon: 0155 619 158 90<br/>
              E-Mail: info@meier-objektservice.de
            </p>
            <h3 className="font-bold mb-2 text-slate-800">SSL- bzw. TLS-Verschlüsselung</h3>
            <p className="mb-4">
              Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
            </p>
            <h3 className="font-bold mb-2 text-slate-800">Widerruf Ihrer Einwilligung zur Datenverarbeitung</h3>
            <p className="mb-4">
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">4. Datenerfassung auf dieser Website</h2>
            <h3 className="font-bold mb-2 text-slate-800">Cookies</h3>
            <p className="mb-4">
              Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert.
              Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung abgefragt wurde (z. B. via Cookie-Banner), erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.
            </p>
            <h3 className="font-bold mb-2 text-slate-800">Kontaktformular & Anfrage per E-Mail/Telefon</h3>
            <p className="mb-4">
              Wenn Sie uns per Kontaktformular, E-Mail oder Telefon kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
              Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO).
            </p>
          </section>

          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4 border-b pb-2">5. Plugins und Tools</h2>
            <h3 className="font-bold mb-2 text-slate-800">Google Maps</h3>
            <p className="mb-4">
              Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
              Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.
              Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO.
            </p>
            
            <h3 className="font-bold mb-2 text-slate-800">Cloudflare Turnstile</h3>
            <p className="mb-4">
              Wir nutzen „Turnstile“ (einen Dienst von Cloudflare Inc., 101 Townsend St., San Francisco, CA 94107, USA) auf unserer Website. Mit Turnstile soll überprüft werden, ob die Dateneingabe auf unserer Website (z. B. in einem Kontaktformular) durch einen Menschen oder durch ein automatisiertes Programm erfolgt. Hierzu analysiert Turnstile das Verhalten des Besuchers anhand verschiedener Merkmale. Diese Analyse beginnt automatisch, sobald der Websitebesucher die Website betritt. Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse daran, seine Webangebote vor missbräuchlicher automatisierter Ausspähung und vor SPAM zu schützen.
            </p>

            <h3 className="font-bold mb-2 text-slate-800">WhatsApp Kontakt</h3>
            <p className="mb-4">
              Für die Kommunikation per WhatsApp nutzen wir den Dienst der Meta Platforms Ireland Ltd., 4 Grand Canal Square, Grand Canal Harbour, Dublin 2, Irland.
              Wenn Sie über WhatsApp Kontakt mit uns aufnehmen, übermitteln Sie uns damit automatisch Ihre Telefonnummer. Wir weisen darauf hin, dass WhatsApp Zugriff auf das Adressbuch des genutzten Geräts erhalten kann sowie Metadaten der Kommunikation verarbeitet. Daten werden hierbei ggf. auch auf Servern von Meta in den USA verarbeitet. Wir haben keinen Einfluss auf die Datenverarbeitung durch WhatsApp.
              Die Nutzung von WhatsApp erfolgt freiwillig. Rechtsgrundlage für die Verarbeitung der Daten ist Art. 6 Abs. 1 lit. a DSGVO (Einwilligung) bzw. Art. 6 Abs. 1 lit. b DSGVO (Vertragsanbahnung).
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