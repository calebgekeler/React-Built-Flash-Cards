import React, {Fragment, useEffect, useState} from 'react'
import {Link, useParams} from "react-router-dom"
import {readDeck} from "../utils/api/index"



function NotEnoughCards({}){
  const {deckId} = useParams();
  //console.log("DECK ID", deckId)
  let [deck, setDeck]= useState({});

  async function getDeck(){
    const item = await readDeck(deckId)
    const resolved = await Promise.resolve(item)
    setDeck(resolved);
    //console.log("DECK", deck);
  }

  useEffect(()=>{
    getDeck()
  }, [deck.id])

  let result
  if(deck.cards!==undefined){
    result=(
      <Fragment>
        <div className="row">
          <h3>Not enough cards</h3>
        </div>
        <p className="row">You need at least 3 cards. You have {deck.cards.length} cards.</p>
        <div className="row">
          <Link className={"col-2 btn btn-primary"} to={`/decks/${deckId}/cards/new`}>Add Card</Link>
        </div>
      </Fragment>
      )
  }
  else{return null};
  return result;
}


export default NotEnoughCards;