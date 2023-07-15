import { Meta, StoryFn } from '@storybook/react';
import { Caption, CaptionAppearance } from './caption';

const meta: Meta<typeof Caption> = {
  title: 'Caption',
  component: Caption,
  args: {
    showIcon: false,
  },
};
export default meta;

export const Basic: StoryFn<typeof Caption> = (args) => {
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
