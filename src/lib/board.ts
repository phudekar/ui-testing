import Block, { RevealResult } from "./block";
import Position from "./position";

class Board {
    private rows: number;
    private columns: number;
    private _blocks: Block[][];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this._blocks = new Array(this.rows).fill(0)
            .map((_, r) => new Array(this.columns).fill(0)
                .map((_, c) => new Block(new Position(r, c))));
    }

    get blocks(): Block[][] {
        return this._blocks;
    }

    plantMines(positions: Position[]) {
        positions.forEach(pos => {
            this._blocks[pos.row][pos.column] = new Block(pos, true)
        });
    }

    reveal(position: Position): RevealResult {
        const block = this.blocks[position.row][position.column];

        const neighbors = block.position
            .getNeighbors(new Position(this.rows - 1, this.columns - 1))
            .map(pos => this.blocks[pos.row][pos.column]);

        const { mineExploded, nearbyBombs } = block.reveal(neighbors);

        if (mineExploded) {
            this.blocks
                .forEach(row =>
                    row.forEach(b => {
                        b.reveal([]);
                    })
                );
            return { mineExploded: true, nearbyBombs: -1 };
        }

        if (nearbyBombs === 0) {
            neighbors.forEach(b => b && !b.revealed && this.reveal(b.position));
        }

        return {
            mineExploded,
            nearbyBombs
        }

    }
}

export default Board;