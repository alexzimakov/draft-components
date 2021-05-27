import * as React from 'react';
import { classNames } from '../../lib/react-helpers';

const CSSClasses = {
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
}: React.ComponentPropsWithoutRef<'div'>) {
  return (
    <div
      {...props}
      className={classNames(className, CSSClasses.formattedContent)}
    />
  );
}
FormattedContent.CSSClasses = CSSClasses;
FormattedContent.LargeTitle = LargeTitle;
FormattedContent.Title1 = Title1;
FormattedContent.Title2 = Title2;
FormattedContent.Title3 = Title3;
FormattedContent.Headline = Headline;
FormattedContent.Paragraph = Paragraph;
FormattedContent.Subheadline = Subheadline;
FormattedContent.Footnote = Footnote;
FormattedContent.Caption = Caption;

export interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function LargeTitle({
  as: Component = 'h1',
  className,
  ...props
}: TitleProps) {
  return (
    <Component
      {...props}
      className={classNames(className, CSSClasses.largeTitle)}
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
      className={classNames(className, CSSClasses.title1)}
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
      className={classNames(className, CSSClasses.title2)}
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
      className={classNames(className, CSSClasses.title3)}
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
      className={classNames(className, CSSClasses.headline)}
    />
  );
}

export function Paragraph({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p {...props} className={classNames(className, CSSClasses.paragraph)} />
  );
}

export function Subheadline({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'p'>) {
  return (
    <p {...props} className={classNames(className, CSSClasses.subheadline)} />
  );
}

export function Footnote({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'small'>) {
  return (
    <small {...props} className={classNames(className, CSSClasses.footnote)} />
  );
}

export function Caption({
  className,
  ...props
}: React.ComponentPropsWithoutRef<'small'>) {
  return (
    <small {...props} className={classNames(className, CSSClasses.caption)} />
  );
}
