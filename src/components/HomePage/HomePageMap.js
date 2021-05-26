import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import {
  MapContainer, TileLayer, Marker, Popup,
} from 'react-leaflet';
import { Link } from 'react-router-dom';

import Filters from 'src/containers/Filters/Filters';
import LeafIcon from 'src/components/LeafIcon/LeafIcon';
import pinpointIcons from 'src/assets/js/pinpointIcons';

const HomePageMap = ({ dumpsList }) => {
  const [map, setMap] = useState(null);

  // eslint-disable-next-line no-unused-vars
  const [center, setCenter] = useState([46.75, 1.8]);
  // eslint-disable-next-line no-unused-vars
  const [zoom, setZoom] = useState(5);

  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [center, zoom]);

  return (
    <div>
      <div className="home-page__map__title-group">
        <h2 className="home-page__map__title">
          Décharges sauvages signalées
        </h2>
        <p className="home-page__map__title__legend">Niveau d'urgence : <img className="home-page__map__pinpoint" src={pinpointIcons[0].src} alt="" /> élevée / <img className="home-page__map__pinpoint" src={pinpointIcons[1].src} alt="" /> modérée / <img className="home-page__map__pinpoint" src={pinpointIcons[2].src} alt="" /> faible / <img className="home-page__map__pinpoint" src={pinpointIcons[3].src} alt="" /> déjà nettoyée</p>
      </div>
      <div className="home-page__map">
        <MapContainer
          className="home-page__map__map-container"
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            className="home-page__map__map-container__layer"
          />
          {dumpsList.map((dumpElement) => {
            const iconImg = dumpElement.isClosed
              ? pinpointIcons.find((iconElement) => iconElement.name === 'clear')
              : pinpointIcons.find((iconElement) => iconElement.id === dumpElement.emergency.id);
            const icon = new LeafIcon({
              iconUrl: iconImg.src,
            });
            return (
              <Marker
                key={dumpElement.id}
                icon={icon}
                position={[dumpElement.latitudeCoordinate, dumpElement.longitudeCoordinate]}
              >
                <Popup><Link to={`/dumps/${dumpElement.id}`}>{dumpElement.title}</Link></Popup>
              </Marker>
            );
          })}
        </MapContainer>
        <Filters />
      </div>
    </div>
  );
};

export default HomePageMap;

HomePageMap.defaultProps = {
  dumpsList: [],
};

HomePageMap.propTypes = {
  dumpsList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      latitudeCoordinate: PropTypes.number.isRequired,
      longitudeCoordinate: PropTypes.number.isRequired,
    }).isRequired,
  ),
};
