import Position from './position';

export interface RevealResult {
    mineExploded: boolean,
    nearbyBombs: number,
}

class Block {

    private _mine: boolean;
    private _position: Position;
    private _flagged: boolean;
    private _nearbyBombs: number | undefined;
    private _exploded: boolean | undefined;
    private _revealed: boolean;

    constructor(location: Position, mine: boolean = false) {
        this._mine = mine;
        this._position = location;
        this._flagged = false;
        this._revealed = false;
    }

    get position(): Position {
        return this._position;
    }

    get exploded(): boolean | undefined {
        return this._exploded;
    }

    get flagged(): boolean {
        return this._flagged === true;
    }

    get nearbyBombs(): number | undefined {
        return this._nearbyBombs;
    }

    get revealed(): boolean {
        return this._revealed === true;
    }

    reveal(neighbors: Block[]): RevealResult {
        this._revealed = true;
        this._exploded = this._mine;
        this._nearbyBombs = neighbors.reduce(
            (prev, cur) => cur?._mine ? prev + 1 : prev,
            0);

        return {
            mineExploded: this._exploded,
            nearbyBombs: this._nearbyBombs
        }
    }

    flag() {
        this._flagged = true;
    }

    unflag() {
        this._flagged = false;
    }
}

export default Block;