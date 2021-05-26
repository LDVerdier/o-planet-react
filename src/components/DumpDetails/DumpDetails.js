import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect, useHistory } from 'react-router-dom';
import {
  Icon,
} from 'semantic-ui-react';
// leaflet
import {
  MapContainer, TileLayer, Marker,
} from 'react-leaflet';

import Removals from 'src/containers/Removals/Removals';
import ConfirmModal from 'src/components/Modals/ConfirmModal';
import AddRemovalModal from 'src/components/Modals/AddRemovalModal';
import './dumpDetails.scss';

// images
// import wasteIcons from 'src/assets/js/wasteIcons';
import emergencyIcons from 'src/assets/js/emergencyIcons';
import greenCheck from 'src/assets/img/green-check.png';

import { baseUrl } from 'src/data/url';

import { getDayMonthYear } from 'src/utils/functions';

const DumpDetails = ({
  id,
  title,
  user,
  latitudeCoordinate,
  longitudeCoordinate,
  description,
  removals,
  picture1,
  wastesIds,
  emergency,
  loadDumpByIdApi,
  deleteDump,
  formSubmitted,
  userId,
  sendRemovalToApi,
  isClosed,
  validateDump,
  isLogged,
  createdAt,
  wastesList,
}) => {
  if (formSubmitted) {
    return (
      <Redirect to="/" />
    );
  }
  if (!id) {
    return (
      <h1>No dump to display...</h1>
    );
  }
  useEffect(() => {
    loadDumpByIdApi();
  }, []);
  let emergencyIcon = null;
  if (id) {
    emergencyIcon = emergencyIcons.find(
      (emergencyIconElement) => (emergencyIconElement.id === emergency.id),
    );
  }

  const futureRemovals = [];
  const pastRemovals = [];

  removals.forEach((removal) => {
    if (Date.parse(removal.date) > Date.now() && !removal.isFinished) {
      futureRemovals.push(removal);
    }
    else {
      pastRemovals.push(removal);
    }
  });

  // const isCreator = true;
  const isCreator = userId === user.id;

  const [map, setMap] = useState(null);

  const center = [
    latitudeCoordinate,
    longitudeCoordinate,
  ];
  const zoom = 13;

  useEffect(() => {
    if (map) {
      map.setView(center, zoom);
    }
  }, [center, zoom]);

  const history = useHistory();
  return (
    <div className="dump-details">
      <div className="dump-details__top">
        <div className="dump-details__top__title">
          <h1 className="dump-details__top__title__text">
            Décharge déclarée par {isCreator ? 'vous' : user.userAlias} le {getDayMonthYear(createdAt)}
          </h1>
          {isCreator && !isClosed && (
          <div className="dump-details__top__title__actions">
            <ConfirmModal
              title="Validation"
              text="Confirmez-vous que cette décharge sauvage a été nettoyée ? Vous ne pourrez plus apporter de modification !"
              action={validateDump}
              icon="checkmark"
            >
              <button type="button" className="btn btn-success dump-details__top__title__actions__element">Valider<Icon className="dump-details__top__title__actions__element__icon" name="check" /></button>
            </ConfirmModal>
            <Link to={`/dump/edit/${id}`}><button type="button" className="btn btn-info dump-details__top__title__actions__element">Modifier<Icon className="dump-details__top__title__actions__element__icon" name="edit" /></button></Link>
            <ConfirmModal
              title="Suppression"
              text="Souhaitez-vous vraiment supprimer ce dump ? Pas de retour en arrière possible !"
              action={deleteDump}
              icon="trash"
            >
              <button type="button" className="btn btn-danger dump-details__top__title__actions__element">Supprimer<Icon className="dump-details__top__title__actions__element__icon" name="trash" /></button>
            </ConfirmModal>
          </div>
          )}
        </div>
        <div className="dump-details__top__wastes">
          {
            wastesIds.map((wasteId) => {
              const wasteName = wastesList.find((wasteElement) => (
                wasteElement.id === wasteId
              )).name;
              return (
                <div key={wasteId} className="badge dump-details__top__wastes__element">{wasteName}</div>
              );
            })
          }
        </div>
      </div>
      <div className="dump-details__subtitle">
        <h2 className="dump-details__subtitle__text">{title}</h2>
        <img
          className="dump-details__subtitle__emergency"
          src={isClosed ? greenCheck : emergencyIcon.src}
          alt={isClosed ? 'checkmark-logo' : emergencyIcon.alt}
        />
      </div>
      <div className="dump-details__description">
        <p className="dump-details__description__text">{description}</p>
      </div>
      <div className="dump-details__visuals">
        <img className="dump-details__visuals__picture" src={`${baseUrl}/images/dumps/${picture1}`} alt="dump" />
        {/* <h2 className="dump-details__subtitle">Emplacement</h2> */}
        <MapContainer
          className="dump-details__visuals__map"
          center={center}
          zoom={zoom}
          scrollWheelZoom={false}
          whenCreated={setMap}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[latitudeCoordinate, longitudeCoordinate]} />
        </MapContainer>
      </div>
      <div className="dump-details__removals">
        <div className="dump-details__removals__subtitle">
          <h2 className="dump-details__removals__subtitle--text">Actions de ramassage</h2>
          {!isClosed && (
            <AddRemovalModal action={sendRemovalToApi}>
              <button
                className="btn dump-details__removals__subtitle--button"
                type="button"
                onClick={() => {
                  if (!isLogged) {
                    history.push('/login');
                  }
                }}
              >
                Organiser un ramassage
              </button>
            </AddRemovalModal>
          )}
        </div>
        <div className="dump-details__removals__removals-groups">
          <div className="dump-details__removals__removals-groups__element">
            <h3 className="dump-details__removals__removals-groups__title">
              Ramassages à venir
            </h3>
            <Removals removals={futureRemovals} />
            {futureRemovals.length === 0 && !isClosed && (
            <p className="dump-details__infos">Aucun ramassage à venir</p>
            )}
          </div>
          <div className="dump-details__removals__removals-groups__element">
            <h3 className="dump-details__removals__removals-groups__title">
              Ramassages terminés
            </h3>
            <Removals removals={pastRemovals} />
            {pastRemovals.length === 0 && (
            <p className="dump-details__infos">Aucun ramassage réalisé</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default DumpDetails;

DumpDetails.defaultProps = {
  removals: [],
};

DumpDetails.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userAlias: PropTypes.string.isRequired,
  }).isRequired,
  latitudeCoordinate: PropTypes.number.isRequired,
  longitudeCoordinate: PropTypes.number.isRequired,
  picture1: PropTypes.string.isRequired,
  wastesIds: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ).isRequired,
  emergency: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
  }).isRequired,
  loadDumpByIdApi: PropTypes.func.isRequired,
  deleteDump: PropTypes.func.isRequired,
  formSubmitted: PropTypes.bool.isRequired,
  userId: PropTypes.number.isRequired,
  sendRemovalToApi: PropTypes.func.isRequired,
  removals: PropTypes.arrayOf(
    PropTypes.shape({
      date: PropTypes.string.isRequired,
      isFinished: PropTypes.bool.isRequired,
    }).isRequired,
  ),
  isClosed: PropTypes.bool.isRequired,
  validateDump: PropTypes.func.isRequired,
  isLogged: PropTypes.bool.isRequired,
  createdAt: PropTypes.string.isRequired,
  wastesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
};
