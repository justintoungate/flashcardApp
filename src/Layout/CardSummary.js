import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { deleteCard } from "../utils/api";

function CardSummary({card, update}) {
    const history = useHistory();
    const { pathname } = useLocation();

    function handleDelete() {
        if(window.confirm('Delete this card?')) {
            deleteCard(card.id).then(() => {
                update(); 
            })
        }
    }

  return (
    <div className="cardSummary">
        <div className="front">
            {card.front}
        </div>
        <div className="back">
            {card.back}
        </div>
        <div className="buttonRow">
            <button onClick={() => history.push(`${pathname}/cards/${card.id}/edit`)}>Edit</button>
            <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
    </div>
  );
}

export default CardSummary;