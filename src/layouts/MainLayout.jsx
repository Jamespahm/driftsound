// File: layouts/MainLayout.jsx
import { useState } from "react";
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
    setIsPaused,
    masterVolume,
    setMasterVolume
}) {
    const [volumeMap, setVolumeMap] = useState({});

    return (
        <>
            <div className="background-overlay"></div>
            <Header masterVolume={masterVolume} setMasterVolume={setMasterVolume} />

            <main id="main-content" className="main-content">
                <PlayControls
                    activeSounds={activeSounds}
                    setActiveSounds={setActiveSounds}
                    pausedSounds={pausedSounds}
                    setPausedSounds={setPausedSounds}
                    isPaused={isPaused}
                    setIsPaused={setIsPaused}
                    setVolumeMap={setVolumeMap}
                />
                <SoundLibrary
                    activeSounds={activeSounds}
                    setActiveSounds={setActiveSounds}
                    volumeMap={volumeMap}
                    setVolumeMap={setVolumeMap}
                />
                <SoundGrid
                    activeSounds={activeSounds}
                    setActiveSounds={setActiveSounds}
                    volumeMap={volumeMap}
                    setVolumeMap={setVolumeMap}
                    // ✅ ĐÃ THÊM prop 'masterVolume' để truyền xuống
                    masterVolume={masterVolume}
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