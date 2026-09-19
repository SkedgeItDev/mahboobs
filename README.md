# Mah Boobs
Mobile-first React/TypeScript matching game. No accounts, payments, backend data, or real ad network.

## Put it on your phone
On the live site (https://mahboobs.netlify.app) you can add Mah Boobs to your home screen so it opens like a phone app (full screen, no browser bar). The adults-only check still appears the first time.

- **iPhone or iPad:** Open the site in Safari → tap the Share button → Add to Home Screen → Add.
- **Android:** Open the site in Chrome → tap the ⋮ menu → Install app or Add to Home screen.

- `app/config.ts`: completion reward tiers, pair/library counts, rack capacity, starting resources, streak rewards and speed thresholds.
- `app/engine.ts`: pure board rules and state transitions. Deals assign pairs along a legal removal sequence, guaranteeing a route to completion. Shuffle prioritizes rack complements then assigns complete pairs along a fresh legal sequence.
- `app/Game.tsx`: presentation, local preferences/high score, hidden active-time tracking, and simulated rewarded-video adapter. BannerAd is the reserved banner interface. First visit shows an adults-only age gate; acceptance is stored as `mah-age-ok`.
- `public/images/pairs/`: 50 original production pair sets (generated replacements for copied placeholders). Gameplay references come from the central manifest in engine.ts. Reveal dimensions are 1200×768; A/B halves are 600×768 vertical crops.

A full rack permits only matching board-half selections. This lets Shuffle recover without changing the rack or expanding its capacity. Undo restores the most recently collected unmatched tile, retaining its original coordinates and key, even after shuffle.

Streaks reset on collecting a second unmatched half; selecting the first half of the next pair preserves the current streak. Completion time counts active play, excluding paused overlays. Local best time is the shortest active completion time, using a new storage key so old countdown scores cannot be misinterpreted. There is no time limit or time-based loss. Clear within 240 seconds for +1 Hint next game; within 150 seconds for +1 Hint and +1 Shuffle next game. Bonuses are applied by the completion screen’s New Game button.

The default three-layer geometry has 36 positions. Change `geometry()` alongside pairCount if designing a different tile count/layout. No artwork or advertising provider is contacted.

Optional WebMCP tools expose game read, tile selection, and reveal continuation in supported browsers.

Tile faces stay at full brightness. Gold borders identify playable tiles. Pointer gestures on uncovered tiles temporarily translate them in any direction, with pointer capture and touch slop to distinguish a tap from a drag. Releasing/cancelling snaps back and suppresses collection. Peeks never change board coordinates or freedom rules. Covered tiles remain unselectable while a tile is displaced. Arrow keys provide a keyboard peek.

The game uses a fixed dynamic-viewport grid (100dvh) with safe-area padding. Controls stay visible; a ResizeObserver fits the board into its remaining row and shares the calculated tile size with the rack. The game surface does not scroll. Help/reveal overlays retain their own scrolling when needed. A compact two-column layout handles short landscape screens.

Levels progress via Next Level on completion. The current level is stored locally; Retry Level preserves it. Level 1 is face-up; subsequent levels conceal 25%, 40%, 50%, then 55% of the initial tiles, capped by nonplayable candidates. Every tile turns permanently face-up once playable. Concealment does not change pair identities, geometry, or solvability. During a peek, hidden artwork appears only when all covering layers are sufficiently displaced; releasing restores its back. Ratios and reveal behavior live in config.ts. Best times are now recorded per level, and completion bonuses carry to the next level.

Inspection now remembers exactly one concealed tile. Touch an uncovered hidden tile, or drag its covering tile aside, to inspect it. It stays face-up after release until another tile is pressed. The previously inspected concealed face rotates back with a 240ms 3D flip. Playable/initially visible faces remain visible. Inspection resets on shuffle, undo, retry and level change; it does not change hidden flags or board rules. Reduced-motion preferences disable the flip transition.

Artwork export specification: full reveal 1200×768 pixels, A left and B right halves 600×768 pixels. Tile fronts now use the entire portrait image with no number/A/B footer strip. Pair identities remain in accessible button labels and the reveal screen, and filenames/manifest paths are unchanged.

Pairs 01–50 are original generated production artwork (replacements for copied placeholders and numbered cards). The private source files used to produce them are not included in the project or deployment.

The deal pool is the full 50-entry library (`availablePairCount: 50`). A tap/click on a nonplayable board tile leaves state unchanged, raises it visually, shakes it for 500ms, and announces that it is not yet playable. A drag peek suppresses this tap feedback.
