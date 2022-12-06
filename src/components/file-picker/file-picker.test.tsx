import { fireEvent, render, screen } from '@testing-library/react';
import { FilePicker } from './file-picker';

it('renders without errors', () => {
  const label = 'Upload a profile photo';
  const caption = 'PNG, JPG or GIF (min size 320 × 320px)';
  const buttonLabel = 'Browse...';
  const icon = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      role="img"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );

  render(
    <FilePicker
      icon={icon}
      label={label}
      caption={caption}
      buttonLabel={buttonLabel}
      onSelectFiles={jest.fn()}
    />
  );

  screen.getByRole('img');
  screen.getByText(label);
  screen.getByText(caption);
  expect(screen.getByRole('button')).toHaveTextContent(buttonLabel);
});

it('should select files', () => {
  const label = 'Upload a profile photo';
  const caption = 'PNG, JPG or GIF (min size 320 × 320px)';
  const buttonLabel = 'Browse';
  const expectedFiles = [
    new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
  ];
  const onSelectFilesMock = jest.fn();

  render(
    <FilePicker
      label={label}
      caption={caption}
      buttonLabel={buttonLabel}
      onSelectFiles={onSelectFilesMock}
    />
  );
  fireEvent.change(screen.getByLabelText(label), {
    target: { files: expectedFiles },
  });

  expect(onSelectFilesMock).toHaveBeenCalledTimes(1);
  expect(onSelectFilesMock).toHaveBeenNthCalledWith(1, expectedFiles);
});

it('should select files using drag and drop', () => {
  const label = 'Upload a profile photo';
  const caption = 'PNG, JPG or GIF (min size 320 × 320px)';
  const buttonLabel = 'Browse';
  const expectedFiles = [
    new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
    new File(['(⌐□_□)'], 'chucknorris2.png', { type: 'image/png' }),
  ];
  const onSelectFilesMock = jest.fn();

  render(
    <FilePicker
      label={label}
      caption={caption}
      buttonLabel={buttonLabel}
      onSelectFiles={onSelectFilesMock}
    />
  );

  const filePickerEl = screen.getByTestId('file-picker');
  fireEvent.drag(filePickerEl);
  fireEvent.dragOver(filePickerEl);
  fireEvent.drop(filePickerEl, {
    dataTransfer: { files: expectedFiles },
  });
  fireEvent.dragEnd(filePickerEl);

  expect(onSelectFilesMock).toHaveBeenCalledTimes(1);
  expect(onSelectFilesMock).toHaveBeenNthCalledWith(1, expectedFiles);
});

it(
  'should not invoke `onSelectFiles` callback when the picker is disabled',
  () => {
    const label = 'Upload a profile photo';
    const caption = 'PNG, JPG or GIF (min size 320 × 320px)';
    const buttonLabel = 'Browse';
    const expectedFiles = [
      new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
    ];
    const onSelectFilesMock = jest.fn();

    render(
      <FilePicker
        disabled={true}
        label={label}
        caption={caption}
        buttonLabel={buttonLabel}
        onSelectFiles={onSelectFilesMock}
      />
    );
    fireEvent.drop(screen.getByTestId('file-picker'), {
      dataTransfer: { files: expectedFiles },
    });

    expect(onSelectFilesMock).not.toHaveBeenCalled();
  }
);
