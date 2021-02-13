import React, {Fragment} from 'react'
import {Link, useParams} from "react-router-dom"



function NotEnoughCards({studyDeck}){
  const {deckId} = useParams();
  //console.log("DECK ID", deckId)
  let result
  if(studyDeck!==undefined){
    result=(
      <Fragment>
        <div className="row">
          <h3>Not Enough Cards</h3>
        </div>
        <p className="row">You need at least 3 cards. You have {studyDeck.cards.length} cards.</p>
        <div className="row">
          <Link className={"col-2 btn btn-primary"} to={`/decks/${deckId}/cards/new`}>Add Card</Link>
        </div>
      </Fragment>
      )
  }
  return result;
}


export default NotEnoughCards;