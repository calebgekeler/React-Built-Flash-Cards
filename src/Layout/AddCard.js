import React, {useEffect, useState} from "react"
import CardForm from "./CardForm"
import {readDeck} from "../utils/api/index"
import {useParams} from "react-router-dom"


function AddCard({studyDeck, fnObj, addCardData, setAddCardData}){
  let result="JSX";
  let cardId=20;
  //let allCards=[]
  //const url = `http://localhost:5000/cards`;
  const {deckId}=useParams();

  let [deck, setDeck]= useState({});

  // async function fetchJson(url, options) {
  //   try {
  //     const response = await fetch(url, options);
  //     if (response.status < 200 || response.status > 399) {
  //       throw new Error(`${response.status} - ${response.statusText}`);
  //     }
  //     return await response.json();
  //   } catch (error) {
  //     if (error.name !== "AbortError") {
  //       throw error;
  //     }
  //   }
  // }
  // async function getBiggerNumberForCardId(){
  //   const response = fetchJson(url);
  //   allCards = await Promise.resolve(response);
  //   for(let card in allCards){
  //     if(allCards[card].id>cardId){cardId=allCards[card].id};
  //   }
  //   cardId+=1;
  // }
  // getBiggerNumberForCardId()

  async function getDeck(){
    const item = await readDeck(deckId)
    const resolved = await Promise.resolve(item)
    setDeck(resolved);
    //console.log(deck);
  }

  

  
  useEffect(()=> { 
    getDeck();
    setAddCardData({
      [addCardData.deckId]: addCardData.deckId=deck.id,
      [addCardData.deckId]: addCardData.id=cardId,
    }); 
    setAddCardData({...addCardData})
  }, [deck.id])
  
  result=(
    <div className="container">
      <div className="row">
        <h3>{deck.name}: Add Card</h3>
      </div>
      <CardForm studyDeck={studyDeck} fnObj={fnObj}/>
    </div>
  ) 

  return result
}

export default AddCard;