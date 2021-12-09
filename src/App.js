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
  { imageId: 0, isFlipped: false },
  { imageId: 1, isFlipped: false },
  { imageId: 2, isFlipped: false },
  { imageId: 3, isFlipped: false },
  { imageId: 0, isFlipped: false },
  { imageId: 1, isFlipped: false },
  { imageId: 2, isFlipped: false },
  { imageId: 3, isFlipped: false },
]);

const App = () => {
  const [state, setState] = useState({
    score: 0,
    cardData: initialCardData,
    chosenCardIndices: []
  });

  const handleCardClick = cardId => event => {
    console.log(`card clicked: ${cardId}`);
    // if the card is already flipped, do nothing
    if (state.cardData[cardId].isFlipped) {
      console.log("Card already flipped");
      return;
    }

    setState(prevState => {
      console.log("Flipping card");
      switch (prevState.chosenCardIndices.length) {
        case 0:
          // if the first card is clicked, flip it
          return {
            ...prevState,
            chosenCardIndices: [cardId],
            cardData: prevState.cardData.map((card, index) => {
              if (index === cardId) {
                return { ...card, isFlipped: true };
              }
              return card;
            })
          };
        case 1:
          // if the second card is clicked, flip it and check if they match
          const firstCardImage = prevState.cardData[prevState.chosenCardIndices[0]].imageId;
          const secondCardImage = prevState.cardData[cardId].imageId;
          if (firstCardImage === secondCardImage) {
            // if they match, increment the score and reset the chosen cards
            console.log("Matched");
            return {
              ...prevState,
              score: prevState.score + 1,
              chosenCardIndices: [],
              cardData: prevState.cardData.map((card, index) => {
                if (index === cardId) {
                  return { ...card, isFlipped: true };
                }
                return card;
              })
            };
          } else {
            // if they don't match, wait 3 seconds and flip them back
            console.log("Not matched");
            setTimeout(() => {
              const cardData = prevState.cardData.map(card => {
                if (card.imageId === firstCardImage || card.imageId === secondCardImage) {
                  return { ...card, isFlipped: false };
                }
                return card;
              });
              setState({ ...prevState, cardData, chosenCardIndices: [] });
            }, 3000);
            return {
              ...prevState,
              chosenCardIndices: [...prevState.chosenCardIndices, cardId],
              cardData: prevState.cardData.map((card, index) => {
                if (index === cardId) {
                  return { ...card, isFlipped: true };
                }
                return card;
              })
            };
          }
        case 2:
        default:
          return prevState;
      }
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
              onClick={handleCardClick}
              cardFront={cardBackground}
            />
          )}
        </div>
        <h1>{state.score}</h1>
      </GameContext.Provider>
    </div>
  );
}

export default App;


{/* <a href="https://iconscout.com/icon-pack/christmas-2194" target="_blank">Christmas Icon Pack</a> by <a href="https://iconscout.com/contributors/iconscout" target="_blank">Iconscout Store</a> */ }