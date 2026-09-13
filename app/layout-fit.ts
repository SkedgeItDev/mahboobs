// Keep board proportions and identical board/rack tile dimensions inside the available space.
export function fitTable(width:number,height:number){const boardWidth=Math.max(0,Math.min(width,height*1.22,360));return {boardWidth,tileWidth:boardWidth*.147}}
