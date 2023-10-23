import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Button from '.';

describe('Button Component', () => {
  it('should render a solid button', () => {
    const { getByText } = render(<Button kind="solid">Solid Button</Button>);
    const button = getByText('Solid Button');

    expect(button).toBeTruthy();
    expect(button).toHaveAttribute('class', expect.stringMatching(/.*solid.*/));
  });

  it('should render a link button', () => {
    const { getByText } = render(<Button kind="link">Link Button</Button>);
    const button = getByText('Link Button');

    expect(button).toBeTruthy();
    expect(button).toHaveAttribute('class', expect.stringMatching(/.*link.*/));
  });

  it('should trigger a click event', () => {
    const onClick = jest.fn();
    const { getByText } = render(<Button onClick={onClick}>Click Me</Button>);
    const button = getByText('Click Me');

    fireEvent.click(button);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
