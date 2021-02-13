import React, {useEffect} from "react"
import {Link} from "react-router-dom"
import CardForm from "./CardForm"


function AddCard({studyDeck, fnObj, addCardData, setAddCardData}){
  let result="JSX";
  let cardId=0;
  let allCards=[]
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
  async function getBiggerNumberForCardId(){
    const response = fetchJson(url);
    allCards = await Promise.resolve(response);
    for(let card in allCards){
      if(allCards[card].id>cardId){cardId=allCards[card].id};
    }
    cardId+=1;
  }
  getBiggerNumberForCardId()



  


  useEffect(()=> { 
    setAddCardData({
      [addCardData.deckId]: addCardData.deckId=studyDeck.id,
      [addCardData.deckId]: addCardData.id=cardId,
    }); 
    setAddCardData({...addCardData})
  }, [])
  
  result=(
    <div className="container">
      <div className="row">
        <h3>{studyDeck.name}: Add Card</h3>
      </div>
      <CardForm studyDeck={studyDeck} fnObj={fnObj}/>
    </div>
  ) 

  return result
}

export default AddCard;