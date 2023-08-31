import { Meta, StoryFn } from '@storybook/react';
import { StorySection } from '../../storybook/story-section';
import { Textarea, TextareaWidth } from './textarea';

const meta: Meta<typeof Textarea> = {
  title: 'Forms/Textarea',
  component: Textarea,
  args: {
    isBlock: false,
    showCharacterCount: false,
    rows: 3,
    size: 'md',
  },
};
export default meta;

export const Basic: StoryFn<typeof Textarea> = (args) => (
  <Textarea {...args} />
);
Basic.args = {
  placeholder: 'Add your comment...',
};

export const Disabled = Basic.bind({});
Disabled.args = {
  disabled: true,
  placeholder: 'Add your comment...',
};

export const Invalid = Basic.bind({});
Invalid.args = {
  'placeholder': 'Add your comment...',
  'aria-invalid': true,
};

export const FullWidth = Basic.bind({});
FullWidth.args = {
  isBlock: true,
  placeholder: 'Add your comment...',
};

export const CharacterCount = Basic.bind({});
CharacterCount.args = {
  placeholder: 'Add your comment...',
  showCharacterCount: true,
  maxLength: 200,
  width: '60ch',
};

export const Widths: StoryFn<typeof Textarea> = (args) => {
  const widths: TextareaWidth[] = [
    '80ch',
    '60ch',
    '40ch',
    '30ch',
  ];
  const labels: Record<TextareaWidth, string> = {
    '80ch': '80 character width',
    '60ch': '60 character width',
    '40ch': '40 character width',
    '30ch': '30 character width',
  };
  return (
    <>
      {widths.map((width) => {
        const label = labels[width];
        return (
          <StorySection key={width} heading={label}>
            <Textarea {...args} width={width} aria-label={label} />
          </StorySection>
        );
      })}
    </>
  );
};
Widths.parameters = {
  controls: {
    exclude: ['width'],
  },
};
Widths.args = {};
