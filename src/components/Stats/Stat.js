import React from 'react';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

const Stat = ({ stat }) => (
  <div className="stats__element">
    <span className="stats__element__quantity"><CountUp start={0} end={stat.quantity} /></span>
    <span className="stats__element__name">{stat.name}</span>
  </div>
);

export default Stat;

Stat.propTypes = {
  stat: PropTypes.shape({
    name: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};
