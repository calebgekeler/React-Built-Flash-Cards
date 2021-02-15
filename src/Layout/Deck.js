import React, {useEffect, Fragment} from "react"
import {Link, useParams} from "react-router-dom"
import {deleteCard} from "../utils/api/index"


function Deck({fnObj, studyDeck}){
  const {deckId}=useParams()
  let result

  useEffect(()=>{
    fnObj.studyDeckSetter(deckId);
  }, [])

  const deleteCardHandler = async (event) =>{
    event.preventDefault();
    await deleteCard(event.target.id);
    fnObj.studyDeckSetter(deckId);
  }
  

  if(studyDeck!== undefined){

    const cards = studyDeck.cards.map((item)=>(
      <div className="card w-100">
        <div className="cardbody">
          <p className="text-center">
             {item.front}
          </p>
          <p className="text-center">
            {item.back}
          </p>
        </div>
        <div className="container p-3">
          <div className="row justify-content-center">
            <Link className="btn btn-secondary" to={`/decks/${studyDeck.id}/cards/${item.id}/edit`}>Edit</Link>
            <button id={item.id} onClick={deleteCardHandler} className="col-1 btn btn-danger mx-5">Delete</button>
          </div>
        </div>
      </div>
    ))


    result=(
      <Fragment>
        <section className="container">
          <h1 className="row">{studyDeck.name}</h1>
          <article className="row">{studyDeck.description}</article>
          <div className="row pt-5">
            <Link className="btn btn-secondary" to={`/decks/${studyDeck.id}/edit`}>Edit</Link>
            <Link className="btn btn-primary mx-2" to={`/decks/${studyDeck.id}/study`}>Study</Link>
            <Link className="btn btn-primary" to={"/decks/:deckId/cards/new"}>Add Cards</Link>
            <button onClick={fnObj.deleteDeckHandler} id={studyDeck.id} className="justify-content-end btn btn-danger mx-2">Delete</button>
          </div>
          <h2 className="row pt-5">Cards</h2>
          <div className="row">
            {cards}
          </div>
        </section>
      </Fragment>

    )
  }
  else{return null};
  return result;
}

export default Deck;