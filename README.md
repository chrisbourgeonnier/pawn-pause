# Pawn Pause

> Save the game now. Play again later.

Pawn Pause is a small, mobile-first web app for saving the state of a Monopoly board game while the board is packed away. It helps players record who is playing, how much money each player has, where their pawn is positioned, and which properties they own—so the game can be restored later without trying to remember every detail.

The initial edition is designed around the Vietnamese Foxi **Cờ Tỷ Phú Việt Nam** board. The app is planned to support English and French editions through reusable board-data definitions.

## Why Pawn Pause?

Physical board games can take a long time to finish. When it is time to pack up, keeping the board, money, player positions, and property cards exactly as they are can be inconvenient or impractical.

Pawn Pause is a companion tool—not a replacement for the physical game. It records the state of the game so players can safely pack everything away and continue later.

## MVP features

The first version will allow players to:

- Choose a supported board edition.
- Create one local game with an optional game name.
- Add 2–6 players and enter their names.
- Optionally select a player colour or pawn icon.
- Record each player's money balance.
- Record each player's position on the board.
- Mark whether a player holds a Get Out of Jail Free card.
- Select the current player.
- Assign each purchasable property to the bank or exactly one player.
- View a game summary with player money, positions, and owned-property counts.
- Save changes automatically on the current device.
- Restore the saved game automatically when the app is reopened.
- Reset the locally saved game only after confirmation.

## Important scope limits

Pawn Pause deliberately does **not**:

- Replace the physical board game.
- Simulate turns or enforce board-game rules.
- Roll dice or calculate rent.
- Apply Chance, Community Chest, or similar card effects.
- Manage trades, mortgages, houses, hotels, debts, or loans.
- Require user accounts, a backend, cloud sync, subscriptions, or advertising.

It is an unofficial personal companion project and is not affiliated with, endorsed by, or an official product of Monopoly, Hasbro, Foxi, or any other board-game publisher.

## Technology

This MVP uses only frontend technologies:

- HTML5
- CSS3
- Vanilla JavaScript
- Browser `localStorage`
- Static hosting through GitHub Pages or Netlify

No framework, database, user account, server, or external API is required.

## Project structure

```text
pawn-pause/
├── assets/             # Images, icons, and other static assets
├── css/
│   └── styles.css      # Mobile-first application styles
├── js/
│   ├── app.js          # Application startup and event coordination
│   ├── editions.js     # Fixed board and property data by edition
│   ├── storage.js      # localStorage load, save, and reset helpers
│   └── ui.js           # Rendering and user-interface functions
├── .gitignore
├── index.html          # Main application page
└── README.md
```

## Data and privacy

Pawn Pause is designed to be local-first. The active game state will be stored in the browser using `localStorage`, under a versioned storage key such as:

```js
const STORAGE_KEY = "pawn-pause-game-v1";
```

Game data will remain on the current browser and device. No account is needed, and the MVP will not send game information to a server.

> **Important:** Saved automatically on this device. Your data may be lost if browser or website data is cleared.

Exporting and importing a JSON backup is planned as a future improvement.

## Development plan

1. Set up the repository and starter file structure.
2. Define the versioned game-state model.
3. Verify the Vietnam Foxi board spaces and purchasable items from the supplied board image.
4. Build the mobile-first page layout.
5. Add player setup and player-state tracking.
6. Add property ownership tracking.
7. Implement automatic local saving and restoration.
8. Add the game summary and safe reset control.
9. Test on mobile and desktop browsers.
10. Add basic Progressive Web App configuration after the standard website works.
11. Deploy the app using GitHub Pages over HTTPS.

## Running locally

Because the app uses standard HTML, CSS, and JavaScript, it can be opened directly by opening `index.html` in a browser during early development.

For a more realistic local development environment, use a simple static web server. For example, if Visual Studio Code is installed, the **Live Server** extension can serve the folder locally.

## Deployment

The intended deployment target is GitHub Pages:

1. Push the project to GitHub.
2. In the repository, open **Settings** → **Pages**.
3. Choose the deployment source and branch when the app is ready.
4. GitHub Pages will publish the static site over HTTPS.

## Future ideas

Potential later improvements include:

- Export and import saved games as JSON.
- Multiple named saved games.
- Notes for house rules, loans, trades, or reminders.
- Houses, hotels, and mortgages.
- Offline caching through a service worker.
- Optional backup or sharing features.

These are intentionally outside the initial MVP so the first release stays focused, understandable, and reliable.

## Status

This project is currently in early development.
