import React from 'react';
import Position from '../lib/position';
import Block from '../lib/block';

const BlockComponent = ({ block, onReveal, toggleFlagged, disabled = false }: BlockProps) => {
    const position: Position = block?.position || {};
    return (
        <div className={`block${block?.revealed ? ' revealed' : ''}`}
            data-testid={`block-${position.row}-${position.column}`}
            onClick={() => !disabled && onReveal && onReveal()}
            onContextMenu={e => {
                e.preventDefault();
                !disabled && toggleFlagged && toggleFlagged()
            }}>
            {
                block.revealed ? (
                    block?.exploded ? <div className="bomb" />
                        : <div className="nearby-bombs">{block.nearbyBombs || ''}</div>
                ) : (block?.flagged ? <div className="flag" /> : <div className="mine" />)
            }

        </div>
    )
}

export interface BlockProps {
    block: Block,
    onReveal?: Function,
    toggleFlagged?: Function
    disabled?: boolean;
}

export default BlockComponent;