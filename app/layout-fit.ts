// Board coordinates are percentages of the felt, shared by rendering and move rules.
export const BOARD_ASPECT=.54;
const TILE_WIDTH=23;
const TILE_ASPECT=1.24;

export function tileBounds({x,y,z}:{x:number,y:number,z:number}){
 return {left:x*24.1+2+z*.6,top:y*15.6+2-z*.8,width:TILE_WIDTH,height:TILE_WIDTH*TILE_ASPECT*BOARD_ASPECT};
}

export function fitTable(width:number,height:number){
 const boardWidth=Math.max(0,Math.min(width,height*BOARD_ASPECT,440));
 return {boardWidth,tileWidth:boardWidth*TILE_WIDTH/100};
}

const SLOT_ASPECT=1.24;
const SLOT_FROM_TILE=.7;
const SLOT_MAX_PX=62;

/** Rack slots track board tiles, but never grow taller than the work-area row. */
export function fitSlotWidth(tileWidth:number,rackInnerHeight:number){
 const preferred=Math.min(Math.max(0,tileWidth)*SLOT_FROM_TILE,SLOT_MAX_PX);
 if(!(rackInnerHeight>0))return preferred;
 return Math.max(0,Math.min(preferred,rackInnerHeight/SLOT_ASPECT));
}
