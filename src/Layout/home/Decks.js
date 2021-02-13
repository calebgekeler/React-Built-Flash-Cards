import React from "react";
import {Link} from "react-router-dom"

function Decks({deck, fnObj}){
  let result
  if(deck !== undefined){
   result = deck.map(item => (
      <div key={item.id} className="card mt-4">
        <div className="card-body">
          <h3 className="card-title">
            {item.name}
          </h3>
          <p>{item.cards.length} cards</p>
          <p className="card-text">
            {item.description}
          </p>
        </div>
        <div className="container m-3">
          <div className="row justify-content-start">
            <Link to={`/decks/${item.id}`} className="col-1 btn btn-secondary">View</Link>
            <Link to={`/decks/${item.id}/study`} className="col-1 btn btn-primary mx-2">Study</Link>
            <button id={item.id} onClick={fnObj.deleteDeckHandler} className="col-1 btn btn-danger">Delete</button>
          </div>
        </div>
      </div>
  ));
  }
  else{
    return null;
  }
  return result
}


export default Decks;