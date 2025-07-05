// File: components/SoundLibrary.jsx

import React, { useState } from "react";
import PlaylistTab from "./PlaylistTab";
import FavoritesTab from "./FavoritesTab";

function SoundLibrary({
    activeSounds,
    setActiveSounds,
    volumeMap,
    setVolumeMap,
}) {
    const [activeTab, setActiveTab] = useState('playlists');

    return (
        <section className="playlist-section">
            <div className="playlist-top">
                <div className="playlist-tabs">
                    <button className={`tab ${activeTab === 'playlists' ? 'active' : ''}`} onClick={() => setActiveTab('playlists')}>Playlists</button>
                    <button className={`tab ${activeTab === 'favorites' ? 'active' : ''}`} onClick={() => setActiveTab('favorites')}>Favorites</button>
                </div>
            </div>

            {activeTab === 'playlists' && (
                <PlaylistTab
                    activeSounds={activeSounds}
                    setActiveSounds={setActiveSounds}
                    volumeMap={volumeMap}
                    setVolumeMap={setVolumeMap}
                />
            )}

            {activeTab === 'favorites' && (
                <FavoritesTab
                    activeSounds={activeSounds}
                    setActiveSounds={setActiveSounds}
                    volumeMap={volumeMap}
                    setVolumeMap={setVolumeMap}
                />
            )}
        </section>
    );
}

export default SoundLibrary;