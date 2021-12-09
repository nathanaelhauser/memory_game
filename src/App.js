import React, { useState } from 'react';
import GameContext from './utils/GameContext';
import MemoryCard from './components/MemoryCard';
import cardBackground from './assets/images/card_background.png';
import "./App.css";

const shuffleArray = array => {
  for (let i = 0; i < array.length; i++) {
    const j = Math.floor(Math.random() * i);
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

let initialCardData = shuffleArray([
  { imageId: 0, isFlipped: true },
  { imageId: 1, isFlipped: true },
  { imageId: 2, isFlipped: true },
  { imageId: 3, isFlipped: true },
  { imageId: 0, isFlipped: true },
  { imageId: 1, isFlipped: true },
  { imageId: 2, isFlipped: true },
  { imageId: 3, isFlipped: true },
]);

const App = () => {
  const [state, setState] = useState({
    score: 0,
    cardData: initialCardData,
    chosenCardIndices: [],
    handleFlipCard: () => { },
    resetGame: () => { }
  });

  const handleClick = cardId => event => {
    setState(prevState => {
      let newState = { ...prevState };
      newState.cardData[cardId].isFlipped = !prevState.cardData[cardId].isFlipped;
      return newState;
    });
  };

  return (
    <div className="App">
      <GameContext.Provider value={state}>
        <div className='container'>
          {state.cardData.map((cardData, index) =>
            <MemoryCard
              key={index}
              cardId={index}
              imageId={cardData.imageId}
              isFlipped={cardData.isFlipped}
              onClick={handleClick}
              cardBack={cardBackground}
            />
          )}
        </div>
      </GameContext.Provider>
    </div>
  );
}

export default App;


{/* <a href="https://iconscout.com/icon-pack/christmas-2194" target="_blank">Christmas Icon Pack</a> by <a href="https://iconscout.com/contributors/iconscout" target="_blank">Iconscout Store</a> */ }