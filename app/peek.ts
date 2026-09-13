// Any-direction movement must exceed touch slop before becoming a peek.
export function peekOffset(dx:number,dy:number,width:number,dragging:boolean){
 const distance=Math.hypot(dx,dy),active=dragging||distance>=8;
 const scale=distance>width*1.4?width*1.4/distance:1;
 return {dragging:active,offset:active?{x:dx*scale,y:dy*scale}:{x:0,y:0}};
}

import {CONFIG,free,type Tile} from './engine';
export type PeekPositions=Record<number,{x:number,y:number}>;
// Reveal only the layer immediately exposed by displaced covering tiles.
export function faceVisible(t:Tile,board:Tile[],peeks:PeekPositions){
 if(!t.hidden||free(t,board))return true;
 if(!CONFIG.revealHiddenOnPeek)return false;
 const covers=board.filter(b=>b.z>t.z&&Math.abs(b.x-t.x)<1&&Math.abs(b.y-t.y)<1);
 return covers.length>0&&covers.every(b=>{const p=peeks[b.key];return p&&Math.hypot(p.x,p.y)>=CONFIG.peekRevealMinimum});
}
