import React from "react";
import { useHistory, useLocation } from "react-router-dom";
import { deleteDeck } from "../utils/api";

function DeckDescription({deck, update}) {
    const history = useHistory();
    const { pathname } = useLocation();

    function handleDelete() {
        if(window.confirm('Delete this deck?')) {
            deleteDeck(deck.id).then(() => {
                update(); 
                history.push('/');
            })
        }
    }

  return (
    <div className="deckDescription">
        <h2>{deck.name}</h2>
        <p>{deck.description}</p>
        <div className="buttons">
            <div className="buttonRow">
                <button onClick={() => history.push(`${pathname}/edit`)}>Edit</button>
                <button className="study" onClick={() => history.push(`${pathname}/study`)}>Study</button>
                <button className="create" onClick={() => history.push(`${pathname}/cards/new`)}>Add Card</button>
            </div>
            <button className="delete" onClick={handleDelete}>Delete</button>
        </div>
    </div>
  );
}

export default DeckDescription;