import { Meta, StoryFn } from '@storybook/react';
import { FilterButtons } from './filter-buttons';
import { FilterButton } from './filter-button';
import { useState } from 'react';

const meta: Meta<typeof FilterButtons> = {
  title: 'Navigation/FilterButtons',
  component: FilterButtons,
  argTypes: {
    children: {
      control: { disable: true },
    },
  },
};
export default meta;

export const Basic: StoryFn<typeof FilterButtons> = (args) => {
  const tags = [
    'All tags',
    '#travel',
    '#health',
    '#shopping',
    '#food',
  ];
  const [activeTags, setActiveTags] = useState(new Set([tags[1]]));

  function handleClickTag(tag: string) {
    return () => {
      const allTags = tags[0];

      let newActiveTags: Set<string>;
      if (tag === allTags) {
        newActiveTags = new Set([tag]);
      } else {
        newActiveTags = new Set(activeTags);
        newActiveTags.delete(allTags);

        if (newActiveTags.has(tag)) {
          newActiveTags.delete(tag);
        } else {
          newActiveTags.add(tag);
        }
      }
      setActiveTags(newActiveTags);
    };
  }

  return (
    <FilterButtons {...args}>
      {tags.map((tag) => (
        <FilterButton
          key={tag}
          isActive={activeTags.has(tag)}
          onClick={handleClickTag(tag)}
        >
          {tag}
        </FilterButton>
      ))}
    </FilterButtons>
  );
};
