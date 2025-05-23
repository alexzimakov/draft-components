import { type Meta } from '@storybook/react';
import { type ComponentProps, type ReactNode, useRef, useState } from 'react';
import { Dialog } from './dialog.js';
import { Button } from '../button/index.js';
import { FormField } from '../form-field/index.js';
import { TextInput } from '../text-input/index.js';
import { PasswordInput } from '../password-input/index.js';
import { Menu, MenuItem } from '../menu/index.js';

const meta: Meta<typeof Dialog> = {
  title: 'Overlays/Dialog',
  component: Dialog,
  parameters: {
    layout: 'centered',
  },
};
export default meta;

export const Basic = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isPhoneCheckDialogOpen, setIsPhoneCheckDialogOpen] = useState(false);

  const openDialog = () => {
    return setIsOpen(true);
  };

  const closeDialog = () => {
    return setIsOpen(false);
  };

  const openPhoneCheckDialogOpen = () => {
    return setIsPhoneCheckDialogOpen(true);
  };

  const closePhoneCheckDialogOpen = () => {
    return setIsPhoneCheckDialogOpen(false);
  };

  return (
    <div>
      <Button onClick={openDialog}>
        Sign Up
      </Button>
      <Dialog isOpen={isOpen} onClose={closeDialog}>
        <Dialog.Header title="Create your account" contentAlign="center">
          Already have an account? <u>Sign in</u>
        </Dialog.Header>
        <Dialog.Body shouldShowScrollShadow={true}>
          <RegisterForm />
        </Dialog.Body>
        <Dialog.Footer>
          <Button tint="blue" onClick={closeDialog}>
            Create
          </Button>
          <Button onClick={closeDialog} buttonStyle="plain">
            Cancel
          </Button>
          <Menu
            placement="bottom-end"
            renderButton={({ ref, ...props }) => (
              <Button
                {...props}
                ref={ref}
                style={{ marginLeft: 'auto' }}
              >
                Verify phone
              </Button>
            )}
          >
            <MenuItem onClick={openPhoneCheckDialogOpen}>Via SMS</MenuItem>
            <MenuItem onClick={openPhoneCheckDialogOpen}>Via voice call</MenuItem>
          </Menu>
        </Dialog.Footer>
        <PhoneCheckDialog
          isOpen={isPhoneCheckDialogOpen}
          onClose={closePhoneCheckDialogOpen}
        />
      </Dialog>
    </div>
  );
};

export const RightSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    return setIsOpen(true);
  };

  const closeDialog = () => {
    return setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={openDialog}>
        Show Right Sheet
      </Button>
      <Dialog position="right" isOpen={isOpen} onClose={closeDialog}>
        <Dialog.Header title="Right Sheet">
          <ContentMock>Header</ContentMock>
        </Dialog.Header>
        <Dialog.Body shouldShowScrollShadow={true}>
          <ContentMock>Main content</ContentMock>
        </Dialog.Body>
        <Dialog.Footer>
          <ContentMock>Footer</ContentMock>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
};

export const LeftSheet = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openDialog = () => {
    return setIsOpen(true);
  };

  const closeDialog = () => {
    return setIsOpen(false);
  };

  return (
    <div>
      <Button onClick={openDialog}>
        Show Left Sheet
      </Button>
      <Dialog position="left" isOpen={isOpen} onClose={closeDialog}>
        <Dialog.Header title="Left Sheet">
          <ContentMock>Header</ContentMock>
        </Dialog.Header>
        <Dialog.Body shouldShowScrollShadow={true}>
          <ContentMock>Main content</ContentMock>
        </Dialog.Body>
        <Dialog.Footer>
          <ContentMock>Footer</ContentMock>
        </Dialog.Footer>
      </Dialog>
    </div>
  );
};

