import Block from './block';

describe('A Block', () => {

    it('should return true if it has mine', () => {
        const mine = true;
        const block = new Block(mine);
        expect(block.hasMine()).toBe(true);
    })

    it('should return false if it does not have mine', () => {
        const block = new Block();
        expect(block.hasMine()).toBe(false);
    })


})