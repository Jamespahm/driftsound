
//SoundCard.jsx
import { useEffect, useRef } from 'react';
import React from 'react';

function SoundCard({
    sound,
    activeSounds,
    setActiveSounds,
    pausedSounds,
    setPausedSounds,
    isPaused,
    volumeMap,
    setVolumeMap,
}) {
    const audioRef = useRef(null);
    const isPlaying = activeSounds.includes(sound.id);
    const volume = volumeMap[sound.id] ?? sound.defaultVolume ?? 0.25;

    const toggleSound = () => {
        const audio = audioRef.current;
        if (!audio) return;

        // if (isPaused && !isPlaying) {
        //     setPausedSounds([]);
        // }

        if (isPlaying) {
            audio.pause();
            audio.currentTime = 0;

            // Đừng gán volume = 0 khi tắt âm thanh
            setActiveSounds(prev => prev.filter(id => id !== sound.id));
        } else {
            audio.volume = volume;
            audio.play();

            setVolumeMap(prev => {
                if (prev[sound.id] === undefined) {
                    return { ...prev, [sound.id]: volume };
                }
                return prev;
            });

            if (!activeSounds.includes(sound.id)) {
                setActiveSounds(prev => [...prev, sound.id]);
            }
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        const audio = audioRef.current;
        if (!audio) return;

        audio.volume = newVolume;

        setVolumeMap(prev => {
            if (prev[sound.id] === newVolume) return prev;
            return { ...prev, [sound.id]: newVolume };
        });

        if (newVolume === 0) {
            audio.pause();
            audio.currentTime = 0;
            setActiveSounds(prev => prev.filter(id => id !== sound.id));
        } else {
            if (!activeSounds.includes(sound.id)) {
                setActiveSounds(prev => [...prev, sound.id]);
            }
        }
    };

    useEffect(() => {
        const audio = audioRef.current;
        if (audio) audio.loop = true;
    }, []);

    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying && audio.paused) {
            audio.play().catch(() => { });
        } else if (!isPlaying && !audio.paused) {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [isPlaying]);

    useEffect(() => {
        const audio = audioRef.current;
        if (audio && isPlaying) {
            audio.volume = volume;
            console.log(`[SYNC] Cập nhật volume DOM cho "${sound.id}" => ${volume}`);
        }
    }, [volume, isPlaying]);

    return (
        <div className={`sound-icon ${isPlaying ? 'active' : ''}`} onClick={toggleSound}>
            <audio ref={audioRef} src={sound.src}></audio>
            <img src={sound.icon} alt={sound.name} />
            <div
                className="volume-wrapper"
                style={{ visibility: isPlaying ? 'visible' : 'hidden' }}
                onClick={(e) => e.stopPropagation()}
            >
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleVolumeChange}
                    className="volume-slider"
                />
            </div>
        </div>
    );
}

export default React.memo(SoundCard);
