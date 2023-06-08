import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Yahtzee from './Yahtzee';
import TicTacToe from "./TicTacToe";

function App() {
  const [game, setGame] = useState(<Yahtzee />)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <button onClick={()=>setGame(<Yahtzee />)}>Yahtzee</button>
        <button onClick={()=>setGame(<TicTacToe />)}>Tic Tac Toe</button>
      </header>
      <main>
        {game}
      </main>
      <footer>
        <p>
          About Me!
        </p>
      </footer>
    </div>
  );
}

export default App;
