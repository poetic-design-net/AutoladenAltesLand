// Main Application JavaScript
import { getAllPageData, urlFor, iconMap } from './sanity-client.js';

// DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
  // Show loading state
  showLoadingState();
  
  try {
    // Fetch all data from Sanity
    const data = await getAllPageData();
    
    if (data) {
      // Update page with Sanity data
      updateHeroSection(data.hero);
      updateLeistungenSection(data.angebote); // 'angebote' from Sanity are now 'Leistungen'
      updateKontaktInfo(data.kontakt);
      updateSiteSettings(data.siteSettings);
      
      // If we have featured vehicles, add a section for them
      if (data.fahrzeuge && data.fahrzeuge.length > 0) {
        addFahrzeugeSection(data.fahrzeuge);
      }
    }
  } catch (error) {
    console.error('Error loading page data:', error);
    showErrorState();
  } finally {
    hideLoadingState();
  }
  
  // Initialize mobile menu
  initMobileMenu();
});

// Loading states
function showLoadingState() {
  document.body.classList.add('loading');
}

function hideLoadingState() {
  document.body.classList.remove('loading');
}

function showErrorState() {
  console.error('Failed to load content from Sanity');
  // You could show a user-friendly error message here
}

// Update Hero Section
function updateHeroSection(heroData) {
  if (!heroData) return;
  
  const heroTitle = document.querySelector('#home h1');
  const heroSubtitle = document.querySelector('#home p');
  const primaryButton = document.querySelector('#home a[href="#leistungen"]');
  const secondaryButton = document.querySelector('#home a[href="kontakt.html"]');
  const heroImage = document.querySelector('#home img');
  
  if (heroTitle && heroData.title) {
    const titleParts = heroData.title.split(heroData.highlightedText);
    heroTitle.innerHTML = `
      ${titleParts[0]}
      <span class="text-transparent bg-clip-text bg-gradient-to-r from-primary to-cyan-600 animate-gradient">
        ${heroData.highlightedText}
      </span>
      ${titleParts[1] || ''}
    `;
  }
  
  if (heroSubtitle && heroData.subtitle) {
    heroSubtitle.textContent = heroData.subtitle;
  }
  
  if (primaryButton) {
    if (heroData.primaryButtonText) primaryButton.textContent = heroData.primaryButtonText;
    if (heroData.primaryButtonLink) primaryButton.href = heroData.primaryButtonLink;
  }
  
  if (secondaryButton) {
    if (heroData.secondaryButtonText) secondaryButton.textContent = heroData.secondaryButtonText;
    if (heroData.secondaryButtonLink) secondaryButton.href = heroData.secondaryButtonLink;
  }
  
  if (heroImage && heroData.imageUrl) {
    heroImage.src = heroData.imageUrl;
    if (heroData.imageAlt) heroImage.alt = heroData.imageAlt;
  }
}

// Update Leistungen Section (Services)
function updateLeistungenSection(leistungen) {
  if (!leistungen || leistungen.length === 0) return;
  
  const container = document.querySelector('#leistungen .grid');
  if (!container) return;
  
  // Clear existing content
  container.innerHTML = '';
  
  // Add leistungen from Sanity
  leistungen.forEach(leistung => {
    const card = createLeistungCard(leistung);
    container.appendChild(card);
  });
}

// Create Leistung Card (Service Card)
function createLeistungCard(leistung) {
  const article = document.createElement('article');
  article.className = 'bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300 group';
  
  const iconPath = iconMap[leistung.icon] || iconMap.check;
  
  article.innerHTML = `
    <div class="h-48 bg-gradient-to-br from-${leistung.gradientFrom} to-${leistung.gradientTo} flex items-center justify-center relative overflow-hidden">
      <div class="absolute inset-0 bg-white/10 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
      <svg class="w-20 h-20 text-white relative z-10 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="${iconPath}"></path>
      </svg>
    </div>
    <div class="p-6">
      <h3 class="text-xl font-semibold mb-3 text-gray-900">${leistung.title}</h3>
      <p class="text-gray-600 mb-4 leading-relaxed">${leistung.description}</p>
      ${leistung.link ? `
        <a href="${leistung.link}" class="text-primary font-medium hover:text-blue-700 inline-flex items-center group/link transition-colors duration-200">
          Mehr erfahren 
          <span class="ml-1 transform group-hover/link:translate-x-1 transition-transform duration-200">→</span>
        </a>
      ` : ''}
    </div>
  `;
  
  return article;
}

// Update Kontakt Information
function updateKontaktInfo(kontakt) {
  if (!kontakt) return;
  
  // Update footer contact info
  const footerKontakt = document.querySelector('footer div:nth-child(3) ul');
  if (footerKontakt) {
    footerKontakt.innerHTML = `
      <li>${kontakt.strasse}</li>
      <li>${kontakt.plz} ${kontakt.ort}</li>
      <li>Tel: ${kontakt.telefon}</li>
      <li>${kontakt.email}</li>
    `;
  }
  
  // Update footer opening hours
  if (kontakt.oeffnungszeiten) {
    const footerHours = document.querySelector('footer div:nth-child(4) ul');
    if (footerHours) {
      footerHours.innerHTML = kontakt.oeffnungszeiten.map(zeit => 
        `<li>${zeit.tag}: ${zeit.zeit}</li>`
      ).join('');
    }
  }
}

