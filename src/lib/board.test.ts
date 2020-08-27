import Board from './board';
import Block from './block';
import Position from './position';

describe('Board', () => {
    const rows = 3;
    const columns = 5;
    const board = new Board(rows, columns);

    it('should initialize board with empty blocks', () => {
        const blocks: Block[][] = board.blocks;

        expect(blocks).toBeDefined();
        expect(blocks.length).toBe(rows);
        expect(blocks[1].length).toBe(columns);
        expect(blocks[1][2]).toEqual(new Block(new Position(1, 2)));
        expect(blocks[1][2]).toEqual(new Block(new Position(1, 2)));
    })

    it('should plant mines', () => {
        board.plantMines([
            new Position(1, 2)
        ])
        const blocks: Block[][] = board.blocks;

        expect(blocks).toBeDefined();
        expect(blocks.length).toBe(rows);
        expect(blocks[1].length).toBe(columns);
        expect(blocks[1][2]).toEqual(new Block(new Position(1, 2), true));
    })

    it('should reveal block without mine', () => {
        const board = new Board(rows, columns);
        const pos = new Position(1, 2);
        board.plantMines([new Position(1, 1)]);

        const { mineExploded, nearbyBombs } = board.reveal(pos);

        expect(mineExploded).toBeFalsy();
        expect(nearbyBombs).toBe(1);
        expect(board.blocks[1][1].exploded).toBeFalsy();
    })

    it('should reveal block with mine', () => {
        const board = new Board(rows, columns);
        const pos = new Position(1, 2);
        board.plantMines([new Position(0, 0), pos]);

        const { mineExploded } = board.reveal(pos);

        expect(mineExploded).toBeTruthy();
        expect(board.blocks[0][0].exploded).toBe(true);
    })

})