import React, {useState, useEffect} from "react";
import {Link, useHistory, useParams} from "react-router-dom";
import {updateDeck, readDeck} from "../utils/api/index"

function EditDeck({fnObj}){
  const {deckId} = useParams()
  
  
  
  const [editDeck, setEditDeck] = useState({});
  //console.log('EDIT DECK', editDeck);
  const history=useHistory();

  const editDeckChangeHandler=({target})=>{
    setEditDeck({
      ...editDeck,
      [target.name]: target.value
    })
  }

  const editDeckSubmitHandler= async (event)=>{
    event.preventDefault();
    await updateDeck(editDeck);
    history.push(`/decks/${editDeck.id}`);
  }

  async function getDeck(){
    const item = await readDeck(deckId)
    const resolved = await Promise.resolve(item)
    setEditDeck(resolved);
    //console.log(editDeck);
  }
  
  useEffect(()=>{
    getDeck()
  }, [editDeck.id])
  
  let result=(
    <section className="container">
      <h2 className="row">Edit Deck</h2>
      <form onSubmit={editDeckSubmitHandler}>
        <label className="row">
          <h5>Name:</h5>
          <textarea
            className="w-100"
            name="name"
            type="text"
            value={editDeck.name}
            onChange={editDeckChangeHandler}
          />
        </label>
        <label className="row">
          <h5>Description:</h5>
          <textarea 
          className="w-100"
            name="description"
            type="text"
            value={editDeck.description}
            onChange={editDeckChangeHandler}
          />
        </label>
        <div className="row">
          <Link to={`/decks/${editDeck.id}`} className="btn btn-secondary">Cancel</Link>
          <button className="btn btn-primary mx-2" type="submit">Submit</button>
        </div>
      </form>
    </section>
  )
  return result;

}


export default EditDeck;