import React, {useState} from 'react';
import {TickTackToe} from "./components/TickTackToe/TickTackToe";
import "./index.css";
import {Gamestate} from "./logic/TickTackToeLogic";
import {Button} from "./components/Button/Button";
import styles from './App.module.css';

function App() {
    const [text, setText] = useState("");


    function handleGameState(gameState: Gamestate)
    {
        switch (gameState)
        {
            case Gamestate.PENDING: setText("Pending");
            break;

            case Gamestate.LOST: setText("Lost");
            break;

            case Gamestate.WON: setText("You won!");
            break;

            case Gamestate.STALEMATE: setText("Stalemate!");
        }
    }



  return (
   <div style={{height: '100%'}}>
       <h1 style={{textAlign: 'center'}}>{text}</h1>
     <TickTackToe gameStateCb={handleGameState} />
       <div style={{display: 'grid', placeItems: 'center'}}>
           <Button className={styles.btn}>Reset</Button>
       </div>
   </div>
  );
}

export default App;
