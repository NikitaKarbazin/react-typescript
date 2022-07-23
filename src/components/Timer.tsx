import React, {FC, useEffect, useRef, useState} from 'react';
import {Player} from "../models/Player";
import {Colors} from "../models/Colors";

interface Props {
    currentPlayer: Player | null;
    restart: () => void;
}

const Timer: FC<Props> = ({currentPlayer, restart}) => {

    const [blackTime, setBlackTime] = useState(300);
    const [whiteTime, setWhiteTime] = useState(300);
    const timer = useRef<null | ReturnType<typeof setInterval>>(null)

    useEffect(() => {
        startTimer()
    }, [currentPlayer])

    function startTimer() {
        if (timer.current)
            clearInterval(timer.current);

        const cb = currentPlayer?.color === Colors.WHITE ? decrementWhiteTimer : decrementBlackTimer;
        timer.current = setInterval(cb, 1000);
    }

    function decrementBlackTimer() {
        setBlackTime(prev => prev - 1)
    }

    function decrementWhiteTimer() {
        setWhiteTime(prev => prev - 1)
    }

    const handleRestart = () => {
      setWhiteTime(300);
      setBlackTime(300)
      restart();
    }

    return (
        <div className="timer">
            <div>
                <button
                    className="button-33"
                    onClick={handleRestart}
                >
                    Restart game
                </button>
            </div>
            <div className="countdown-timer-black">
                <p className="countdown-timer__text"><h2>Black</h2> - {blackTime}sec.</p>
                <div className="countdown-timer__circle-black">
                    <svg>
                        <circle
                            r="24"
                            cx="26"
                            cy="26"
                            style={{
                                animation: `countdown-animation-black ${blackTime}s linear`
                            }}
                        />
                    </svg>
                </div>
            </div>
            <div className="countdown-timer-white">
                <div className="countdown-timer__circle-white">
                    <svg>
                        <circle
                            r="24"
                            cx="26"
                            cy="26"
                            style={{
                                animation: `countdown-animation-white ${whiteTime}s linear`
                            }}
                        />
                    </svg>
                </div>
                <p className="countdown-timer__text"><h2>White</h2> - {whiteTime}sec.</p>
            </div>
        </div>
    );
};

export default Timer;
