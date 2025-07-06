

// File: components/Timer.jsx
import { useEffect, useRef, useState } from "react";

function Timer({ onTimeout, isDisabled, activeSounds, isPaused, setPausedSounds }) {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isRunning, setIsRunning] = useState(false);
    const [focusedField, setFocusedField] = useState("minutes");

    const timerRef = useRef(null);
    const activeSoundsRef = useRef(activeSounds);

    useEffect(() => {
        activeSoundsRef.current = activeSounds;
    }, [activeSounds]);

    const isActuallyCountingDown = isRunning && !isPaused && activeSounds.length > 0;

    // useEffect 1: Xử lý việc đếm ngược của setInterval
    useEffect(() => {
        if (isActuallyCountingDown) {
            timerRef.current = setInterval(() => {
                // YÊU CẦU 2: Trừ đi 60 giây mỗi phút
                setTimeLeft(prev => (prev >= 60 ? prev - 60 : 0));
                // YÊU CẦU 2: Thay đổi interval thành 60 giây (1 phút)
            }, 60000);
        } else {
            clearInterval(timerRef.current);
        }

        return () => clearInterval(timerRef.current);
    }, [isActuallyCountingDown]);

    // useEffect 2: Xử lý hiệu ứng phụ KHI timeLeft thay đổi
    useEffect(() => {
        if (timeLeft === 0 && isRunning) {
            console.log("[TIMER] Timeout detected. Stopping sounds.");
            setPausedSounds([...activeSoundsRef.current]);
            onTimeout();
            setIsRunning(false);
        }
    }, [timeLeft, isRunning, onTimeout, setPausedSounds]);


    const handleStartStop = () => {
        // Nếu timer đang không chạy, kiểm tra xem có nên cho phép bắt đầu không
        if (!isRunning) {
            if (isDisabled || timeLeft === 0) return;
        }
        setIsRunning(!isRunning);
    };

    const handleInputChange = (e) => {
        const value = e.target.value;
        const parts = value.split(":");
        if (parts.length === 2) {
            const h = parseInt(parts[0], 10);
            const m = parseInt(parts[1], 10);
            if (!isNaN(h) && !isNaN(m) && h >= 0 && m >= 0 && m < 60) {
                setTimeLeft(h * 3600 + m * 60);
            }
        }
    };

    const handleInputClick = (e) => {
        const cursorPos = e.target.selectionStart;
        setFocusedField(cursorPos <= 2 ? "hours" : "minutes");
    };

    const handleArrow = (amount) => {
        if (isRunning) return;
        const change = (focusedField === 'hours' ? 3600 : 60) * amount;
        setTimeLeft(prev => Math.max(0, prev + change));
    };

    const hours = String(Math.floor(timeLeft / 3600)).padStart(2, "0");
    const minutes = String(Math.floor((timeLeft % 3600) / 60)).padStart(2, "0");

    return (
        <div className={`playlist-timer-wrapper ${isActuallyCountingDown ? "active" : "inactive"}`}>
            <input
                id="input-timer"
                className={`playlist-timer-input ${isActuallyCountingDown ? 'running' : 'paused'}`}
                type="text"
                value={`${hours}:${minutes}`}
                maxLength="5"
                onChange={handleInputChange}
                onClick={handleInputClick}
                readOnly={isRunning}
            />
            <div className="playlist-timer-controls">
                <button
                    className={`timer-up ${isRunning ? 'running' : 'paused'}`}
                    onClick={() => handleArrow(1)}
                    disabled={isRunning}>
                    ▲
                </button>
                <button
                    className={`timer-down ${isRunning ? 'running' : 'paused'}`}
                    onClick={() => handleArrow(-1)}
                    disabled={isRunning}>
                    ▼
                </button>
            </div>
            <button
                onClick={handleStartStop}
                // YÊU CẦU 1: Thêm điều kiện timeLeft === 0 để vô hiệu hóa nút
                disabled={(isDisabled || timeLeft === 0) && !isRunning}
            >
                <img
                    className={`playlist-countdown-btn ${isActuallyCountingDown ? 'running' : 'paused'}`}
                    src={isActuallyCountingDown ? "/icons/countdown1.svg" : "/icons/countdown2.svg"}
                    alt={isRunning ? "Stop Timer" : "Start Timer"}
                />
            </button>
        </div>
    );
}

export default Timer;