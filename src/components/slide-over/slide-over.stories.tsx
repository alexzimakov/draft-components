import { Meta, StoryFn } from '@storybook/react';
import { useState } from 'react';
import { SlideOver } from './slide-over.js';
import { Button } from '../button/index.js';
import { SlideOverCloseCallback } from './types.js';

const meta: Meta = {
  title: 'Overlays/SlideOver',
  component: SlideOver,
};
export default meta;

export const Basic: StoryFn<typeof SlideOver> = (args) => {
  const [isOpen, setIsOpen] = useState(false);

  const onClose: SlideOverCloseCallback = (source) => {
    setIsOpen(false);
    args.onClose(source);
  };

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>
        Open slide-over
      </Button>
      {isOpen && (
        <SlideOver onClose={onClose}>
          <SlideOver.Header
            title="Slide-over header"
            description="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                width: '100%',
                height: '64px',
                backgroundSize: '10px 10px',
                backgroundImage: 'repeating-linear-gradient('
                  + '45deg, '
                  + 'var(--dc-bg-transparent-2) 0, '
                  + 'var(--dc-bg-transparent-2) 1px, '
                  + 'transparent 0, '
                  + 'transparent 50%'
                  + ')',
              }}
            >
              Slide-over header
            </div>
          </SlideOver.Header>
          <SlideOver.Body>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxSizing: 'border-box',
                width: '100%',
                height: '100%',
                minHeight: '320px',
                backgroundSize: '10px 10px',
                backgroundImage: 'repeating-linear-gradient('
                  + '45deg, '
                  + 'var(--dc-bg-transparent-2) 0, '
                  + 'var(--dc-bg-transparent-2) 1px, '
                  + 'transparent 0, '
                  + 'transparent 50%'
                  + ')',
              }}
            >
              Slide-over body
            </div>
          </SlideOver.Body>
        </SlideOver>
      )}
    </div>
  );
};
