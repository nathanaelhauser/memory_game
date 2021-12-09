import { createContext } from 'react';

const GameContext = createContext({
  score: 0,
  cardData: [],
  chosenCardIndices: [],
  handleFlipCard: () => {},
  resetGame: () => {},
  startGame: () => {}
});

export default GameContext;