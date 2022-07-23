import React from "react";
import CardCss from "./Card.module.css";

function Card({ card, handleChoice, disabled, matched, teste, flipped }) {
  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
    return;
  };
  const handleCardClasses = (flipped, matched, disabled) => {
    if (matched) {
      return CardCss.Card + " animate__animated animate__rubberBand " + CardCss.Matched;
    }
    if (flipped) {
      if(disabled){
        return CardCss.Card + ' animate__animated animate__wobble ' + CardCss.Unmatched
      }
      return CardCss.Card + " " + CardCss.FlippedCard;
    }
    return CardCss.Card; 
  };

  return (
    <div>
      <div
        onClick={handleClick}
        className={handleCardClasses(flipped, matched, disabled)}
      >
        <i className={`fa-solid fa-${card.name}`}></i>
      </div>
    </div>
  );
}

export default Card;
