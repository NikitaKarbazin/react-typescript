import React, {useEffect, useState} from 'react';
import './App.css';
import BoardComponent from "./components/BoardComponent";
import {Board} from "./models/Board";
import {Player} from "./models/Player";
import {Colors} from "./models/Colors";
import LostFigure from "./components/LostFigure";
import Timer from "./components/Timer";

function App() {
    const [board, setBoard] = useState(new Board());
    const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
    const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
    const [currentPlayer, setCurrentPlayer] = useState<null | Player>(null);

    useEffect(() => {
        restart()
        setCurrentPlayer(whitePlayer);
    }, [])
    function restart() {
        const newBoard = new Board();
        newBoard.initCells()
        newBoard.addFigures()
        setBoard(newBoard);
    }

    function swapPlayer() {
        setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer)
    }

  return (
    <div className="App">
        <Timer currentPlayer={currentPlayer} restart={restart} />
        <BoardComponent
            board={board}
            setBoard={setBoard}
            currentPlayer={currentPlayer}
            swapPlayer={swapPlayer}
        />
        <div>
            <LostFigure title="Black" figures={board.lostBlackFigures}/>
            <LostFigure title="White" figures={board.lostWhiteFigures}/>
        </div>
    </div>
  );
}

export default App;
