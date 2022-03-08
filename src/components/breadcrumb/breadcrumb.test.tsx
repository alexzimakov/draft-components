import { render, screen } from '@testing-library/react';
import { Breadcrumb } from './breadcrumb';
import { BreadcrumbLink, BreadcrumbsLinkProps } from './breadcrumb-link';
import { SvgIcon } from '../svg-icon';
import { houseFill } from '../../bootstrap-icons/house-fill';

it('renders without errors', () => {
  render(
    <Breadcrumb>
      <BreadcrumbLink href="#home" icon={<SvgIcon icon={houseFill} />}>
        Home
      </BreadcrumbLink>
      <BreadcrumbLink href="#navigation">Navigation</BreadcrumbLink>
      <BreadcrumbLink href="#breadcrumbs" selected={true}>
        Breadcrumbs
      </BreadcrumbLink>
    </Breadcrumb>
  );

  const links = screen.getAllByRole('link');

  expect(links).toHaveLength(3);
  expect(links[0]).toHaveTextContent('Home');
  expect(links[1]).toHaveTextContent('Navigation');
  expect(links[2]).toHaveTextContent('Breadcrumbs');
});

it('should render item using custom renderer', () => {
  const renderLink: BreadcrumbsLinkProps['renderAs'] = ({
    className,
    children,
  }) => <button className={className}>{children}</button>;
  render(
    <Breadcrumb>
      <BreadcrumbLink href="#home" renderAs={renderLink}>
        Home
      </BreadcrumbLink>
      <BreadcrumbLink href="#navigation" renderAs={renderLink}>
        Navigation
      </BreadcrumbLink>
      <BreadcrumbLink href="#breadcrumbs" renderAs={renderLink}>
        Breadcrumbs
      </BreadcrumbLink>
    </Breadcrumb>
  );

  const buttons = screen.getAllByRole('button');

  expect(buttons).toHaveLength(3);
});

it('renders with custom delimiter', () => {
  render(
    <Breadcrumb delimiter={<span data-testid="delimiter">/</span>}>
      <BreadcrumbLink href="#home">Home</BreadcrumbLink>
      <BreadcrumbLink href="#navigation">Navigation</BreadcrumbLink>
      <BreadcrumbLink href="#breadcrumbs">Breadcrumbs</BreadcrumbLink>
    </Breadcrumb>
  );

  const delimiters = screen.getAllByTestId('delimiter');

  expect(delimiters).toHaveLength(2);
});
