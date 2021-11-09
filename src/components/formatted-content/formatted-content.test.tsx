import { render, screen } from '@testing-library/react';
import { FormattedContent } from './formatted-content';

it('renders without errors', () => {
  const content = {
    formatted: 'Formatted content text',
    largeTitle: 'Large title',
    title1: 'Title 1',
    title2: 'Title 2',
    title3: 'Title 3',
    headline: 'Headline',
    paragraph: 'Paragraph',
    subheadline: 'Subheadline',
    footnote: 'footnote',
    caption: 'Caption',
  };
  render(
    <>
      <FormattedContent>{content.formatted}</FormattedContent>
      <FormattedContent.LargeTitle>
        {content.largeTitle}
      </FormattedContent.LargeTitle>
      <FormattedContent.Title1>{content.title1}</FormattedContent.Title1>
      <FormattedContent.Title2>{content.title2}</FormattedContent.Title2>
      <FormattedContent.Title3>{content.title3}</FormattedContent.Title3>
      <FormattedContent.Headline>{content.headline}</FormattedContent.Headline>
      <FormattedContent.Paragraph>
        {content.paragraph}
      </FormattedContent.Paragraph>
      <FormattedContent.Subheadline>
        {content.subheadline}
      </FormattedContent.Subheadline>
      <FormattedContent.Footnote>{content.footnote}</FormattedContent.Footnote>
      <FormattedContent.Caption>{content.caption}</FormattedContent.Caption>
    </>,
  );

  screen.getByText(content.formatted);
  screen.getByText(content.largeTitle);
  screen.getByText(content.title1);
  screen.getByText(content.title2);
  screen.getByText(content.title3);
  screen.getByText(content.headline);
  screen.getByText(content.paragraph);
  screen.getByText(content.subheadline);
  screen.getByText(content.footnote);
  screen.getByText(content.caption);
});
