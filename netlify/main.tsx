import React from 'react';
import {createRoot} from 'react-dom/client';
import Game from '../app/Game';
import {newGame} from '../app/engine';
import {captureInstallPrompt} from '../app/install';
import '../app/globals.css';

captureInstallPrompt();

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Game initialGame={newGame()} />
  </React.StrictMode>,
);
