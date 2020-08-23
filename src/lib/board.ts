import Block from "./block";

class Board {
    rows: number;
    columns: number;

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
    }

    getBlocks(): Block[][] {
        return new Array(this.rows)
            .fill(new Array(this.columns).
                fill(new Block()));
    }

}

export default Board;