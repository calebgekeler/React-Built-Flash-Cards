import React from 'react';
import {Link} from "react-router-dom"

function CreateDeckBtn(){
    return(
        <Link to={"/decks/new"} className='btn btn-secondary'>Create Deck</Link>
    );
}

export default CreateDeckBtn;