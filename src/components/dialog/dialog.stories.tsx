import { type ComponentMeta } from '@storybook/react';
import { useRef, useState, type RefObject } from 'react';
import { Dialog } from './dialog';
import { DialogHeader } from './dialog-header';
import { DialogBody } from './dialog-body';
import { DialogFooter } from './dialog-footer';
import { mergeRefs } from '../../lib/react-helpers';
import { Button } from '../button';
import { FormField } from '../form-field';
import { TextInput } from '../text-input';
import { PasswordInput } from '../password-input';
import { Menu, MenuItem } from '../menu';
import { EnvelopeIcon, PhoneIcon } from '@heroicons/react/24/solid';

export default {
  title: 'Overlays/Dialog',
  component: Dialog,
  subcomponents: {
    DialogHeader,
    DialogBody,
    DialogFooter,
  },
} as ComponentMeta<typeof Dialog>;

export const Basic = () => {
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [phoneVerifying, setPhoneVerifying] = useState(false);
  const closeDialog = () => setIsOpen(false);
  const verifyPhone = () => setPhoneVerifying(true);

  const verifyPhoneMenu = (
    <Menu button={({ ref, ...props }) => (
      <Button
        {...props}
        ref={mergeRefs(ref, menuButtonRef)}
        variant="plain"
        style={{ marginRight: 'auto' }}
      >
        Verify phone
      </Button>
    )}>
      <MenuItem onClick={verifyPhone}>Via SMS</MenuItem>
      <MenuItem onClick={verifyPhone}>Via voice call</MenuItem>
    </Menu>
  );

  return (
    <div>
      <Button ref={openButtonRef} onClick={() => setIsOpen(!isOpen)}>
        Open dialog
      </Button>
      <Dialog
        openFocusRef={cancelButtonRef}
        closeFocusRef={openButtonRef}
        isOpen={isOpen}
        onClose={closeDialog}
      >
        <DialogHeader heading="Create your account">
          Already have an account? <a href="/">Sign in</a>
        </DialogHeader>
        <DialogBody scrollShadowTop={true} scrollShadowBottom={true}>
          <RegisterForm />
        </DialogBody>
        <DialogFooter>
          {verifyPhoneMenu}
          <Button
            ref={cancelButtonRef}
            appearance="default"
            onClick={closeDialog}
          >
            Cancel
          </Button>
          <Button
            appearance="primary"
            onClick={closeDialog}
          >
            Create
          </Button>
        </DialogFooter>
      </Dialog>
      <VerifyPhoneDialog
        closeFocusRef={menuButtonRef}
        isOpen={phoneVerifying}
        onClose={() => setPhoneVerifying(false)}
      />
    </div>
  );
};

function RegisterForm() {
  return (
    <form style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <FormField label="Phone:" labelFor="phone">
        <TextInput
          id="phone"
          name="phone"
          type="tel"
          isBlock={true}
          prefix={<PhoneIcon width={16} height={16} />}
        />
      </FormField>
      <FormField label="Email:" labelFor="email">
        <TextInput
          id="email"
          name="email"
          type="email"
          isBlock={true}
          prefix={<EnvelopeIcon width={16} height={16} />}
        />
      </FormField>
      <FormField
        label="Password:"
        labelFor="password"
        caption="Must contain at least 10 characters."
      >
        <PasswordInput
          id="password"
          name="password"
          isBlock={true}
        />
      </FormField>
    </form>
  );
}

function VerifyPhoneDialog(props: {
  closeFocusRef: RefObject<HTMLElement>;
  isOpen: boolean;
  onClose: () => void;
}) {
  const { closeFocusRef, isOpen, onClose } = props;
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog
      width="sm"
      openFocusRef={inputRef}
      closeFocusRef={closeFocusRef}
      isOpen={isOpen}
      onClose={onClose}
    >
      <DialogHeader heading="Verify phone number">
        A text message with a verification code was just sent to&nbsp;
        <b>(+888) ******371</b>
      </DialogHeader>
      <DialogBody>
        <FormField label="Verification code:" labelFor="code">
          <TextInput
            ref={inputRef}
            id="code"
            name="code"
            isBlock={true}
            inputMode="numeric"
          />
        </FormField>
      </DialogBody>
      <DialogFooter>
        <Button
          isBlock={true}
          appearance="primary"
          size="md"
          onClick={onClose}
        >
          Confirm
        </Button>
      </DialogFooter>
    </Dialog>
  );
}
