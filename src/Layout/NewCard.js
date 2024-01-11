import React, { useEffect, useState } from "react";
import { useHistory, useParams } from 'react-router-dom';
import { createCard, readDeck } from "../utils/api";
import BaseCard from "./BaseCard";

function NewCard({update}) {

    const { deckId } = useParams();
    const initialCardState = {
        front: "",
        back: ""
      };
    const [ deck, setDeck ] = useState({});
    const [ card, setCard ] = useState({ ...initialCardState })

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
  

  return <BaseCard handleSubmit={handleSubmit} handleChange={handleChange}
  card={card} deckName={deckName} deckId={deckId}/>
}

export default NewCard;