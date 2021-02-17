import React, {useEffect, useState} from "react";
import {useParams, useHistory, useRouteMatch} from "react-router-dom"
import NotEnoughCards from '../NotEnoughCards'
import {readDeck} from "../../utils/api/index"

function Study({fnObj, counter, isNextBtnOn, setCounter, setNextBtn}){
  let result
  const url = useRouteMatch();
  const deckId = useParams();
  const history=useHistory();
  //console.log("COUNTER"counter)
  //console.log('DECK ID', deckId.deckId)

  let [sideToDisplay, setDisplay] = useState(undefined);
  let [deck, setDeck] = useState({});

  const studyDeckSetter = async (id) => {
    if(id===undefined){id=1}; //sets an arbitrary id value so the function compiles but it is over written when necessary
    const item = await readDeck(id);
    const resolved = await Promise.resolve(item);
    setDeck(resolved);
    //console.log('DECK', deck)
  }

  useEffect(()=>{
    studyDeckSetter(deckId.deckId);
    if(deck.cards!==undefined && deck.cards.length>0){
      setDisplay(deck.cards[counter].front)
    }
  }, [deck.id])
  //console.log('STUDY DECK ID', studyDeck.id)

  // let [counter, setCounter] = useState(0);
  // let [isNextBtnOn, setNextBtn] = useState(false);

  const flipHandler = () => {
    if(sideToDisplay===deck.cards[counter].front){
      setDisplay(deck.cards[counter].back);
      setNextBtn(true);
      return   
    }
    if(sideToDisplay===deck.cards[counter].back){
      setDisplay(deck.cards[counter].front);
      setNextBtn(false);
      return
    }
  }

  const nextHandler = () => {
    if(counter<deck.cards.length-1){
      setCounter(counter+=1);
      setNextBtn(false);
      setDisplay(deck.cards[counter].front);
    }
    else{
      if(window.confirm("Press OK to restart deck and CANCEL to return home")){
        setNextBtn(false);
        setDisplay(deck.cards[0].front);
      }
      else{
        history.push("/");
        setNextBtn(false);
      }
      setCounter(0);
    }
  }
  
  
  
  
  

  if(deck.id == deckId.deckId){
    
    
    result=(
      <div className="container">
        <div className="row">
          <h1>Study: {deck.name} </h1>
        </div>
        {deck.cards.length>=3 ?
        <div className="row">
          <div className="card w-100">
            <div className="card-body">
              <h5 className="card-title pl-20">
                Card {counter+1} of {deck.cards.length}
              </h5>
              <p className="card-text">
                {sideToDisplay}
              </p>
              <div>
                <button onClick={flipHandler} className=" btn btn-secondary">Flip</button>
                {isNextBtnOn ?
                <button onClick={nextHandler} className="mx-2 btn btn-primary">Next</button> : null}
              </div>
            </div>
          </div> 
        </div> : 
        <NotEnoughCards studyDeck={deck} />}
      </div>
    )
  }
  else{
    return null
  };
  
  
  return result;
}



export default Study;