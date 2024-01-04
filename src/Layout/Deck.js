import React, { useEffect, useState } from "react";
import { Route, Switch, useParams, useRouteMatch } from 'react-router-dom';
import NotFound from "./NotFound";
import Study from "./Study";
import NewCard from "./NewCard";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";
import DeckDescription from "./DeckDescription";
import Breadcrumb from "./Breadcrumb";
import { readDeck } from "../utils/api";
import CardList from "./CardList";

function Deck({updateCount, update}) {

    const { deckId } = useParams();  
    const { path } = useRouteMatch(); 
    const [deck, setDeck] = useState({});

    useEffect(() => {
        async function getDeckDetails() {
            readDeck(deckId).then((deck) => {
                setDeck(deck);
            })
            .catch((error) => {
                console.log(error);
            });
            
        }
        getDeckDetails();
    }, [deckId, updateCount])

  return (
    <Switch>
        <Route exact={true} path={path}>
          <Breadcrumb currentText={deck.name} />
          <DeckDescription deck={deck} update={update} />
          <CardList cards={deck.cards} update={update} />
        </Route>
        <Route path={`${path}/study`}>
          <Study />
        </Route>
        <Route path={`${path}/edit`}>
          <EditDeck update={update} />
        </Route>
        <Route path={`${path}/cards/new`}>
          <NewCard update={update} />
        </Route>
        <Route path={`${path}/cards/:cardId/edit`}>
          <EditCard update={update} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>  
  );
}

export default Deck;