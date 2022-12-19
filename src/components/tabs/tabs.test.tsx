import userEvent from '@testing-library/user-event';
import { render, screen, within } from '@testing-library/react';
import { Tabs } from './tabs';
import { TabList } from './tab-list';
import { Tab } from './tab';
import { TabPanel } from './tab-panel';

it('renders without errors', () => {
  const label = 'Todos';
  const tabs = [
    {
      name: 'all',
      label: 'All',
      content: 'All tab panel',
    },
    {
      name: 'completed',
      label: 'Completed',
      content: 'Completed tab panel',
    },
    {
      name: 'drafts',
      label: 'Drafts',
      content: 'Drafts tab panel',
    },
  ];
  const selectedTab = tabs[0];
  render(
    <Tabs selectedTab={selectedTab.name} onSelectTab={jest.fn()}>
      <TabList aria-label={label}>
        {tabs.map((tab) => (
          <Tab key={tab.name} name={tab.name}>
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel key={tab.name} tab={tab.name}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );

  const tabList = screen.getByRole('tablist');
  expect(tabList).toHaveAttribute('aria-label', label);

  const tabElements = screen.getAllByRole('tab');
  expect(tabElements).toHaveLength(tabs.length);
  tabElements.forEach((tabEl, index) => {
    const tab = tabs[index];
    const tabIndexValue = String(tab === selectedTab ? 0 : -1);
    const ariaSelectedValue = String(tab === selectedTab);
    expect(tabEl).toHaveTextContent(tab.label);
    expect(tabEl).toHaveAttribute('name', tab.name);
    expect(tabEl).toHaveAttribute('tabindex', tabIndexValue);
    expect(tabEl).toHaveAttribute('aria-selected', ariaSelectedValue);
  });

  expect(screen.getAllByRole('tabpanel')).toHaveLength(1);
  expect(screen.getByRole('tabpanel')).toHaveTextContent(selectedTab.content);
});

it('renders with icon and counter', () => {
  const label = 'Todos';
  const tabs = [
    {
      name: 'all',
      label: 'All',
      content: 'All tab panel',
    },
    {
      name: 'completed',
      label: 'Completed',
      content: 'Completed tab panel',
      icon: <svg role="img" />,
      counter: 3,
    },
  ];
  render(
    <Tabs selectedTab={tabs[0].name} onSelectTab={jest.fn()}>
      <TabList aria-label={label}>
        {tabs.map((tab) => (
          <Tab
            key={tab.name}
            name={tab.name}
            icon={tab.icon}
            counter={tab.counter}
          >
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel key={tab.name} tab={tab.name}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );

  const tabElements = screen.getAllByRole('tab');
  const completedTabEl = tabElements[1];
  const completedTab = tabs[1];
  within(completedTabEl).getByRole('img');
  expect(completedTabEl).toHaveTextContent(
    `${completedTab.label} ${completedTab.counter}`
  );
});

it('can select tab using mouse', async () => {
  const user = userEvent.setup();
  const tabs = [
    {
      name: 'all',
      label: 'All',
      content: 'All tab panel',
    },
    {
      name: 'completed',
      label: 'Completed',
      content: 'Completed tab panel',
    },
    {
      name: 'drafts',
      label: 'Drafts',
      content: 'Drafts tab panel',
    },
  ];
  const selectedTab = tabs[0];
  const expectedTab = tabs[1];
  const onSelectTabMock = jest.fn();
  render(
    <Tabs selectedTab={selectedTab.name} onSelectTab={onSelectTabMock}>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.name} name={tab.name}>
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel key={tab.name} tab={tab.name}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );

  await user.click(screen.getByText(expectedTab.label));

  expect(onSelectTabMock).toHaveBeenCalledTimes(1);
  expect(onSelectTabMock).toHaveBeenCalledWith(expectedTab.name);
});

it('can focus tab using keyboard', async () => {
  const user = userEvent.setup();
  const tabs = [
    {
      name: 'all',
      label: 'All',
      content: 'All tab panel',
    },
    {
      name: 'completed',
      label: 'Completed',
      content: 'Completed tab panel',
    },
    {
      name: 'drafts',
      label: 'Drafts',
      content: 'Drafts tab panel',
    },
  ];
  render(
    <Tabs selectedTab={tabs[0].name} onSelectTab={jest.fn()}>
      <TabList>
        {tabs.map((tab) => (
          <Tab key={tab.name} name={tab.name}>
            {tab.label}
          </Tab>
        ))}
      </TabList>

      {tabs.map((tab) => (
        <TabPanel key={tab.name} tab={tab.name}>
          {tab.content}
        </TabPanel>
      ))}
    </Tabs>
  );

  const [all, completed, drafts] = screen.getAllByRole('tab');

  await user.tab(); // move focus to the selected tab
  expect(all).toHaveFocus();

  await user.keyboard('{ArrowLeft}'); // move focus to the "Drafts" tab
  expect(drafts).toHaveFocus();

  await user.keyboard('{ArrowLeft}'); // move focus to the "Completed" tab
  expect(completed).toHaveFocus();

  await user.keyboard('{ArrowRight}'); // move focus to the "Drafts" tab
  expect(drafts).toHaveFocus();

  await user.keyboard('{ArrowRight}'); // move focus to the "All" tab
  expect(all).toHaveFocus();

  await user.keyboard('{End}'); // move focus to the last tab
  expect(drafts).toHaveFocus();

  await user.keyboard('{Home}'); // move focus to the first tab
  expect(all).toHaveFocus();

  // do not move focus if any other key was pressed
  await user.keyboard('>');
  await user.keyboard('<');
  expect(all).toHaveFocus();
});

it(
  'should throw an error when `TabList`, `Tab`, or `TabPanel` ' +
  'are using outside the `Tabs` component',
  () => {
    // Suppress logging of render error.
    const consoleErrorMock = jest
      .spyOn(console, 'error')
      .mockImplementation(jest.fn());

    expect(() => render(<TabList />)).toThrow();
    expect(() => render(<Tab name="drafts">Drafts</Tab>)).toThrow();
    expect(() => render(<TabPanel tab="drafts">Drafts</TabPanel>)).toThrow();

    consoleErrorMock.mockRestore();
  }
);
