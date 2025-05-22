import { type Meta, type StoryFn } from '@storybook/react';
import { type ComponentProps } from 'react';
import { NavList } from './nav-list.js';
import { NavListItem } from './nav-list-item.js';
import { NavListTitle } from './nav-list-title.js';

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

function DocumentChartBarIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25M9 16.5v.75m3-3v3M15 12v5.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
    </svg>
  );
}

function FolderArrowDownIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m9 13.5 3 3m0 0 3-3m-3 3v-6m1.06-4.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    </svg>
  );
}

function FolderIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
    </svg>
  );
}

function HomeIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
    </svg>
  );
}

function UsersIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      strokeWidth={1.5}
      stroke="currentColor"
      {...props}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 0 0 2.625.372 9.337 9.337 0 0 0 4.121-.952 4.125 4.125 0 0 0-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 0 1 8.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0 1 11.964-3.07M12 6.375a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0Zm8.25 2.25a2.625 2.625 0 1 1-5.25 0 2.625 2.625 0 0 1 5.25 0Z" />
    </svg>
  );
}
