import * as React from 'react';
import { FormattedContent } from '../formatted-content';
import { classNames } from '../../lib';

export interface CaptionProps extends React.ComponentPropsWithoutRef<'small'> {}

export function Caption({ className, children, ...props }: CaptionProps) {
  return (
    <small
      {...props}
      className={classNames(
        className,
        FormattedContent.styles.footnote,
        'dc-caption'
      )}
    >
      {children}
    </small>
  );
}
