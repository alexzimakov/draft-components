import { ComponentPropsWithoutRef, ReactNode } from 'react';
import { classNames } from '../lib/react-helpers';
import './story-section.css';

type StorySectionBaseProps = Omit<ComponentPropsWithoutRef<'div'>, 'children' | 'title'>;
export type StorySectionProps = {
  title: ReactNode;
  children: ReactNode;
} & StorySectionBaseProps;

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
