import React from 'react';
import { render, screen } from '@testing-library/react';
import Nav from '.';

describe('Nav Component', () => {
  const mockProps = {
    title: 'Test Title',
    subtitle: 'Test Subtitle',
    breadcrumb: ['Home', 'Page'],
  };

  it('renders the title and subtitle', () => {
    render(<Nav {...mockProps} />);

    const titleElement = screen.getByText(mockProps.title);
    const subtitleElement = screen.getByText(mockProps.subtitle);

    expect(titleElement).toBeInTheDocument();
    expect(subtitleElement).toBeInTheDocument();
  });
});
