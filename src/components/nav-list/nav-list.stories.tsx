import { Meta, StoryFn } from '@storybook/react';
import { NavList } from './nav-list';
import { NavListItem } from './nav-list-item';
import { NavListTitle } from './nav-list-title';
import DocumentChartBarIcon from '@heroicons/react/24/outline/DocumentChartBarIcon';
import FolderArrowDownIcon from '@heroicons/react/24/outline/FolderArrowDownIcon';
import FolderIcon from '@heroicons/react/24/outline/FolderIcon';
import HomeIcon from '@heroicons/react/24/outline/HomeIcon';
import UsersIcon from '@heroicons/react/24/outline/UsersIcon';

const meta: Meta<typeof NavList> = {
  title: 'Navigation/NavList',
  component: NavList,
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof NavList> = (args) => (
  <NavList {...args}>
    <NavListItem href="/home" aria-current="page">Home</NavListItem>
    <NavListItem href="/users">Users</NavListItem>
    <NavListItem href="/projects">Projects</NavListItem>
    <NavListItem href="/reports">Reports</NavListItem>
    <NavListItem href="/downloads">Downloads</NavListItem>
  </NavList>
);
Basic.args = {
  style: {
    maxWidth: 256,
  },
};

export const WithIcons: StoryFn<typeof NavList> = (args) => (
  <NavList {...args}>
    <NavListItem
      icon={<HomeIcon width={18} height={18} />}
      href="/home"
      aria-current="page"
    >
      Home
    </NavListItem>
    <NavListItem
      icon={<UsersIcon width={18} height={18} />}
      href="/users"
    >
      Users
    </NavListItem>
    <NavListItem
      icon={<FolderIcon width={18} height={18} />}
      href="/projects"
    >
      Projects
    </NavListItem>
    <NavListItem
      icon={<DocumentChartBarIcon width={18} height={18} />}
      href="/reports"
    >
      Reports
    </NavListItem>
    <NavListItem
      icon={<FolderArrowDownIcon width={18} height={18} />}
      href="/downloads"
    >
      Downloads
    </NavListItem>
  </NavList>
);
WithIcons.storyName = 'With icons';
WithIcons.args = {
  ...Basic.args,
};

export const WithBadges: StoryFn<typeof NavList> = (args) => (
  <NavList {...args}>
    <NavListItem href="/home" aria-current="page">Home</NavListItem>
    <NavListItem href="/users">Users</NavListItem>
    <NavListItem href="/projects" badge="7">Projects</NavListItem>
    <NavListItem href="/reports" badge="50+">Reports</NavListItem>
    <NavListItem href="/downloads">Downloads</NavListItem>
  </NavList>
);
WithBadges.storyName = 'With badges';
WithBadges.args = {
  ...Basic.args,
};

export const WithTitle: StoryFn<typeof NavList> = (args) => (
  <NavList {...args}>
    <NavListItem href="/home" aria-current="page">Home</NavListItem>
    <NavListItem href="/users">Users</NavListItem>
    <NavListItem href="/projects" badge="7">Projects</NavListItem>
    <NavListItem href="/reports" badge="50+">Reports</NavListItem>
    <NavListItem href="/downloads">Downloads</NavListItem>

    <NavListTitle>Shared</NavListTitle>
    <NavListItem href="/shared/projects">Projects</NavListItem>
    <NavListItem href="/shared/reports">Reports</NavListItem>
  </NavList>
);
WithTitle.storyName = 'With title';
WithTitle.args = {
  ...Basic.args,
};
