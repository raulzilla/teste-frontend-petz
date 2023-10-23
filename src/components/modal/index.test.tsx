import React from 'react';
import { render } from '@testing-library/react';
import Modal from '.';

describe('Modal Component', () => {
  it('should render the modal with the specified title and subtitle', () => {
    const title = 'Success Modal';
    const subtitle = 'Operation completed successfully';
    const { getByText } = render(
      <Modal title={title} subtitle={subtitle} kind="success" />
    );

    const modalTitle = getByText(title);
    const modalSubtitle = getByText(subtitle);

    expect(modalTitle).toBeInTheDocument();
    expect(modalSubtitle).toBeInTheDocument();
  });

  it('should render the "success" kind of modal with the success icon and alt attribute', () => {
    const { getByAltText } = render(
      <Modal title="Success Modal" subtitle="Operation completed successfully" kind="success" />
    );

    const successIcon = getByAltText('Ícone de sucesso');

    expect(successIcon).toBeInTheDocument();
  });

  it('should render the "error" kind of modal with the error icon and alt attribute', () => {
    const { getByAltText } = render(
      <Modal title="Error Modal" subtitle="An error occurred" kind="error" />
    );

    const errorIcon = getByAltText('Ícone de erro');

    expect(errorIcon).toBeInTheDocument();
  });
});