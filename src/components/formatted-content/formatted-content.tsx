import { ComponentPropsWithoutRef } from 'react';
import { classNames } from '../../lib/react-helpers';

export const Styles = {
  formattedContent: 'dc-fmt-content',
  largeTitle: 'dc-fmt-content__large-title',
  title1: 'dc-fmt-content__title-1',
  title2: 'dc-fmt-content__title-2',
  title3: 'dc-fmt-content__title-3',
  headline: 'dc-fmt-content__headline',
  paragraph: 'dc-fmt-content__paragraph',
  subheadline: 'dc-fmt-content__subheadline',
  footnote: 'dc-fmt-content__footnote',
  caption: 'dc-fmt-content__caption',
};

export function FormattedContent({
  className,
  ...props
}: ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={classNames(className, Styles.formattedContent)}
    />
  );
}

FormattedContent.Styles = Styles;
FormattedContent.LargeTitle = LargeTitle;
FormattedContent.Title1 = Title1;
FormattedContent.Title2 = Title2;
FormattedContent.Title3 = Title3;
FormattedContent.Headline = Headline;
FormattedContent.Paragraph = Paragraph;
FormattedContent.Subheadline = Subheadline;
FormattedContent.Footnote = Footnote;
FormattedContent.Caption = Caption;

export interface TitleProps extends ComponentPropsWithoutRef<'h1'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export interface TextBlockProps extends ComponentPropsWithoutRef<'div'> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'div';
}

export interface InlineTextProps extends ComponentPropsWithoutRef<'span'> {
  as?: 'span' | 'small' | 'em' | 'i' | 'strong' | 'b';
}

export function LargeTitle({
  as: Component = 'h1',
  className,
  ...props
}: TitleProps) {
  return (
    <Component
      {...props}
      className={classNames(className, Styles.largeTitle)}
    />
  );
}

export function Title1({
  as: Component = 'h1',
  className,
  ...props
}: TitleProps) {
  return (
    <Component
      {...props}
      className={classNames(className, Styles.title1)}
    />
  );
}

export function Title2({
  as: Component = 'h2',
  className,
  ...props
}: TitleProps) {
  return (
    <Component
      {...props}
      className={classNames(className, Styles.title2)}
    />
  );
}

export function Title3({
  as: Component = 'h3',
  className,
  ...props
}: TitleProps) {
  return (
    <Component
      {...props}
      className={classNames(className, Styles.title3)}
    />
  );
}

export function Headline({
  as: Component = 'h4',
  className,
  ...props
}: TitleProps) {
  return (
    <Component
      {...props}
      className={classNames(className, Styles.headline)}
    />
  );
}

export function Paragraph({
  className,
  as: Component = 'p',
  ...props
}: TextBlockProps) {
  return (
    <Component
      {...props}
      className={classNames(className, Styles.paragraph)}
    />
  );
}

export function Subheadline({
  className,
  as: Component = 'p',
  ...props
}: TextBlockProps) {
  return (
    <Component
      {...props}
      className={classNames(className, Styles.subheadline)}
    />
  );
}

export function Footnote({
  className,
  as: Component = 'small',
  ...props
}: InlineTextProps) {
  return (
    <Component
      {...props}
      className={classNames(className, Styles.footnote)}
    />
  );
}

export function Caption({
  className,
  as: Component = 'small',
  ...props
}: InlineTextProps) {
  return (
    <Component
      {...props}
      className={classNames(className, Styles.caption)}
    />
  );
}
