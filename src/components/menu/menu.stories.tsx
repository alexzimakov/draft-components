import { type Meta, type StoryFn } from '@storybook/react';
import { Menu } from './menu';
import { MenuItem } from './menu-item';
import { MenuSeparator } from './menu-separator';
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
    <MenuItem>Save</MenuItem>
    <MenuItem>Rename</MenuItem>
    <MenuItem>Duplicate</MenuItem>
    <MenuSeparator />
    <MenuItem appearance="destructive">Delete</MenuItem>
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
    <MenuItem leftIcon={<ArrowDownTrayIcon width={16} height={16} />}>
      Save
    </MenuItem>
    <MenuItem leftIcon={<PencilIcon width={16} height={16} />}>
      Rename
    </MenuItem>
    <MenuItem leftIcon={<DocumentDuplicateIcon width={16} height={16} />}>
      Rename
    </MenuItem>
    <MenuSeparator />
    <MenuItem
      leftIcon={<TrashIcon width={16} height={16} />}
      appearance="destructive"
    >
      Delete
    </MenuItem>
  </Menu>
);
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
