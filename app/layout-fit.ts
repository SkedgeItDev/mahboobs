// Keep board proportions and identical board/rack tile dimensions inside the available space.
export function fitTable(width:number,height:number){const boardWidth=Math.max(0,Math.min(width,height*.64,440));return {boardWidth,tileWidth:boardWidth*.23}}
