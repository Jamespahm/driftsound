// File: components/Playlist.jsx
import React, { useEffect, useRef, useState } from "react";
import playlists from "../data/playlists";

function Playlist({
    activeSounds,
    setActiveSounds,
    pausedSounds,
    setPausedSounds,
    isPaused,
    setIsPaused,
    volumeMap,
    setVolumeMap
}) {
    const scrollRef = useRef(null);
    const [showLeft, setShowLeft] = useState(false);
    const [showRight, setShowRight] = useState(false);
    const [activePlaylistIndex, setActivePlaylistIndex] = useState(null);

    const handlePlaylistClick = (playlistSounds, index) => {
        const isSamePlaylist = activePlaylistIndex === index;

        if (isSamePlaylist) {
            console.log("[PLAYLIST] 📴 Tắt playlist:", playlists[index].name);
            setActiveSounds([]);
            setActivePlaylistIndex(null);
            setPausedSounds([]);
            setIsPaused(false);
        } else {
            console.log("[PLAYLIST] ▶️ Bật playlist:", playlists[index].name);
            setPausedSounds([]);
            setIsPaused(false);
            setActiveSounds(playlistSounds);
            setActivePlaylistIndex(index);
        }
    };

    useEffect(() => {
        if (activePlaylistIndex === null) return;

        const selected = playlists[activePlaylistIndex];
        if (!selected) return;

        const current = [...activeSounds].sort();
        const expected = [...selected.sounds].sort();

        const isSame =
            current.length === expected.length &&
            current.every((val, index) => val === expected[index]);

        if (!isSame) {
            console.log("[PLAYLIST] ⚠️ Âm thanh thay đổi → bỏ active playlist:", selected.name);
            setActivePlaylistIndex(null);
        }
    }, [activeSounds, activePlaylistIndex]);

    useEffect(() => {
        if (!isPaused && activeSounds.length > 0) {
            const currentSorted = [...activeSounds].sort();

            const matchedIndex = playlists.findIndex(pl => {
                const expectedSorted = [...pl.sounds].sort();
                return (
                    expectedSorted.length === currentSorted.length &&
                    expectedSorted.every((val, idx) => val === currentSorted[idx])
                );
            });

            if (matchedIndex !== -1) {
                console.log("[PLAYLIST] ✅ Resume trùng playlist:", playlists[matchedIndex].name);
                setActivePlaylistIndex(matchedIndex);
            }
        }
    }, [isPaused, activeSounds]);

    useEffect(() => {
        if (isPaused && activeSounds.length === 0) {
            console.log("[PLAYLIST] 📴 Pause toàn bộ → clear active playlist");
            setActivePlaylistIndex(null);
        }
    }, [isPaused, activeSounds]);

    useEffect(() => {
        const el = scrollRef.current;
        const checkScroll = () => {
            if (!el) return;
            const scrollLeft = el.scrollLeft;
            const maxScrollLeft = el.scrollWidth - el.clientWidth;
            setShowLeft(scrollLeft > 5);
            setShowRight(scrollLeft < maxScrollLeft - 5);
        };

        if (el) {
            checkScroll();
            el.addEventListener("scroll", checkScroll);
            window.addEventListener("resize", checkScroll);
            setTimeout(checkScroll, 100);

            return () => {
                el.removeEventListener("scroll", checkScroll);
                window.removeEventListener("resize", checkScroll);
            };
        }
    }, []);

    return (
        <section className="playlist-section">
            <div className="playlist-top">
                <div className="playlist-tabs">
                    <button className="tab active">Playlists</button>
                    <button className="tab">Favorites</button>
                </div>
            </div>

            <div className={`playlist-container ${showLeft ? 'show-left' : ''} ${showRight ? 'show-right' : ''}`}>
                {showLeft && (
                    <button className="scroll-btn left" onClick={() => scrollRef.current?.scrollBy({ left: -200, behavior: "smooth" })}>
                        &lt;
                    </button>
                )}

                <div className="playlist-buttons" ref={scrollRef}>
                    {playlists.map((item, index) => (
                        <button
                            key={index}
                            className={`playlist-card ${activePlaylistIndex === index ? "active" : ""}`}
                            onClick={() => handlePlaylistClick(item.sounds, index)}
                        >
                            <img className="playlist-icon" src={item.icon} alt={item.name} />
                            <br />
                            {item.name}
                        </button>
                    ))}
                </div>

                {showRight && (
                    <button className="scroll-btn right" onClick={() => scrollRef.current?.scrollBy({ left: 200, behavior: "smooth" })}>
                        &gt;
                    </button>
                )}
            </div>
        </section>
    );
}

export default Playlist;