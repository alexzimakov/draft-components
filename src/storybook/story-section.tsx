import { type ComponentPropsWithoutRef, type ReactNode } from 'react';
import { classNames } from '../lib/react-helpers';
import './story-section.css';

type StorySectionBaseProps = Omit<ComponentPropsWithoutRef<'div'>, 'children'>;
export type StorySectionProps = {
  heading: ReactNode;
  children: ReactNode;
} & StorySectionBaseProps;

export function StorySection({
  heading,
  className,
  children,
  ...props
}: StorySectionProps) {
  const shouldRenderHeading = Boolean(heading);

  return (
    <section {...props} className={classNames('story-section', className)}>
      {shouldRenderHeading && (
        <h1 className="story-section__heading">{heading}</h1>
      )}
      <div>{children}</div>
    </section>
  );
}
