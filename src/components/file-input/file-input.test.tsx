import { fireEvent, render, screen } from '@testing-library/react';
import { FileInput } from './file-input';
import { FileInputButton } from './file-input-button';

it('renders without errors', () => {
  const iconTestId = 'icon';
  const icon = (
    <svg data-testid={iconTestId} viewBox="0 0 10 10" width={10} height={10}>
      <circle cx={5} cy={5} r={10} />
    </svg>
  );
  const buttonLabel = 'Choose Files';
  const helpText = 'or drag and drop';
  render(
    <FileInput icon={icon} helpText={helpText} onSelectFiles={jest.fn()}>
      <FileInputButton>{buttonLabel}</FileInputButton>
    </FileInput>
  );

  screen.getByTestId(iconTestId);
  screen.getByText(buttonLabel);
  screen.getByText(helpText);
});

it('should throw an error when FileInputButton using outside FileInput', () => {
  const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

  expect(() => {
    render(<FileInputButton>Choose Files</FileInputButton>);
  }).toThrow();

  consoleErrorSpy.mockRestore();
});

it('should select files using file input', () => {
  const buttonLabel = 'Choose Files';
  const expectedFiles = [
    new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
  ];
  const onSelectFilesMock = jest.fn();

  render(
    <FileInput onSelectFiles={onSelectFilesMock}>
      <FileInputButton>{buttonLabel}</FileInputButton>
    </FileInput>
  );

  fireEvent.change(screen.getByLabelText(buttonLabel), {
    target: {
      files: expectedFiles,
    },
  });
  expect(onSelectFilesMock).toHaveBeenCalledTimes(1);
  expect(onSelectFilesMock).toHaveBeenNthCalledWith(1, expectedFiles);
});

it('should select files using drag and drop', () => {
  const buttonLabel = 'Choose Files';
  const expectedFiles = [
    new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
    new File(['(⌐□_□)'], 'chucknorris2.png', { type: 'image/png' }),
  ];
  const onSelectFilesMock = jest.fn();

  render(
    <FileInput onSelectFiles={onSelectFilesMock}>
      <FileInputButton>{buttonLabel}</FileInputButton>
    </FileInput>
  );

  const dropZone = screen.getByTestId('dc-file-input-drop-zone');
  fireEvent.drag(dropZone);
  fireEvent.dragOver(dropZone);
  fireEvent.drop(dropZone, {
    dataTransfer: {
      files: expectedFiles,
    },
  });
  fireEvent.dragEnd(dropZone);

  expect(onSelectFilesMock).toHaveBeenCalledTimes(1);
  expect(onSelectFilesMock).toHaveBeenNthCalledWith(
    1,
    expectedFiles.slice(0, 1)
  );
});

it('should invoke onSelectFiles callback with only all files when multiple is true', () => {
  const buttonLabel = 'Choose Files';
  const expectedFiles = [
    new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
    new File(['(⌐□_□)'], 'chucknorris2.png', { type: 'image/png' }),
  ];
  const onSelectFilesMock = jest.fn();

  render(
    <FileInput multiple={true} onSelectFiles={onSelectFilesMock}>
      <FileInputButton>{buttonLabel}</FileInputButton>
    </FileInput>
  );

  fireEvent.drop(screen.getByTestId('dc-file-input-drop-zone'), {
    dataTransfer: {
      files: expectedFiles,
    },
  });

  expect(onSelectFilesMock).toHaveBeenCalledTimes(1);
  expect(onSelectFilesMock).toHaveBeenNthCalledWith(1, expectedFiles);
});

it('should not invoke onSelectFiles callback when disabled is true', () => {
  const buttonLabel = 'Choose Files';
  const expectedFiles = [
    new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
  ];
  const onSelectFilesMock = jest.fn();

  render(
    <FileInput disabled={true} onSelectFiles={onSelectFilesMock}>
      <FileInputButton>{buttonLabel}</FileInputButton>
    </FileInput>
  );

  fireEvent.drop(screen.getByTestId('dc-file-input-drop-zone'), {
    dataTransfer: {
      files: expectedFiles,
    },
  });

  expect(onSelectFilesMock).not.toHaveBeenCalled();
});

it('should not invoke onSelectFiles callback when isLoading is true', () => {
  const buttonLabel = 'Choose Files';
  const expectedFiles = [
    new File(['(⌐□_□)'], 'chucknorris.png', { type: 'image/png' }),
  ];
  const onSelectFilesMock = jest.fn();

  render(
    <FileInput isLoading={true} onSelectFiles={onSelectFilesMock}>
      <FileInputButton>{buttonLabel}</FileInputButton>
    </FileInput>
  );

  fireEvent.drop(screen.getByTestId('dc-file-input-drop-zone'), {
    dataTransfer: {
      files: expectedFiles,
    },
  });

  expect(onSelectFilesMock).not.toHaveBeenCalled();
});

it('should invoke onSelectFiles callback with empty array', () => {
  const buttonLabel = 'Choose Files';
  const onSelectFilesMock = jest.fn();

  render(
    <FileInput multiple={true} onSelectFiles={onSelectFilesMock}>
      <FileInputButton>{buttonLabel}</FileInputButton>
    </FileInput>
  );

  fireEvent.drop(screen.getByTestId('dc-file-input-drop-zone'), {
    dataTransfer: {
      files: null,
    },
  });

  expect(onSelectFilesMock).toHaveBeenCalledTimes(1);
  expect(onSelectFilesMock).toHaveBeenNthCalledWith(1, []);
});
