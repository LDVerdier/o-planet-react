import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { Icon } from 'semantic-ui-react';

const RemovalSubscribe = ({
  isSubscriber, subscribeToRemoval, removalId, isLogged,
}) => {
  const color = isSubscriber ? 'red' : 'green';
  const iconType = isSubscriber ? 'minus' : 'plus';
  const history = useHistory();
  const handleClick = () => {
    if (!isLogged) {
      history.push('/login');
    }
    else {
      subscribeToRemoval(isSubscriber, removalId);
    }
  };
  return (
    <p className="removals__action badge" onClick={handleClick}>
      {isSubscriber ? 'Je ne participe plus' : 'Je veux participer'}
      <Icon.Group
        className="removals__action__icon"
      >
        <Icon color={color} name="user" />
        <Icon color={color} name={iconType} corner="top right" />
      </Icon.Group>
    </p>
  );
};

export default RemovalSubscribe;

RemovalSubscribe.propTypes = {
  isSubscriber: PropTypes.bool.isRequired,
  subscribeToRemoval: PropTypes.func.isRequired,
  removalId: PropTypes.number.isRequired,
  isLogged: PropTypes.bool.isRequired,
};
