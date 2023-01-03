import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Breadcrumbs } from './breadcrumbs';
import { BreadcrumbsItem } from './breadcrumbs-item';
import { ChevronRightIcon, HomeIcon } from '@heroicons/react/24/outline';

export default {
  title: 'Navigation/Breadcrumbs',
  component: Breadcrumbs,
  subcomponents: {
    BreadcrumbsItem,
  },
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
} as ComponentMeta<typeof Breadcrumbs>;

export const Basic: ComponentStory<typeof Breadcrumbs> = (args) => (
  <Breadcrumbs {...args}>
    <BreadcrumbsItem href="/" icon={<HomeIcon width={18} height={18} />}>
      Home
    </BreadcrumbsItem>
    <BreadcrumbsItem href="/navigation">
      Navigation
    </BreadcrumbsItem>
    <BreadcrumbsItem href="/navigation/breadcrumbs" aria-current="page">
      Breadcrumbs
    </BreadcrumbsItem>
  </Breadcrumbs>
);

export const CustomSeparator = Basic.bind({});
CustomSeparator.argTypes = {
  separator: {
    control: { disable: true },
  },
};
CustomSeparator.args = {
  separator: <ChevronRightIcon height={16} />,
};
