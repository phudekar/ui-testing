class Position {
    private _row: number;
    private _column: number;

    constructor(row: number, column: number) {
        this._row = row;
        this._column = column;
    }

    get row(): number {
        return this._row;
    }

    get column(): number {
        return this._column;
    }

    getNeighbors(max: Position): Position[] {
        const neighbors = [];
        neighbors.push(new Position(this.row - 1, this.column - 1));
        neighbors.push(new Position(this.row - 1, this.column));
        neighbors.push(new Position(this.row - 1, this.column + 1));
        neighbors.push(new Position(this.row, this.column - 1));
        neighbors.push(new Position(this.row, this.column + 1));
        neighbors.push(new Position(this.row + 1, this.column - 1));
        neighbors.push(new Position(this.row + 1, this.column));
        neighbors.push(new Position(this.row + 1, this.column + 1));

        return neighbors.filter(p => p.row >= 0 && p.column >= 0
            && p.row <= max.row && p.column <= max.column);
    }
}

export default Position;