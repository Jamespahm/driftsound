// File: components/PlaylistTab.jsx

import React, { useEffect, useRef, useState } from "react";
import playlists from "../data/playlists";
import soundsData from "../data/sounds";

function PlaylistTab({ activeSounds, setActiveSounds, volumeMap, setVolumeMap }) {
    const [activePlaylistIndex, setActivePlaylistIndex] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        // Chỉ highlight playlist mặc định khi có sự thay đổi
        const activeSoundsSorted = JSON.stringify([...activeSounds].sort());
        const matchedIndex = playlists.findIndex(p => JSON.stringify([...p.sounds].sort()) === activeSoundsSorted);

        if (matchedIndex !== -1) {
            const p = playlists[matchedIndex];
            const defaultVolumeMap = {};
            p.sounds.forEach(soundId => {
                const soundInfo = soundsData.find(s => s.id === soundId);
                if (soundInfo) {
                    defaultVolumeMap[soundId] = soundInfo.defaultVolume ?? 0.25;
                }
            });
            // Chỉ highlight nếu volume cũng khớp
            const currentVolumeMap = {};
            activeSounds.forEach(id => { currentVolumeMap[id] = volumeMap[id]; });
            if (JSON.stringify(defaultVolumeMap) === JSON.stringify(currentVolumeMap)) {
                setActivePlaylistIndex(matchedIndex);
            } else {
                setActivePlaylistIndex(null);
            }
        } else {
            setActivePlaylistIndex(null);
        }
    }, [activeSounds, volumeMap]);

    const handlePlaylistClick = (playlist, index) => {
        const isSame = activePlaylistIndex === index;
        if (isSame) {
            setActiveSounds([]);
        } else {
            setActiveSounds(playlist.sounds);
            const defaultVolumeMap = {};
            playlist.sounds.forEach(soundId => {
                const soundInfo = soundsData.find(s => s.id === soundId);
                if (soundInfo) {
                    defaultVolumeMap[soundId] = soundInfo.defaultVolume ?? 0.25;
                }
            });
            setVolumeMap(prev => ({ ...prev, ...defaultVolumeMap }));
        }
    };

    useEffect(() => {
        const handleWheelScroll = (e) => {
            if (e.deltaY === 0) return;
            e.preventDefault();
            e.currentTarget.scrollLeft += e.deltaY;
        };
        const element = scrollRef.current;
        if (element) {
            element.addEventListener('wheel', handleWheelScroll);
            return () => element.removeEventListener('wheel', handleWheelScroll);
        }
    }, []);

    return (
        <div className="playlist-container">
            <div className="playlist-buttons" ref={scrollRef}>
                {playlists.map((item, index) => (
                    <button key={index} className={`playlist-card ${activePlaylistIndex === index ? "active" : ""}`} onClick={() => handlePlaylistClick(item, index)}>
                        <img className="playlist-icon" src={item.icon} alt={item.name} />
                        <br />{item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default PlaylistTab;