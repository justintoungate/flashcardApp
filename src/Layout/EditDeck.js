import React, { useEffect, useState } from "react";
import Breadcrumb from "../Layout/Breadcrumb";
import { useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";

function EditDeck({update}) {

    const { deckId } = useParams();
    const initialDeckState = {
        name: "",
        description: "",
        id: deckId
      };
    const [ deck, setDeck ] = useState({...initialDeckState});
    const history = useHistory();

    useEffect(() => {
        readDeck(deckId).then((data) => {
            setDeck(data);
        })
    }, [deckId])

    const handleChange = ({ target }) => {
        const value = target.type === "checkbox" ? target.checked : target.value;
        setDeck({
          ...deck,
          [target.name]: value,
        });
      };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log("Submitted:", deck);
      updateDeck(deck).then(() => {
        update(); // Update count so that deck page will refresh with updated data
        history.push(`/decks/${deckId}`)
      })
    };
    const deckName = deck ? deck.name : '';
  
    const deckForm = (
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input
            id="name"
            type="text"
            name="name"
            onChange={handleChange}
            value={deck.name}
          />
        </label>
        <br />
        <label htmlFor="description">
          Description:
          <textarea
            id="description"
            name="description"
            onChange={handleChange}
            value={deck.description}
          />
        </label>
        <button type="submit">Save</button>
        <button onClick={() => history.push(`/decks/${deckId}`)}>Cancel</button>
      </form>
    );

  return (
    <div>
        <Breadcrumb deckName={deckName} deckUrl={`/decks/${deckId}`} currentText={`Edit Deck`} />
        <h1>Edit Deck</h1>
        {deckForm}
    </div>
  );
}

export default EditDeck;