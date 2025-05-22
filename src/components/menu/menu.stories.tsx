import { type Meta, type StoryFn } from '@storybook/react';
import { type ComponentProps } from 'react';
import { Menu } from './menu.js';
import { Button } from '../button/index.js';

const meta: Meta<typeof Menu> = {
  title: 'Navigation/Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Basic: StoryFn<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item>Save</Menu.Item>
    <Menu.Item>Rename</Menu.Item>
    <Menu.Item>Duplicate</Menu.Item>
    <Menu.Separator />
    <Menu.Item destructive={true}>Delete</Menu.Item>
  </Menu>
);
Basic.argTypes = {
  renderButton: {
    control: { disable: true },
  },
  children: {
    control: { disable: true },
  },
};
Basic.args = {
  renderButton: (props) => <Button {...props}>Open Menu</Button>,
};

export const WithIcon: StoryFn<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item iconLeft={<ArrowDownTrayIcon width={16} height={16} />}>
      Save
    </Menu.Item>
    <Menu.Item iconLeft={<PencilIcon width={16} height={16} />}>
      Rename
    </Menu.Item>
    <Menu.Item iconLeft={<DocumentDuplicateIcon width={16} height={16} />}>
      Duplicate
    </Menu.Item>
    <Menu.Separator />
    <Menu.Item iconLeft={<TrashIcon width={16} height={16} />} destructive={true}>
      Delete
    </Menu.Item>
  </Menu>
);
WithIcon.storyName = 'With icon';
WithIcon.argTypes = {
  renderButton: {
    control: 'text',
  },
  children: {
    control: { disable: true },
  },
};
WithIcon.args = {
  renderButton: (props) => <Button {...props}>Open Menu</Button>,
};

export const DisabledItems: StoryFn<typeof Menu> = (args) => (
  <Menu {...args}>
    <Menu.Item>Save</Menu.Item>
    <Menu.Item disabled={true}>Rename</Menu.Item>
    <Menu.Item>Duplicate</Menu.Item>
    <Menu.Separator />
    <Menu.Item destructive={true} disabled={true}>Delete</Menu.Item>
  </Menu>
);
DisabledItems.argTypes = {
  renderButton: {
    control: 'text',
  },
  children: {
    control: { disable: true },
  },
};
DisabledItems.args = {
  renderButton: (props) => <Button {...props}>Open Menu</Button>,
};

function ArrowDownTrayIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
    </svg>
  );
}

function DocumentDuplicateIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 0 0-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 0 1-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H9.75" />
    </svg>
  );
}

function PencilIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
    </svg>
  );
}

function TrashIcon(props: ComponentProps<'svg'>) {
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
      <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
    </svg>
  );
}
