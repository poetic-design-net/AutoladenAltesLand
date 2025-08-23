import {createClient} from '@sanity/client'
import dotenv from 'dotenv'

// Load environment variables
dotenv.config()

// Check if token is provided
if (!process.env.SANITY_TOKEN) {
  console.log('⚠️  No SANITY_TOKEN found in environment variables.')
  console.log('To add content to Sanity, you need to:')
  console.log('1. Go to https://www.sanity.io/manage/project/dgeh1xh8/api#tokens')
  console.log('2. Create a new token with "Editor" permissions')
  console.log('3. Create a .env file in the studio folder and add:')
  console.log('   SANITY_TOKEN=your_token_here')
  console.log('')
  console.log('For CORS settings:')
  console.log('1. Go to https://www.sanity.io/manage/project/dgeh1xh8/api#cors')
  console.log('2. Add these origins:')
  console.log('   - http://localhost:8080')
  console.log('   - https://autoladen-altes-land.vercel.app')
  console.log('   - https://*.vercel.app (for preview deployments)')
  console.log('3. Enable "Allow credentials"')
  process.exit(1)
}

// Sanity client configuration
const client = createClient({
  projectId: 'dgeh1xh8',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false
})

// Sample data for initial setup
const sampleData = {
  hero: {
    _type: 'hero',
    _id: 'hero-main',
    title: 'Fahren Sie in die',
    highlightedText: 'Zukunft',
    subtitle: 'Entdecken Sie unsere große Auswahl an Elektrofahrzeugen und profitieren Sie von unserer Expertise in der E-Mobilität. Nachhaltig, effizient und zukunftsorientiert.',
    primaryButtonText: 'Fahrzeuge entdecken',
    primaryButtonLink: '#fahrzeuge',
    secondaryButtonText: 'Beratung anfordern',
    secondaryButtonLink: '/kontakt.html',
    image: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-placeholder' // Will need actual image upload
      },
      alt: 'Modernes Elektroauto'
    }
  },

  leistungen: [
    {
      _type: 'angebot',
      _id: 'leistung-1',
      title: 'Fahrzeugverkauf',
      description: 'Große Auswahl an neuen und gebrauchten Elektrofahrzeugen aller führenden Marken.',
      icon: 'check',
      gradientFrom: 'blue-500',
      gradientTo: 'blue-600',
      link: '#fahrzeuge',
      order: 1
    },
    {
      _type: 'angebot',
      _id: 'leistung-2',
      title: 'Ladeinfrastruktur',
      description: 'Installation von Wallboxen und Ladestationen für Ihr Zuhause oder Unternehmen.',
      icon: 'lightning',
      gradientFrom: 'cyan-500',
      gradientTo: 'cyan-600',
      link: '#ladeinfrastruktur',
      order: 2
    },
    {
      _type: 'angebot',
      _id: 'leistung-3',
      title: 'Beratung',
      description: 'Individuelle Beratung zu Fördermöglichkeiten, Steuervorteilen und Finanzierung.',
      icon: 'users',
      gradientFrom: 'orange-500',
      gradientTo: 'orange-600',
      link: '/kontakt.html',
      order: 3
    },
    {
      _type: 'angebot',
      _id: 'leistung-4',
      title: 'Finanzierung & Leasing',
      description: 'Attraktive Finanzierungs- und Leasingmodelle für Privat- und Geschäftskunden.',
      icon: 'euro',
      gradientFrom: 'green-500',
      gradientTo: 'green-600',
      link: '#finanzierung',
      order: 4
    },
    {
      _type: 'angebot',
      _id: 'leistung-5',
      title: 'Service & Wartung',
      description: 'Professioneller Service und Wartung für alle Elektrofahrzeuge in unserer Fachwerkstatt.',
      icon: 'settings',
      gradientFrom: 'purple-500',
      gradientTo: 'purple-600',
      link: '#service',
      order: 5
    },
    {
      _type: 'angebot',
      _id: 'leistung-6',
      title: 'Probefahrten',
      description: 'Testen Sie Ihr Wunschfahrzeug ausgiebig bei einer unverbindlichen Probefahrt.',
      icon: 'clipboard',
      gradientFrom: 'pink-500',
      gradientTo: 'pink-600',
      link: '/kontakt.html',
      order: 6
    }
  ],

  fahrzeuge: [
    {
      _type: 'fahrzeug',
      _id: 'fahrzeug-1',
      marke: 'Tesla',
      modell: 'Model 3',
      jahr: 2024,
      preis: 42900,
      reichweite: 513,
      ladezeit: '27 Min auf 80%',
      leistung: 325,
      batterie: 60,
      zustand: 'neu',
      verfuegbar: true,
      highlight: true,
      beschreibung: 'Das meistverkaufte Elektroauto Europas mit herausragender Reichweite und Supercharger-Zugang.',
      ausstattung: ['Autopilot', 'Premium-Soundsystem', 'Glasdach', 'Wärmepumpe']
    },
    {
      _type: 'fahrzeug',
      _id: 'fahrzeug-2',
      marke: 'Volkswagen',
      modell: 'ID.4',
      jahr: 2024,
      preis: 39990,
      reichweite: 521,
      ladezeit: '30 Min auf 80%',
      leistung: 204,
      batterie: 77,
      zustand: 'neu',
      verfuegbar: true,
      highlight: true,
      beschreibung: 'Der perfekte Familien-SUV mit viel Platz und modernster Technik.',
      ausstattung: ['Head-Up Display', 'Travel Assist', 'Klimaautomatik', 'LED-Matrix-Licht']
    },
    {
      _type: 'fahrzeug',
      _id: 'fahrzeug-3',
      marke: 'BMW',
      modell: 'iX3',
      jahr: 2023,
      preis: 55900,
      reichweite: 461,
      ladezeit: '32 Min auf 80%',
      leistung: 286,
      batterie: 80,
      zustand: 'vorfuehrwagen',
      verfuegbar: true,
      highlight: true,
      beschreibung: 'Premium-SUV mit typischer BMW-Qualität und sportlicher Performance.',
      ausstattung: ['Driving Assistant Professional', 'Harman Kardon', 'Adaptives Fahrwerk', 'Panoramadach']
    }
  ],

  kontakt: {
    _type: 'kontakt',
    _id: 'kontakt-main',
    firmenname: 'Autoladen Altes Land',
    strasse: 'Hauptstraße 123',
    plz: '21635',
    ort: 'Jork',
    telefon: '+49 (0) 4162 123456',
    telefonService: '+49 (0) 4162 123457',
    email: 'info@autoladen-altesland.de',
    emailService: 'service@autoladen-altesland.de',
    oeffnungszeiten: [
      {tag: 'Mo-Fr', zeit: '9:00 - 18:00 Uhr'},
      {tag: 'Sa', zeit: '9:00 - 14:00 Uhr'},
      {tag: 'So', zeit: 'Geschlossen'}
    ]
  },

  siteSettings: {
    _type: 'siteSettings',
    _id: 'settings-main',
    title: 'Autoladen Altes Land - Ihr Partner für Elektromobilität',
    description: 'Ihr Partner für Elektromobilität im Alten Land. Elektrofahrzeuge, Ladeinfrastruktur, Beratung und Service.',
    keywords: ['Elektroauto', 'E-Mobilität', 'Ladestation', 'Wallbox', 'Altes Land', 'Jork', 'Tesla', 'VW ID', 'BMW i'],
    primaryColor: '#1e40af',
    secondaryColor: '#f97316',
    footerText: 'Ihr Partner für nachhaltige Mobilität in der Region Altes Land.',
    navigation: [
      {title: 'Home', link: '#home', external: false},
      {title: 'Leistungen', link: '#leistungen', external: false},
      {title: 'Fahrzeuge', link: '#fahrzeuge', external: false},
      {title: 'Kontakt', link: '/kontakt.html', external: false}
    ]
  }
}

// Function to create all sample data
async function setupSanityContent() {
  try {
    console.log('Creating Hero content...')
    await client.createOrReplace(sampleData.hero)
    
    console.log('Creating Leistungen (Services)...')
    for (const leistung of sampleData.leistungen) {
      await client.createOrReplace(leistung)
    }
    
    console.log('Creating Fahrzeuge (Vehicle offers)...')
    for (const fahrzeug of sampleData.fahrzeuge) {
      await client.createOrReplace(fahrzeug)
    }
    
    console.log('Creating Kontakt...')
    await client.createOrReplace(sampleData.kontakt)
    
    console.log('Creating Site Settings...')
    await client.createOrReplace(sampleData.siteSettings)
    
    console.log('✅ All sample content created successfully!')
    console.log('Visit your Sanity Studio to see and edit the content.')
    
  } catch (error) {
    console.error('Error creating content:', error)
  }
}

// Run the setup
setupSanityContent()