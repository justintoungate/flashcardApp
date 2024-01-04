import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

function StudyCard({card, isLast, setCardNumber}) {
    const history = useHistory();
    const [isFront, setIsFront] = useState(true);

    function handleFlip() {
        setIsFront(!isFront);
    }


    const front = card ? card.front : '';
    const back = card ? card.back : '';

    function restartDeck() {
        if(window.confirm('Restart cards?')) {
            setCardNumber();
            handleFlip();
        } else {
            history.push('/');
        }
    }

    function nextCard() {
        setCardNumber();
        handleFlip()
    }

    const cardData = isFront ? front : back;
    const next = () => {
        if(!isFront) {
            if(isLast) {
                return <button onClick={restartDeck}>Next</button>
            }
            else {
                return <button onClick={nextCard}>Next</button>
            }
        }
        else return null;
    }

  return (
    <div className="cardSummary">
        {cardData}
        <div className="buttonRow">
            <button onClick={handleFlip}>Flip</button>
            {next()}
        </div>
    </div>
  ); 
}

export default StudyCard;