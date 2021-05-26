import React, { useRef, useMemo } from 'react';
import PropTypes from 'prop-types';

import { Marker } from 'react-leaflet';

const MapDraggableMarker = ({ latitude, longitude, updateStandardInput }) => {
  const center = {
    lat: latitude,
    lng: longitude,
  };

  const position = center;
  const markerRef = useRef(null);
  const eventHandlers = useMemo(
    () => ({
      dragend() {
        const marker = markerRef.current;
        console.log(marker);
        if (marker != null) {
          updateStandardInput('latitudeCoordinate', marker.getLatLng().lat);
          updateStandardInput('longitudeCoordinate', marker.getLatLng().lng);
        }
      },
    }),
    [],
  );

  return (
    <Marker
      className="map-marker"
      draggable
      eventHandlers={eventHandlers}
      position={position}
      ref={markerRef}
    />
  );
};

export default MapDraggableMarker;

MapDraggableMarker.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  updateStandardInput: PropTypes.func.isRequired,
};
