// Any-direction movement must exceed touch slop before becoming a peek.
export function peekOffset(dx:number,dy:number,width:number,dragging:boolean){
 const distance=Math.hypot(dx,dy),active=dragging||distance>=8;
 const scale=distance>width*1.4?width*1.4/distance:1;
 return {dragging:active,offset:active?{x:dx*scale,y:dy*scale}:{x:0,y:0}};
}

import {CONFIG,covers,free,type Tile} from './engine';
export type PeekPositions=Record<number,{x:number,y:number}>;
// Reveal only the layer immediately exposed by displaced covering tiles.
export function faceVisible(t:Tile,board:Tile[],peeks:PeekPositions){
 if(!t.hidden||free(t,board))return true;
 if(!CONFIG.revealHiddenOnPeek)return false;
 const coveringTiles=board.filter(b=>covers(b,t));
 return coveringTiles.length>0&&coveringTiles.every(b=>{const p=peeks[b.key];return p&&Math.hypot(p.x,p.y)>=CONFIG.peekRevealMinimum});
}
// Inspection remembers one concealed face; peeking never permanently unmasks the board.
export function inspectionAfterPeek(board:Tile[],peeks:PeekPositions,previous:number|null){
 const exposed=board.filter(t=>t.hidden&&!free(t,board)&&faceVisible(t,board,peeks)).sort((a,b)=>b.z-a.z);
 return exposed[0]?.key??previous;
}
export function inspectedFaceVisible(t:Tile,board:Tile[],inspected:number|null){return !t.hidden||free(t,board)||t.key===inspected}
