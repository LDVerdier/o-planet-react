import React from 'react';
import PropTypes from 'prop-types';

import {
  Button, Header, Icon, Modal,
} from 'semantic-ui-react';

const ConfirmModal = ({
  title, text, action, cancelAction, children, icon,
}) => {
  const [open, setOpen] = React.useState(false);
  return (
    <Modal
      closeIcon
      open={open}
      trigger={children}
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
    >
      <Header icon={icon} content={title} />
      <Modal.Content>
        <p>
          {text}
        </p>
      </Modal.Content>
      <Modal.Actions>
        <Button
          color="red"
          onClick={() => {
            setOpen(false);
            cancelAction();
          }}
        >
          <Icon name="remove" /> Non
        </Button>
        <Button
          color="green"
          onClick={() => {
            setOpen(false);
            action();
          }}
        >
          <Icon name="checkmark" /> Oui
        </Button>
      </Modal.Actions>
    </Modal>
  );
};

export default ConfirmModal;

ConfirmModal.defaultProps = {
  title: 'Êtes-vous sûr ?',
  text: 'Merci de bien vouloir confirmer. Confirmer quoi ? A vous de me le dire !',
  children: (<Button>Show Modal</Button>),
  cancelAction: () => {},
  icon: 'archive',
};

ConfirmModal.propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  action: PropTypes.func.isRequired,
  children: PropTypes.element,
  cancelAction: PropTypes.func,
  icon: PropTypes.string,
};
