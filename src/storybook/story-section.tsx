import { ComponentProps, ReactNode } from 'react';
import { classNames } from '../lib/react-helpers.js';
import './story-section.css';

type StorySectionHTMLProps = ComponentProps<'div'>;

type StorySectionBaseProps = {
  title: ReactNode;
  children: ReactNode;
};

export type StorySectionProps =
  & StorySectionBaseProps
  & Omit<StorySectionHTMLProps, keyof StorySectionBaseProps>;

export function StorySection({
  className,
  title,
  children,
  ...props
}: StorySectionProps) {
  return (
    <section {...props} className={classNames('story-section', className)}>
      {title
        ? <h1 className="story-section__title">{title}</h1>
        : null}
      <div className="story-section__content">{children}</div>
    </section>
  );
}
