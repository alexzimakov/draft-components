import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { Tabs } from './tabs';
import { SvgIcon } from '../svg-icon';
import { hammer } from '../../bootstrap-icons/hammer';

it('renders without errors', () => {
  const TabKeys = {
    WORK: 'work',
    DEVELOP: 'develop',
    GAMES: 'games',
  };
  render(
    <Tabs selectedTabKey={TabKeys.DEVELOP} onSelectTab={jest.fn()}>
      <Tabs.List>
        <Tabs.Tab tabKey={TabKeys.WORK}>Work</Tabs.Tab>
        <Tabs.Tab tabKey={TabKeys.DEVELOP} icon={<SvgIcon icon={hammer} />}>
          Develop
        </Tabs.Tab>
        <Tabs.Tab tabKey={TabKeys.GAMES} badge={7}>
          Games
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel associatedTabKey={TabKeys.WORK}>Work tab content</Tabs.Panel>
      <Tabs.Panel associatedTabKey={TabKeys.DEVELOP}>
        Develop tab content
      </Tabs.Panel>
      <Tabs.Panel associatedTabKey={TabKeys.GAMES}>
        Games tab content
      </Tabs.Panel>
    </Tabs>
  );

  screen.getByRole('tablist');
  expect(screen.getAllByRole('tab')).toHaveLength(3);
  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);

  expect(screen.getByText('Develop')).toHaveAttribute('aria-selected', 'true');
  screen.getByText('Develop tab content');
});

it('can select tab using mouse', async () => {
  const user = userEvent.setup();
  const TabKeys = {
    WORK: 'work',
    DEVELOP: 'develop',
    GAMES: 'games',
  };
  const onSelectTabMock = jest.fn();
  render(
    <Tabs selectedTabKey={TabKeys.DEVELOP} onSelectTab={onSelectTabMock}>
      <Tabs.List>
        <Tabs.Tab tabKey={TabKeys.WORK}>Work</Tabs.Tab>
        <Tabs.Tab tabKey={TabKeys.DEVELOP}>Develop</Tabs.Tab>
        <Tabs.Tab tabKey={TabKeys.GAMES}>Games</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel associatedTabKey={TabKeys.WORK}>Work tab content</Tabs.Panel>
      <Tabs.Panel associatedTabKey={TabKeys.DEVELOP}>
        Develop tab content
      </Tabs.Panel>
      <Tabs.Panel associatedTabKey={TabKeys.GAMES}>
        Games tab content
      </Tabs.Panel>
    </Tabs>
  );

  await user.click(screen.getByText('Games'));

  expect(onSelectTabMock).toHaveBeenCalledTimes(1);
  expect(onSelectTabMock).toHaveBeenCalledWith(TabKeys.GAMES);
});

it('can move focus between tabs using keyboard', async () => {
  const user = userEvent.setup();
  const TabKeys = {
    WORK: 'work',
    DEVELOP: 'develop',
    GAMES: 'games',
  };
  const onSelectTabMock = jest.fn();
  render(
    <Tabs selectedTabKey={TabKeys.DEVELOP} onSelectTab={onSelectTabMock}>
      <Tabs.List>
        <Tabs.Tab tabKey={TabKeys.WORK}>{TabKeys.WORK}</Tabs.Tab>
        <Tabs.Tab tabKey={TabKeys.DEVELOP}>{TabKeys.DEVELOP}</Tabs.Tab>
        <Tabs.Tab tabKey={TabKeys.GAMES}>{TabKeys.GAMES}</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel associatedTabKey={TabKeys.WORK}>Work tab content</Tabs.Panel>
      <Tabs.Panel associatedTabKey={TabKeys.DEVELOP}>
        Develop tab content
      </Tabs.Panel>
      <Tabs.Panel associatedTabKey={TabKeys.GAMES}>
        Games tab content
      </Tabs.Panel>
    </Tabs>
  );

  await user.tab();
  expect(screen.getByText(TabKeys.DEVELOP)).toHaveFocus();

  await user.keyboard('{ArrowLeft}');
  expect(screen.getByText(TabKeys.WORK)).toHaveFocus();

  await user.keyboard('{ArrowLeft}');
  expect(screen.getByText(TabKeys.GAMES)).toHaveFocus();

  await user.keyboard('{ArrowRight}');
  expect(screen.getByText(TabKeys.WORK)).toHaveFocus();

  await user.keyboard('{ArrowRight}');
  expect(screen.getByText(TabKeys.DEVELOP)).toHaveFocus();

  await user.keyboard('{Home}');
  expect(screen.getByText(TabKeys.WORK)).toHaveFocus();

  await user.keyboard('{End}');
  expect(screen.getByText(TabKeys.GAMES)).toHaveFocus();
});
