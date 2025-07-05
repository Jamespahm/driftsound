// File: components/FavoritesTab.jsx

import React, { useEffect, useRef, useState } from "react";
import soundsData from "../data/sounds";

function FavoritesTab({ activeSounds, setActiveSounds, volumeMap, setVolumeMap }) {
    const [customPlaylists, setCustomPlaylists] = useState([]);
    const [activeCustomPlaylistName, setActiveCustomPlaylistName] = useState(null);
    const scrollRef = useRef(null);

    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem('customPlaylists')) || [];
        setCustomPlaylists(saved);
    }, []);

    useEffect(() => {
        const activeSoundsSorted = JSON.stringify([...activeSounds].sort());
        const matchedPlaylist = customPlaylists.find(p => JSON.stringify([...p.sounds].sort()) === activeSoundsSorted);

        if (matchedPlaylist) {
            const currentVolumeMap = {};
            activeSounds.forEach(id => { currentVolumeMap[id] = volumeMap[id]; });
            if (JSON.stringify(matchedPlaylist.volumeMap) === JSON.stringify(currentVolumeMap)) {
                setActiveCustomPlaylistName(matchedPlaylist.name);
            } else {
                setActiveCustomPlaylistName(null);
            }
        } else {
            setActiveCustomPlaylistName(null);
        }
    }, [activeSounds, volumeMap, customPlaylists]);

    const handleCustomPlaylistClick = (playlist) => {
        const isSame = activeCustomPlaylistName === playlist.name;
        if (isSame) {
            setActiveSounds([]);
        } else {
            setActiveSounds(playlist.sounds);
            if (playlist.volumeMap) {
                setVolumeMap(prev => ({ ...prev, ...playlist.volumeMap }));
            }
        }
    };

    const handleSaveCurrentSounds = () => {
        if (activeSounds.length === 0) {
            alert("Hãy bật vài âm thanh trước khi lưu nhé!");
            return;
        }
        const name = prompt("Đặt tên cho playlist của bạn:", "My Vibe");
        if (!name || !name.trim()) return;
        if (customPlaylists.some(p => p.name === name.trim())) {
            alert("Tên playlist đã tồn tại. Vui lòng chọn tên khác.");
            return;
        }
        const volumeMapForPlaylist = {};
        activeSounds.forEach(soundId => {
            volumeMapForPlaylist[soundId] = volumeMap[soundId] ?? 0.25;
        });
        const newPlaylist = { name: name.trim(), sounds: [...activeSounds], volumeMap: volumeMapForPlaylist };
        const updatedPlaylists = [...customPlaylists, newPlaylist];
        setCustomPlaylists(updatedPlaylists);
        localStorage.setItem('customPlaylists', JSON.stringify(updatedPlaylists));
    };

    const handleDeleteCustomPlaylist = (e, playlistNameToDelete) => {
        e.stopPropagation();
        if (confirm(`Bạn có chắc muốn xóa playlist "${playlistNameToDelete}"?`)) {
            if (activeCustomPlaylistName === playlistNameToDelete) setActiveSounds([]);
            const updatedPlaylists = customPlaylists.filter(p => p.name !== playlistNameToDelete);
            setCustomPlaylists(updatedPlaylists);
            localStorage.setItem('customPlaylists', JSON.stringify(updatedPlaylists));
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
                <button className={`playlist-card save-new ${activeSounds.length === 0 ? 'disabled' : ''}`} onClick={handleSaveCurrentSounds} title={activeSounds.length > 0 ? "Lưu tổ hợp âm thanh hiện tại" : "Hãy bật âm thanh để lưu"}>
                    <img className="playlist-icon" src="/icons/add.svg" alt="Add new playlist" />
                    <br />Lưu mới
                </button>
                {customPlaylists.map((item, index) => (
                    <button key={index} className={`playlist-card custom ${activeCustomPlaylistName === item.name ? "active" : ""}`} onClick={() => handleCustomPlaylistClick(item)}>
                        <span className="delete-custom-playlist" onClick={(e) => handleDeleteCustomPlaylist(e, item.name)}>×</span>
                        <img className="playlist-icon" src="/icons/fan.svg" alt={item.name} />
                        <br />{item.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default FavoritesTab;