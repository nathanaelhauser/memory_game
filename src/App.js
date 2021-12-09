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
    handleCardClick: cardId => event => {
      // if first card is clicked, set chosenCardIndices to [cardId]
      if (state.chosenCardIndices.length === 0) {
        console.log('first card clicked', cardId);
        setState({
          ...state,
          chosenCardIndices: [cardId]
        });
      } else if (state.chosenCardIndices.length === 1) {
        console.log('second card clicked', cardId);
        // if second card is clicked, add cardId to chosenCardIndices
        setState({
          ...state,
          chosenCardIndices: [...state.chosenCardIndices, cardId]
        });

        const firstCardImage = state.cardData[state.chosenCardIndices[0]].imageId;
        const secondCardImage = state.cardData[cardId].imageId;

        // if the two cards match, set ChosenCardIndices to [] and leave the cards flipped
        if (firstCardImage === secondCardImage) {
          setState({
            ...state,
            chosenCardIndices: [],
            score: state.score + 1
          });
        } else {
          // if the two cards don't match, set ChosenCardIndices to [] and flip the cards back over
          setTimeout(() => {
            setState({
              ...state,
              chosenCardIndices: [],
              cardData: state.cardData.map(card => {
                if (card.imageId === firstCardImage || card.imageId === secondCardImage) {
                  return { ...card, isFlipped: true };
                }
                return card;
              })
            });
          }, 1000);
        }
      } else {
        // ignore clicks if two cards are already chosen
        return;
      }
      // flip the card
      setState({
        ...state,
        cardData: state.cardData.map((card, index) => {
          if (index === cardId) {
            return { ...card, isFlipped: false };
          }
          return card;
        })
      });
    },
    resetGame: () => { }
  });

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
              onClick={state.handleCardClick}
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