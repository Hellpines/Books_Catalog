# Simple Book Catalog

A small vanilla JavaScript web application for searching books via the [Open Library API](https://openlibrary.org/), viewing results as cards, and saving favorites with `localStorage` persistence.

**Live demo:** [https://hellpines.github.io/Books_Catalog/](https://hellpines.github.io/Books_Catalog/)

## Task

Assignment: **[Simple Book Catalog / Простой каталог книг](https://drive.google.com/file/d/1RBRcuH-_oAvtjem5Xs0c4NXZ8I38aYyH/view)**

## How to run the app

### Prerequisites

- Node.js (v18 or newer recommended)
- npm

### Install dependencies

```bash
npm install
```

### Development mode

Start the local dev server with hot reload:

```bash
npm run dev
```

Open the URL shown in the terminal (usually `http://localhost:5173`).

### Production build

Build optimized files into the `dist/` folder:

```bash
npm run build
```

After `npm run build`, the `dist/` folder contains:

- `index.html` — application entry point
- `index.js` — bundled application code (CSS is injected at runtime)
- `assets/` — SVG icons used in the UI

## Tech stack

- HTML, CSS, JavaScript (ES6+)
- Vite — bundler and dev server
- [Open Library API](https://openlibrary.org/developers/api) — book search
- `localStorage` — favorites persistence

## Project structure

```
├── public/
│   └── assets/          # Static SVG icons (copied to dist/assets/)
├── src/
│   ├── api/             # Open Library fetch helpers
│   ├── components/      # UI components (Header, Footer, SearchBar, BookCard, etc.)
│   ├── utils/           # debounce, localStorage helpers
│   ├── main.js          # App entry point and state orchestration
│   └── style.css        # Global layout and theme variables
├── index.html           # HTML shell
├── vite.config.js       # Vite build configuration
└── package.json
```
