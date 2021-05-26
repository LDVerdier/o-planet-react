/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Icon,
} from 'semantic-ui-react';

import FormMap from 'src/containers/Map/FormMap';

import './dumpForm.scss';

// images
import emergencyIcons from 'src/assets/js/emergencyIcons';

const DumpForm = ({
  dumpId,
  title,
  latitudeCoordinate,
  longitudeCoordinate,
  description,
  emergencyId,
  wastesIds,
  updateStandardInput,
  emergenciesList,
  wastesList,
  toggleWaste,
  toggleEmergency,
  editDump,
  resetDumpForm,
  sendDumpToApi,
  formSubmitted,
}) => {
  // if id provided in the url does not match an existing dump
  if (dumpId < 0) {
    return (
      <Redirect to="/dump/create" />
    );
  }
  if (formSubmitted) {
    return (
      <Redirect to="/" />
    );
  }
  useEffect(() => {
    if (dumpId) {
      // if id does match an existing dump, store its properties in the dumpForm state
      editDump(dumpId);
    }
    else {
      // else resets all form fields
      resetDumpForm();
    }
  }, [dumpId]);

  const handleStandardInputChange = (evt, inputName) => {
    const inputValue = inputName === 'emergencyId' ? parseInt(evt.target.value, 10) : evt.target.value;
    updateStandardInput(inputName, inputValue);
  };

  const handleClickWaste = (id) => {
    toggleWaste(id);
  };
  const handleClickEmergency = (id) => {
    toggleEmergency(id);
  };
  const inputFileRef = useRef(null);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const file = inputFileRef.current.files[0];
    sendDumpToApi(dumpId, file);
  };

  return (
    <form className="dump-form" onSubmit={handleSubmit}>
      <h1 className="dump-form__title">{dumpId ? 'Editer' : 'Déclarer'} une décharge sauvage</h1>
      <Link className="dump-form__return-btn" to={dumpId <= 1 ? '/' : `/dumps/${dumpId}`}><Icon color="grey" name="cancel" size="big" /></Link>
      <div className="dump-form__field-group">
        <div className="dump-form__field-group__subgroup">
          <div className="dump-form__field">
            <label className="dump-form__field__label required" htmlFor="dump-title">
              Titre
            </label>
            <input placeholder="Exemple : Dépôt d'ordures en lisière du bois de Majolan" required className="dump-form__field__input input" type="text" id="dump-title" value={title} onChange={(evt) => handleStandardInputChange(evt, 'title')} />
          </div>
          <div className="dump-form__field">
            <label className="dump-form__field__label" htmlFor="dump-picture">
              Ajoutez une image
            </label>
            <input className="dump-form__field__input input" ref={inputFileRef} type="file" id="dump-picture" />
          </div>
        </div>
        <div className="dump-form__field-group__subgroup">
          <div className="dump-form__field form-description">
            <label className="dump-form__field__label" htmlFor="form-description">
              Informations complémentaires
            </label>
            <textarea
              placeholder="Indications sur le volume de déchets, le nombre de personnes nécessaires pour les ramasser, les éventuelles précautions à prendre..."
              className="input"
              id="form-description"
              value={description}
              onChange={(evt) => handleStandardInputChange(evt, 'description')}
            />
          </div>
        </div>
        <div className="dump-form__field-group__subgroup">
          <div className="dump-form__field">
            <label className="dump-form__field__label required">
              Emplacement
            </label>
            <FormMap latitude={latitudeCoordinate} longitude={longitudeCoordinate} />
            {/* <p className="dump-form__field__label__legend map-legend">
              Déplacez le marqueur à l'emplacement de la décharge
            </p> */}
          </div>
        </div>
        <div className="dump-form__field-group__subgroup subgroup--row">
          <div className="dump-form__field">
            <label className="dump-form__field__label required">Niveau d'urgence</label>
            <div className="dump-form__field__selectables">
              {emergenciesList.map(({ id, name, example }) => {
                const emergencyIcon = emergencyIcons.find((emergencyIconElement) => (
                  emergencyIconElement.id === id
                ));
                return (
                  <React.Fragment key={id}>
                    <div
                      className={`badge dump-form__field__selectables__element ${id === emergencyId ? 'dump-form__selectable--selected' : ''}`}
                      onClick={() => handleClickEmergency(id)}
                    >
                      <span className="dump-form__field__selectables__element__name">{name}</span>
                      <img
                        className="dump-form__field__selectables__element__image"
                        src={emergencyIcon.src}
                        alt={emergencyIcon.alt}
                      />
                    </div>
                    <p className="dump-form__field__label__legend">Ex : {example}</p>
                  </React.Fragment>
                );
              })}
            </div>
          </div>
          <div className="dump-form__field">
            <label className="dump-form__field__label required">
              Type de déchets (minimum 1)
            </label>
            <div className="dump-form__field__selectables">
              {wastesList.map(({ id, name }) => (
                <div
                  key={id}
                  className={`dump-form__field__selectables__element badge ${wastesIds.includes(id) ? 'dump-form__selectable--selected' : ''}`}
                  onClick={() => {
                    handleClickWaste(id);
                  }}
                >
                  <span className="dump-form__field__selectables__element__name">{name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <button className="btn dump-form__submit" type="submit">Envoyer</button>
    </form>
  );
};

export default DumpForm;

DumpForm.defaultProps = {
  title: '',
  description: '',
  wastesIds: [],
};

DumpForm.propTypes = {
  dumpId: PropTypes.number.isRequired,
  title: PropTypes.string,
  latitudeCoordinate: PropTypes.number.isRequired,
  longitudeCoordinate: PropTypes.number.isRequired,
  // picture1: PropTypes.string,
  description: PropTypes.string,
  // isClosed: PropTypes.bool,
  emergencyId: PropTypes.number.isRequired,
  wastesIds: PropTypes.arrayOf(
    PropTypes.number.isRequired,
  ),
  emergenciesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      example: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  updateStandardInput: PropTypes.func.isRequired,
  wastesList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  toggleWaste: PropTypes.func.isRequired,
  toggleEmergency: PropTypes.func.isRequired,
  editDump: PropTypes.func.isRequired,
  resetDumpForm: PropTypes.func.isRequired,
  sendDumpToApi: PropTypes.func.isRequired,
  formSubmitted: PropTypes.bool.isRequired,
};
