import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../Layout/Breadcrumb";
import { readCard, readDeck, updateCard } from "../utils/api";
import { useHistory } from "react-router-dom";

function EditCard({update}) {
    const { deckId, cardId } = useParams();
    const initialCardState = {
        front: "",
        back: "",
        id: cardId,
        deckId: deckId
      };
    const [ deck, setDeck ] = useState({});
    const [ card, setCard ] = useState({ ...initialCardState })
    const history = useHistory();

    useEffect(() => {
        readDeck(deckId).then((data) => {
            setDeck(data);
        })
    }, [deckId])

    useEffect(() => {
        readCard(cardId).then((data) => {
            setCard(data);
        })
    }, [cardId])


    const handleChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        setCard({
          ...card,
          [target.name]: value,
        });
      };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      updateCard(card).then(() => {
        update(); // Update count so that deck page will refresh with updated data
        history.push(`/decks/${deckId}`)
      })
    };
  
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
        <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
      </form>
    );

    const deckName = deck ? deck.name : '';

  return (
    <div>
        <Breadcrumb deckName={deckName} deckUrl={`/decks/${deckId}`} currentText={`Edit Card ${cardId}`} />
        <h1>Edit Card</h1>
        {cardForm}
    </div>
  );
}

export default EditCard;