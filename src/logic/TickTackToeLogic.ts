const boardSize = 3;

function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

class Cell {
    public readonly i;
    public readonly j;
    public _val;
    public _id;

    constructor(i: number, j: number, val: CellValue) {
        this.i = i;
        this.j = j;
        this._val = val
        this._id = uuidv4();
    }

    set val(val) {
        this._id = uuidv4();
        this._val = val;
    }

    get val() {
        return this._val;
    }
}

enum CellValue {
    EMPTY = "",
    PLAYER = "X",
    COMPUTER = "O"
}
type GameBoard = Cell[][];

enum Gamestate {
    WON,
    LOST,
    PENDING,
    STALEMATE
}

type Direction = {up: 1, right: 0} | {up: 1, right: 1} | {up: 0, right: 1} | {up: -1, right: 1} | {up: -1, right: 0}
                | {up: -1, right: -1} | {up: 0, right: -1} | {up: 1, right: -1};

interface MoveLocation {
    i: number,
    j: number;
}

type PlayerLocation = MoveLocation;
type ComputerLocation = MoveLocation;

function createGameBoard(): GameBoard {
    const board: Cell[][] = [];

    for (let i = 0; i < boardSize; i++)
    {
        const row: Cell[] = []
        for (let j = 0; j < boardSize; j++)
        {
            let c = CellValue.EMPTY
            row.push(new Cell(i, j, CellValue.EMPTY));
        }
        board.push(row);
    }
    return board;
}


function checkGame(board: GameBoard): Gamestate {
    //We only need to test the 5 middle tiles
    // the most middle needs 360 degrees testing
    // the other 4 edge tiles only the 2 adjecent corner tiles


    for (let i = 0; i < boardSize; i++)
    {
        const row = board[i];

        for (let j = 0; j < boardSize; j++)
        {
            const cell = row[j];
            // skip over invalid spaces to search (empty cells and corners)
            if (cell.val === CellValue.EMPTY ||  ((j === 0 || j === boardSize - 1) && (i === 0 || i === boardSize - 1)))
            {
                continue;
            }


            // horizontal rows
            if (j === 1 && board[i][0].val === cell.val && board[i][boardSize - 1].val === cell.val)
            {
                return cell.val === CellValue.PLAYER ? Gamestate.WON : Gamestate.LOST;
            }


            // vertical bars
            if (i === 1 && board[0][j].val === cell.val && board[boardSize - 1][j].val === cell.val)
            {
                return cell.val === CellValue.PLAYER ? Gamestate.WON : Gamestate.LOST;
            }

            // diagonals
            if (i === 1 && j === 1 &&
                ((board[0][0].val === cell.val && board[2][2].val === cell.val ) ||
                    (board[0][2].val === cell.val && board[2][0].val === cell.val)))
            {
                return cell.val === CellValue.PLAYER ? Gamestate.WON : Gamestate.LOST;
            }

        }
    }


    // at last we check for stalemate (no more empty tiles)
    const emptyCellArr: Cell[] = new Array<Cell>();
    board.forEach(row => row.forEach(cell => {
        if (cell.val === CellValue.EMPTY)
        {
            emptyCellArr.push(cell);
        }
    }));

    if (emptyCellArr.length === 0)
    {
        return Gamestate.STALEMATE;
    }
    return Gamestate.PENDING;
}


function doComputerMove(board: GameBoard)
{
    // get all empty spots in array

    const emptyCellArr: Cell[] = new Array<Cell>();
    board.forEach(row => row.forEach(cell => {
        if (cell.val === CellValue.EMPTY)
        {
            emptyCellArr.push(cell);
        }
    }));


    if (emptyCellArr.length === 0)
    {
        return;
    }


    const chosenPcCell = emptyCellArr[getRandomInt(emptyCellArr.length)];

    chosenPcCell.val = CellValue.COMPUTER;
}


function getRandomInt(max: number): number {
    return Math.floor(Math.random() * max);
}

export {createGameBoard, boardSize, Gamestate, CellValue, Cell, checkGame, doComputerMove};
export type { GameBoard };

