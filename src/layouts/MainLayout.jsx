// File: layouts/MainLayout.jsx
import { useState, useEffect } from "react";
import Header from "../components/Header";
import SoundLibrary from "../components/SoundLibrary";
import SoundGrid from "../components/SoundGrid";
import PlayControls from "../components/PlayControls";

function MainLayout({
    activeSounds,
    setActiveSounds,
    pausedSounds,
    setPausedSounds,
    isPaused,
    setIsPaused
}) {
    console.log("[MainLayout] Đang render với activeSounds:", activeSounds);

    const [volumeMap, setVolumeMap] = useState({});

    useEffect(() => {
        console.log("[MainLayout] volumeMap khởi tạo:", volumeMap);
    }, [volumeMap]);

    return (
        <>
            <div className="background-overlay"></div>
            <Header />

            <main id="main-content" className="main-content">
                <PlayControls
                    activeSounds={activeSounds}
                    setActiveSounds={setActiveSounds}
                    pausedSounds={pausedSounds}
                    setPausedSounds={setPausedSounds}
                    isPaused={isPaused}
                    setIsPaused={setIsPaused}
                    volumeMap={volumeMap}
                    setVolumeMap={setVolumeMap}
                />
                <SoundLibrary
                    activeSounds={activeSounds}
                    setActiveSounds={setActiveSounds}
                    pausedSounds={pausedSounds}
                    setPausedSounds={setPausedSounds}
                    isPaused={isPaused}
                    setIsPaused={setIsPaused}
                    volumeMap={volumeMap}
                    setVolumeMap={setVolumeMap}
                />
                <SoundGrid
                    activeSounds={activeSounds}
                    setActiveSounds={setActiveSounds}
                    pausedSounds={pausedSounds}
                    setPausedSounds={setPausedSounds}
                    isPaused={isPaused}
                    volumeMap={volumeMap}
                    setVolumeMap={setVolumeMap}
                />
                <a
                    href="https://github.com/jamespahm/driftsound"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="github-link"
                >
                    Free and Open-Source
                </a>
                <button className="help-btn">?</button>
            </main>
        </>
    );
}

export default MainLayout;