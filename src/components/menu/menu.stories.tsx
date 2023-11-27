import { Meta, StoryFn } from '@storybook/react';
import { Menu } from './menu.js';
import { ArrowDownTrayIcon, DocumentDuplicateIcon, PencilIcon, TrashIcon } from '@heroicons/react/24/outline';

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
  button: {
    control: 'text',
  },
  children: {
    control: { disable: true },
  },
};
Basic.args = {
  button: 'Open menu',
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
      Rename
    </Menu.Item>
    <Menu.Separator />
    <Menu.Item iconLeft={<TrashIcon width={16} height={16} />} destructive={true}>
      Delete
    </Menu.Item>
  </Menu>
);
WithIcon.storyName = 'With icon';
WithIcon.argTypes = {
  button: {
    control: 'text',
  },
  children: {
    control: { disable: true },
  },
};
WithIcon.args = {
  button: 'Open menu',
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
  button: {
    control: 'text',
  },
  children: {
    control: { disable: true },
  },
};
DisabledItems.args = {
  button: 'Open menu',
};
