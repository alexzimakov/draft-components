```jsx
import {Dialog} from './dialog';
import {Button} from '../button';
import {FieldGroup} from '../field-group';
import {TextField} from '../text-field';
import {Textarea} from '../textarea';
import {FormattedContent} from '../formatted-content';

const saveButtonRef = React.useRef();

const [isDialogOpen, setIsDialogOpen] = React.useState(false);
const openDialog = () => setIsDialogOpen(true);
const closeDialog = () => setIsDialogOpen(false);

const [isNestedDialogOpen, setIsNestedDialogOpen] = React.useState(false);
const openNestedDialog = () => setIsNestedDialogOpen(true);
const closeNestedDialog = () => setIsNestedDialogOpen(false);

<>
  <Button onClick={openDialog}>Add Delivery Address</Button>

  <Dialog
    isOpen={isDialogOpen}
    focusElementRefAfterOpen={saveButtonRef}
    onClose={closeDialog}
    heading="Add Delivery Address"
    description="Set or change your delivery address"
    actions={
      <>
        <Button appearance="minimal" onClick={openNestedDialog}>
          Verify Address
        </Button>
        <Button appearance="secondary" onClick={closeDialog}>
          Cancel
        </Button>
        <Button ref={saveButtonRef} appearance="primary" onClick={closeDialog}>
          Save
        </Button>
      </>
    }
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gridTemplateRows: 'auto',
        gridTemplateAreas: `"city street"
          "zip ."
          "instructions instructions"`,
        columnGap: '1rem',
        rowGap: '0.5rem',
      }}
    >
      <FieldGroup label="City:" style={{gridArea: 'city'}}>
        {({id}) => <TextField id={id} fullWidth={true}/>}
      </FieldGroup>
      <FieldGroup label="Street:" style={{gridArea: 'street'}}>
        {({id}) => <TextField id={id} fullWidth={true}/>}
      </FieldGroup>
      <FieldGroup label="ZIP:" style={{gridArea: 'zip'}}>
        {({id}) => <TextField id={id} fullWidth={true}/>}
      </FieldGroup>
      <FieldGroup
        label="Special instructions:"
        hint="For example, gate code or other information to help the driver find you"
        style={{gridArea: 'instructions'}}
      >
        {({id}) => <Textarea id={id} fullWidth={true}/>}
      </FieldGroup>
    </div>
  </Dialog>

  <Dialog
    isOpen={isNestedDialogOpen}
    width="lg"
    heading="Verification Result"
    description="This is just a demonstration. If it were a real application, it would provide a message telling whether the entered address is valid."
    actions={
      <Button appearance="secondary" onClick={closeNestedDialog}>
        Close
      </Button>
    }
    onClose={closeNestedDialog}
  >
    <FormattedContent>
      <p>
        For demonstration purposes, this dialog has a lot of text. It
        demonstrates a scenario where:
      </p>
      <ul>
        <li>
          The first interactive element, the help link, is at the bottom of the
          dialog.
        </li>
        <li>
          If focus is placed on the first interactive element when the dialog
          opens, the validation message may not be visible.
        </li>
        <li>
          If the validation message is visible and the focus is on the help
          link, then the focus may not be visible.
        </li>
        <li>
          When the dialog opens, it is important that both:
          <ul>
            <li>
              The beginning of the text is visible so users do not have to
              scroll back to start reading.
            </li>
            <li>The keyboard focus always remains visible.</li>
          </ul>
        </li>
      </ul>
      <p>There are several ways to resolve this issue:</p>
      <ul>
        <li>
          Place an interactive element at the top of the dialog, e.g., a button
          or link.
        </li>
        <li>
          Make a static element focusable, e.g., the dialog title or the first
          block of text.
        </li>
      </ul>
      <p>
        Please <em>DO NOT </em> make the element with role dialog focusable!
      </p>
      <ul>
        <li>
          The larger a focusable element is, the more difficult it is to
          visually identify the location of focus, especially for users with a
          narrow field of view.
        </li>
        <li>
          The dialog has a visual border, so creating a clear visual indicator
          of focus when the entire dialog has focus is not very feasible.
        </li>
        <li>
          Screen readers read the label and content of focusable elements. The
          dialog contains its label and a lot of content! If a dialog like this
          one has focus, the actual focus is difficult to comprehend.
        </li>
      </ul>
      <p>
        In this dialog, the first paragraph has{' '}
        <code>
          tabindex=<q>-1</q>
        </code>
        . The first paragraph is also contained inside the element that provides
        the dialog description, i.e., the element that is referenced by <code>
        aria-describedby
      </code>. With some screen readers, this may have one negative but relatively
        insignificant side effect when the dialog opens -- the first paragraph may
        be announced twice. Nonetheless, making the first paragraph focusable and
        setting the initial focus on it is the most broadly accessible option.
      </p>
    </FormattedContent>
  </Dialog>
</>;
```
