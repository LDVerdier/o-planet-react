import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { getDayAndTime } from 'src/utils/functions';

import {
  Button, Header, Icon, Input, Modal,
} from 'semantic-ui-react';

const AddRemovalModal = ({
  children, action,
}) => {
  const [open, setOpen] = useState(false);
  const [removalDate, setRemovalDate] = useState(null);
  return (
    <Modal
      closeIcon
      open={open}
      trigger={children}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon="calendar alternate outline" content="Veuillez choisir une date de ramassage" />
      <Modal.Content>
        <Input readonly fluid type="datetime-local" onChange={(event) => setRemovalDate(getDayAndTime(Date.parse(event.target.value)))} />
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          onClick={() => {
            setOpen(false);
          }}
        >
          <Icon name="remove" /> Annuler
        </Button>
        <Button
          color="green"
          onClick={() => {
            setOpen(false);
            if (removalDate !== null) {
              action(removalDate);
            }
          }}
        >
          <Icon name="checkmark" /> Je crée ce ramassage
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default AddRemovalModal;

AddRemovalModal.defaultProps = {
  children: (<Button>Show Modal</Button>),
};

AddRemovalModal.propTypes = {
  children: PropTypes.element,
  action: PropTypes.func.isRequired,
};
