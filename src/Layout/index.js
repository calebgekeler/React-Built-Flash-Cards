import React, {useState, useEffect, Fragment} from "react";
import {Switch, Route, useHistory} from "react-router-dom";
import {listDecks, deleteDeck, updateDeck, createCard, createDeck, readDeck} from "../utils/api/index";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateDeckBtn from "./home/CreateDeckBtn";
import Decks from "./home/Decks";
import Study from "./home/Study";
import BreadCrumb from "./BreadCrumb";
import AddCard from "./AddCard";
import CreateDeck from "./CreateDeck";
import Deck from "./Deck";
import EditCard from "./EditCard";
import EditDeck from "./EditDeck";




function Layout() {
  const history=useHistory();

  const [deck, setDeck] = useState([]);
  const [studyDeck, setStudyDeck] = useState(undefined);
  const [sideToDisplay, setDisplay] = useState(undefined);
  let [counter, setCounter] = useState(0);
  let [isNextBtnOn, setNextBtn] = useState(false);
  //deleteCard(6)

  const initialCreateDeckFormData={
    id: 0,
    name: "",
    description: ""
  }

  const initialAddCardFormData={
    front: "",
    back: "",
    deckId: 0,
    id: 0
  }

  let [createDeckData, setCreateDeckData] = useState({...initialCreateDeckFormData})

  let [addCardData, setAddCardData] = useState({...initialAddCardFormData})
  // console.log("ADD CARD DATA", addCardData)

  
  const fnObj={
    deleteDeckHandler: (event) => {
      if(window.confirm("Are you sure you want to delete this deck?")){
        deleteDeck(event.target.id);
        fnObj.deckFetcher();
        history.push("/")
      }
    },
    deckFetcher: async () =>{
      const deckSet = await Promise.resolve(listDecks());
      return setDeck(deckSet);
    },
    nextHandler: () => {
      if(counter<studyDeck.cards.length-1){
        setCounter(counter+=1);
        setNextBtn(false);
        setDisplay(studyDeck.cards[counter].front);
      }
      else{
        if(window.confirm("Press OK to restart deck and CANCEL to return home")){
          setNextBtn(false);
          setDisplay(studyDeck.cards[counter].front);
        }
        else{
          history.push("/");
          setNextBtn(false);
        }
        setCounter(0);
      }
    },
    flipHandler: () => {
      if(sideToDisplay===studyDeck.cards[counter].front){
        setDisplay(studyDeck.cards[counter].back);
        setNextBtn(true);
        return   
      }
      if(sideToDisplay===studyDeck.cards[counter].back){
        setDisplay(studyDeck.cards[counter].front);
        setNextBtn(false);
        return
      }
    },
    studyDeckSetter: async (id) => {
      if(id===undefined){id=1}; //sets an arbitrary id value so the function compiles but it is over written when necessary
      const item = await readDeck(id);
      const resolved = await Promise.resolve(item);
      setStudyDeck(resolved);
      //console.log('STUDY DECK', studyDeck)
    },
    addCardFormChangeHandler: ({target}) => {
      setAddCardData({
        ...addCardData, 
        [target.name]: target.value,
      })
      console.log(addCardData)
    },
    addCardSubmitHandler: async (event) => {
      event.preventDefault();
      await createCard(studyDeck.id, addCardData);
      setAddCardData({...initialAddCardFormData});
    },
    createDeckChangeHandler: ({target}) => {
      setCreateDeckData({
        ...createDeckData,
        [target.name]: target.value
      })
      console.log(createDeckData)
    },
    createDeckSubmitHandler: async (event) => {
      event.preventDefault();
      await createDeck(createDeckData);
      setCreateDeckData({...initialCreateDeckFormData});
      history.push("/");
    },
    editCardFormChangeHandler: ({target}) => {
      setAddCardData({
        ...addCardData, 
        [target.name]: target.value,
      })
      console.log(addCardData)
    },
  }
  useEffect(()=>{
    fnObj.studyDeckSetter(deck[0])
  }, [])

  useEffect(()=>{
   fnObj.deckFetcher();

   if(studyDeck!==undefined){
    setDisplay(studyDeck.cards[counter].front);
   }
  }, [studyDeck, counter])
  return (
    <Fragment>
      <Header />
      <div className="container">
        <Switch>
          <Route exact={true} path={"/"}>
            <CreateDeckBtn />
            <Decks 
              deck={deck} 
              fnObj={fnObj} 
            />
          </Route>
          <Route exact={true} path={"/decks/:deckId/study"}>
            <BreadCrumb 
              studyDeck={studyDeck}
            />
            <Study 
              fnObj={fnObj} 
              studyDeck={studyDeck}
              sideToDisplay={sideToDisplay}
              counter={counter}
              isNextBtnOn={isNextBtnOn}
              setCounter={setCounter}
              setNextBtn={setNextBtn}
            />
          </Route>
          <Route path={"/decks/:deckId/cards/new"}>
            <BreadCrumb 
              studyDeck={studyDeck}
            />
            <AddCard 
              studyDeck={studyDeck}
              fnObj={fnObj}
              addCardData={addCardData}
              setAddCardData={setAddCardData}
            />
          </Route>
          <Route exact={true} path={"/decks/new"}>
            <BreadCrumb />
            <CreateDeck 
              fnObj={fnObj}
              createDeckData={createDeckData}
            
            />
          </Route>
          <Route exact={true} path={"/decks/:deckId"}>
            <BreadCrumb 
              studyDeck={studyDeck}
            />
            <Deck 
              studyDeck={studyDeck}
              fnObj={fnObj}
            />
          </Route>
          <Route path={"/decks/:deckId/cards/:cardId/edit"}>
            <EditCard 
              studyDeck={studyDeck}
              fnObj={fnObj}
            />
          </Route>
          <Route path={"/decks/:deckId/edit"}>
            <BreadCrumb studyDeck={studyDeck}/>
            <EditDeck studyDeck={studyDeck}/>
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch> 
      </div>
    </Fragment>
  );
}

export default Layout;