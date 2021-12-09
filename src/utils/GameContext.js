import { createContext } from 'react';

const GameContext = createContext({
  score: 0,
  cardData: [],
  chosenCardIndices: [],
  resetGame: () => { },
});

export default GameContext;