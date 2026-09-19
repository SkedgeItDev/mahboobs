'use client';
import {useEffect,useRef,useState} from 'react';
import {captureInstallPrompt,isIosDevice,isStandaloneDisplay,subscribeInstallPrompt,type InstallPromptEvent} from './install';

captureInstallPrompt();

/** Always-on game-chrome control. Never shown on the title/18+ screen. */
export function InstallControl() {
  const [standalone,setStandalone]=useState(false);
  const [installed,setInstalled]=useState(false);
  const [promptEvent,setPromptEvent]=useState<InstallPromptEvent|null>(null);
  const [help,setHelp]=useState(false);
  const [busy,setBusy]=useState(false);

  useEffect(()=>{
    const syncStandalone=()=>setStandalone(isStandaloneDisplay());
    syncStandalone();
    const media=window.matchMedia('(display-mode: standalone)');
    media.addEventListener('change',syncStandalone);
    const unsub=subscribeInstallPrompt(setPromptEvent);
    const onInstalled=()=>{setInstalled(true);syncStandalone()};
    window.addEventListener('appinstalled',onInstalled);
    return()=>{
      media.removeEventListener('change',syncStandalone);
      unsub();
      window.removeEventListener('appinstalled',onInstalled);
    };
  },[]);

  if(standalone)return null;

  async function onInstall(){
    if(promptEvent){
      setBusy(true);
      try{
        await promptEvent.prompt();
        const {outcome}=await promptEvent.userChoice;
        setPromptEvent(null);
        if(outcome==='accepted')setInstalled(true);
      }catch{
        setHelp(true);
      }finally{
        setBusy(false);
      }
      return;
    }
    setHelp(true);
  }

  return <>
    {installed
      ? <span className="install-launch install-launch-done">Installed</span>
      : <button className="install-launch" type="button" disabled={busy} onClick={onInstall}>Add to Home Screen</button>}
    {help&&<InstallHelp ios={isIosDevice()} onClose={()=>setHelp(false)}/>}
  </>;
}

function InstallHelp({ios,onClose}:{ios:boolean,onClose:()=>void}){
  const closeRef=useRef<HTMLButtonElement>(null);
  useEffect(()=>{closeRef.current?.focus()},[]);
  useEffect(()=>{
    const onKey=(e:KeyboardEvent)=>{if(e.key==='Escape')onClose()};
    window.addEventListener('keydown',onKey);
    return()=>window.removeEventListener('keydown',onKey);
  },[onClose]);
  return <div className="install-help" role="dialog" aria-modal="true" aria-labelledby="install-help-title" aria-describedby="install-help-copy">
    <div className="install-help-card">
      <small className="eyebrow">HOME SCREEN</small>
      <h2 id="install-help-title">Add Mah Boobs to your phone</h2>
      <p id="install-help-copy">This puts an icon on your home screen so you can open the game like any other app. Your phone has to do this — we cannot add it for you.</p>
      {ios
        ? <ol>
            <li>Tap the <b>Share</b> button (square with an arrow pointing up).</li>
            <li>Tap <b>Add to Home Screen</b>.</li>
            <li>Tap <b>Add</b>.</li>
          </ol>
        : <ol>
            <li>Tap the browser menu (the three dots).</li>
            <li>Tap <b>Install app</b> or <b>Add to Home screen</b>.</li>
            <li>Confirm.</li>
          </ol>}
      <button ref={closeRef} className="primary" type="button" onClick={onClose}>Got it</button>
    </div>
  </div>;
}
