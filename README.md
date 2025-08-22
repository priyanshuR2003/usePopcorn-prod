# usePopcorn

Small React app I built while practicing custom hooks and state management. It lets you search movies (OMDb API), peek at details, rate them with a reusable star component, and keep a personal watched list persisted in `localStorage`.

I purposely kept the styling simple so the focus stays on component structure, data flow, and a few handy abstractions.

## Why I built it
- Wanted a realistic playground for writing and re‑using custom hooks (`useMovies`, `useLocalStorageState`, `useKey`).
- Practice handling loading / error / empty states cleanly.

## Core features
- Live search against OMDb (debounce kept minimal – instant fetch per keystroke with abort to cancel stale requests).
- Detail view with dynamic document title + ESC to close (keyboard UX via `useKey`).
- Add or update a movie in the watched list (idempotent: re‑adding replaces prior rating).
- Per‑movie personal rating using keyboard/mouse friendly stars (supports variable max rating & size).
- Watched summary: count, average IMDb rating, average my rating, average runtime.
- State persisted across refresh using a generic localStorage hook.

## Tech stack
- React 18 (Create React App baseline).
- No external UI libs; just a few small components.
- OMDb REST API for data.

## Project structure (trimmed)
```
src/
	App.js                // Top-level state orchestration
	StarRating.js         // Reusable rating widget
	components/
		UI.js               // Generic UI building blocks
		MovieList.js        // Search result list
		MovieDetails.js     // Detail panel + add logic
		Watched.js          // Watched summary & list
	hooks/
		useMovies.js        // Fetch + abort + error handling
		useLocalStorageState.js // Persist any piece of state
		useKey.js           // Declarative keyboard shortcut
	utils.js              // Small helpers (average)
```

## Running it locally
1. Clone / download the repo.
2. Install deps:
	 ```bash
	 npm install
	 ```
3. Start dev server:
	 ```bash
	 npm start
	 ```
4. Visit: http://localhost:3000

### API key
The code currently inlines a demo OMDb key (`11e786c1`). Replace with your own for heavier usage: https://www.omdbapi.com/apikey.aspx

To keep keys out of source, you could switch to an env var:
```js
const KEY = process.env.REACT_APP_OMDB_KEY;
```
Then create a `.env` with `REACT_APP_OMDB_KEY=your_key` (CRA auto loads variables prefixed with `REACT_APP_`).




