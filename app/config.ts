// Active completion time is hidden during play. Faster tiers grant bonuses for the next game.
export const CONFIG = {
  pairCount:18, librarySize:50, availablePairCount:50, rackCapacity:4, initialResources:1, rewardVideoSeconds:3,
  // The full 50-entry production library is dealt.
  // Level 1 introduces the board; later levels progressively conceal more tile faces.
  hiddenTileRatios:[0,.25,.40,.50,.55],
  // Face-down tile backs. Reorder or swap paths to change colors; the same list repeats forever.
  // Each entry is used for `tileBackLevelsPerSet` consecutive levels:
  // 1–10 green, 11–20 purple, 21–30 maroon, 31–40 black, 41–50 navy, 51–60 forest, 61–70 slate, then cycle.
  tileBackLevelsPerSet:10,
  tileBackImages:[
    '/images/tile-backs/tile-back-green.webp',
    '/images/tile-backs/tile-back-purple.webp',
    '/images/tile-backs/tile-back-maroon.webp',
    '/images/tile-backs/tile-back-black.webp',
    '/images/tile-backs/tile-back-navy.webp',
    '/images/tile-backs/tile-back-forest.webp',
    '/images/tile-backs/tile-back-slate.webp',
  ],
  revealHiddenOnPeek:true, peekRevealMinimum:.3,
  streakRewards:{5:{hint:1},8:{shuffle:1}},
  completionRewards:[
    {maxSeconds:150,stars:3,bonus:{hint:1,undo:0,shuffle:1}},
    {maxSeconds:240,stars:2,bonus:{hint:1,undo:0,shuffle:0}},
    {maxSeconds:Infinity,stars:1,bonus:{hint:0,undo:0,shuffle:0}},
  ],
} as const;

export function tileBackSrc(level:number){
  const images=CONFIG.tileBackImages;
  const span=CONFIG.tileBackLevelsPerSet;
  const index=Math.floor((Math.max(1,level)-1)/span)%images.length;
  return images[index];
}
