// File: components/SoundGrid.jsx
import soundsData from '../data/sounds';
import SoundCard from './SoundCard';

// ✅ ĐÃ NHẬN THÊM prop "masterVolume"
function SoundGrid({
    activeSounds,
    setActiveSounds,
    volumeMap,
    setVolumeMap,
    masterVolume
}) {

    const handleToggleSound = (soundId) => {
        const isActive = activeSounds.includes(soundId);
        if (isActive) {
            setActiveSounds(currentActive => currentActive.filter(id => id !== soundId));
        } else {
            setActiveSounds(currentActive => [...currentActive, soundId]);
            setVolumeMap(currentMap => {
                if (currentMap[soundId] === undefined) {
                    const soundInfo = soundsData.find(s => s.id === soundId);
                    const defaultVolume = soundInfo?.defaultVolume ?? 0.25;
                    return { ...currentMap, [soundId]: defaultVolume };
                }
                return currentMap;
            });
        }
    };

    const handleVolumeChange = (soundId, newVolume) => {
        setVolumeMap(prev => ({ ...prev, [soundId]: newVolume }));
        if (newVolume === 0) {
            setActiveSounds(currentActive => currentActive.filter(id => id !== soundId));
        } else if (!activeSounds.includes(soundId)) {
            setActiveSounds(currentActive => [...currentActive, soundId]);
        }
    };

    return (
        <section className="soundcard-section">
            <div className="soundcard-grid">
                {soundsData.map((sound) => {
                    const isPlaying = activeSounds.includes(sound.id);
                    const volume = volumeMap[sound.id] ?? sound.defaultVolume ?? 0.25;

                    return (
                        <SoundCard
                            key={sound.id}
                            sound={sound}
                            isPlaying={isPlaying}
                            volume={volume}
                            // ✅ ĐÃ TRUYỀN `masterVolume` XUỐNG CHO SoundCard
                            masterVolume={masterVolume}
                            onToggle={() => handleToggleSound(sound.id)}
                            onVolumeChange={(newVol) => handleVolumeChange(sound.id, newVol)}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default SoundGrid;