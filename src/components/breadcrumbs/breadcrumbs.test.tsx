import { render, screen } from '@testing-library/react';
import { Breadcrumbs } from './breadcrumbs';
import { BreadcrumbsItemProps } from './breadcrumbs-item';
import { SvgIcon } from '../svg-icon';
import { houseFill } from '../../bootstrap-icons/house-fill';

it('renders without errors', () => {
  render(
    <Breadcrumbs>
      <Breadcrumbs.Item href="#home" icon={<SvgIcon icon={houseFill} />}>
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="#navigation">Navigation</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#breadcrumbs" selected={true}>
        Breadcrumbs
      </Breadcrumbs.Item>
    </Breadcrumbs>,
  );

  const links = screen.getAllByRole('link');

  expect(links).toHaveLength(3);
  expect(links[0]).toHaveTextContent('Home');
  expect(links[1]).toHaveTextContent('Navigation');
  expect(links[2]).toHaveTextContent('Breadcrumbs');
});

it('should render item using custom renderer', () => {
  const renderItem: BreadcrumbsItemProps['renderAs'] = (props) => (
    <button {...props} />
  );
  render(
    <Breadcrumbs>
      <Breadcrumbs.Item href="#home" renderAs={renderItem}>
        Home
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="#navigation" renderAs={renderItem}>
        Navigation
      </Breadcrumbs.Item>
      <Breadcrumbs.Item href="#breadcrumbs" renderAs={renderItem}>
        Breadcrumbs
      </Breadcrumbs.Item>
    </Breadcrumbs>,
  );

  const buttons = screen.getAllByRole('button');

  expect(buttons).toHaveLength(3);
});

it('renders with custom delimiter', () => {
  render(
    <Breadcrumbs delimiter={<span data-testid="delimiter">/</span>}>
      <Breadcrumbs.Item href="#home">Home</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#navigation">Navigation</Breadcrumbs.Item>
      <Breadcrumbs.Item href="#breadcrumbs">Breadcrumbs</Breadcrumbs.Item>
    </Breadcrumbs>,
  );

  const delimiters = screen.getAllByTestId('delimiter');

  expect(delimiters).toHaveLength(2);
});
