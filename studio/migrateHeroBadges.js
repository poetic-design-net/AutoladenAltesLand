// Migration script to add trustBadges and floatingCard to Hero document
// Run with: cd studio && node migrateHeroBadges.js

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: 'dgeh1xh8',
  dataset: 'production',
  apiVersion: '2023-12-20',
  useCdn: false
});

async function migrate() {
  const hero = await client.fetch(`*[_type == "hero"][0]`);
  
  if (!hero) {
    console.log('No hero document found. Creating one...');
    
    const newHero = {
      _type: 'hero',
      title: 'Dein Partner für',
      highlightedText: 'faire Mobilität',
      subtitle: 'Ehrliche Beratung, transparente Preise und nachhaltige Lösungen.',
      primaryButtonText: 'Kostenloses Beratungsgespräch',
      primaryButtonLink: '#kontakt',
      secondaryButtonText: 'Meine Leistungen',
      secondaryButtonLink: '#leistungen',
      trustBadges: [
        '500+ zufriedene Kunden',
        '4.9 ⭐ Google Bewertungen',
        'Persönliche Beratung seit 2019'
      ],
      floatingCard: {
        enabled: true,
        title: '24/7',
        subtitle: 'Immer für dich erreichbar'
      }
    };
    
    const result = await client.create(newHero);
    console.log('Hero document created:', result._id);
  } else {
    console.log('Updating existing hero document...');
    
    const updates = {};
    
    if (!hero.trustBadges) {
      updates.trustBadges = [
        '500+ zufriedene Kunden',
        '4.9 ⭐ Google Bewertungen',
        'Persönliche Beratung seit 2019'
      ];
    }
    
    if (!hero.floatingCard) {
      updates.floatingCard = {
        enabled: true,
        title: '24/7',
        subtitle: 'Immer für dich erreichbar'
      };
    }
    
    if (Object.keys(updates).length > 0) {
      const result = await client
        .patch(hero._id)
        .set(updates)
        .commit();
      console.log('Hero document updated:', result._id);
    } else {
      console.log('Hero document already has all fields.');
    }
  }
}

migrate().catch(console.error);