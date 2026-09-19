// Keep board proportions and identical board/rack tile dimensions inside the available space.
export function fitTable(width:number,height:number){const boardWidth=Math.max(0,Math.min(width,height*.64,440));return {boardWidth,tileWidth:boardWidth*.23}}

const SLOT_ASPECT=1.24;
const SLOT_FROM_TILE=.7;
const SLOT_MAX_PX=62;

/** Rack slots track board tiles, but stay inside the work-area row and width. */
export function fitSlotWidth(tileWidth:number,rackInnerHeight:number,rackInnerWidth=0,slotCount=4,gap=5){
 const preferred=Math.min(Math.max(0,tileWidth)*SLOT_FROM_TILE,SLOT_MAX_PX);
 const fromHeight=rackInnerHeight>0?rackInnerHeight/SLOT_ASPECT:Infinity;
 const fromWidth=rackInnerWidth>0?(rackInnerWidth-gap*Math.max(0,slotCount-1))/slotCount:Infinity;
 return Math.max(0,Math.min(preferred,fromHeight,fromWidth));
}
