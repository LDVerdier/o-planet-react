import React from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';

// images
import emergencyIcons from 'src/assets/js/emergencyIcons';
import greenCheck from 'src/assets/img/green-check.png';

import { getDayMonthYear, strTruncate } from 'src/utils/functions';

const Dump = ({
  id,
  title,
  description,
  user,
  picture1,
  createdAt,
  wastes,
  emergency,
  isClosed,
  removals,
}) => {
  // retrieve the proper emergency icon with the emergency.id prop
  const emergencyIcon = emergencyIcons.find(
    (emergencyIconElement) => (emergencyIconElement.id === emergency.id),
  );

  const emergencyClass = classNames({
    'dump-success': isClosed,
    'dump-danger': !isClosed && emergency.id === 1,
    'dump-warning': !isClosed && emergency.id === 2,
    'dump-info': !isClosed && emergency.id === 3,
  });

  const history = useHistory();

  const numberOfFutureRemovals = removals
    .filter((removal) => {
      const date = Date.parse(removal.date);
      return (date > Date.now() && !removal.isFinished);
    })
    .length;

  return (
    <article className={`dump ${emergencyClass}`} onClick={() => history.push(`/dumps/${id}`)}>
      <img
        className="dump__emergency"
        src={isClosed ? greenCheck : emergencyIcon.src}
        alt={isClosed ? 'checkmark-logo' : emergencyIcon.alt}
      />
      <img className="dump__picture" src={`http://ec2-54-82-219-80.compute-1.amazonaws.com/images/dumps/${picture1}`} alt="dump" />
      <div className="dump__content">
        <div className="dump__content__meta">
          <span className="badge  dump__content__meta__badge">
            {numberOfFutureRemovals === 0 ? 'Aucun' : numberOfFutureRemovals} ramassage{numberOfFutureRemovals > 1 ? 's' : ''} à venir
          </span>
          <h2 className="dump__content__meta__title">
            {title}
          </h2>
          <p className="dump__content__meta__publish">
            Par {user.userAlias} le {getDayMonthYear(createdAt)}
          </p>
          <div className="dump__content__meta__description">
            {strTruncate(description, 200)}
          </div>
        </div>
        <div className="dump__content__separator" />
        <div className="dump__content__wastes">
          {/* for each waste element, pick the matching icon thanks to its id */
            wastes.map((wasteElement) => (
              <div key={wasteElement.id} className="dump__content__wastes__element badge">
                <span className="dump__content__wastes__element__name">{wasteElement.name}</span>
              </div>
            ))
            }
        </div>
      </div>
    </article>

  );
};

export default Dump;

Dump.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  user: PropTypes.shape({
    userAlias: PropTypes.string.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  wastes: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
    }).isRequired,
  ).isRequired,
  emergency: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
  isClosed: PropTypes.bool.isRequired,
  picture1: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  removals: PropTypes.array.isRequired,
};
