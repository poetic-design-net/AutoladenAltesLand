# Autoladen Altes Land - Setup Instructions

## 🚀 Quick Setup

### 1. Configure Sanity CORS Settings

Go to: https://www.sanity.io/manage/project/dgeh1xh8/api#cors

Add these origins:
- `http://localhost:8080` (for local development)
- `https://autoladen-altes-land.vercel.app` (main domain)
- `https://*.vercel.app` (for preview deployments)

Enable "Allow credentials" ✅

### 2. Create Sanity API Token

Go to: https://www.sanity.io/manage/project/dgeh1xh8/api#tokens

1. Click "Add API token"
2. Name: "Content Editor"
3. Permissions: "Editor"
4. Click "Save"
5. Copy the token (you'll only see it once!)

### 3. Add Sample Content to Sanity

1. Navigate to the studio folder:
   ```bash
   cd studio
   ```

2. Create a `.env` file:
   ```bash
   echo "SANITY_TOKEN=your_token_here" > .env
   ```
   Replace `your_token_here` with the token from step 2

3. Run the setup script:
   ```bash
   node setupSanity.js
   ```

This will create:
- Hero section with company messaging
- 6 Leistungen (Services): Fahrzeugverkauf, Ladeinfrastruktur, Beratung, etc.
- 3 Featured Fahrzeuge (Vehicles): Tesla Model 3, VW ID.4, BMW iX3
- Contact information
- Site settings

### 4. Verify on Live Site

Your content should now appear at:
https://autoladen-altes-land.vercel.app

## 📝 Content Structure

### Leistungen (Services)
The services offered by the dealership:
- Fahrzeugverkauf (Vehicle Sales)
- Ladeinfrastruktur (Charging Infrastructure)
- Beratung (Consultation)
- Finanzierung & Leasing (Financing & Leasing)
- Service & Wartung (Service & Maintenance)
- Probefahrten (Test Drives)

### Fahrzeuge (Vehicles)
Actual vehicle offers with:
- Make, model, year
- Price and availability
- Technical specifications
- Battery and range details

## 🛠️ Local Development

1. Start the dev server:
   ```bash
   npm run dev
   ```

2. Build CSS (in another terminal):
   ```bash
   npm run build-css
   ```

3. Access at: http://localhost:8080

## 📦 Deployment

Commits to main branch auto-deploy to Vercel.

For manual deployment:
```bash
vercel --prod
```

## 🔧 Troubleshooting

### No content showing?
1. Check CORS settings in Sanity
2. Verify API token has Editor permissions
3. Run the setup script to add content
4. Check browser console for errors

### Build errors?
1. Run `npm install` in both root and studio folders
2. Ensure Node.js version is 18+

## 📞 Support

For issues with:
- Sanity CMS: https://www.sanity.io/contact/support
- Vercel: https://vercel.com/support