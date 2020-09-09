import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { StateMock } from '@react-mock/state';
import Game from '.';

describe('Game', () => {
    it('should show board with default board with 10x10 size', async () => {
        const { container, getByText, queryByText } = render(<Game />);

        const blocks = container.querySelectorAll('.block');

        expect(blocks.length).toBe(10 * 10)
        expect(getByText('Minesweeper')).toBeVisible();
        expect(queryByText('Game Over!')).toBeNull();
    })

    it('should show game over message with play again button', () => {
        const { queryByText } = render(
            <StateMock state={{ gameOver: true }} >
                <Game />
            </StateMock>);

        expect(queryByText('Game Over!')).toBeVisible();
        expect(queryByText('Retry')).toBeVisible();
    })

    it('should show congratulations message on game complete', () => {
        const { queryByText } = render(
            <StateMock state={{ gameComplete: true }} >
                <Game />
            </StateMock>);

        expect(queryByText('Congratulations! You flagged all the mines.')).toBeVisible();
        expect(queryByText('Play Again')).toBeVisible();
    })

    it('should clear congratulations message on clicking Play again button', () => {
        const { getByText, queryByText } = render(
            <StateMock state={{ gameComplete: true }} >
                <Game />
            </StateMock>);

        fireEvent.click(getByText('Play Again'));

        expect(queryByText('Congratulations! You flagged all the mines.')).toBeNull();

    })

    it('should clear game over message after clicking play again button', () => {
        const { getByText, queryByText } = render(
            <StateMock state={{ gameOver: true }} >
                <Game />
            </StateMock>);

        fireEvent.click(getByText('Retry'));

        expect(queryByText('Game Over!')).toBeNull();
    })

    it('should render component in default state', () => {
        const { container } = render(
            <StateMock >
                <Game />
            </StateMock>);

        expect(container.firstChild).toMatchSnapshot();
    })

    it('should render component in game over state', () => {
        const { container } = render(
            <StateMock state={{ gameOver: true }}  >
                <Game />
            </StateMock>);

        expect(container.firstChild).toMatchSnapshot();
    })
})
