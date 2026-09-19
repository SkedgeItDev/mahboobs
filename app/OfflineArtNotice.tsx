'use client';
import {useEffect,useState} from 'react';

const PAIR_ART=/\/images\/pairs\//;
const COPY='You\'re offline — some match pictures may not load until you\'re back online.';

/** Non-blocking note when a pair image fails (offline / flaky wifi). Must not wrap the age gate. */
export function OfflineArtNotice(){
 const [visible,setVisible]=useState(false);
 useEffect(()=>{
  const onError=(event:Event)=>{
   const target=event.target;
   if(!(target instanceof HTMLImageElement))return;
   if(!PAIR_ART.test(target.currentSrc||target.src))return;
   setVisible(true);
  };
  const onOnline=()=>setVisible(false);
  window.addEventListener('error',onError,true);
  window.addEventListener('online',onOnline);
  return()=>{window.removeEventListener('error',onError,true);window.removeEventListener('online',onOnline)};
 },[]);
 if(!visible)return null;
 return <div className="offline-art-notice" aria-live="polite"><p>{COPY}</p><button type="button" onClick={()=>setVisible(false)}>OK</button></div>;
}
