import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DeckSummary from "./DeckSummary";
import { listDecks } from "../utils/api";

function DeckList({updateCount, update}) {
    const history = useHistory();
    const [decks, setDecks] = useState([]);
    
    function handleClick() {
        history.push('/decks/new');
    }

    useEffect(() => {
        listDecks().then((decklist) => {
            setDecks(decklist);
        })
    }, [updateCount])

    const createButton = <button className="create" onClick={handleClick}>Create Deck</button>;
    const deckList = decks.map((deck, index) => <li key={index}><DeckSummary deck={deck} update={update} /></li>)

  return (
    <div>
        {createButton}
        <ul className="deckList">{deckList}</ul>
    </div>
  );
}

export default DeckList;