import React, {Component} from 'react';
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
        this.state = DEFAULT_STATE;
    }

    updateGame(value, index){
        return new Promise((resolve, reject)=>{
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

    handleClick(value, index){
        this.updateGame(value, index)
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
        this.setState((s,p)=>DEFAULT_STATE);
        this.forceUpdate();
    }

    render(){
        let board = this.state.board.map((state, index)=>{
            let value = Math.pow(2, index);

            if(this.state.currentPlayer !== "game_over" && state === ""){
                return <button key={index} className={"tile " + value} onClick={()=>this.handleClick(value, index)}></button>;
            } else {
                return <div key={index} className={"tile " + value}>{state}</div>;
            }
        });

        return (
            <>
                <div id="tic-tac-toe">
                    {board}
                </div>
                <button onClick={()=>this.reset()}>Reset</button>
            </>
        )
    }
}