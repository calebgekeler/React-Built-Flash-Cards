import React, {useState, useEffect, Fragment} from "react";
import {useParams} from "react-router-dom"
import CardForm from "./CardForm";
import BreadCrumb from "./BreadCrumb"

function EditCard({fnObj, studyDeck}){
  const{cardId}=useParams()
  //console.log("CARD ID", cardId)
  let allCards=[]
  let [card, setCard] = useState({})
  //console.log("CARD", card)

  const url = `http://localhost:5000/cards`;

  async function fetchJson(url, options) {
    try {
      const response = await fetch(url, options);
      if (response.status < 200 || response.status > 399) {
        throw new Error(`${response.status} - ${response.statusText}`);
      }
      return await response.json();
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  }
  async function getCard(){
    let response = await fetchJson(url)
    allCards= await Promise.resolve(response)
    //console.log(allCards)
    for(let item in allCards){
      //console.log(allCards[item].id)
      if(allCards[item].id==cardId){setCard(allCards[item])}
    }
    //console.log('CARD', card.front)
  }
  useEffect(()=>{
    getCard();
  }, [])
  
  const result=(
    <Fragment>
      <BreadCrumb studyDeck={studyDeck} cardId={cardId}/>
      <div className="container">
        <div className="row">
          <h3>{studyDeck.name}: Edit Card</h3>
        </div>
        <CardForm 
          studyDeck={studyDeck} 
          fnObj={fnObj} 
          card={card}
          cardId={cardId}
          setCard={setCard}
          cardId={cardId}
        />
      </div>
    </Fragment>
  )
  return result;
}

export default EditCard;