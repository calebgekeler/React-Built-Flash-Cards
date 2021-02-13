import React from 'react'
import {Link} from "react-router-dom"


function CreateDeck({fnObj}){
  let result = (
      <section className="container">
        <h2 className="row">Create Deck</h2>
        <form onSubmit={fnObj.createDeckSubmitHandler}>
          <label className="row">
            <h5>Name:</h5>
            <textarea
              className="w-100"
              name="name"
              type="text"
              placeholder="Name of the deck..."
              onChange={fnObj.createDeckChangeHandler}
            />
          </label>
          <label className="row">
            <h5>Description:</h5>
            <textarea 
            className="w-100"
              name="description"
              type="text"
              placeholder="A short description of the deck..."
              onChange={fnObj.createDeckChangeHandler}
            />
          </label>
          <div className="row">
            <Link to={"/"} className="btn btn-secondary">Cancel</Link>
            <button className="btn btn-primary mx-2" type="submit">Submit</button>
          </div>
        </form>
      </section>

  )

  return result;
}

export default CreateDeck;