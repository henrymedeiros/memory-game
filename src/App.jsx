import { useState, useEffect } from "react";
import AppCss from "./App.module.css";
import { v4 as uuidv4 } from "uuid";
import 'animate.css';
import Card from "./components/Card/Card";

let symbolNames = [
  "ghost",
  "hand-fist",
  "dragon",
  "gamepad",
  "chess-king",
  "dice-six",
  "scroll",
  "crow",
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [currentMatches, setCurrentMatches] = useState(0)

  // shuffle cards
  const shuffleCards = () => {
    const shuffledCards = [...symbolNames, ...symbolNames]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ name: card, id: uuidv4(), matched: false }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  };

  useEffect(() => {
    shuffleCards()
    return;
  }, []);

  const handleChoice = (card) => {
    
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);
      
      if (choiceOne.name === choiceTwo.name) {
        // console.log("match");
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.name === choiceOne.name) {
              setCurrentMatches(currentMatches+1)
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
      }
      setTimeout(() => resetTurn(), 800);
    }
    
    return;
  }, [choiceOne, choiceTwo]);

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(turns + 1);
    setDisabled(false);
   
  };
  
  return (
    <div>
      <div><i id='react-icon' class="fa-brands fa-react"></i></div>
      <h2>React.js Memory Game</h2>
      <div className={AppCss.Menu}>
        <span>{turns} Moves</span> <span className={AppCss.RestartButton} onClick={shuffleCards}><i  className="fa-solid fa-rotate-right"></i></span>
      </div>
      <div className={AppCss.App}>
      <div className={AppCss.CardGrid}>
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            disabled={disabled}
            matched={card.matched}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
          ></Card>
        ))}
      </div>
      
    </div>
    <footer>
    Feito de <i className="fa-solid fa-heart"></i> por <a href="https://github.com/henrymedeiros">Henry Medeiros</a>
    </footer>
    </div>
    
  );
}

export default App;
