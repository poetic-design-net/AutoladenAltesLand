import { createClient } from '@sanity/client';
import dotenv from 'dotenv';

dotenv.config();

const client = createClient({
  projectId: 'dgeh1xh8',
  dataset: 'production',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
  apiVersion: '2023-12-31'
});

async function updateContent() {
  console.log('Updating Sanity content...');

  // Update Leistungen
  const leistungen = [
    {
      _id: 'leistung-1',
      _type: 'leistung',
      title: 'E-Auto Beratung',
      description: 'Ich nehme mir Zeit für dich! Gemeinsam finden wir das perfekte E-Auto für deine Bedürfnisse. Ehrlich, transparent und ohne Verkaufsdruck.',
      icon: 'users',
      gradientFrom: 'blue-500',
      gradientTo: 'blue-600',
    },
    {
      _id: 'leistung-2',
      _type: 'leistung',
      title: 'Wallbox Installation',
      description: 'Von der Beratung bis zur fertigen Installation - alles aus einer Hand. Ich arbeite mit lokalen Elektrikern zusammen, die ich persönlich kenne.',
      icon: 'lightning',
      gradientFrom: 'cyan-500',
      gradientTo: 'cyan-600',
    },
    {
      _id: 'leistung-3',
      _type: 'leistung',
      title: 'Förderung & Finanzierung',
      description: 'Ich kenne alle Fördertöpfe und helfe dir beim Papierkram. Auch bei der Finanzierung habe ich die besten Konditionen für dich.',
      icon: 'euro',
      gradientFrom: 'green-500',
      gradientTo: 'green-600',
    },
    {
      _id: 'leistung-4',
      _type: 'leistung',
      title: 'Service & Wartung',
      description: 'Auch nach dem Kauf bin ich für dich da. Egal ob Software-Update, Reifenwechsel oder kleine Reparaturen - du erreichst mich immer.',
      icon: 'settings',
      gradientFrom: 'purple-500',
      gradientTo: 'purple-600',
    },
    {
      _id: 'leistung-5',
      _type: 'leistung',
      title: 'Probefahrten',
      description: 'Nimm dir die Zeit, die du brauchst! Teste dein Wunschauto ausgiebig - auch übers Wochenende. Ich erkläre dir alles in Ruhe.',
      icon: 'clipboard',
      gradientFrom: 'orange-500',
      gradientTo: 'orange-600',
    },
    {
      _id: 'leistung-6',
      _type: 'leistung',
      title: 'Gebrauchtwagen Check',
      description: 'Du willst ein gebrauchtes E-Auto? Ich checke es für dich durch - Batterie, Historie, alles. Damit du sicher kaufst.',
      icon: 'check',
      gradientFrom: 'pink-500',
      gradientTo: 'pink-600',
    }
  ];

  // Update Fahrzeuge
  const fahrzeuge = [
    {
      _id: 'fahrzeug-1',
      _type: 'fahrzeug',
      marke: 'Tesla',
      modell: 'Model 3',
      preis: 42900,
      reichweite: 491,
      batterie: 60,
      features: ['Autopilot', 'Supercharger-Zugang', 'Premium Audio', 'Glasdach'],
      imageUrl: 'https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&h=600&fit=crop&q=80',
      status: 'verfügbar'
    },
    {
      _id: 'fahrzeug-2',
      _type: 'fahrzeug',
      marke: 'VW',
      modell: 'ID.4',
      preis: 39990,
      reichweite: 520,
      batterie: 77,
      features: ['Augmented Reality HUD', 'Travel Assist', 'Wärmepumpe', 'Anhängerkupplung'],
      imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?w=800&h=600&fit=crop&q=80',
      status: 'verfügbar'
    },
    {
      _id: 'fahrzeug-3',
      _type: 'fahrzeug',
      marke: 'Hyundai',
      modell: 'IONIQ 5',
      preis: 43900,
      reichweite: 507,
      batterie: 72,
      features: ['800V Schnellladen', 'Vehicle-to-Load', 'Relaxation Sitze', 'Solar-Dach'],
      imageUrl: 'https://images.unsplash.com/photo-1619551734325-81aaf323686c?w=800&h=600&fit=crop&q=80',
      status: 'bestellt'
    }
  ];

  // Update Kundenstimmen  
  const kundenstimmen = [
    {
      _id: 'kunde-1',
      _type: 'kundenstimme',
      name: 'Familie Hansen',
      ort: 'Steinkirchen',
      text: 'Alex hat sich richtig Zeit genommen! Nach drei Probefahrten hatten wir unser Traumauto. Auch die Wallbox-Installation lief perfekt.',
      rating: 5,
      fahrzeug: 'VW ID.4'
    },
    {
      _id: 'kunde-2',
      _type: 'kundenstimme',
      name: 'Peter Müller',
      ort: 'Jork',
      text: 'Endlich mal jemand, der ehrlich berät! Alex hat mir sogar von einem Auto abgeraten, weil es nicht zu mir passt. Das nenne ich Service!',
      rating: 5,
      fahrzeug: 'Tesla Model 3'
    },
    {
      _id: 'kunde-3',
      _type: 'kundenstimme',
      name: 'Sarah Schmidt',
      ort: 'Buxtehude',
      text: 'Von der ersten WhatsApp bis zur Übergabe - alles super unkompliziert. Alex ist immer erreichbar und hilft auch nach dem Kauf.',
      rating: 5,
      fahrzeug: 'Hyundai IONIQ 5'
    }
  ];

  try {
    // Create or replace documents
    for (const leistung of leistungen) {
      await client.createOrReplace(leistung);
      console.log(`✅ Created/Updated Leistung: ${leistung.title}`);
    }

    for (const fahrzeug of fahrzeuge) {
      await client.createOrReplace(fahrzeug);
      console.log(`✅ Created/Updated Fahrzeug: ${fahrzeug.marke} ${fahrzeug.modell}`);
    }

    for (const kunde of kundenstimmen) {
      await client.createOrReplace(kunde);
      console.log(`✅ Created/Updated Kundenstimme: ${kunde.name}`);
    }

    console.log('\n✨ All content updated successfully!');
  } catch (error) {
    console.error('Error updating content:', error);
  }
}

updateContent();