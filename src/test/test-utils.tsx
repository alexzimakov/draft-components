import userEventPkg from '@testing-library/user-event';

// https://github.com/testing-library/user-event/issues/1146
export const userEvent = userEventPkg as unknown as (typeof userEventPkg)['default'];
export * from '@testing-library/react';
