import '../../tests/match-media.mock';
import userEvent from '@testing-library/user-event';
import { render, screen } from '@testing-library/react';
import { SlideOver } from './slide-over';

const title = 'Slide-over test';
const description = 'Dummy description';
const content = 'Lorem ipsum';

const originalAnimateMethod = HTMLElement.prototype.animate;
const originalGetAnimationsMethod = HTMLElement.prototype.getAnimations;

beforeEach(() => {
  class AnimationMock {
    // Properties
    id = '';
    effect = null;
    timeline = null;
    startTime = null;
    currentTime = null;
    playbackRate = 0;
    readonly playState = 'running';
    readonly replaceState = 'active';
    readonly pending = true;

    get ready() {
      return Promise.resolve(this);
    }

    get finished() {
      return Promise.resolve(this);
    }

    // Event handlers
    onfinish = null;
    oncancel = null;
    onremove = null;
    dispatchEvent = jest.fn();
    addEventListener = jest.fn();
    removeEventListener = jest.fn();

    // Methods
    cancel = jest.fn();
    finish = jest.fn();
    play = jest.fn();
    pause = jest.fn();
    updatePlaybackRate = jest.fn();
    reverse = jest.fn();
    persist = jest.fn();
    commitStyles = jest.fn();
  }

  HTMLElement.prototype.animate = function animate() {
    return new AnimationMock();
  };
  HTMLElement.prototype.getAnimations = function getAnimations() {
    return [new AnimationMock()];
  };
});

afterEach(() => {
  HTMLElement.prototype.animate = originalAnimateMethod;
  HTMLElement.prototype.getAnimations = originalGetAnimationsMethod;
});

it('renders without errors', () => {
  render(
    <SlideOver onClose={jest.fn()}>
      <SlideOver.Header
        title={title}
        description={description}
      />
      <SlideOver.Body>
        {content}
      </SlideOver.Body>
    </SlideOver>,
  );

  screen.getByText(title);
  screen.getByText(description);
  screen.getByText(content);
  expect(screen.getByRole('dialog')).toBe(screen.getByLabelText(title));
});


it('close slide-over when Escape key pressed', async () => {
  const user = userEvent.setup();
  const onCloseMock = jest.fn();
  render(
    <SlideOver onClose={onCloseMock}>
      <SlideOver.Header
        title={title}
        description={description}
      />
      <SlideOver.Body>
        {content}
      </SlideOver.Body>
    </SlideOver>,
  );

  await user.type(screen.getByRole('dialog'), '{Escape}');
  expect(onCloseMock).toHaveBeenCalledTimes(1);
  expect(onCloseMock).toHaveBeenCalledWith('escape');
});

it('close slide-over after click on backdrop', async () => {
  const user = userEvent.setup();
  const onCloseMock = jest.fn();
  render(
    <SlideOver onClose={onCloseMock}>
      <SlideOver.Header
        title={title}
        description={description}
      />
      <SlideOver.Body>
        {content}
      </SlideOver.Body>
    </SlideOver>,
  );

  await user.click(screen.getByTestId('slide-over-backdrop'));
  expect(onCloseMock).toHaveBeenCalledTimes(1);
  expect(onCloseMock).toHaveBeenCalledWith('backdrop');
});

it('close slide-over after click on close button', async () => {
  const user = userEvent.setup();
  const closeButtonAccessibleName = 'close slide-over';
  const onCloseMock = jest.fn();
  const onClickCloseButtonMock = jest.fn();
  render(
    <SlideOver onClose={onCloseMock}>
      <SlideOver.Header
        title={title}
        description={description}
        closeButtonAccessibleName={closeButtonAccessibleName}
        onClickCloseButton={onClickCloseButtonMock}
      />
      <SlideOver.Body>
        {content}
      </SlideOver.Body>
    </SlideOver>,
  );

  await user.click(screen.getByLabelText(closeButtonAccessibleName));
  expect(onCloseMock).toHaveBeenCalledTimes(1);
  expect(onCloseMock).toHaveBeenCalledWith('close-button');
  expect(onClickCloseButtonMock).toHaveBeenCalledTimes(1);
});

it('should capture focus', async () => {
  const user = userEvent.setup();
  const closeButtonAccessibleName = 'close slide-over';
  render(
    <SlideOver onClose={jest.fn()}>
      <SlideOver.Header
        title={title}
        description={description}
        closeButtonAccessibleName={closeButtonAccessibleName}
      />
      <SlideOver.Body>
        <input />
      </SlideOver.Body>
    </SlideOver>,
  );

  await user.tab();
  expect(screen.getByLabelText(closeButtonAccessibleName)).toHaveFocus();

  await user.tab();
  expect(screen.getByRole('textbox')).toHaveFocus();

  await user.tab();
  expect(screen.getByLabelText(closeButtonAccessibleName)).toHaveFocus();

  await user.tab({ shift: true });
  expect(screen.getByRole('textbox')).toHaveFocus();
});
