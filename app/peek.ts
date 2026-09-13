// Any-direction movement must exceed touch slop before becoming a peek.
export function peekOffset(dx:number,dy:number,width:number,dragging:boolean){
 const distance=Math.hypot(dx,dy),active=dragging||distance>=8;
 const scale=distance>width*1.4?width*1.4/distance:1;
 return {dragging:active,offset:active?{x:dx*scale,y:dy*scale}:{x:0,y:0}};
}
