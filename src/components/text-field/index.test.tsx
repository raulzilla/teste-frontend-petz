import React from 'react';
import { render, screen } from '@testing-library/react';
import TextField from '.';

describe('TextField Component', () => {
  it('renders the label and input element', () => {
    render(<TextField label="Test Label" />);

    const labelElement = screen.getByText('Test Label');
    const inputElement = screen.getByRole('textbox');

    expect(labelElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
  });

  it('passes additional props to the input element', () => {
    render(<TextField label="Test Label" placeholder="Enter text" />);
    const inputElement = screen.getByRole('textbox');

    expect(inputElement).toHaveAttribute('placeholder', 'Enter text');
  });
});
