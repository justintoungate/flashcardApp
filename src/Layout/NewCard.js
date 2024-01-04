import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import Breadcrumb from "../Layout/Breadcrumb";
import { createCard, readDeck } from "../utils/api";

function NewCard({update}) {

    const { deckId } = useParams();
    const initialCardState = {
        front: "",
        back: ""
      };
    const [ deck, setDeck ] = useState({});
    const [ card, setCard ] = useState({ ...initialCardState })
    const history = useHistory();

    useEffect(() => {
        readDeck(deckId).then((data) => {
            setDeck(data);
        })
    }, [deckId])

    const handleChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        setCard({
          ...card,
          [target.name]: value,
        });
      };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      createCard(deckId, card).then(() => {
        update();
        setCard({...initialCardState});
      })
    };
  
  const deckName = deck ? deck.name : '';
  
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

export default NewCard;