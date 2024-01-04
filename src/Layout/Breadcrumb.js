import React from "react";
import { Link } from "react-router-dom";

function Breadcrumb({currentText, deckName = '', deckUrl = ''}) {


    const homeLink = <Link to='/'>Home</Link>;
    const divider = <span>/</span>;

    const breadcrumb = deckName ? ( 
      <div className="breadcrumb">
        {homeLink}{divider}<Link to={deckUrl}>{deckName}</Link>{divider}{currentText}
      </div>
    ) : ( 
      <div className="breadcrumb">
        {homeLink}{divider}{currentText}
      </div>
    );

  return (breadcrumb);
}

export default Breadcrumb;
