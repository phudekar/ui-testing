import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BoardComponent from './Board';
import Board from '../lib/board';
import Position from '../lib/position';

describe('BoardComponent', () => {
    it('should display rows and columns of blocks', () => {
        const rows = 5;
        const columns = 5;
        const board = new Board(rows, columns);
        const { getByTestId, container } = render(<BoardComponent board={board} />)

        expect(getByTestId('board').classList).toContain('board');

        const rowElements = container.querySelectorAll('.row');
        expect(rowElements.length).toBe(rows);

        const columnElements = rowElements[2].querySelectorAll('.block');
        expect(columnElements.length).toBe(columns)

        const blocks = container.querySelectorAll('.block');
        expect(blocks.length).toBe(rows * columns);
    })

    it('should reveal block', () => {
        const rows = 5;
        const columns = 5;
        const board = new Board(rows, columns);
        const { container } = render(<BoardComponent board={board} />)

        const block = container.querySelectorAll('.block')[0];
        fireEvent.click(block);

        expect(board.blocks[0][0].revealed).toBe(true);
    })

    it('should flag/unflag block', () => {
        const rows = 5;
        const columns = 5;
        const board = new Board(rows, columns);
        const { container } = render(<BoardComponent board={board} />)

        const block = container.querySelectorAll('.block')[0];

        fireEvent.contextMenu(block);
        expect(board.blocks[0][0].flagged).toBe(true);

        fireEvent.contextMenu(block);
        expect(board.blocks[0][0].flagged).toBe(false);
    })

    it('should call game over on mine explode', () => {
        const rows = 5;
        const columns = 5;
        const board = new Board(rows, columns);
        board.plantMines([new Position(0, 0)]);

        const gameOver = jest.fn();

        const { container } = render(<BoardComponent board={board} onGameOver={gameOver} />)

        const blockWithMine = container.querySelectorAll('.block')[0];
        fireEvent.click(blockWithMine);

        expect(gameOver).toHaveBeenCalled();

    })
})