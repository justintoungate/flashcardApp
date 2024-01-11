import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { readCard, readDeck, updateCard } from "../utils/api";
import { useHistory } from "react-router-dom";
import BaseCard from "./BaseCard";

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
  
    const deckName = deck ? deck.name : '';

    return <BaseCard handleSubmit={handleSubmit} handleChange={handleChange}
    card={card} deckName={deckName} deckId={deckId}/>
}

export default EditCard;