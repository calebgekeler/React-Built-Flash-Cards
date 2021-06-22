import React, {useState, useEffect, Fragment} from "react";
import {useParams} from "react-router-dom"
import CardForm from "./CardForm";
import BreadCrumb from "./BreadCrumb"
import {readDeck, readCard} from "../utils/api/index"

function EditCard({fnObj}){
  const{deckId, cardId}=useParams()
  let [card, setCard] = useState({})
  const [deck, setDeck] = useState({})

  const studyDeckSetter = async (id) => {
    if(id===undefined){id=1}; //sets an arbitrary id value so the function compiles but it is over written when necessary
    const item = await readDeck(id);
    const resolved = await Promise.resolve(item);
    setDeck(resolved);
    console.log('DECK', deck)
  }

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