// Update Site Settings
function updateSiteSettings(settings) {
  if (!settings) return;
  
  // Update page title
  if (settings.title) {
    document.title = settings.title;
  }
  
  // Update meta description
  if (settings.description) {
    let metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.content = settings.description;
    }
  }
  
  // Update meta keywords
  if (settings.keywords && settings.keywords.length > 0) {
    let metaKeywords = document.querySelector('meta[name="keywords"]');
    if (metaKeywords) {
      metaKeywords.content = settings.keywords.join(', ');
    }
  }
  
  // Update navigation if provided
  if (settings.navigation && settings.navigation.length > 0) {
    updateNavigation(settings.navigation);
  }
  
  // Update footer text
  if (settings.footerText) {
    const footerDesc = document.querySelector('footer p.text-gray-400');
    if (footerDesc) {
      footerDesc.textContent = settings.footerText;
    }
  }
  
  // Update colors if provided
  if (settings.primaryColor) {
    document.documentElement.style.setProperty('--color-primary', settings.primaryColor);
  }
}

// Update Navigation
function updateNavigation(navItems) {
  const desktopNav = document.querySelector('.hidden.md\\:flex');
  const mobileNav = document.querySelector('#mobile-menu .space-y-1');
  
  if (desktopNav) {
    desktopNav.innerHTML = navItems.map(item => `
      <a href="${item.link}" class="text-gray-700 hover:text-primary transition-all duration-200 relative group" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
        ${item.title}
        <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-200 group-hover:w-full"></span>
      </a>
    `).join('');
  }
  
  if (mobileNav) {
    mobileNav.innerHTML = navItems.map(item => `
      <a href="${item.link}" class="block px-3 py-2 text-gray-700 hover:text-primary" ${item.external ? 'target="_blank" rel="noopener noreferrer"' : ''}>
        ${item.title}
      </a>
    `).join('');
  }
}

// Add Fahrzeuge Section (Featured Vehicles)
function addFahrzeugeSection(fahrzeuge) {
  const leistungenSection = document.querySelector('#leistungen');
  if (!leistungenSection) return;
  
  const fahrzeugeSection = document.createElement('section');
  fahrzeugeSection.id = 'fahrzeuge';
  fahrzeugeSection.className = 'py-24 bg-white';
  
  fahrzeugeSection.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Unsere Highlight-Fahrzeuge</h2>
        <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed opacity-90">
          Entdecken Sie unsere aktuellen Top-Angebote an Elektrofahrzeugen
        </p>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        ${fahrzeuge.map(fahrzeug => createFahrzeugCard(fahrzeug)).join('')}
      </div>
    </div>
  `;
  
  // Insert after leistungen section
  leistungenSection.parentNode.insertBefore(fahrzeugeSection, leistungenSection.nextSibling);
}

// Create Fahrzeug Card
function createFahrzeugCard(fahrzeug) {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'EUR',
      minimumFractionDigits: 0
    }).format(price);
  };
  
  return `
    <article class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transform transition-all duration-300">
      ${fahrzeug.hauptbild ? `
        <div class="h-48 overflow-hidden">
          <img src="${fahrzeug.hauptbild}" alt="${fahrzeug.hauptbildAlt || fahrzeug.marke + ' ' + fahrzeug.modell}" 
               class="w-full h-full object-cover hover:scale-105 transition-transform duration-500">
        </div>
      ` : ''}
      <div class="p-6">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-xl font-semibold text-gray-900">${fahrzeug.marke} ${fahrzeug.modell}</h3>
          ${fahrzeug.zustand ? `
            <span class="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded">
              ${fahrzeug.zustand === 'neu' ? 'Neu' : fahrzeug.zustand === 'vorfuehrwagen' ? 'Vorführwagen' : 'Gebraucht'}
            </span>
          ` : ''}
        </div>
        <p class="text-2xl font-bold text-primary mb-4">${formatPrice(fahrzeug.preis)}</p>
        <div class="space-y-2 text-sm text-gray-600">
          ${fahrzeug.reichweite ? `<p>🔋 Reichweite: ${fahrzeug.reichweite} km</p>` : ''}
          ${fahrzeug.leistung ? `<p>⚡ Leistung: ${fahrzeug.leistung} kW</p>` : ''}
          ${fahrzeug.ladezeit ? `<p>⏱️ Schnellladen: ${fahrzeug.ladezeit}</p>` : ''}
        </div>
        ${fahrzeug.beschreibung ? `
          <p class="mt-4 text-gray-600 text-sm line-clamp-2">${fahrzeug.beschreibung}</p>
        ` : ''}
        <a href="kontakt.html" class="mt-4 inline-block text-primary font-medium hover:text-blue-700">
          Mehr erfahren →
        </a>
      </div>
    </article>
  `;
}

// Initialize Mobile Menu
function initMobileMenu() {
  const mobileMenuButton = document.getElementById('mobile-menu-button');
  const mobileMenu = document.getElementById('mobile-menu');
  
  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener('click', () => {
      const isOpen = !mobileMenu.classList.contains('hidden');
      mobileMenu.classList.toggle('hidden');
      mobileMenuButton.setAttribute('aria-expanded', !isOpen);
    });
    
    // Close mobile menu when clicking links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
      });
    });
  }
}