import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';
import { ReactComponent as BeanieSVG } from './assets/svgs/beanie-1619898.svg';
import cardBackground from './assets/images/card_background.png';
import "./App.css";

function App() {
  let [isFlipped, setIsFlipped] = useState(true);

  return (
    <div className="App">
      <div className="card-front" onClick={() => setIsFlipped(prevState => !prevState)}>
        <ReactCardFlip isFlipped={isFlipped} flipDirection="horizontal" className="card">
          <div className="card-front">
            <BeanieSVG />
          </div>
          <div className="card-back red-back">
            <img src={cardBackground} alt="Card Background" className="card-back" />
          </div>
        </ReactCardFlip>
      </div>
    </div>
  );
}

export default App;


{/* <a href="https://iconscout.com/icon-pack/christmas-2194" target="_blank">Christmas Icon Pack</a> by <a href="https://iconscout.com/contributors/iconscout" target="_blank">Iconscout Store</a> */ }