export const PreserveProps = () => {
  type SongCredits = {
    song: string;
    performedBy: string;
    writtenBy: string;
    producedBy: string;
  };
  const [credits, setCredits] = useState<SongCredits | null>(null);
  const styles = {
    dialog: {
      maxWidth: 400,
    },
    meta: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gridGap: '8px 16px',
      margin: '16px 0 0',
    },
    key: {
      opacity: 0.75,
      textAlign: 'right' as const,
    },
    value: {
      margin: 0,
    },
  };

  const openDialog = () => {
    setCredits({
      song: 'Never Gonna Give You Up',
      performedBy: 'Rick Astley',
      writtenBy: 'Matt Aitken, Mike Stock, Pete Waterman',
      producedBy: 'Mike Stock, Matt Aitken, Pete Waterman',
    });
  };

  const closeDialog = () => {
    setCredits(null);
  };

  return (
    <div>
      <Button iconLeft={<MusicalNoteIcon width={16} height={16} />} onClick={openDialog}>
        Show credits
      </Button>

      <Dialog
        style={styles.dialog}
        isOpen={credits !== null}
        onClose={closeDialog}
      >
        <Dialog.Header title="Credits" />
        <Dialog.Body style={styles.dialog} hasTopDelimiter={true}>
          {credits && (
            <>
              <b>{credits.song}</b>
              <dl style={styles.meta}>
                <dt style={styles.key}>Performed by:</dt>
                <dd style={styles.value}>{credits.performedBy}</dd>

                <dt style={styles.key}>Written by:</dt>
                <dd style={styles.value}>{credits.writtenBy}</dd>

                <dt style={styles.key}>Produced by:</dt>
                <dd style={styles.value}>{credits.producedBy}</dd>
              </dl>
            </>
          )}
        </Dialog.Body>
      </Dialog>
    </div>
  );
};

function RegisterForm() {
  return (
    <form
      method="dialog"
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <FormField label="Phone:" labelFor="phone">
        <TextInput
          id="phone"
          name="phone"
          type="tel"
          fullWidth={true}
          slotLeft={<PhoneIcon width={16} height={16} />}
        />
      </FormField>
      <FormField label="Email:" labelFor="email">
        <TextInput
          id="email"
          name="email"
          type="email"
          fullWidth={true}
          slotLeft={<EnvelopeIcon width={16} height={16} />}
        />
      </FormField>
      <FormField
        label="Password:"
        labelFor="password"
      >
        <PasswordInput
          id="password"
          name="password"
          fullWidth={true}
        />
      </FormField>
    </form>
  );
}

function PhoneCheckDialog({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const otpInputRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog
      size="sm"
      isOpen={isOpen}
      onClose={onClose}
    >
      <Dialog.Header title="Verify phone number">
        A text message with a verification code was just sent to <b>(+888) ******371</b>
      </Dialog.Header>
      <Dialog.Body>
        <FormField label="Verification code:" labelFor="otp">
          <TextInput
            ref={otpInputRef}
            id="otp"
            name="otp"
            inputMode="numeric"
            autoComplete="off"
            fullWidth={true}
          />
        </FormField>
      </Dialog.Body>
      <Dialog.Footer>
        <Button fullWidth={true} tint="blue" size="md" onClick={onClose}>
          Confirm
        </Button>
      </Dialog.Footer>
    </Dialog>
  );
}

function ContentMock({ children }: { children?: ReactNode }) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        width: '100%',
        height: '100%',
        minHeight: '48px',
        backgroundSize: '10px 10px',
        backgroundImage: 'repeating-linear-gradient('
          + '45deg, '
          + 'var(--dc-background-color-2) 0, '
          + 'var(--dc-background-color-2) 1px, '
          + 'transparent 0, '
          + 'transparent 50%'
          + ')',
      }}
    >
      {children}
    </div>
  );
}

function EnvelopeIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="currentColor"
      {...props}
    >
      <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
      <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
    </svg>
  );
}

function PhoneIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="currentColor"
      {...props}
    >
      <path fillRule="evenodd" d="M1.5 4.5a3 3 0 0 1 3-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 0 1-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 0 0 6.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 0 1 1.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 0 1-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5Z" clipRule="evenodd" />
    </svg>
  );
}

function MusicalNoteIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={24}
      height={24}
      fill="currentColor"
      {...props}
    >
      <path fillRule="evenodd" d="M19.952 1.651a.75.75 0 0 1 .298.599V16.303a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.403-4.909l2.311-.66a1.5 1.5 0 0 0 1.088-1.442V6.994l-9 2.572v9.737a3 3 0 0 1-2.176 2.884l-1.32.377a2.553 2.553 0 1 1-1.402-4.909l2.31-.66a1.5 1.5 0 0 0 1.088-1.442V5.25a.75.75 0 0 1 .544-.721l10.5-3a.75.75 0 0 1 .658.122Z" clipRule="evenodd" />
    </svg>
  );
}
