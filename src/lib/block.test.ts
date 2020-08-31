import Block from './block';
import Position from './position';

describe('A Block', () => {

    it('should explode if it has mine', () => {
        const mine = true;
        const block = new Block(new Position(1, 1), mine);
        const { mineExploded } = block.reveal([]);
        expect(mineExploded).toBeTruthy();
    })

    it('should not explode if it does not have mine', () => {
        const block = new Block(new Position(1, 1));
        const { mineExploded } = block.reveal([]);
        expect(mineExploded).toBeFalsy();
    })

    it('should return number of bombs nearby based on neighboring blocks', () => {
        const block = new Block(new Position(1, 1));
        const neighbors = [
            new Block(new Position(1, 1), true),
            new Block(new Position(1, 1), false),
            new Block(new Position(1, 1), true),
            new Block(new Position(1, 1), false),
            new Block(new Position(1, 1), false),
            new Block(new Position(1, 1), false),
            new Block(new Position(1, 1), false),
            new Block(new Position(1, 1), true),
        ]

        const { nearbyBombs } = block.reveal(neighbors);
        expect(nearbyBombs).toBe(3);
        expect(block.revealed).toBe(true);
    })

    it('should have no flag by default', () => {
        const block = new Block(new Position(1, 1));
        expect(block.flagged).toBeFalsy();
    })

    it('should not be revealed by default', () => {
        const block = new Block(new Position(1, 1));
        expect(block.revealed).toBeFalsy();
        expect(block.nearbyBombs).toBeUndefined();
    })

    it('should flag the block', () => {
        const block = new Block(new Position(1, 1));
        block.flag();
        expect(block.flagged).toBe(true);
    })

    it('should remove flag from the block', () => {
        const block = new Block(new Position(1, 1));
        block.flag();
        expect(block.flagged).toBe(true);
        block.unflag();
        expect(block.flagged).toBeFalsy();
    })

})