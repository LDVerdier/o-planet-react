import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

//! WARNING Dump is in the same folder as Dumps (with s) !!
import Dump from 'src/containers/Dumps/Dump';

import './dumps.scss';

const Dumps = ({ allDumpElements, hideCleanedDumps }) => {
  const [numberOfDumpsToDisplay, setNumberOfDumpsToDisplay] = useState(5);

  const filteredDumps = hideCleanedDumps
    ? allDumpElements.filter((dumpElement) => dumpElement.isClosed === false)
    : [...allDumpElements];

  const dumpsToDisplay = filteredDumps.slice(0, numberOfDumpsToDisplay);

  const displayMoreDumps = () => {
    setNumberOfDumpsToDisplay(numberOfDumpsToDisplay + 5);
  };

  const numberOfSelectedDumps = hideCleanedDumps
    ? allDumpElements.filter((element) => !element.isClosed).length
    : allDumpElements.length;

  useEffect(() => {
    setNumberOfDumpsToDisplay(5);
  }, [allDumpElements, hideCleanedDumps]);
  return (
    <div className="dumps">
      <h2 className="dumps__title">Liste des décharges ({dumpsToDisplay.length} affichées sur {numberOfSelectedDumps} sélectionnées)</h2>
      {dumpsToDisplay.map((dumpElement) => (
        <Dump
          key={dumpElement.id}
          {...dumpElement}
        />
      ))}
      {filteredDumps.length !== dumpsToDisplay.length && (
        <button className="dumps__more-btn btn btn-dark" type="button" onClick={displayMoreDumps}>Afficher plus</button>
      )}
    </div>
  );
};

export default Dumps;

Dumps.defaultProps = {
  allDumpElements: [],
};

Dumps.propTypes = {
  allDumpElements: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ),
  hideCleanedDumps: PropTypes.bool.isRequired,
};
