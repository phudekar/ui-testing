import Block, { RevealResult } from "./block";
import Position from "./position";

class Board {
    private rows: number;
    private columns: number;
    private _blocks: Block[][];
    private _minePositions: Position[];
    private _flaggedMines: number;

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        this._minePositions = [];
        this._flaggedMines = 0;
        this._blocks = new Array(this.rows).fill(0)
            .map((_, r) => new Array(this.columns).fill(0)
                .map((_, c) => new Block(new Position(r, c))));
    }

    allMinesFlagged(): boolean {
        // console.log(this._flaggedMines, this._minePositions.length);
        return this._flaggedMines === this._minePositions.length;
    }

    get blocks(): Block[][] {
        return this._blocks;
    }

    plantMines(positions: Position[]) {
        this._minePositions = positions;
        positions.forEach(pos => {
            this._blocks[pos.row][pos.column] = new Block(pos, true)
        });
    }

    toggleFlag(position: Position) {
        const block = this.blocks[position.row][position.column];
        if (!block.flagged) {
            block.flag();
            if (this._minePositions.includes(block.position)) {
                this._flaggedMines += 1;
            }
        } else {
            block.unflag();
            if (this._minePositions.includes(block.position)) {
                this._flaggedMines -= 1;
            }
        }
    }

    reveal(position: Position): RevealResult {
        const block = this.blocks[position.row][position.column];

        const neighbors = block.position
            .getNeighbors(new Position(this.rows - 1, this.columns - 1))
            .map(pos => this.blocks[pos.row][pos.column]);

        const { mineExploded, nearbyBombs } = block.reveal(neighbors);

        if (mineExploded) {
            this._minePositions.forEach(pos => {
                this._blocks[pos.row][pos.column].reveal([]);
            })
            return { mineExploded: true, nearbyBombs: -1 };
        }

        if (nearbyBombs === 0) {
            neighbors.forEach(b => b && !b.revealed && !b.flagged && this.reveal(b.position));
        }

        return {
            mineExploded,
            nearbyBombs
        }

    }
}

export default Board;