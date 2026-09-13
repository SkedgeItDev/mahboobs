'use client';
import {useRef,useState} from 'react';
import type {PointerEvent,KeyboardEvent} from 'react';
import {manifest,type Tile} from './engine';
import {peekOffset} from './peek';
export function TileButton({tile:t,rack,playable,inspectable,hinted,onSelect}:{tile:Tile,rack:boolean,playable:boolean,inspectable:boolean,hinted:boolean,onSelect:()=>void}){
 const [offset,setOffset]=useState(0);
 const gesture=useRef<{id:number,x:number,y:number,width:number,dragging:boolean}|null>(null);
 const suppressClick=useRef(false);
 function down(e:PointerEvent<HTMLButtonElement>){if(!inspectable||!e.isPrimary||e.button!==0)return;suppressClick.current=false;gesture.current={id:e.pointerId,x:e.clientX,y:e.clientY,width:e.currentTarget.offsetWidth,dragging:false};e.currentTarget.setPointerCapture(e.pointerId)}
 function move(e:PointerEvent<HTMLButtonElement>){const start=gesture.current;if(!start||start.id!==e.pointerId)return;const peek=peekOffset(e.clientX-start.x,e.clientY-start.y,start.width,start.dragging);start.dragging=peek.dragging;if(peek.dragging){suppressClick.current=true;setOffset(peek.offset)}}
 function end(e:PointerEvent<HTMLButtonElement>){if(gesture.current?.id!==e.pointerId)return;gesture.current=null;setOffset(0);if(e.currentTarget.hasPointerCapture(e.pointerId))e.currentTarget.releasePointerCapture(e.pointerId)}
 function keyDown(e:KeyboardEvent<HTMLButtonElement>){if(inspectable&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();setOffset((e.key==='ArrowLeft'?-1:1)*e.currentTarget.offsetWidth*1.15)}}
 return <button aria-label={`Pair ${t.pair} ${t.half==='a'?'left':'right'} half${rack?' in work area':playable?', playable':inspectable?', drag to inspect only':', covered'}`} disabled={rack||(!playable&&!inspectable)} className={`tile ${playable?'free':'blocked'} ${inspectable?'inspectable':''} ${offset?'peeking':''} ${hinted?'hinted':''}`} style={rack?{}:{left:`${t.x*15.5+2+t.z*.7}%`,top:`${t.y*23+5-t.z*1.7}%`,zIndex:offset?80:t.z*10+1,transform:offset?`translateX(${offset}px)`:undefined}} onPointerDown={down} onPointerMove={move} onPointerUp={end} onPointerCancel={end} onLostPointerCapture={()=>{gesture.current=null;setOffset(0)}} onKeyDown={keyDown} onKeyUp={e=>{if(e.key==='ArrowLeft'||e.key==='ArrowRight')setOffset(0)}} onBlur={()=>setOffset(0)} onClick={e=>{if(suppressClick.current&&e.detail!==0){e.preventDefault();return}if(playable)onSelect()}}><img draggable={false} src={manifest[t.pair-1][t.half]} alt=""/><span>{String(t.pair).padStart(2,'0')}<b>{t.half.toUpperCase()}</b></span></button>
}
