import Position from './position';

describe('Position', () => {
    it('should initialize position with row and column', () => {
        const row = 3;
        const column = 5;
        const position = new Position(row, column);
        expect(position.row).toBe(row);
        expect(position.column).toBe(column);
    })

    it('should return all neighboring positions', () => {
        const row = 3;
        const column = 5;
        const position = new Position(row, column);

        expect(position.getNeighbors(new Position(4, 6))).toContainEqual(new Position(2, 4));
        expect(position.getNeighbors(new Position(4, 6))).toContainEqual(new Position(2, 5));
        expect(position.getNeighbors(new Position(4, 6))).toContainEqual(new Position(2, 6));
        expect(position.getNeighbors(new Position(4, 6))).toContainEqual(new Position(3, 4));
        expect(position.getNeighbors(new Position(4, 6))).toContainEqual(new Position(3, 6));
        expect(position.getNeighbors(new Position(4, 6))).toContainEqual(new Position(4, 4));
        expect(position.getNeighbors(new Position(4, 6))).toContainEqual(new Position(4, 5));
        expect(position.getNeighbors(new Position(4, 6))).toContainEqual(new Position(4, 6));
    })

    it('should return all neighboring positions within max limit', () => {
        const row = 3;
        const column = 5;
        const position = new Position(row, column);

        expect(position.getNeighbors(new Position(3, 5))).toContainEqual(new Position(2, 4));
        expect(position.getNeighbors(new Position(3, 5))).toContainEqual(new Position(2, 5));
        expect(position.getNeighbors(new Position(3, 5))).toContainEqual(new Position(3, 4));
    })
})