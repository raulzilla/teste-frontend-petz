import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import SelectField from '.';

describe('SelectField Component', () => {
  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];

  it('opens the menu when input is focused', () => {
    render(<SelectField label="Test Label" options={options} />);
    const inputElement = screen.getByRole('textbox');
    fireEvent.focus(inputElement);
    const menuElement = screen.getByRole('list');

    expect(menuElement).toBeInTheDocument();
  });

  it('opens the menu when input is focused', () => {
    render(<SelectField label="Test Label" options={options} />);
    const inputElement = screen.getByDisplayValue('');
    fireEvent.focus(inputElement);
    const menuElement = screen.getByRole('list');

    expect(menuElement).toBeInTheDocument();
  });

  it('selects an option when clicked', () => {
    const onSelectInput = jest.fn();
    render(<SelectField label="Test Label" options={options} onSelectInput={onSelectInput} />);
    const inputElement = screen.getByDisplayValue('');
    fireEvent.focus(inputElement);
    const optionElement = screen.getByText('Option 2');
    fireEvent.click(optionElement);

    expect(onSelectInput).toHaveBeenCalledWith('option2');
  });

  it('closes the menu when an option is selected', () => {
    render(<SelectField label="Test Label" options={options} />);
    const inputElement = screen.getByDisplayValue('');
    fireEvent.focus(inputElement);
    const optionElement = screen.getByText('Option 2');
    fireEvent.click(optionElement);
    const menuElement = screen.queryByRole('list');

    expect(menuElement).toBeNull();
  });
});
