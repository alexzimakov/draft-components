import { expect, it, vi } from 'vitest';
import { Breadcrumbs } from './breadcrumbs.js';
import { BreadcrumbsItem, BreadcrumbsItemRenderFn } from './breadcrumbs-item.js';
import { render, screen, within } from '../../test/test-utils.js';

it('renders without errors', () => {
  render(
    <Breadcrumbs>
      <BreadcrumbsItem href="/" icon={<svg role="img" />}>
        Home
      </BreadcrumbsItem>
      <BreadcrumbsItem href="/navigation">
        Navigation
      </BreadcrumbsItem>
      <BreadcrumbsItem href="/navigation/breadcrumbs" aria-current="page">
        Breadcrumbs
      </BreadcrumbsItem>
    </Breadcrumbs>,
  );

  const links = screen.getAllByRole('link');
  expect(links).toHaveLength(3);
  expect(links[0]).toHaveTextContent('Home');
  within(links[0]).getByRole('img');
  expect(links[1]).toHaveTextContent('Navigation');
  expect(links[2]).toHaveTextContent('Breadcrumbs');
  expect(links[2]).toHaveAttribute('aria-current', 'page');
});

it('should render breadcrumbs item using custom render fn', () => {
  const renderLink: BreadcrumbsItemRenderFn = ({ className, children }) => (
    <button className={className}>{children}</button>
  );
  render(
    <Breadcrumbs>
      <BreadcrumbsItem href="/" renderAs={renderLink}>
        Home
      </BreadcrumbsItem>
      <BreadcrumbsItem href="/navigation" renderAs={renderLink}>
        Navigation
      </BreadcrumbsItem>
      <BreadcrumbsItem href="/navigation/breadcrumbs" renderAs={renderLink}>
        Breadcrumbs
      </BreadcrumbsItem>
    </Breadcrumbs>,
  );

  const buttons = screen.getAllByRole('button');
  expect(buttons).toHaveLength(3);
});

it('renders with custom delimiter', () => {
  const separatorTestId = 'custom-separator';
  const separator = <span data-testid={separatorTestId}>|</span>;
  render(
    <Breadcrumbs separator={separator}>
      <BreadcrumbsItem href="/">
        Home
      </BreadcrumbsItem>
      <BreadcrumbsItem href="/navigation">
        Navigation
      </BreadcrumbsItem>
      <BreadcrumbsItem href="/navigation/breadcrumbs">
        Breadcrumbs
      </BreadcrumbsItem>
    </Breadcrumbs>,
  );

  const delimiters = screen.getAllByTestId(separatorTestId);
  expect(delimiters).toHaveLength(3);
});

it('should throw an error when `BreadcrumbsItem` using outside `Breadcrumbs`', () => {
  // Suppress logging of render error.
  const consoleErrorMock = vi.spyOn(console, 'error').mockImplementation(() => undefined);

  expect(() => render(<BreadcrumbsItem />)).toThrow();

  consoleErrorMock.mockRestore();
});
