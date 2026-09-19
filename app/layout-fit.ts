// Keep board proportions and identical board/rack tile dimensions inside the available space.
export function fitTable(width:number,height:number){const boardWidth=Math.max(0,Math.min(width,height*.64,440));return {boardWidth,tileWidth:boardWidth*.23}}

const SLOT_ASPECT=1.24;
const SLOT_FROM_TILE=.7;
const SLOT_MAX_PX=62;

/** Rack slots track board tiles, but never grow taller than the work-area row. */
export function fitSlotWidth(tileWidth:number,rackInnerHeight:number){
 const preferred=Math.min(Math.max(0,tileWidth)*SLOT_FROM_TILE,SLOT_MAX_PX);
 if(!(rackInnerHeight>0))return preferred;
 return Math.max(0,Math.min(preferred,rackInnerHeight/SLOT_ASPECT));
}
