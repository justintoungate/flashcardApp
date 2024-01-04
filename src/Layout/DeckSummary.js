import React from "react";
import { useHistory } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckSummary({deck, update}) {
    const history = useHistory();
    const cardNumber = deck.cards.length;

    const cards = cardNumber === 1 ? (<span className="cardCount">{cardNumber} card</span>) : (<span className="cardCount">{cardNumber} cards</span>);

    function handleDelete() {
        if(window.confirm('Delete this deck?')) {
            deleteDeck(deck.id).then(() => {
                update(); 
                history.push('/')
            })
        }
    }

  return (
    <div className="deckSummary">
        <div className="deckTitle">
            <h2>{deck.name}</h2>
            {cards}
        </div>
        <p>{deck.description}</p>
        <div className="buttons">
            <div className="buttonRow">
                <button onClick={() => history.push(`/decks/${deck.id}`)}>View</button>
                <button className="study" onClick={() => history.push(`/decks/${deck.id}/study`)}>Study</button>
            </div>
            <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
    </div>
  );
}

export default DeckSummary;