# Sohail & Shahima — Wedding Invitation

A responsive, interactive wedding invitation built with React + Vite.

## 1. Create the project from the terminal

If starting from scratch instead of using this source bundle:

```bash
npm create vite@latest wedding-invitation -- --template react
cd wedding-invitation
npm install
npm install framer-motion lucide-react
```

Replace the generated `src` directory and root `index.html` with the files in this project, then run:

```bash
npm run dev
```

## 2. Run this downloaded project

```bash
cd wedding-invitation-vite
npm install
npm run dev
```

Open the local URL printed by Vite (normally http://localhost:5173).

## 3. Add your assets

Copy your own images into `public/assets/` and update `src/data/weddingData.js`.

Expected suggested filenames (rename your files or change the config paths):

```text
public/
  assets/
    envelope-paper.webp
    envelope-flap.webp
    wax-seal.webp
    hero-background.webp
    couple-portrait.webp
    flower-petal.svg
    floral-corner.svg
    wedding-music.mp3
```

The app has CSS-based fallbacks when optional images are absent. For the most faithful recreation, use your own envelope, seal, hero, portrait and decoration assets.

## 4. Customize content

Edit `src/data/weddingData.js` for:
- Couple names and wedding date
- Event schedule
- Venue and Google Maps URL
- Family acknowledgements
- English and Hindi copy
- Asset paths and music path

The countdown uses the date configured in `weddingData.js`. Set the correct local timezone offset if the event is not in India.

## 5. Production build

```bash
npm run build
npm run preview
```

## Notes

- Music starts only after the visitor presses the music control or opens the invitation; browsers may still block playback.
- Replace the sample venue/map URL with a verified destination.
- Check the mobile layout and reduced-motion behavior before publishing.
