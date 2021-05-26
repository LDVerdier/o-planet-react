import React from 'react';
import PropTypes from 'prop-types';
import { getDayMonthYear, getTimeOfDay } from 'src/utils/functions';
import {
  Icon,
} from 'semantic-ui-react';

import RemovalSubscribe from 'src/containers/Removals/RemovalSubscribe';
import ConfirmModal from 'src/components/Modals/ConfirmModal';
import greenCheck from 'src/assets/img/green-check.png';

import './removals.scss';

const Removal = ({
  date,
  id,
  isFinished,
  creator,
  subscribers,
  userId,
  deleteRemoval,
  validateRemoval,
}) => {
  const s = subscribers.length ? 's' : '';
  const avoir = subscribers.length ? 'ont' : 'a';
  // check if logged user has subscribed
  const isSubscriber = subscribers
    .map((subscriber) => subscriber.id)
    .includes(userId);
  const isCreator = creator.id === userId;
  const isPast = Date.parse(date) < Date.now();
  const vous = isSubscriber ? '(dont vous)' : '';
  return (
    <div className={`removals__element ${isPast || isFinished ? 'removals__element--past' : ''}`}>

      <h4 className="removals__element__title">Le {getDayMonthYear(date)} à {getTimeOfDay(date)}</h4>
      <p className="removals__element__meta">Organisé par {isCreator ? 'vous' : creator.userAlias}</p>
      {isFinished && (
      <div className="removals__element__cleaned">
        <p className="removals__element__cleaned__text">
          Ramassage effectué
        </p>
        <img
          className="removals__element__cleaned__icon"
          src={greenCheck}
          alt="checkmark-logo"
        />
      </div>
      )}

      <p>
        {isPast || isFinished
          ? `${subscribers.length + 1} personne${s} ${avoir} participé ${vous}`
          : `${subscribers.length + 1} personne${s} inscrite${s} ${vous}`}
      </p>
      {!isCreator && (isPast || isFinished) && (
        <p className="removals__element--finished">{isSubscriber
          ? 'Vous avez participé à ce ramassage.'
          : 'Il n\'est plus possible de participer à ce ramassage.'}
        </p>
      )}
      {!isFinished && (
      <div className="removals__element__actions">
        {!isCreator && !isPast && (
        <RemovalSubscribe isSubscriber={isSubscriber} removalId={id} />
        )}
        {isCreator && (
          <div className="removals__element__action-group">
            <ConfirmModal
              title="Validation"
              text="Confirmez-vous que ce ramassage a été effectué ?"
              action={() => validateRemoval(id)}
              icon="checkmark"
            >
              <p className="removals__action badge">Ramassage effectué<Icon.Group className="removals__action__icon"><Icon name="check" color="green" /></Icon.Group></p>
            </ConfirmModal>
            <ConfirmModal
              title="Suppression"
              text="Souhaitez-vous vraiment supprimer ce ramassage ? Pas de retour en arrière possible !"
              action={() => deleteRemoval(id)}
              icon="trash"
            >
              <p className="removals__action badge">Supprimer le ramassage<Icon.Group className="removals__action__icon"><Icon name="trash" color="red" /></Icon.Group></p>
            </ConfirmModal>
          </div>
        )}
      </div>
      )}
    </div>
  );
};

export default Removal;

Removal.defaultProps = {
  subscribers: [],
};

Removal.propTypes = {
  date: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  isFinished: PropTypes.bool.isRequired,
  creator: PropTypes.shape({
    id: PropTypes.number.isRequired,
    userAlias: PropTypes.string.isRequired,
  }).isRequired,
  subscribers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ),
  userId: PropTypes.number.isRequired,
  validateRemoval: PropTypes.func.isRequired,
  deleteRemoval: PropTypes.func.isRequired,
};
