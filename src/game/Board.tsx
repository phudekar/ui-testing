import React, { useState } from 'react';
import Board from '../lib/board';
import Block from '../lib/block';
import BlockComponent from './Block';

const BoardComponent = ({ board, onGameOver }: BoardProps) => {
    const [boardState, setBoardState] = useState({ board, disabled: false });

    const reveal = (block: Block) => {
        board = boardState.board;
        const { mineExploded } = board.reveal(block.position)
        if (mineExploded && onGameOver) {
            onGameOver();
            setBoardState({ board, disabled: true });
        } else {
            setBoardState({ board, disabled: false });
        }
    }

    return <div data-testid="board" className="board">
        {
            [...boardState.board.blocks].map((row, i) => <div key={'r' + (i + 1)} className="row">{
                row.map((block, j) =>
                    <BlockComponent key={`b-${i + 1}-${j + 1}`} block={block}
                        disabled={boardState.disabled}
                        onReveal={() => reveal(block)}
                        toggleFlagged={() => {
                            block.flagged ? block.unflag() : block.flag();
                            setBoardState({ board: boardState.board, disabled: false })
                        }}
                    />
                )}
            </div>
            )
        }
    </div>
}

interface BoardProps {
    board: Board,
    onGameOver?: Function
}

export default BoardComponent;