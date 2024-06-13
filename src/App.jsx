import {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Yahtzee from './Yahtzee';
import TicTacToe from "./TicTacToe";

function App() {
	const [game, setGame] = useState(<Yahtzee />)

	const loadGame = (event, game) => {
		event.target.blur();
		setGame(game);
	}
	return (
		<div className="App">
		<header className="App-header">
			<img src={logo} className="App-logo" alt="logo" />
			<nav>
				<button onClick={(event)=>loadGame(event, <Yahtzee />)}>Yahtzee</button>
				<button onClick={(event)=>loadGame(event, <TicTacToe />)}>Tic Tac Toe</button>
			</nav>
		</header>
		<main>
			{game}
		</main>
		<footer>
			Created By: Alex Malotky<br/>
            <a target="_blank"  rel="noreferrer" href="https://github.com/Malotkya/StaticGames">Github Repo</a> |&nbsp; 
            <a target="_blank"  rel="noreferrer" href="https://Alex.Malotky.net/Portfolio">My Other Work</a>
		</footer>
		</div>
	);
}

export default App;
