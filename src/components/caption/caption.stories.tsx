import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Caption, type CaptionAppearance } from './caption';

export default {
  title: 'Caption',
  component: Caption,
  args: {
    showIcon: false,
  },
} as ComponentMeta<typeof Caption>;

export const Basic: ComponentStory<typeof Caption> = (args) => {
  const appearances: CaptionAppearance[] = [
    'default',
    'info',
    'success',
    'error',
    'warning',
  ];
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}>
      {appearances.map((appearance) => (
        <Caption {...args} key={appearance} appearance={appearance} />
      ))}
    </div>
  );
};
Basic.args = {
  children: 'You can use letters, numbers & periods.',
};

export const WithIcon = Basic.bind({});
WithIcon.args = {
  children: 'You can use letters, numbers & periods.',
  showIcon: true,
};
