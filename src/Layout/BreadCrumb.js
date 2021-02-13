import React, {Fragment} from "react"
import {useRouteMatch, Link} from "react-router-dom";


function BreadCrumb({studyDeck, cardId}){
  const trailOfBreadCrumbs = useRouteMatch();
  //console.log("TRAIL OF BREAD CRUMBS", trailOfBreadCrumbs.path)

  let result=""
  if(studyDeck!==undefined){
    if(trailOfBreadCrumbs.path==="/decks/:deckId/study"){
      result=( 
        <Fragment>
          <li className="breadcrumb-item" aria-current="page"><Link to={"/"}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${studyDeck.id}`}>{studyDeck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Study</li>
        </Fragment>
      )
    }
    if(trailOfBreadCrumbs.path==="/decks/:deckId/cards/new"){
      result=( 
        <Fragment>
          <li className="breadcrumb-item" aria-current="page"><Link to={"/"}>Home</Link></li>
          <li className="breadcrumb-item"><Link to={`/decks/${studyDeck.id}`}>{studyDeck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Add Card</li>
        </Fragment>
      )
    }
    if(trailOfBreadCrumbs.path==="/decks/:deckId"){
      result=( 
        <Fragment>
          <li className="breadcrumb-item" aria-current="page"><Link to={"/"}>Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">{studyDeck.name}</li>
        </Fragment>
      )
    }
    if(trailOfBreadCrumbs.path==="/decks/:deckId/cards/:cardId/edit"){
      result=( 
        <Fragment>
          <li className="breadcrumb-item" aria-current="page"><Link to={"/"}>Home</Link></li>
          <li className="breadcrumb-item" aria-current="page"><Link to={`/decks/${studyDeck.id}`}>{studyDeck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>

        </Fragment>
      )
    }
    if(trailOfBreadCrumbs.path==="/decks/:deckId/cards/:cardId/edit"){
      result=( 
        <Fragment>
          <li className="breadcrumb-item" aria-current="page"><Link to={"/"}>Home</Link></li>
          <li className="breadcrumb-item" aria-current="page"><Link to={`/decks/${studyDeck.id}`}>{studyDeck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Card {cardId}</li>
        </Fragment>
      )
    }
    if(trailOfBreadCrumbs.path==="/decks/:deckId/edit"){
      result=( 
        <Fragment>
          <li className="breadcrumb-item" aria-current="page"><Link to={"/"}>Home</Link></li>
          <li className="breadcrumb-item" aria-current="page"><Link to={`/decks/${studyDeck.id}`}>{studyDeck.name}</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Edit Deck {cardId}</li>
        </Fragment>
      )
    }
  }
  else{
    if(trailOfBreadCrumbs.path==="/decks/new"){
      result=( 
        <Fragment>
          <li className="breadcrumb-item" aria-current="page"><Link to={"/"}>Home</Link></li>
          <li className="breadcrumb-item active" aria-current="page">Create Deck</li>
        </Fragment>
      )
    }
  }

  
  
  
  return(
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        {result}
      </ol>
    </nav>
  );
}

export default BreadCrumb;