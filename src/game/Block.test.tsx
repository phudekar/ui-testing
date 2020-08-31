import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import BlockComponent from './Block';
import Block from '../lib/block';
import Position from '../lib/position';

describe('BlockComponent', () => {
    const position = new Position(2, 1)

    it('should not be revealed by default', () => {
        const block = new Block(position);
        const { getByTestId } = render(<BlockComponent block={block} />);

        const root = getByTestId(`block-${position.row}-${position.column}`);

        expect(root.classList).toContain('block');
        expect(root.classList).not.toContain('revealed');
    })

    it('should call onRevealed after left click', () => {
        const block = new Block(position);
        const reveal = jest.fn();

        const { getByTestId } = render(<BlockComponent block={block} onReveal={reveal} />);

        const root = getByTestId(`block-${position.row}-${position.column}`);
        fireEvent.click(root);

        expect(reveal).toHaveBeenCalled();
    })

    it('should call toggleFlagged after right click', () => {
        const block = new Block(position);
        const toggleFlagged = jest.fn();

        const { getByTestId } = render(<BlockComponent block={block} toggleFlagged={toggleFlagged} />);

        const root = getByTestId(`block-${position.row}-${position.column}`);

        fireEvent.contextMenu(root);

        expect(toggleFlagged).toHaveBeenCalled();
    })

    it('should add revealed class by after left click', () => {
        const block = new Block(position);
        block.reveal([]);

        const { getByTestId } = render(<BlockComponent block={block} />);

        const root = getByTestId(`block-${position.row}-${position.column}`);

        expect(root.classList).toContain('revealed');
    })

    it('should show flag after right click', () => {
        const block = new Block(position);
        block.flag();

        const { container } = render(<BlockComponent block={block} />);

        expect(container.querySelector('.flag')).toBeVisible();
    })

    it('should show bomb if revealed and exploded', () => {
        const { container } = render(
            <BlockComponent block={{ revealed: true, exploded: true }} />
        );

        expect(container.querySelector('.bomb')).toBeVisible();
    })

    it('should show number of nearByBombs if revealed', () => {

        const { queryByText } = render(
            <BlockComponent block={{ revealed: true, nearbyBombs: 2 }} />
        );

        expect(queryByText("2")).toBeVisible();
    })
})
