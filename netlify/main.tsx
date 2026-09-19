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
