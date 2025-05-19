import {
  type ChangeEventHandler,
  type ComponentProps,
  type DragEventHandler,
  type ReactNode,
  forwardRef,
  useId,
  useRef,
  useState,
} from 'react';
import { classNames } from '../../lib/react-helpers.js';
import { Button } from '../button/index.js';

export type FilePickerSelectFilesHandler = (files: File[]) => void;

type FilePickerHTMLProps = ComponentProps<'input'>;

type FilePickerBaseProps = {
  label: ReactNode;
  icon?: ReactNode;
  caption?: ReactNode;
  buttonLabel?: ReactNode;
  onSelectFiles?: FilePickerSelectFilesHandler;
};

export type FilePickerProps =
  & FilePickerBaseProps
  & Omit<FilePickerHTMLProps, (keyof FilePickerBaseProps) | 'type'>;

export const FilePicker = forwardRef<
  HTMLInputElement,
  FilePickerProps
>(function FilePicker({
  label,
  icon,
  caption,
  buttonLabel = 'Browse',
  id,
  style,
  className,
  disabled,
  onSelectFiles,
  ...props
}, ref) {
  const defaultId = useId();
  const inputId = id || defaultId;
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [draggingOver, setDraggingOver] = useState(false);

  const selectFiles = (files: FileList | null) => {
    if (typeof onSelectFiles === 'function') {
      onSelectFiles(files ? Array.from(files) : []);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    selectFiles(event.target.files);
  };

  const handleDragOver: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      setDraggingOver(true);
    }
  };

  const handleDragEnd: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      setDraggingOver(false);
    }
  };

  const handleDrop: DragEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!disabled) {
      setDraggingOver(false);
      selectFiles(event.dataTransfer.files);
    }
  };

  return (
    <div
      style={style}
      className={classNames(className, 'dc-file-picker', {
        'dc-file-picker_disabled': disabled,
        'dc-file-picker_dragging-over': draggingOver,
      })}
      onDragOver={handleDragOver}
      onDragLeave={handleDragEnd}
      onDrop={handleDrop}
      data-testid="file-picker"
    >
      <input
        {...props}
        id={inputId}
        ref={(el) => {
          inputRef.current = el;
          if (typeof ref === 'function') {
            ref(el);
          } else if (ref) {
            ref.current = el;
          }
        }}
        className="dc-file-picker__input"
        type="file"
        disabled={disabled}
        onChange={handleChange}
      />
      <div className="dc-file-picker__body">
        {Boolean(icon) && (
          <div className="dc-file-picker__icon">
            {icon}
          </div>
        )}
        <div>
          <label className="dc-file-picker__label" htmlFor={inputId}>
            {label}
          </label>
          {Boolean(caption) && (
            <div className="dc-file-picker__caption">{caption}</div>
          )}
        </div>
      </div>
      <Button
        className="dc-file-picker__button"
        onClick={() => {
          if (inputRef.current instanceof HTMLInputElement) {
            inputRef.current.click();
          }
        }}
      >
        {buttonLabel}
      </Button>
    </div>
  );
});
