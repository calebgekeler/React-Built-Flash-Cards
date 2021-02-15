import React, {useEffect} from "react";
import {useParams} from "react-router-dom"
import NotEnoughCards from '../NotEnoughCards'

function Study({fnObj, studyDeck, sideToDisplay, counter, isNextBtnOn}){
  let result
  const deckId = useParams();

  
  useEffect(()=>{
    fnObj.studyDeckSetter(deckId.deckId);
  }, [])
  
  
  

  if(studyDeck !== undefined){
    
    
    result=(
      <div className="container">
        <div className="row">
          <h1>Study: {studyDeck.name} </h1>
        </div>
        {studyDeck.cards.length>=3 ?
        <div className="row">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title pl-20">
                Card {counter+1} of {studyDeck.cards.length}
              </h5>
              <p className="card-text">
                {sideToDisplay}
              </p>
              <div>
                <button onClick={fnObj.flipHandler} className=" btn btn-secondary">Flip</button>
                {isNextBtnOn ?
                <button onClick={fnObj.nextHandler} className="mx-2 btn btn-primary">Next</button> : null}
              </div>
            </div>
          </div> 
        </div> : 
        <NotEnoughCards studyDeck={studyDeck} />}
      </div>
    )
  }
  else{
    return null
  };
  
  
  return result;
}



export default Study;