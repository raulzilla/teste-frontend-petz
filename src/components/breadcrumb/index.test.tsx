import React from 'react';
import { render } from '@testing-library/react';
import Breadcrumb from '.';

describe('Breadcrumb Component', () => {
  it('should render the Breadcrumb component with labels', () => {
    const labels = ['Home', 'Products', 'Category'];

    const { getByText } = render(<Breadcrumb label={labels} />);

    const breadcrumbText = getByText('Home > Products > Category');

    expect(breadcrumbText).toBeInTheDocument();
  });

  it('should render the Breadcrumb component with a single label', () => {
    const labels = ['Home'];

    const { getByText } = render(<Breadcrumb label={labels} />);

    const breadcrumbText = getByText('Home');

    expect(breadcrumbText).toBeInTheDocument();
  });
});
