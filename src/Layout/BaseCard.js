import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";

function BaseCard({handleSubmit, handleChange, card, deckName, deckId}) {
    const history = useHistory();

    const cardForm = (
        <form onSubmit={handleSubmit}>
          <label htmlFor="front">
            Front:
            <textarea
              id="front"
              name="front"
              onChange={handleChange}
              value={card.front}
            />
          </label>
          <br />
          <label htmlFor="back">
            Back:
            <textarea
              id="back"
              name="back"
              onChange={handleChange}
              value={card.back}
            />
          </label>
          <button type="submit">Save</button>
          <button onClick={() => history.push(`/decks/${deckId}`)}>Done</button>
        </form>
      );
  
    return (
      <div>
          <Breadcrumb deckName={deckName} deckUrl={`/decks/${deckId}`} currentText={`Add Card`} />
          <h1>{deckName}: Add Card</h1>
          {cardForm}
      </div>
    );
}

export default BaseCard;