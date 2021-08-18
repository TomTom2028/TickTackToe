import React, {FunctionComponent, useState} from "react";
import {Cell, CellValue, checkGame, createGameBoard, doComputerMove, Gamestate} from "../../logic/TickTackToeLogic";
import styles from "./TickTackToe.module.css"


let allowCellUpdate = true;
const CellComponent: FunctionComponent<{val: CellValue, clickEvent: React.MouseEventHandler}> = (props) => {
    return (
        <div className={styles.cell} onClick={props.clickEvent}>
            {props.val}
        </div>
    )
}




const TickTackToe: FunctionComponent = () => {


    const [gameBoard, setGameBoard] = useState(createGameBoard());

    function updateCell(clickedCell: Cell): void {
        if (!allowCellUpdate)
        {
            return;
        }

        clickedCell.val = CellValue.PLAYER;
        setGameBoard([...gameBoard]);
        allowCellUpdate = false;
        if (checkGame(gameBoard) === Gamestate.WON) {
            alert("won ofz");
        }
        else {
            setTimeout(() => {
                doComputerMove(gameBoard);
                setGameBoard([...gameBoard]);
                if (checkGame(gameBoard) === Gamestate.LOST) {
                    alert("u lost lmao");
                }
                else {
                   allowCellUpdate = true;
                }


            }, 1000);
        }
    }


    return (
        <div className={styles.game}>
            {
                gameBoard.map(row => {
                    return row.map(cell => {
                        return <CellComponent key={cell.i.toString() + cell.j.toString()}
                                              val={cell.val} clickEvent={() => updateCell(cell)}/>

                    })
                })
            }
        </div>
    )
}


export {
    TickTackToe,
}
