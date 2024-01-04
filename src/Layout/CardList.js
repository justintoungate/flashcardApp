import React from "react";
import CardSummary from "./CardSummary";

function CardList({cards, update}) {
    const cardList = cards ? cards.map((card, index) => <li key={index}><CardSummary card={card} update={update} /></li>) : null;

  return (
    <div className="cardList">
      <h1>Cards</h1>
      <ul>{cardList}</ul>
    </div>
  );
}

export default CardList;