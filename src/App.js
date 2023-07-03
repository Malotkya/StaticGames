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
			<nav>
				<button onClick={()=>setGame(<Yahtzee />)}>Yahtzee</button>
				<button onClick={()=>setGame(<TicTacToe />)}>Tic Tac Toe</button>
			</nav>
		</header>
		<main>
			{game}
		</main>
		<footer>
			Created By: Alex Malotky<br/>
            <a target="_blank" href="https://github.com/Malotkya/StaticGames">Github Repo</a> |&nbsp; 
            <a target="_blank" href="https://Alex.Malotky.net/Portfolio">My Other Work</a>
		</footer>
		</div>
	);
}

export default App;
