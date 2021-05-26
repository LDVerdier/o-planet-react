import React, { useMemo, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { MapContainer, TileLayer } from 'react-leaflet';

import MapDraggableMarker from 'src/containers/Map/MapDraggableMarker';

import './map.scss';

const FormMap = ({ latitude, longitude }) => {
  const [map, setMap] = useState(null);
  const center = [latitude, longitude];
  useEffect(() => {
    if (map) {
      map.setView(center);
    }
  }, [center]);
  const displayMap = useMemo(
    () => (
      <MapContainer
        className="map"
        center={center}
        zoom={5}
        scrollWheelZoom={false}
        whenCreated={setMap}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <MapDraggableMarker />
      </MapContainer>
    ),
    [],
  );

  return (
    <>
      {displayMap}
    </>
  );
};

export default FormMap;

FormMap.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};
