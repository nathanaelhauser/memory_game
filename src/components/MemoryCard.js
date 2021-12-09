import React from 'react';
import ReactCardFlip from 'react-card-flip';
import BeanieSVG from '../assets/svgs/beanie-1619898.svg';
import BellSVG from '../assets/svgs/bell-1619890.svg';
import CalenderSVG from '../assets/svgs/calender-1619939.svg';
import CandlesSVG from '../assets/svgs/candles-1619938.svg';

const cardFront = (imageId) => {
  switch (imageId) {
    case 0:
      return BeanieSVG;
    case 1:
      return BellSVG;
    case 2:
      return CalenderSVG;
    case 3:
      return CandlesSVG;
    default:
      return;
  };
};

const MemoryCard = (props) => {
  return (
    <div className="card-front" onClick={props.onHandleClick(props.cardId)}>
      <ReactCardFlip isFlipped={props.isFlipped} flipDirection="horizontal" className="card">
        <div className="card-front">
          <img src={cardFront(props.imageId)} alt="Card Front" className="card-front" />
        </div>
        <div className="card-back red-back">
          <img src={props.cardBack} alt="Card Background" className="card-back" />
        </div>
      </ReactCardFlip>
    </div>
  );
};

export default MemoryCard;