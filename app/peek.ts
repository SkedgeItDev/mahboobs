// A horizontal gesture must exceed the touch slop before it becomes a peek.
export function peekOffset(dx:number,dy:number,width:number,dragging:boolean){
 const active=dragging||(Math.abs(dx)>=8&&Math.abs(dx)>Math.abs(dy));
 return {dragging:active,offset:active?Math.max(-width*1.4,Math.min(width*1.4,dx)):0};
}
