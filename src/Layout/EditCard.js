import React, {useState, useEffect, Fragment} from "react";
import {useParams} from "react-router-dom"
import CardForm from "./CardForm";
import BreadCrumb from "./BreadCrumb"
import {readDeck, readCard} from "../utils/api/index"

function EditCard({fnObj}){
  const{deckId, cardId}=useParams()
  //console.log("CARD ID", cardId)
  //let allCards=[]
  let [card, setCard] = useState({})
  //console.log("CARD", card)
  const [deck, setDeck] = useState({})

  const studyDeckSetter = async (id) => {
    if(id===undefined){id=1}; //sets an arbitrary id value so the function compiles but it is over written when necessary
    const item = await readDeck(id);
    const resolved = await Promise.resolve(item);
    setDeck(resolved);
    console.log('DECK', deck)
  }

  //const url = `http://localhost:5000/cards`;

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
  
  //   let response = await fetchJson(url)
  //   allCards= await Promise.resolve(response)
  //   //console.log(allCards)
  //   for(let item in allCards){
  //     //console.log(allCards[item].id)
  //     if(allCards[item].id==cardId){setCard(allCards[item])}
  //   }
  //   //console.log('CARD', card.front)
  // }
  async function getCard(id){
    const item = await readCard(id);
    const resolved = await Promise.resolve(item)
    setCard(resolved);
  }


  useEffect(()=>{
    getCard(cardId);
    studyDeckSetter(deckId)
  }, [card.id])
  
  const result=(
    <Fragment>
      <BreadCrumb studyDeck={deck} cardId={cardId}/>
      <div className="container">
        <div className="row">
          <h3>{deck.name}: Edit Card</h3>
        </div>
        <CardForm 
          studyDeck={deck} 
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