import Game from './Game';
import {newGame} from './engine';
export default function Home(){return <Game initialGame={newGame()}/> }
