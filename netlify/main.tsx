import React from 'react';
import {createRoot} from 'react-dom/client';
import Game from '../app/Game';
import {newGame} from '../app/engine';
import '../app/globals.css';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Game initialGame={newGame()} />
  </React.StrictMode>,
);

function hideBootSplash() {
  const splash = document.getElementById('app-splash');
  if (!splash) return;
  const remove = () => splash.remove();
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    remove();
    return;
  }
  splash.classList.add('app-splash-hide');
  splash.addEventListener('transitionend', remove, {once: true});
  window.setTimeout(remove, 400);
}

// Cover first paint, then yield to the existing age gate / game. Do not skip either.
window.requestAnimationFrame(() => {
  window.requestAnimationFrame(() => {
    window.setTimeout(hideBootSplash, 500);
  });
});
