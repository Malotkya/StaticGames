import React, {Component} from 'react';
import Tile from './Tile';
import './tictactoe.css';

const WINNING_SCORES = [
    //Horizontal
    7,
    56,
    448,

    //Vertical
    73,
    146,
    292,

    //Diagonal
    273,
    84,
]

const DEFAULT_STATE = {
    player1: {
        score: 0,
        char: 'X'
    },
    player2: {
        score: 0,
        char: 'O'
    },
    currentPlayer: "player1",
    board: ["", "", "", "", "", "", "", "", ""]
}

export default class TicTacToe extends Component {
    constructor(props){
        super(props);
        this.state = JSON.parse(JSON.stringify(DEFAULT_STATE));
    }

    updateGame(index){
        return new Promise((resolve, reject)=>{
            let value = Math.pow(2, index);
            this.setState((s, p)=>{
                let state = {...s};

                state[s.currentPlayer].score += value;
                state.board[index] = state[s.currentPlayer].char;

                if(s.currentPlayer === "player1"){
                    state.currentPlayer = "player2";
                } else {
                    state.currentPlayer = "player1";
                }

                resolve(state[s.currentPlayer]);

                return state;
            })
        });
    }

    handleClick(index){
        this.updateGame(index)
            .then( (player)=> {
                WINNING_SCORES.forEach(win=>{
                    let mask = win&player.score;
                    if(mask === win){
                        this.setWinner(player.char);
                    }
                });
            });
    }

    setWinner(player){
        alert(player + " wins!");
        this.setState({currentPlayer: "game_over"});
    }

    reset(){
        this.setState((s,p)=>JSON.parse(JSON.stringify(DEFAULT_STATE)));
    }

    render(){
        return (
            <>
            <h2>Tic Tac Toe</h2>
                <div id="tic-tac-toe">
                    {this.state.board.map((state, index)=><Tile key={index} onClick={()=>this.handleClick(index)} state={state} />)}
                </div>
                <button onClick={()=>this.reset()}>Reset</button>
            </>
        )
    }
}