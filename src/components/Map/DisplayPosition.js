/* eslint-disable jsx-a11y/label-has-associated-control */
import React, {
  useCallback, useEffect, useState,
} from 'react';

import PropTypes from 'prop-types';

const center = [51.505, -0.09];
const zoom = 5;

const DisplayPosition = ({
  map,
  latitudeCoordinate,
  longitudeCoordinate,
  updateStandardInput,
}) => {
  // initial coordinates
  const [position, setPosition] = useState(map.getCenter());
  // console.log(position);

  // reset button : recalls initial center & zoom level
  const onClick = useCallback(() => {
    map.setView(center, zoom);
  }, [map]);

  // stores new coordinates when moving
  const onMove = useCallback(() => {
    setPosition(map.getCenter());
    updateStandardInput('latitudeCoordinate', map.getCenter().lat);
    updateStandardInput('longitudeCoordinate', map.getCenter().lng);
  }, [map]);

  // ? unclear
  useEffect(() => {
    map.on('move', onMove);
    return () => {
      map.off('move', onMove);
    };
  }, [map, onMove]);

  return (
    <>
      <p>
        latitude: {position.lat.toFixed(4)}, longitude: {position.lng.toFixed(4)}{' '}
        latitude: {latitudeCoordinate}, longitude: {longitudeCoordinate}{' '}
        <button type="button" onClick={onClick}>reset</button>
      </p>
    </>
  );
};

export default DisplayPosition;

DisplayPosition.defaultProps = {
  map: null,
};

DisplayPosition.propTypes = {
  map: PropTypes.object,
  latitudeCoordinate: PropTypes.number.isRequired,
  longitudeCoordinate: PropTypes.number.isRequired,
  updateStandardInput: PropTypes.func.isRequired,
};
