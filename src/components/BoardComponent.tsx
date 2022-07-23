import React, {FC, useEffect, useState} from 'react';
import { Board } from '../models/Board';
import CellComponent from "./CellComponent";
import {Cell} from "../models/Cell";
import {Player} from "../models/Player";

interface BoardProps {
    board: Board;
    setBoard: (board: Board) => void;
    swapPlayer: () => void;
    currentPlayer: Player | null;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, swapPlayer, currentPlayer}) => {

    const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

    useEffect(() => {
        highlightCells()
    }, [selectedCell])

    function click(cell: Cell) {
        if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
            selectedCell.moveFigure(cell)
            swapPlayer()
            setSelectedCell(null)
        }else {
            if (cell.figure?.color === currentPlayer?.color) {
                setSelectedCell(cell);
            }
        }
    }

    function highlightCells() {
        board.highlightCells(selectedCell)
        updateBoard()
    }

    function updateBoard() {
        const newBoard = board.getCopyBoard()
        setBoard(newBoard);
    }

    return (
        <div>
            <h3>Ход --- {currentPlayer?.color} Player</h3>
            <div className="board">
                {board.cells.map((row, index) => (
                    <div key={index}>
                        {row.map(cell => (
                            <CellComponent
                                key={cell.id}
                                cell={cell}
                                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
                                click={click}

                            />
                        ))}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BoardComponent;
