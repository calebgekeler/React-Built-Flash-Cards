import React, {Fragment} from "react";
import {Link, useHistory, useParams} from "react-router-dom"
import {updateCard} from "../utils/api/index"

function CardForm({studyDeck, fnObj, card, setCard}){
  const history=useHistory();
  const {deckId}=useParams();
  

  
  let result
  const updateCardChange=({target})=>{
    setCard({
      ...card,
      [target.name]: target.value
    })
  }
  const updateCardSubmit= async (event)=>{
    event.preventDefault();
    await updateCard(card);
    history.push(`/decks/${deckId}`);
  }
  
  
 
  if(card===undefined){
    result=(
      <Fragment>      
        <form onSubmit={fnObj.addCardSubmitHandler}>
          <label className="row">
            <h5>Front:</h5>
            <textarea 
              className="w-100" 
              name="front"
              type="text"
              placeholder="Front side of card"
              onChange={fnObj.addCardFormChangeHandler}
            />
          </label>
          <label className="row">
            <h5>Back:</h5>
            <textarea
              className="w-100"
              name="back"
              type="text"
              placeholder="Back side of card"
              onChange={fnObj.addCardFormChangeHandler}
            />
          </label>
          <div className="row">
            <Link to={"/"} className="btn btn-secondary">Done</Link>
            <button className="btn btn-primary mx-5" type="submit">Save</button>
          </div>
        </form>
      </Fragment>
    )
  }
  else{
    result=(
      <Fragment>      
        <form onSubmit={updateCardSubmit}>
          <label className="row">
            <h5>Front:</h5>
            <textarea 
              className="w-100"
              name="front"
              type="text"
              value={card.front}
              onChange={updateCardChange}
            />
          </label>
          <label className="row">
            <h5>Back:</h5>
            <textarea
              className="w-100"
              name="back"
              type="text"
              value={card.back}
              onChange={updateCardChange}
            />
          </label>
          <div className="row">
            <Link to={"/"} className="btn btn-secondary">Done</Link>
            <button className="btn btn-primary mx-5" type="submit">Save</button>
          </div>
        </form>
      </Fragment>
    )
  }
  return result;

}


export default CardForm;