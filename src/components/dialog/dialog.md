```jsx
import {useRef} from 'react';
import {Dialog} from '../dialog';
import {Button} from '../button';
import {Menu, MenuButton} from '../menu';
import {FormField} from '../form-field';
import {TextInput} from '../text-input';
import {SvgIcon} from '../svg-icon';
import {envelope} from '../../bootstrap-icons/envelope';
import {key} from '../../bootstrap-icons/key';
import {telephone} from '../../bootstrap-icons/telephone';

const addAddressButton = useRef();
const cancelButton = useRef();
const verifyPhoneButton = useRef();
const codeInput = useRef();

const [isDialogOpen, setIsDialogOpen] = React.useState(false);
const openDialog = () => setIsDialogOpen(true);
const closeDialog = () => setIsDialogOpen(false);

const [isVerifyDialogOpen, setIsVerifyDialogOpen] = React.useState(false);
const openVerifyDialog = () => setIsVerifyDialogOpen(true);
const closeVerifyDialog = () => setIsVerifyDialogOpen(false);

<div>
  <Button ref={addAddressButton} appearance="primary" onClick={openDialog}>
    Register
  </Button>

  <Dialog
    isOpen={isDialogOpen}
    width={512}
    heading="Register"
    description="Please enter your credentials below that will be used throughout the registration process:"
    footerButtons={
      <>
        <Menu
          label={({
            isOpen,
            ...props
          }) => (
            <Button
              {...props}
              ref={verifyPhoneButton}
              style={{marginRight: 'auto'}}
              appearance={isOpen ? 'secondary' : 'minimal'}
            >
              Verify phone number
            </Button>
          )}
        >
          <MenuButton onClick={openVerifyDialog}>via SMS</MenuButton>
          <MenuButton onClick={openVerifyDialog}>via Voice Call</MenuButton>
        </Menu>
        <Button ref={cancelButton} appearance="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button appearance="primary" onClick={closeDialog}>
          Register
        </Button>
      </>
    }
    focusAfterOpen={cancelButton}
    focusAfterClose={addAddressButton}
    onClose={closeDialog}
  >
    <div>
      <FormField label="Phone:">
        {({id}) => (
          <TextInput
            id={id}
            fullWidth={true}
            leadingAddOn={<SvgIcon icon={telephone} />}
          />
        )}
      </FormField>
      <FormField label="Email:" style={{marginTop: 8}}>
        {({id}) => (
          <TextInput
            id={id}
            fullWidth={true}
            leadingAddOn={<SvgIcon icon={envelope} />}
          />
        )}
      </FormField>
      <FormField
        label="Password:"
        hint="Minimum 10 characters, at least one number, capitalized letter and special character."
        style={{marginTop: 8}}
      >
        {({id}) => (
          <TextInput
            id={id}
            type="password"
            fullWidth={true}
            leadingAddOn={<SvgIcon icon={key} />}
          />
        )}
      </FormField>
    </div>
  </Dialog>

  <Dialog
    isOpen={isVerifyDialogOpen}
    width={400}
    heading="Verify phone number"
    description={
      <>
        A text message with a verification code was just sent to{' '}
        <b>(+66) ******971</b>
      </>
    }
    footerButtons={
      <Button
        size="lg"
        fullWidth={true}
        appearance="primary"
        onClick={closeVerifyDialog}
      >
        Confirm
      </Button>
    }
    focusAfterOpen={codeInput}
    focusAfterClose={verifyPhoneButton}
    onClose={closeVerifyDialog}
  >
    <FormField label="Verification code:">
      {({id}) => <TextInput ref={codeInput} id={id} fullWidth={true} />}
    </FormField>
  </Dialog>
</div>;
```
