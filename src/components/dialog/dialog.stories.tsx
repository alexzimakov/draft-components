import { Meta } from '@storybook/react';
import { RefObject, useRef, useState } from 'react';
import { Dialog } from './dialog.js';
import { mergeRefs } from '../../lib/react-helpers.js';
import { Button } from '../button/index.js';
import { FormField } from '../form-field/index.js';
import { TextInput } from '../text-input/index.js';
import { PasswordInput } from '../password-input/index.js';
import { Menu, MenuItem } from '../menu/index.js';
import { EnvelopeIcon, MusicalNoteIcon, PhoneIcon } from '@heroicons/react/24/solid';

const meta: Meta<typeof Dialog> = {
  title: 'Overlays/Dialog',
  component: Dialog,
};
export default meta;

export const Basic = () => {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneVerifying, setPhoneVerifying] = useState(false);
  const closeDialog = () => setIsOpen(false);
  const verifyPhone = () => setPhoneVerifying(true);

  return (
    <div>
      <Button ref={openButtonRef} onClick={() => setIsOpen(!isOpen)}>
        Open dialog
      </Button>
      <Dialog
        isOpen={isOpen}
        onClose={closeDialog}
        focusAfterOpenRef={cancelButtonRef}
        focusAfterCloseRef={openButtonRef}
      >
        <Dialog.Header title="Create your account" hasDivider={true}>
          Already have an account?
          {' '}
          <a href="/">Sign in</a>
        </Dialog.Header>
        <Dialog.Body>
          <RegisterForm />
        </Dialog.Body>
        <Dialog.Footer hasDivider={true}>
          <Menu button={({ ref, ...props }) => (
            <Button
              {...props}
              ref={mergeRefs(ref, menuButtonRef)}
              style={{ marginRight: 'auto' }}
              buttonStyle="plain"
            >
              Verify phone
            </Button>
          )}
          >
            <MenuItem onClick={verifyPhone}>Via SMS</MenuItem>
            <MenuItem onClick={verifyPhone}>Via voice call</MenuItem>
          </Menu>
          <Button ref={cancelButtonRef} tint="gray" onClick={closeDialog}>
            Cancel
          </Button>
          <Button tint="blue" onClick={closeDialog}>
            Create
          </Button>
        </Dialog.Footer>
        <VerifyPhoneDialog
          focusAfterCloseRef={menuButtonRef}
          isOpen={phoneVerifying}
          onClose={() => setPhoneVerifying(false)}
        />
      </Dialog>
    </div>
  );
};

export const PreserveProps = () => {
  type SongCredits = {
    album: string;
    artist: string;
    released: number;
    genres: string[];
  };
  const [account, setAccount] = useState<SongCredits | null>(null);
  const styles = {
    dialog: {
      width: 400,
    },
    credits: {
      display: 'grid',
      gridTemplateColumns: 'auto 1fr',
      gridGap: '8px 16px',
      margin: 0,
    },
    credits__key: {
      opacity: 0.75,
      textAlign: 'right' as const,
    },
    credits__value: {
      margin: 0,
    },
  };

  const openDialog = () => {
    setAccount({
      album: 'Whenever You Need Somebody',
      artist: 'Rick Astley',
      released: 1987,
      genres: ['Dance-pop', 'Blue-eyed soul', 'Pop', 'Adult Contemporary'],
    });
  };

  const closeDialog = () => {
    setAccount(null);
  };

  return (
    <div>
      <Button iconLeft={<MusicalNoteIcon width={16} height={16} />} onClick={openDialog}>
        Show credits
      </Button>

      <Dialog
        style={styles.dialog}
        isOpen={account !== null}
        onClose={closeDialog}
      >
        <Dialog.Header title="Credits" hasDivider={true} />
        <Dialog.Body>
          {account && (
            <dl style={styles.credits}>
              <dt style={styles.credits__key}>Album:</dt>
              <dd style={styles.credits__value}>{account.album}</dd>

              <dt style={styles.credits__key}>Artist:</dt>
              <dd style={styles.credits__value}>{account.artist}</dd>

              <dt style={styles.credits__key}>Released:</dt>
              <dd style={styles.credits__value}>{account.released}</dd>

              <dt style={styles.credits__key}>Genres:</dt>
              <dd style={styles.credits__value}>{account.genres.join(', ')}</dd>
            </dl>
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
        hint="Must contain at least 10 characters."
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

function VerifyPhoneDialog({
  focusAfterCloseRef,
  isOpen,
  onClose,
}: {
  focusAfterCloseRef: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const otpInputRef = useRef<HTMLInputElement>(null);
  return (
    <Dialog
      width="sm"
      focusAfterOpenRef={otpInputRef}
      focusAfterCloseRef={focusAfterCloseRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <Dialog.Header title="Verify phone number">
        A text message with a verification code was just sent to
        {' '}
        <b>(+888) ******371</b>
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
