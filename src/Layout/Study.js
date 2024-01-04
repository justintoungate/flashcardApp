import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { readDeck } from "../utils/api";
import Breadcrumb from "../Layout/Breadcrumb";
import StudyCard from "./StudyCard";

function Study() {
    const { deckId } = useParams();
    const [ deck, setDeck ] = useState({});
    const [ cardNumber, setCardNumber ] = useState(0);
    const [ card, setCard ] = useState({});
    const history = useHistory();

    useEffect(() => {
        readDeck(deckId).then((data) => {
            setDeck(data);
        })
    }, [deckId])

    useEffect(() => {
      if(deck && deck.cards) {
        setCard(deck.cards[cardNumber]);
      }
    }, [cardNumber, deck])

    function incrementCard() {
      if(cardNumber + 1 === deck.cards.length) {
        // restart cards
        setCardNumber(0);
      } else {
        setCardNumber((prevCard) => prevCard + 1);
      }
    }

    const deckName = deck ? deck.name : '';
    const cards = deck.cards;

    console.log("DECK", deck);
    console.log("cardNumeber", cardNumber);
    console.log("card", card);
    const cardData = () => {
      if(cards && cards.length < 3) {
        const cardInfo = cards.length === 1 ? 'is 1 card' : `are ${cards.length} cards`
        return (
          <div>
            <h2>Not enough cards.</h2>
            <p>You need at least 3 cards to study. There {cardInfo} in this deck.</p>
            <button className="create" onClick={() => history.push(`/decks/${deckId}/cards/new`)}>Add Cards</button>
          </div>
        )
      } else if(cards) {
        return (
          <div>
            <h3>Card {cardNumber + 1} of {cards.length} </h3>
            <StudyCard card={card} isLast={cardNumber + 1 === cards.length} setCardNumber={incrementCard} />
          </div>
        )
      } else return null;
    }

  return (
    <div>
        <Breadcrumb deckName={deckName} deckUrl={`/decks/${deckId}`} currentText={`Study`} />
        <h1>Study: {deckName}</h1>
        {cardData()}
    </div>
  );
}

export default Study;