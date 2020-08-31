import React from 'react';
import Board from '../lib/board';
import Block from '../lib/block';
import BlockComponent from './Block';

class BoardComponent extends React.Component<BoardProps> {
    state: {
        board: Board
    };
    constructor(props: BoardProps) {
        super(props);
        this.state = {
            board: this.props.board
        }
    }

    static getDerivedStateFromProps(props: BoardProps, state: any): any {
        return { board: props.board };
    }

    reveal(block: Block) {
        const { mineExploded } = this.state.board.reveal(block.position)
        if (mineExploded && this.props.onGameOver) {
            this.props.onGameOver();
        }
        this.setState({ board: this.state.board });
    }

    toggleFlagged(block: Block) {
        this.state.board.toggleFlag(block.position);
        if (this.state.board.allMinesFlagged() && this.props.onGameComplete) {
            this.props.onGameComplete();
        }
        this.setState({ board: this.state.board });
    }

    render() {
        return <div data-testid="board" className="board" >
            {
                this.state.board?.blocks?.map((row, i) => <div key={'r' + (i + 1)} className="row">{
                    row.map((block, j) =>
                        <BlockComponent key={`b-${i + 1}-${j + 1}`} block={block}
                            disabled={this.props.disabled}
                            onReveal={() => this.reveal(block)}
                            toggleFlagged={() => this.toggleFlagged(block)}
                        />
                    )}
                </div>
                )
            }
        </div >
    }
}

interface BoardProps {
    board: Board,
    disabled?: boolean,
    onGameComplete?: Function,
    onGameOver?: Function
}

export default BoardComponent;