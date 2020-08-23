class Block {
    mine: boolean;

    constructor(mine: boolean = false){
        this.mine = mine;
    }

    hasMine(): boolean {
        return this.mine;
    }

}

export default Block;