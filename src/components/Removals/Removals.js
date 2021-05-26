import React from 'react';
import PropTypes from 'prop-types';
import Removal from 'src/containers/Removals/Removal';

const Removals = ({ userId, removals }) => (
  <div className="removals">
    {removals
      .sort((a, b) => {
        const dateA = Date.parse(a.date);
        const dateB = Date.parse(b.date);
        return dateB - dateA;
      })
      .map((removal) => (
        <Removal
          key={removal.id}
          {...removal}
          userId={userId}
        />
      ))}
  </div>
);

export default Removals;

Removals.defaultProps = {
  removals: [],
};

Removals.propTypes = {
  userId: PropTypes.number.isRequired,
  removals: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ),
};
