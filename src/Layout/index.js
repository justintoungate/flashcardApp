import React, { useState } from "react";
import { Route, Switch } from 'react-router-dom';
import Header from "./Header";
import NotFound from "./NotFound";
import DeckList from "./DeckList";
import NewDeck from "./NewDeck";
import Deck from "./Deck";

function Layout() {
  const [updateCount, setUpdateCount] = useState(0);

  const makeUpdate = () => {
    setUpdateCount((prevCount) => prevCount + 1);
}

  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
        <Route exact={true} path="/">
          <DeckList updateCount={updateCount} update={makeUpdate} />
        </Route>
        <Route path="/decks/new">
          <NewDeck update={makeUpdate} />
        </Route>
        <Route path="/decks/:deckId">
          <Deck updateCount={updateCount} update={makeUpdate} />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>        
      </div>
    </div>
  );
}

export default Layout;
