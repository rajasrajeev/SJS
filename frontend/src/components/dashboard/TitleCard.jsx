import React from 'react';
import Illus from '../../assets/title.png';

import './TitleCard.scss';

const TitleCard = ({ name, phone, web }) => {
  return (
    <div className="card bg-c-green order-card">
      <div className="card-block d-flex">
        <div className="card-content">
          <h4 className="m-b-20">{name}</h4>
          <h6 className="text-right">
            <i className="bi bi-globe"></i><span> {web}</span>
          </h6>
          <h6 className="text-right">
            <i className="bi bi-phone"></i><span> {phone}</span>
          </h6>
        </div>
        <div className="card-image">
          <img src={Illus} alt="Illustration" />
        </div>
      </div>
    </div>
  );
};

export default TitleCard;
