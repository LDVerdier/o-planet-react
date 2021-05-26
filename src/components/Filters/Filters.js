import React from 'react';
import PropTypes from 'prop-types';

import { Dropdown, Icon, Button } from 'semantic-ui-react';

const Filters = ({
  emergency,
  resetFilters,
  applyFilters,
  hideCleanedDumps,
  toggleHideCleanedDumps,
  setUserCoordinates,
  userPositionChoice,
  updateFilter,
  wastes,
}) => {
  const emergencyOptions = [
    {
      key: 0,
      text: 'Tous',
      value: 0,
      content: (
        <>
          <Icon name="warning sign" color="black" />
          Tous
        </>
      ),
    },
    {
      key: 1,
      text: 'Elevé',
      value: 1,
      content: (
        <>
          <Icon name="warning sign" color="red" />
          Elevé
        </>
      ),
    },
    {
      key: 2,
      text: 'Moyen',
      value: 2,
      content: (
        <>
          <Icon name="warning sign" color="orange" />
          Moyen
        </>
      ),
    },
    {
      key: 3,
      text: 'Modéré',
      value: 3,
      content: (
        <>
          <Icon name="warning sign" color="yellow" />
          Modéré
        </>
      ),
    },
  ];
  const userPositionOptions = [
    {
      key: 0,
      text: 'Toute la France',
      value: 0,
      content: (
        <>
          Toute la France
        </>
      ),
    },
    {
      key: 1,
      text: 'Autour de moi',
      value: 1,
      content: (
        <>
          Autour de moi
        </>
      ),
      description: 'Accès à votre position requis',
    },
  ];
  const wasteOptions = [
    {
      key: 1,
      text: 'Matériaux de chantier',
      value: 1,
      content: (
        <>
          Matériaux de chantier
        </>
      ),
    },
    {
      key: 2,
      text: 'Produits chimiques',
      value: 2,
      content: (
        <>
          Produits chimiques
        </>
      ),
    },
    {
      key: 3,
      text: 'Epave de véhicule',
      value: 3,
      content: (
        <>
          Epave de véhicule
        </>
      ),
    },
    {
      key: 4,
      text: 'Détritus',
      value: 4,
      content: (
        <>
          Détritus
        </>
      ),
    },
    {
      key: 5,
      text: 'Electroménager / meubles',
      value: 5,
      content: (
        <>
          Electroménager / meubles
        </>
      ),
    },
    {
      key: 6,
      text: 'Autres',
      value: 6,
      content: (
        <>
          Autres
        </>
      ),
    },
  ];
  const handleEmergencyFilter = (event, data) => {
    updateFilter(data.value, 'emergency');
  };
  const handleWasteFilter = (event, data) => {
    updateFilter(data.value, 'wastes');
  };
  const handleUserPositionFilter = (event, data) => {
    updateFilter(data.value, 'userPositionChoice');
    if (data.value > 0) {
      navigator.geolocation.getCurrentPosition((pos) => {
        setUserCoordinates(pos.coords.latitude, pos.coords.longitude);
      });
    }
  };
  return (
    <div className="home-page__map__filters">
      <h2 className="home-page__map__filters__title">Filtrer par...</h2>
      {/* Filtrer autour de... dans un rayon de... */}
      {/* <Dropdown
        selection
        upward={false}
        onChange={handleUserPositionFilter}
        options={userPositionOptions}
        // 0 for France and 1 for user position
        value={userPositionChoice}
        placeholder="Emplacement..."
      /> */}
      {/* Filtrer par type de déchet */}
      <h3 className="home-page__map__filters__label">Type de déchet</h3>
      <Dropdown
        selection
        multiple
        upward={false}
        onChange={handleWasteFilter}
        options={wasteOptions}
        placeholder="Tous"
        value={wastes}
        className="home-page__map__filters__input"
      />
      {/* Filtrer par niveau d'urgence : menu déroulant */}
      <h3 className="home-page__map__filters__label">Niveau d'urgence</h3>
      <Dropdown
        selection
        upward={false}
        onChange={handleEmergencyFilter}
        options={emergencyOptions}
        value={emergency}
        className="home-page__map__filters__input"
      />
      <div className="home-page__map__filters__button-group">
        <button type="button" className="btn home-page__map__filters__button-group__element" onClick={applyFilters}>Appliquer les filtres</button>
        {/* Vider les filtres */}
        <button type="button" className="btn btn-reverse home-page__map__filters__button-group__element" onClick={resetFilters}>Réinitialiser</button>
      </div>
      <div className="home-page__map__filters__checkbox">
        <input id="show-cleaned-dumps" type="checkbox" className="home-page__map__filters__checkbox__input" checked={!hideCleanedDumps} onChange={toggleHideCleanedDumps} />
        <label htmlFor="show-cleaned-dumps" className="home-page__map__filters__checkbox__label">Voir les décharges nettoyées</label>
      </div>
    </div>
  );
  // <button type="button" className="btn home-page__map__filters__button" onClick={toggleHideCleanedDumps}>{hideCleanedDumps ? 'Afficher' : 'Masquer'} les décharges nettoyées</button>
};
export default Filters;

Filters.defaultProps = {
  wastes: [],
};

Filters.propTypes = {
  emergency: PropTypes.number.isRequired,
  resetFilters: PropTypes.func.isRequired,
  applyFilters: PropTypes.func.isRequired,
  hideCleanedDumps: PropTypes.bool.isRequired,
  toggleHideCleanedDumps: PropTypes.func.isRequired,
  userCoordinates: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
  }).isRequired,
  userPositionChoice: PropTypes.number.isRequired,
  setUserCoordinates: PropTypes.func.isRequired,
  updateFilter: PropTypes.func.isRequired,
  wastes: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ),
};
