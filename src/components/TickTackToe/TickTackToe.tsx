import React, {FunctionComponent, useEffect, useRef, useState} from "react";
import {Cell, CellValue, checkGame, createGameBoard, doComputerMove, Gamestate} from "../../logic/TickTackToeLogic";
import styles from "./TickTackToe.module.css"
import {useCssRotation} from "../../logic/mouseHooks";


let allowCellUpdate = true;
const CellComponent: FunctionComponent<{val: CellValue, clickEvent: React.MouseEventHandler}> = (props) => {


    const [optionalClasses, setOptionalClasses] = useState("");

    const detectionDiv = useRef(null);
    const changeDiv = useRef(null);

    useCssRotation(detectionDiv, changeDiv, 20)

    useEffect(() => {
        setOptionalClasses(`${props.val === CellValue.PLAYER ? styles.userClicked : props.val === CellValue.COMPUTER ? styles.pcClicked : ''}`)
    }, [props.val])

    return (
        <div ref={detectionDiv} className={styles.gridBox}>
            <div ref={changeDiv} className={`${styles.cell} ${optionalClasses}`} onClick={props.clickEvent}>
                {props.val}
            </div>
        </div>
    )
}




const TickTackToe: FunctionComponent = () => {


    const [gameBoard, setGameBoard] = useState(createGameBoard());

    function updateCell(clickedCell: Cell): void {
        if (!allowCellUpdate || clickedCell.val !== CellValue.EMPTY)
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
