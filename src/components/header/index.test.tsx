import React from 'react';
import { render, act } from '@testing-library/react';
import Header from '.';

describe('Header Component', () => {
  it('should render the header with the "Centro Pokémon" text', () => {
    const { getByText } = render(<Header />);
    const headerText = getByText('Centro Pokémon');

    expect(headerText).toBeInTheDocument();
  });

  it('should hide the text after 5 seconds', async () => {
    jest.useFakeTimers();

    const { container } = render(<Header />);

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    const headerText = container.querySelector('.showText');

    expect(headerText).toBeNull();
  });
});