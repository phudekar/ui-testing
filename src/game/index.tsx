import React from 'react';
import Board from '../lib/board';
import Position from '../lib/position';
import BoardComponent from './Board';

class Game extends React.Component {
    state: {
        board: Board,
        gameOver?: boolean
    }

    constructor(props: any) {
        super(props);
        this.state = {
            board: this.getBoard(10, 10, 10)
        }
    }

    getBoard(rows: number, columns: number, mines: number): Board {
        const board = new Board(rows, columns)
        board.plantMines(getRandomPositions(rows, columns, mines));
        return board;
    }

    onGameOver() {
        this.setState({ gameOver: true });
    }

    render() {
        return (
            <div>
                <div className="title">Minesweeper</div>
                <BoardComponent board={this.state.board} onGameOver={() => this.onGameOver()} />
            </div>
        )
    }
}

export const getRandomPositions = (rows: number, columns: number, count: number): Position[] => {
    const positions = [];
    for (let index = 0; index < count; index++) {
        const row = Math.floor(Math.random() * rows);
        const col = Math.floor(Math.random() * columns);
        positions.push(new Position(row, col));
        if (positions.length < index + 1) {
            index--;
        }
    }
    console.log(positions);
    return positions;
}

export default Game;