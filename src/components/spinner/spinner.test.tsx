import * as React from 'react';
import { render } from '@testing-library/react';
import { Spinner } from './spinner';

describe('<Spinner /> component', () => {
  it('renders with custom size', () => {
    const size = 32;
    const { getByTestId } = render(<Spinner size={size} />);
    const spinnerEl = getByTestId('dc-spinner');

    expect(spinnerEl).toHaveStyle({ fontSize: size });
  });
});
