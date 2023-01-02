import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { NavList } from './nav-list';
import { NavListItem } from './nav-list-item';
import { NavListTitle } from './nav-list-title';
import {
  DocumentChartBarIcon,
  FolderArrowDownIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';

export default {
  title: 'Navigation/NavList',
  component: NavList,
  subcomponents: {
    NavListItem,
  },
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
} as ComponentMeta<typeof NavList>;

export const Basic: ComponentStory<typeof NavList> = (args) => (
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

export const WithIcons: ComponentStory<typeof NavList> = (args) => (
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
WithIcons.args = {
  ...Basic.args,
};

export const WithBadges: ComponentStory<typeof NavList> = (args) => (
  <NavList {...args}>
    <NavListItem href="/home" aria-current="page">Home</NavListItem>
    <NavListItem href="/users">Users</NavListItem>
    <NavListItem href="/projects" badge="7">Projects</NavListItem>
    <NavListItem href="/reports" badge="50+">Reports</NavListItem>
    <NavListItem href="/downloads">Downloads</NavListItem>
  </NavList>
);
WithBadges.args = {
  ...Basic.args,
};

export const WithTitle: ComponentStory<typeof NavList> = (args) => (
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
WithTitle.args = {
  ...Basic.args,
};
