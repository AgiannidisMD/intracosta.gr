import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { ChevronDown, ChevronUp } from 'lucide-react';

const FAQ: React.FC = () => {
  const { t, language } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  // FAQ data with translations for all languages
  const faqs = [
    {
      question: {
        el: "Ποιες χώρες εξυπηρετείτε;",
        en: "Which countries do you serve?",
        de: "Welche Länder bedienen Sie?"
      },
      answer: {
        el: "Η INTRACOSTA πραγματοποιεί τακτικά δρομολόγια από και προς την Ελλάδα, καλύπτοντας το μεγαλύτερο μέρος της Κεντρικής και Δυτικής Ευρώπης, κυρίως Γερμανία, Ολλανδία, Βέλγιο, Αυστρία, Πολωνία, Δανία και τις γύρω χώρες.",
        en: "INTRACOSTA operates regular routes from and to Greece, covering most of Central and Western Europe, mainly Germany, Netherlands, Belgium, Austria, Poland, Denmark and surrounding countries.",
        de: "INTRACOSTA betreibt regelmäßige Routen von und nach Griechenland und deckt den größten Teil Mittel- und Westeuropas ab, hauptsächlich Deutschland, Niederlande, Belgien, Österreich, Polen, Dänemark und umliegende Länder."
      }
    },
    {
      question: {
        el: "Αναλαμβάνετε τόσο πλήρη όσο και μερικά φορτία (FTL/LTL);",
        en: "Do you handle both full and partial loads (FTL/LTL)?",
        de: "Übernehmen Sie sowohl Voll- als auch Teilladungen (FTL/LTL)?"
      },
      answer: {
        el: "Ναι, παρέχουμε ευέλικτες λύσεις μεταφοράς πλήρων (FTL) και μερικών (LTL) φορτίων, ανάλογα με τον όγκο και τις ανάγκες του πελάτη, εξασφαλίζοντας οικονομία και αξιοπιστία στη διακίνηση.",
        en: "Yes, we provide flexible solutions for full (FTL) and partial (LTL) loads, depending on the volume and needs of the customer, ensuring economy and reliability in transportation.",
        de: "Ja, wir bieten flexible Lösungen für Voll- (FTL) und Teilladungen (LTL) je nach Volumen und Bedürfnissen des Kunden und gewährleisten Wirtschaftlichkeit und Zuverlässigkeit im Transport."
      }
    },
    {
      question: {
        el: "Μπορώ να στείλω φορτίο από χώρα του εξωτερικού προς Ελλάδα;",
        en: "Can I send cargo from a foreign country to Greece?",
        de: "Kann ich Fracht aus einem ausländischen Land nach Griechenland senden?"
      },
      answer: {
        el: "Βεβαίως. Αναλαμβάνουμε εισαγωγές και εξαγωγές από και προς την Ελλάδα, προσφέροντας πλήρη υποστήριξη σε όλη τη διαδικασία μεταφοράς και εκτελωνισμού.",
        en: "Certainly. We handle imports and exports from and to Greece, providing full support throughout the transportation and customs clearance process.",
        de: "Selbstverständlich. Wir übernehmen Importe und Exporte von und nach Griechenland und bieten vollständige Unterstützung während des gesamten Transport- und Zollabwicklungsprozesses."
      }
    },
    {
      question: {
        el: "Παρέχετε υπηρεσίες συνδυασμένων μεταφορών;",
        en: "Do you provide intermodal transport services?",
        de: "Bieten Sie intermodale Transportdienstleistungen an?"
      },
      answer: {
        el: "Ναι, συνδυάζουμε οδική μεταφορά με θαλάσσια ή αεροπορική, προσφέροντας ολοκληρωμένες λύσεις door-to-port και port-to-door, ώστε να μειώνεται ο χρόνος και το κόστος για τον πελάτη.",
        en: "Yes, we combine road transport with sea or air, offering integrated door-to-port and port-to-door solutions, reducing time and cost for the customer.",
        de: "Ja, wir kombinieren Straßentransport mit See- oder Lufttransport und bieten integrierte Door-to-Port- und Port-to-Door-Lösungen, die Zeit und Kosten für den Kunden reduzieren."
      }
    },
    {
      question: {
        el: "Τι είδους εμπορεύματα μεταφέρετε;",
        en: "What types of goods do you transport?",
        de: "Welche Arten von Gütern transportieren Sie?"
      },
      answer: {
        el: "Μεταφέρουμε ευρύ φάσμα εμπορευμάτων: ξηρά φορτία, προϊόντα με ελεγχόμενη θερμοκρασία, επικίνδυνα (ADR), ευπαθή, βιομηχανικά και ειδικά φορτία υψηλής αξίας.",
        en: "We transport a wide range of goods: dry cargo, temperature-controlled products, dangerous goods (ADR), fragile, industrial and special high-value cargo.",
        de: "Wir transportieren eine breite Palette von Gütern: Trockenfracht, temperaturkontrollierte Produkte, gefährliche Güter (ADR), zerbrechliche, industrielle und spezielle hochwertige Fracht."
      }
    },
    {
      question: {
        el: "Μεταφέρετε προσωπικά αντικείμενα ή δέματα;",
        en: "Do you transport personal items or packages?",
        de: "Transportieren Sie persönliche Gegenstände oder Pakete?"
      },
      answer: {
        el: "Όχι, δεν μεταφέρουμε προσωπικά μικροδέματα ή αντικείμενα. Οι υπηρεσίες μας απευθύνονται αποκλειστικά σε εμπορικά φορτία επιχειρήσεων. Κατ' εξαίρεση, μπορούμε να αναλάβουμε δέματα μεγαλύτερων διαστάσεων με τα κατάλληλα παραστατικά.",
        en: "No, we do not transport personal small packages or items. Our services are exclusively for commercial business cargo. As an exception, we can handle larger packages with the appropriate documentation.",
        de: "Nein, wir transportieren keine persönlichen kleinen Pakete oder Gegenstände. Unsere Dienstleistungen sind ausschließlich für gewerbliche Geschäftsfracht bestimmt. Als Ausnahme können wir größere Pakete mit der entsprechenden Dokumentation bearbeiten."
      }
    },
    {
      question: {
        el: "Πώς εξασφαλίζεται η ασφάλεια του φορτίου;",
        en: "How is cargo security ensured?",
        de: "Wie wird die Frachtsicherheit gewährleistet?"
      },
      answer: {
        el: "Κάθε αποστολή καλύπτεται από ασφάληση CMR, ενώ παρέχουμε και δυνατότητα επιπλέον κάλυψης εφόσον ζητηθεί. Όλα τα φορτηγά μας είναι εξοπλισμένα με GPS για συνεχή παρακολούθηση της μεταφοράς.",
        en: "Every shipment is covered by CMR insurance, while we also provide the possibility of additional coverage if requested. All our trucks are equipped with GPS for continuous monitoring of transportation.",
        de: "Jede Sendung ist durch CMR-Versicherung abgedeckt, während wir auch die Möglichkeit einer zusätzlichen Abdeckung auf Anfrage bieten. Alle unsere Lkw sind mit GPS für kontinuierliche Überwachung des Transports ausgestattet."
      }
    },
    {
      question: {
        el: "Πώς μπορώ να παρακολουθήσω την πορεία του φορτίου μου;",
        en: "How can I track my cargo?",
        de: "Wie kann ich meine Fracht verfolgen?"
      },
      answer: {
        el: "Οι πελάτες μας μπορούν να ενημερώνονται ανά πάσα στιγμή για την εξέλιξη της μεταφοράς μέσω επικοινωνίας με την ομάδα διαχείρισης φορτίων.",
        en: "Our customers can be informed at any time about the progress of transportation through communication with the cargo management team.",
        de: "Unsere Kunden können jederzeit über den Fortschritt des Transports durch Kommunikation mit dem Frachtmanagement-Team informiert werden."
      }
    },
    {
      question: {
        el: "Πόσος είναι ο χρόνος παράδοσης από Ελλάδα προς Κεντρική Ευρώπη;",
        en: "What is the delivery time from Greece to Central Europe?",
        de: "Wie ist die Lieferzeit von Griechenland nach Mitteleuropa?"
      },
      answer: {
        el: "Οι χρόνοι παράδοσης διαφέρουν ανάλογα με τον προορισμό, αλλά ενδεικτικά οι μεταφορές Ελλάδας-Γερμανίας ολοκληρώνονται σε 3-7 εργάσιμες ημέρες από την στιγμή που θα ξεκινήσει η μεταφορά του φορτίου για τον προορισμό του.",
        en: "Delivery times vary depending on the destination, but typically Greece-Germany transports are completed in 3-7 working days from the moment the cargo transportation begins to its destination.",
        de: "Die Lieferzeiten variieren je nach Zielort, aber typischerweise werden Griechenland-Deutschland-Transporte in 3-7 Werktagen ab dem Moment abgeschlossen, in dem der Frachttransport zu seinem Ziel beginnt."
      }
    },
    {
      question: {
        el: "Πώς μπορώ να ζητήσω προσφορά;",
        en: "How can I request a quote?",
        de: "Wie kann ich ein Angebot anfordern?"
      },
      answer: {
        el: "Μπορείτε να συμπληρώσετε τη φόρμα \"Επικοινωνήστε μαζί μας\" στη σελίδα μας ή να επικοινωνήσετε απευθείας στα emails. Χρειαζόμαστε βασικές πληροφορίες για τον τόπο φόρτωσης, τον προορισμό, το είδος και τον όγκο του φορτίου.",
        en: "You can fill out the \"Contact Us\" form on our page or contact us directly via email. We need basic information about the loading location, destination, type and volume of cargo.",
        de: "Sie können das \"Kontaktieren Sie uns\"-Formular auf unserer Seite ausfüllen oder uns direkt per E-Mail kontaktieren. Wir benötigen grundlegende Informationen über den Ladeort, das Ziel, die Art und das Volumen der Fracht."
      }
    },
    {
      question: {
        el: "Τι πληροφορίες χρειάζεστε για να μου στείλετε προσφορά;",
        en: "What information do you need to send me a quote?",
        de: "Welche Informationen benötigen Sie, um mir ein Angebot zu senden?"
      },
      answer: {
        el: "Για να σας δώσουμε ακριβή προσφορά, είναι απαραίτητο να γνωρίζουμε: τόπο φόρτωσης και παράδοσης (πόλη και χώρα), τύπο και ποσότητα φορτίου, διαστάσεις/βάρος, καθώς και επιθυμητή ημερομηνία φόρτωσης.",
        en: "To give you an accurate quote, we need to know: loading and delivery location (city and country), type and quantity of cargo, dimensions/weight, as well as desired loading date.",
        de: "Um Ihnen ein genaues Angebot zu geben, müssen wir wissen: Lade- und Lieferort (Stadt und Land), Art und Menge der Fracht, Abmessungen/Gewicht sowie gewünschtes Ladedatum."
      }
    },
    {
      question: {
        el: "Ποιοι είναι οι διαθέσιμοι τρόποι πληρωμής;",
        en: "What are the available payment methods?",
        de: "Welche Zahlungsmethoden sind verfügbar?"
      },
      answer: {
        el: "Οι πληρωμές πραγματοποιούνται μέσω τραπεζικής μεταφοράς, ενώ για τακτικούς συνεργάτες παρέχονται και συμφωνημένες πιστωτικές διευκολύνσεις.",
        en: "Payments are made through bank transfer, while regular partners are also provided with agreed credit facilities.",
        de: "Zahlungen erfolgen per Banküberweisung, während regelmäßigen Partnern auch vereinbarte Kreditfazilitäten zur Verfügung gestellt werden."
      }
    },
    {
      question: {
        el: "Γιατί να επιλέξω την INTRACOSTA;",
        en: "Why should I choose INTRACOSTA?",
        de: "Warum sollte ich INTRACOSTA wählen?"
      },
      answer: {
        el: "Η INTRACOSTA συνδυάζει εμπειρία άνω των 25 ετών, σύγχρονο στόλο και δίκτυο συνεργατών σε όλη την Ευρώπη. Είμαστε πιστοποιημένοι με ISO 9001:2015 και ISO 39001:2012, εφαρμόζουμε ασφάλιση CMR σε κάθε αποστολή και λειτουργούμε με απόλυτη συνέπεια και διαφάνεια στο κόστος. Κάθε φορτίο αντιμετωπίζεται με επαγγελματισμό και προσωπική ευθύνη, ώστε να είστε σίγουροι ότι θα φτάσει με ασφάλεια, στην ώρα του και στην καλύτερη δυνατή τιμή.",
        en: "INTRACOSTA combines over 25 years of experience, modern fleet and partner network throughout Europe. We are certified with ISO 9001:2015 and ISO 39001:2012, apply CMR insurance to every shipment and operate with absolute consistency and cost transparency. Every cargo is handled with professionalism and personal responsibility, so you can be sure it will arrive safely, on time and at the best possible price.",
        de: "INTRACOSTA kombiniert über 25 Jahre Erfahrung, moderne Flotte und Partnernetzwerk in ganz Europa. Wir sind zertifiziert mit ISO 9001:2015 und ISO 39001:2012, wenden CMR-Versicherung auf jede Sendung an und arbeiten mit absoluter Konsistenz und Kostentransparenz. Jede Fracht wird mit Professionalität und persönlicher Verantwortung behandelt, sodass Sie sicher sein können, dass sie sicher, pünktlich und zum bestmöglichen Preis ankommt."
      }
    }
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            {language === 'el' ? 'Συχνές Ερωτήσεις' : 
             language === 'en' ? 'Frequently Asked Questions' : 
             'Häufig gestellte Fragen'}
          </h2>
          <div className="w-24 h-1 bg-yellow-500 mx-auto"></div>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
                aria-label={`Toggle FAQ: ${faq.question[language]}`}
              >
                <h3 id={`faq-question-${index}`} className="font-semibold text-gray-900 pr-4">
                  {faq.question[language]}
                </h3>
                {openIndex === index ? (
                  <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
                )}
              </button>
              
              {openIndex === index && (
                <div id={`faq-answer-${index}`} className="px-6 pb-4" role="region" aria-labelledby={`faq-question-${index}`}>
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer[language]}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;