import React from 'react';
import PropTypes from 'prop-types';
import './stats.scss';

//! WARNING Stat is in the same folder as Stats (with s) !!
import Stat from 'src/components/Stats/Stat';

const Stats = ({ stats }) => (
  <div className="stats">
    <div className="stats__bar" />
    <Stat key="1" stat={stats.declaredDumps} />
    <Stat key="2" stat={stats.clearedDumps} />
    <Stat key="3" stat={stats.pendingRemovals} />
  </div>

);

export default Stats;

Stats.propTypes = {
  stats: PropTypes.shape({
    declaredDumps: PropTypes.object.isRequired,
    clearedDumps: PropTypes.object.isRequired,
    dumpsToClean: PropTypes.object.isRequired,
    pendingRemovals: PropTypes.object.isRequired,
  }).isRequired,
};
