import React, {Component} from 'react';
import Tile from './Tile';

export default class TicTacToe extends Component {
    constructor(props){
        super(props);
        this.state = {
            player1: 0,
            player2: 0,
            currentPlayer: 1
        }
    }

    render(){

        return (
            <p>
                Tic Tac Toe Game
                <Tile />
            </p>
        )
    }
}