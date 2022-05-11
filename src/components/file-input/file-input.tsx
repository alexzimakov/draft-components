import {
  CSSProperties,
  DragEvent,
  forwardRef,
  ReactNode,
  useRef,
  useState,
} from 'react';
import { classNames } from '../../lib/react-helpers';
import { uniqueId } from '../../lib/util';
import { FileInputContextProvider } from './file-input-context';
import { SvgIcon } from '../svg-icon';
import { fileEarmarkArrowUp } from '../../bootstrap-icons/file-earmark-arrow-up';
import { Spinner } from '../spinner';

export type FileInputProps = {
  id?: string;
  style?: CSSProperties;
  className?: string;
  shouldShowIcon?: boolean;
  isLoading?: boolean;
  multiple?: boolean;
  disabled?: boolean;
  accept?: string;
  icon?: ReactNode;
  helpText?: ReactNode;
  children: ReactNode;
  onSelectFiles(files: File[]): void;
};

export const FileInput = forwardRef<HTMLInputElement, FileInputProps>(
  function FileInput(
    {
      id: defaultId,
      style,
      className,
      shouldShowIcon = true,
      isLoading = false,
      multiple = false,
      disabled = false,
      accept,
      icon,
      children,
      helpText,
      onSelectFiles,
    },
    ref
  ) {
    const id = useRef(defaultId);
    if (!id.current) {
      id.current = uniqueId('file_input_');
    }
    const isDisabled = disabled || isLoading;
    const [isDragOver, setIsDragOver] = useState(false);

    function handleSelectFiles(fileList: FileList | null): void {
      if (isDisabled) {
        return;
      }

      let files = fileList ? Array.from(fileList) : [];
      if (!multiple) {
        files = files.slice(0, 1);
      }

      onSelectFiles(files);
    }

    function handleDrag(event: DragEvent<HTMLDivElement>): void {
      event.preventDefault();
      event.stopPropagation();
    }

    function handleDragOver(event: DragEvent<HTMLDivElement>): void {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(true);
    }

    function handleDragEnd(event: DragEvent<HTMLDivElement>): void {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);
    }

    function handleDrop(event: DragEvent<HTMLDivElement>): void {
      event.preventDefault();
      event.stopPropagation();
      setIsDragOver(false);
      handleSelectFiles(event.dataTransfer.files);
    }

    return (
      <FileInputContextProvider inputId={id.current}>
        <div
          style={style}
          className={classNames(
            'dc-file-input',
            disabled && 'dc-file-input_disabled',
            className
          )}
        >
          <input
            ref={ref}
            id={id.current}
            accept={accept}
            className="dc-file-input__native"
            disabled={isDisabled}
            multiple={multiple}
            type="file"
            onChange={(event) => {
              const target = event.target;
              handleSelectFiles(target.files);
              target.value = '';
            }}
          />

          <div
            data-testid="dc-file-input-drop-zone"
            className={classNames(
              'dc-file-input__drop-zone',
              isDragOver && 'dc-file-input__drop-zone_drag-over'
            )}
            draggable={!isDisabled}
            onDrag={handleDrag}
            onDragStart={handleDrag}
            onDragOver={handleDragOver}
            onDragEnter={handleDragOver}
            onDragLeave={handleDragEnd}
            onDragEnd={handleDragEnd}
            onDrop={handleDrop}
          >
            {shouldShowIcon && (
              <div className="dc-file-input__icon">
                {icon ?? <SvgIcon size="3x" icon={fileEarmarkArrowUp} />}
              </div>
            )}
            {children && (
              <div className="dc-file-input__content">{children}</div>
            )}
            {helpText && (
              <div className="dc-file-input__help-text">{helpText}</div>
            )}
            <div className="dc-file-input__loading-overlay" hidden={!isLoading}>
              <Spinner />
            </div>
          </div>
        </div>
      </FileInputContextProvider>
    );
  }
);
