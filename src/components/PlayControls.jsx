// File: components/PlayControls.jsx
import { useEffect, useCallback } from "react";
import Timer from "./Timer";
import sounds from "../data/sounds";

function PlayControls({
    activeSounds,
    setActiveSounds,
    pausedSounds,
    setPausedSounds,
    isPaused,
    setIsPaused,
    setVolumeMap
}) {
    useEffect(() => {
        console.log("[DEBUG] activeSounds thay đổi:", activeSounds);

        if (isPaused && activeSounds.length > 0) {
            console.log("[AUTO-RESUME] Bật lại sound thủ công, reset trạng thái Pause");
            setPausedSounds([]);
            setIsPaused(false);
        }
    }, [activeSounds, isPaused, setPausedSounds, setIsPaused]);

    const handlePauseClick = useCallback(() => {
        if (isPaused) {
            if (pausedSounds.length > 0) {
                console.log("[RESUME] Resume lại:", pausedSounds);
                setActiveSounds([...pausedSounds]);
                setPausedSounds([]);
                setIsPaused(false);
            }
        } else {
            if (activeSounds.length > 0) {
                console.log("[PAUSE] Đang tạm dừng:", activeSounds);
                setPausedSounds([...activeSounds]);
                setActiveSounds([]);
                setIsPaused(true);
            }
        }
    }, [isPaused, pausedSounds, activeSounds, setActiveSounds, setPausedSounds, setIsPaused]);

    const handleRandomClick = useCallback(() => {
        const soundIds = sounds.map(s => s.id);
        const shuffled = [...soundIds].sort(() => 0.5 - Math.random());
        const randomSounds = shuffled.slice(0, 3);

        console.log("[RANDOM] Phát ngẫu nhiên:", randomSounds);

        setPausedSounds([]);
        setIsPaused(false);
        setActiveSounds(randomSounds);
    }, [setActiveSounds, setPausedSounds, setIsPaused]);

    const handleTrashClick = useCallback(() => {
        console.log("[TRASH] Dừng toàn bộ âm thanh");
        setActiveSounds([]);
        setPausedSounds([]);
        setIsPaused(true);
        setVolumeMap({});
    }, [setActiveSounds, setPausedSounds, setIsPaused, setVolumeMap]);

    return (
        <div className="playlist-controls">
            <div className="playlist-countdown">
                <Timer
                    isDisabled={activeSounds.length === 0 && pausedSounds.length === 0}
                    activeSounds={activeSounds}
                    isPaused={isPaused}
                    setPausedSounds={setPausedSounds} // <-- SỬA LỖI 3: Thêm prop này
                    onTimeout={() => {
                        console.log("[TIMER] Hết giờ, dừng âm thanh.");
                        setActiveSounds([]);
                        setIsPaused(true);
                    }}
                    handlePauseClick
                />

            </div>

            <button className="hide-mbb" onClick={handlePauseClick}>
                <img
                    src={
                        activeSounds.length > 0
                            ? "/icons/runing-audio.svg"
                            : "/icons/paused.svg"
                    }
                    alt={isPaused ? "Resume" : "Pause"}
                />
            </button>

            <button className="hide-mb" onClick={handleRandomClick}>
                <img src="/icons/random.svg" alt="Shuffle" />
            </button>

            <button className="hide-mb" onClick={handleTrashClick}>
                <img src="/icons/trash.svg" alt="Clear" />
            </button>
        </div>
    );
}

export default PlayControls;