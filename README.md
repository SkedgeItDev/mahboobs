# Mah Boobs
Mobile-first React/TypeScript matching game. No accounts, payments, backend data, or real ad network.

- `app/config.ts`: timer, pair/library counts, rack capacity, starting resources, streak rewards and star thresholds.
- `app/engine.ts`: pure board rules and state transitions. Deals assign pairs along a legal removal sequence, guaranteeing a route to completion. Shuffle prioritizes rack complements then assigns complete pairs along a fresh legal sequence.
- `app/Game.tsx`: presentation, local preferences/high score, timer, and simulated rewarded-video adapter. BannerAd is the reserved banner interface.
- `public/images/pairs/`: 50 neutral numbered placeholder sets. Replace the 150 WebP files at the same paths; gameplay references come from the central manifest in engine.ts. Reveal dimensions are 1200×600; A/B halves are 600×600 vertical crops.

A full rack permits only matching board-half selections. This lets Shuffle recover without changing the rack or expanding its capacity. Undo restores the most recently collected unmatched tile, retaining its original coordinates and key, even after shuffle.

Streaks reset on collecting a second unmatched half; selecting the first half of the next pair preserves the current streak. Completion time counts active play, excluding paused overlays. Local high score is the greatest remaining time on a completed game.

The default three-layer geometry has 36 positions. Change `geometry()` alongside pairCount if designing a different tile count/layout. No artwork or advertising provider is contacted.

Optional WebMCP tools expose game read, tile selection, and reveal continuation in supported browsers.
