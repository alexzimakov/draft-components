import { render, screen } from '@testing-library/react';
import { VerticalNavigation } from './vertical-navigation';
import { Tag } from '../tag';
import { SvgIcon } from '../svg-icon';
import { clipboardData } from '../../bootstrap-icons/clipboard-data';
import { VerticalNavigationItemProps } from './vertical-navigation-item';

it('renders without errors', () => {
  render(
    <VerticalNavigation>
      <VerticalNavigation.Item href="#home">Home</VerticalNavigation.Item>
      <VerticalNavigation.Item
        href="#projects"
        badge={<Tag isRounded={true}>7</Tag>}
      >
        Projects
      </VerticalNavigation.Item>
      <VerticalNavigation.Item
        href="#reports"
        icon={<SvgIcon icon={clipboardData} />}
      >
        Reports
      </VerticalNavigation.Item>
    </VerticalNavigation>
  );

  const links = screen.getAllByRole('link');

  expect(links).toHaveLength(3);
  expect(links[0]).toHaveTextContent('Home');
  expect(links[1]).toHaveTextContent('Projects 7');
  expect(links[2]).toHaveTextContent('Reports');
});

it('should render item using custom renderer', () => {
  const renderItem: VerticalNavigationItemProps['renderAs'] = (props) => (
    <button {...props} />
  );
  render(
    <VerticalNavigation>
      <VerticalNavigation.Item renderAs={renderItem}>
        Home
      </VerticalNavigation.Item>
      <VerticalNavigation.Item renderAs={renderItem}>
        Projects
      </VerticalNavigation.Item>
      <VerticalNavigation.Item renderAs={renderItem}>
        Reports
      </VerticalNavigation.Item>
    </VerticalNavigation>
  );

  const buttons = screen.getAllByRole('button');

  expect(buttons).toHaveLength(3);
  expect(buttons[0]).toHaveTextContent('Home');
  expect(buttons[1]).toHaveTextContent('Projects');
  expect(buttons[2]).toHaveTextContent('Reports');
});
