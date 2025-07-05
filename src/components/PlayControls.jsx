// File: components/PlayControls.jsx
import { useCallback } from "react";
import Timer from "./Timer";
import playlists from "../data/playlists";
import soundsData from "../data/sounds";

function PlayControls({
    activeSounds,
    setActiveSounds,
    pausedSounds,
    setPausedSounds,
    isPaused,
    setIsPaused,
    setVolumeMap
}) {

    const handlePauseClick = useCallback(() => {
        if (isPaused) {
            if (pausedSounds.length > 0) {
                setActiveSounds([...pausedSounds]);
                setPausedSounds([]);
                setIsPaused(false);
            }
        } else {
            if (activeSounds.length > 0) {
                setPausedSounds([...activeSounds]);
                setActiveSounds([]);
                setIsPaused(true);
            }
        }
    }, [isPaused, pausedSounds, activeSounds, setActiveSounds, setPausedSounds, setIsPaused]);

    const handleRandomClick = useCallback(() => {
        if (playlists.length === 0) return;
        const randomIndex = Math.floor(Math.random() * playlists.length);
        const randomPlaylist = playlists[randomIndex];
        const playlistSounds = randomPlaylist.sounds;
        const defaultVolumeMap = {};
        playlistSounds.forEach(soundId => {
            const soundInfo = soundsData.find(s => s.id === soundId);
            if (soundInfo) {
                defaultVolumeMap[soundId] = soundInfo.defaultVolume ?? 0.25;
            }
        });
        setVolumeMap(prev => ({ ...prev, ...defaultVolumeMap }));
        setActiveSounds(playlistSounds);
        setPausedSounds([]);
        setIsPaused(false);
    }, [setActiveSounds, setPausedSounds, setIsPaused, setVolumeMap]);

    const handleTrashClick = useCallback(() => {
        setActiveSounds([]);
        setPausedSounds([]);
        setIsPaused(false);
        setVolumeMap({});
    }, [setActiveSounds, setPausedSounds, setIsPaused, setVolumeMap]);

    return (
        <div className="playlist-controls">
            <div className="playlist-countdown">
                <Timer
                    isDisabled={activeSounds.length === 0 && pausedSounds.length === 0}
                    activeSounds={activeSounds}
                    pausedSounds={pausedSounds}
                    isPaused={isPaused}
                    // ✅ SỬA LẠI: Thêm lại prop "setPausedSounds"
                    setPausedSounds={setPausedSounds}
                    onTimeout={() => {
                        if (activeSounds.length > 0) {
                            setPausedSounds([...activeSounds]);
                            setActiveSounds([]);
                            setIsPaused(true);
                        }
                    }}
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