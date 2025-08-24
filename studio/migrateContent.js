import {createClient} from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: 'dgeh1xh8',
  dataset: 'production',
  useCdn: false,
  apiVersion: '2024-08-23',
  token: process.env.SANITY_TOKEN
});

async function migrateContent() {
  try {
    console.log('Starting content migration...');

    // Hero Section
    const heroDoc = {
      _id: 'hero-main',
      _type: 'hero',
      title: 'Dein Partner für',
      highlightedText: 'faire Mobilität',
      subtitle: 'Ehrliche Beratung, transparente Preise und nachhaltige Lösungen. Bei mir bekommst du genau die Mobilitätslösung, die zu dir passt – ohne versteckte Kosten oder Verkaufsdruck.',
      primaryButtonText: 'Kostenloses Beratungsgespräch',
      primaryButtonLink: '#kontakt',
      secondaryButtonText: 'Meine Leistungen',
      secondaryButtonLink: '#leistungen'
    };

    // Leistungen (Services)
    const leistungen = [
      {
        _id: 'leistung-beratung',
        _type: 'leistung',
        title: 'Persönliche Beratung',
        description: 'Ich nehme mir Zeit für dich! Gemeinsam analysieren wir deinen Mobilitätsbedarf und finden die perfekte Lösung. Keine Verkaufsfloskeln, nur ehrliche Empfehlungen basierend auf deinen individuellen Anforderungen.',
        icon: 'users',
        gradientFrom: 'blue-500',
        gradientTo: 'blue-600',
        link: '/kontakt',
        order: 1
      },
      {
        _id: 'leistung-installation',
        _type: 'leistung',
        title: 'Technische Installation',
        description: 'Von der Standortanalyse bis zur fertigen Ladestation – ich kümmere mich um die komplette Installation. Professionell, sauber und mit allen notwendigen Zertifizierungen. Alles aus einer Hand!',
        icon: 'settings',
        gradientFrom: 'green-500',
        gradientTo: 'green-600',
        link: '/kontakt',
        order: 2
      },
      {
        _id: 'leistung-finanzierung',
        _type: 'leistung',
        title: 'Finanzierung & Förderung',
        description: 'Lass uns gemeinsam die beste Finanzierungslösung finden! Ich kenne alle aktuellen Förderprogramme und helfe dir beim Antrag. So sparst du bares Geld und Zeit bei der Bürokratie.',
        icon: 'euro',
        gradientFrom: 'cyan-500',
        gradientTo: 'cyan-600',
        link: '/kontakt',
        order: 3
      },
      {
        _id: 'leistung-wartung',
        _type: 'leistung',
        title: 'Wartung & Service',
        description: 'Deine Ladeinfrastruktur soll lange und zuverlässig funktionieren. Mit meinem Wartungsservice bleibst du immer mobil. Schnelle Hilfe bei Problemen – persönlich und unkompliziert.',
        icon: 'check',
        gradientFrom: 'orange-500',
        gradientTo: 'orange-600',
        link: '/kontakt',
        order: 4
      },
      {
        _id: 'leistung-flotte',
        _type: 'leistung',
        title: 'Flottenmanagement',
        description: 'Speziallösungen für Unternehmen: Von der Bedarfsanalyse über die Installation bis zum laufenden Betrieb. Ich optimiere deine Firmenflotte für maximale Effizienz und minimale Kosten.',
        icon: 'clipboard',
        gradientFrom: 'purple-500',
        gradientTo: 'purple-600',
        link: '/kontakt',
        order: 5
      },
      {
        _id: 'leistung-energieberatung',
        _type: 'leistung',
        title: 'Energieberatung',
        description: 'Nachhaltige Mobilität braucht intelligente Energiekonzepte. Ich zeige dir, wie du Photovoltaik, Speicher und Ladeinfrastruktur optimal kombinierst. Für echte Unabhängigkeit!',
        icon: 'lightning',
        gradientFrom: 'yellow-500',
        gradientTo: 'yellow-600',
        link: '/kontakt',
        order: 6
      }
    ];

    // Site Settings
    const siteSettings = {
      _id: 'site-settings',
      _type: 'siteSettings',
      title: 'Autoladen Altes Land',
      description: 'Dein persönlicher Partner für nachhaltige Mobilität im Alten Land. Faire Beratung, transparente Preise und individuelle Lösungen.',
      phone: '+49 173 1234567',
      email: 'alex@autoladen-altesland.de',
      address: 'Hauptstraße 42, 21720 Steinkirchen',
      openingHours: 'Mo-Fr: 9:00 - 18:00 Uhr, Sa: Nach Vereinbarung',
      facebook: 'https://facebook.com/autoladen-altesland',
      instagram: 'https://instagram.com/autoladen_altesland',
      linkedin: 'https://linkedin.com/in/alexander-philipowsky'
    };

    // Kontakt
    const kontaktDoc = {
      _id: 'kontakt-main',
      _type: 'kontakt',
      title: 'Lass uns sprechen!',
      subtitle: 'Du hast Fragen oder möchtest ein kostenloses Beratungsgespräch? Melde dich einfach bei mir – ich freue mich auf deine Nachricht!',
      phone: '+49 173 1234567',
      email: 'alex@autoladen-altesland.de',
      address: 'Hauptstraße 42, 21720 Steinkirchen',
      openingHours: 'Mo-Fr: 9:00 - 18:00 Uhr\nSa: Nach Vereinbarung',
      formTitle: 'Nachricht senden',
      formNameLabel: 'Dein Name',
      formEmailLabel: 'Deine E-Mail',
      formPhoneLabel: 'Telefon (optional)',
      formMessageLabel: 'Deine Nachricht',
      formSubmitText: 'Nachricht senden',
      formSuccessMessage: 'Vielen Dank für deine Nachricht! Ich melde mich schnellstmöglich bei dir.',
      formErrorMessage: 'Ups, da ist etwas schief gelaufen. Bitte versuche es nochmal oder ruf mich direkt an.'
    };

    // Upload documents
    console.log('Uploading Hero...');
    await client.createOrReplace(heroDoc);

    console.log('Uploading Leistungen...');
    for (const leistung of leistungen) {
      await client.createOrReplace(leistung);
    }

    console.log('Uploading Site Settings...');
    await client.createOrReplace(siteSettings);

    console.log('Uploading Kontakt...');
    await client.createOrReplace(kontaktDoc);

    // About Section
    const aboutDoc = {
      _id: 'about-main',
      _type: 'about',
      title: 'Über Alex',
      subtitle: 'Dein persönlicher Ansprechpartner im Alten Land.',
      introText: 'Ich bin dein Ansprechpartner für Mobilität im Alten Land. Persönlich, kompetent und zuverlässig.',
      timeline: [
        {
          year: '2019',
          title: 'Der Anfang',
          description: 'Start meiner Mission für nachhaltige Mobilität im Alten Land.'
        },
        {
          year: '2020',
          title: 'Erste 100 Kunden',
          description: 'Das Vertrauen meiner ersten Kunden bestätigt meinen Weg.'
        },
        {
          year: '2022',
          title: 'Komplettlösungen',
          description: 'Erweiterung um Photovoltaik und Energieberatung.'
        },
        {
          year: '2024',
          title: 'Über 500 zufriedene Kunden',
          description: 'Dankbar für das Vertrauen und die vielen positiven Rückmeldungen.'
        }
      ],
      quote: 'Ich berate dich ehrlich und transparent. Bei mir gibt es keine versteckten Kosten und keine Überraschungen – nur faire Preise und beste Qualität.',
      phoneButtonText: 'Jetzt anrufen',
      contactButtonText: 'Termin vereinbaren'
    };

    // Stats
    const statsDoc = {
      _id: 'stats-main',
      _type: 'stats',
      title: 'Zahlen & Fakten',
      stats: [
        { value: '500+', label: 'Zufriedene Kunden', order: 1 },
        { value: '2019', label: 'Gegründet', order: 2 },
        { value: '4.9⭐', label: 'Google Bewertung', order: 3 },
        { value: '100%', label: 'Persönlich', order: 4 }
      ]
    };

    // Kundenstimmen
    const kundenstimmenDoc = {
      _id: 'kundenstimmen-main',
      _type: 'kundenstimmen',
      title: 'Das sagen meine Kunden',
      subtitle: 'Über 500 zufriedene Kunden vertrauen auf meine Beratung',
      testimonials: [
        {
          name: 'Familie Schmidt',
          role: 'Privatkunden aus Jork',
          text: 'Alex hat uns von Anfang an super beraten. Die Installation der Wallbox war schnell und sauber. Besonders gut: Er hat uns alle Fördermöglichkeiten erklärt und beim Antrag geholfen!',
          rating: 5,
          order: 1
        },
        {
          name: 'Thomas M.',
          role: 'Geschäftsführer',
          text: 'Endlich mal jemand, der Klartext redet! Keine Verkaufsfloskeln, sondern ehrliche Beratung. Alex hat für unsere Firma die perfekte Lösung gefunden - inklusive Lastmanagement.',
          rating: 5,
          order: 2
        },
        {
          name: 'Sandra K.',
          role: 'Privatkundin',
          text: 'Von der ersten Beratung bis zur fertigen Installation - alles aus einer Hand und das zu einem fairen Preis. Alex ist immer erreichbar und kümmert sich persönlich. Absolute Empfehlung!',
          rating: 5,
          order: 3
        }
      ],
      ctaTitle: 'Überzeuge dich selbst!',
      ctaText: 'Lass uns gemeinsam deine perfekte Mobilitätslösung finden.',
      primaryButtonText: 'Kostenloses Beratungsgespräch',
      secondaryButtonText: 'Weitere Bewertungen auf Google',
      googleReviewLink: 'https://g.page/r/xyz'
    };

    console.log('Uploading About...');
    await client.createOrReplace(aboutDoc);

    console.log('Uploading Stats...');
    await client.createOrReplace(statsDoc);

    console.log('Uploading Kundenstimmen...');
    await client.createOrReplace(kundenstimmenDoc);

    console.log('✅ Content migration completed successfully!');
    console.log('\nUploaded:');
    console.log('- 1 Hero section');
    console.log('- 6 Leistungen (Services)');
    console.log('- 1 Site Settings document');
    console.log('- 1 Kontakt document');
    console.log('- 1 About section');
    console.log('- 1 Stats section');
    console.log('- 1 Kundenstimmen section');

  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  }
}

migrateContent();