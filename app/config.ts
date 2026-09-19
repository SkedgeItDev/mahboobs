// Active completion time is hidden during play. Faster tiers grant bonuses for the next game.
export const CONFIG = {
  pairCount:18, librarySize:50, availablePairCount:50, rackCapacity:4, initialResources:1, rewardVideoSeconds:3,
  // The full 50-entry production library is dealt.
  // Level 1 introduces the board; later levels progressively conceal more tile faces.
  hiddenTileRatios:[0,.25,.40,.50,.55],
  revealHiddenOnPeek:true, peekRevealMinimum:.3,
  streakRewards:{5:{hint:1},8:{shuffle:1}},
  completionRewards:[
    {maxSeconds:150,stars:3,bonus:{hint:1,undo:0,shuffle:1}},
    {maxSeconds:240,stars:2,bonus:{hint:1,undo:0,shuffle:0}},
    {maxSeconds:Infinity,stars:1,bonus:{hint:0,undo:0,shuffle:0}},
  ],
} as const;
