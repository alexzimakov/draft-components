import { type ComponentMeta, type ComponentStory } from '@storybook/react';
import { Textarea, type TextareaWidth } from './textarea';

export default {
  title: 'Forms/Textarea',
  component: Textarea,
  args: {
    hasError: false,
    isBlock: false,
    showCharacterCount: false,
    rows: 3,
    size: 'md',
  },
} as ComponentMeta<typeof Textarea>;

export const Basic: ComponentStory<typeof Textarea> = (args) => (
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

export const HasError = Basic.bind({});
HasError.args = {
  hasError: true,
  placeholder: 'Add your comment...',
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

export const Widths: ComponentStory<typeof Textarea> = (args) => {
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
  const labelStyle = {
    fontFamily: 'var(--dc-font-sans)',
    display: 'inline-block',
    marginBottom: 4,
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    }}>
      {widths.map((width) => (
        <div key={width}>
          <label style={labelStyle} htmlFor={width}>{labels[width]}</label>
          <br />
          <Textarea {...args} id={width} width={width} />
        </div>
      ))}
    </div>
  );
};
Widths.parameters = {
  controls: {
    exclude: ['width'],
  },
};
Widths.args = {};
