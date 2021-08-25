import React, {
    forwardRef,
    FunctionComponent,
    PropsWithChildren,
    Ref,
    useEffect,
    useImperativeHandle,
    useRef,
    useState
} from "react";
import {Cell, CellValue, checkGame, createGameBoard, doComputerMove, Gamestate} from "../../logic/TickTackToeLogic";
import styles from "./TickTackToe.module.css"
import {useCssRotation} from "../../logic/mouseHooks";


const CellComponent: FunctionComponent<{val: CellValue, clickEvent: React.MouseEventHandler}> = (props) => {

    function convertCellValToClass(celVal: CellValue) {
        return celVal === CellValue.EMPTY ? styles.cellShowEmpty :
            celVal === CellValue.PLAYER ? styles.cellShowPlayer :
                celVal === CellValue.COMPUTER ? styles.cellShowPc : '';
    }


    const [visableClass, setVisableClass] = useState(convertCellValToClass(props.val))



    const detectionDiv = useRef(null);
    const changeDiv = useRef(null);

    useCssRotation(detectionDiv, changeDiv, 20)

    useEffect(() => {
        setVisableClass(convertCellValToClass(props.val));
    }, [props.val])


    const handleClick = (e: React.MouseEvent<Element, MouseEvent>) => {
        props.clickEvent(e)
    }

    return (
        <div ref={detectionDiv} className={`${styles.gridBox} ${visableClass}`}>


            <div ref={changeDiv} className={`${styles.cell}`} onClick={handleClick}>
                <div className={styles.cellEmpty}>
                    {CellValue.EMPTY}
                </div>
                <div className={styles.cellUserClicked}>
                    {CellValue.PLAYER}
                </div>
                <div className={styles.cellPcClicked}>
                    {CellValue.COMPUTER}
                </div>
            </div>
        </div>
    )
}


type GameStateCb = (state: Gamestate) => void



const TickTackToe = forwardRef((props: PropsWithChildren<{gameStateCb: GameStateCb}>, ref: Ref<{resetBoard: typeof resetBoard}>) => {


    const [gameBoard, setGameBoard] = useState(createGameBoard());
    const [gameState, setGameState] = useState(Gamestate.PENDING);
    const [allowCellUpdate, setAllowCellUpdate] = useState(true);

    useImperativeHandle(ref, () => ({
        resetBoard
    }))

    function resetBoard()
    {
        setGameBoard(createGameBoard);
        setAllowCellUpdate(true);
        setGameState(Gamestate.PENDING);

    }

    useEffect(() => {
        props.gameStateCb(gameState);
        }, [gameState])

    function updateCell(clickedCell: Cell): void {
        if (!allowCellUpdate || clickedCell.val !== CellValue.EMPTY)
        {
            return;
        }

        clickedCell.val = CellValue.PLAYER;
        setGameBoard([...gameBoard]);
        setAllowCellUpdate(false);
        if (checkGame(gameBoard) === Gamestate.WON) {
            setGameState(Gamestate.WON)
        }
        else {
            setTimeout(() => {
                doComputerMove(gameBoard);
                setGameBoard([...gameBoard]);

                const localGameState = checkGame(gameBoard);

                if (localGameState === Gamestate.LOST) {
                    setGameState(Gamestate.LOST);
                }
                else {
                    if (localGameState !== Gamestate.STALEMATE)
                    {
                        setAllowCellUpdate(true);
                    }
                   setGameState(localGameState);
                }


            }, 1000);
        }
    }


    return (
        <div className={styles.game}>
            {
                gameBoard.map(row => {
                    return row.map(cell => {
                        return <CellComponent key={`${cell.i.toString()} ${cell.j.toString()}`}
                                              val={cell.val} clickEvent={() => updateCell(cell)}/>

                    })
                })
            }
        </div>
    )
});


export {
    TickTackToe,
}
