import Board from './board';
import Block from './block';

describe('Board', () => {
    it('should initialize board with empty blocks', () => {
        const rows = 3;
        const columns = 5;
        const board = new Board(rows, columns);
        const squares: Block[][] = board.getBlocks();

        expect(squares).toBeDefined();
        expect(squares.length).toBe(rows);
        expect(squares[1].length).toBe(columns);
        expect(squares[1][2]).toEqual(new Block());

    })
})