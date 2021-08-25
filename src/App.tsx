import React, {useState} from 'react';
import {TickTackToe} from "./components/TickTackToe/TickTackToe";
import "./index.css";
import {Gamestate} from "./logic/TickTackToeLogic";
import {Button} from "./components/Button/Button";
import styles from './App.module.css';

function App() {
    const [text, setText] = useState("");

    let tickTackToeRef: { resetBoard: () => void; } | null;
    const [enableBtn, setEnableBtn] = useState(false);


    function handleGameState(gameState: Gamestate)
    {
        switch (gameState)
        {
            case Gamestate.PENDING: setText("Pending");
            setEnableBtn(false);
            break;

            case Gamestate.LOST: setText("Lost");
            setEnableBtn(true);
            break;

            case Gamestate.WON: setText("You won!");
            setEnableBtn(true);
            break;

            case Gamestate.STALEMATE: setText("Stalemate!");
            setEnableBtn(true);
        }
    }



  return (
   <div style={{height: '100%'}}>
       <h1 className={styles.headerText}>{text}</h1>
     <TickTackToe ref={r => tickTackToeRef = r} gameStateCb={handleGameState} />
       <div style={{display: 'grid', placeItems: 'center'}}>
           <Button className={styles.btn} onClick={() => tickTackToeRef?.resetBoard()} enabled={enableBtn} enabledStyle={styles.btnEnabled} disabledStyle={styles.btnDisabled}>Reset</Button>
       </div>
   </div>
  );
}

export default App;
