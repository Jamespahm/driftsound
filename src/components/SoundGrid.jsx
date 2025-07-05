// File: components/SoundGrid.jsx
import sounds from '../data/sounds';
import SoundCard from './SoundCard';

function SoundGrid({
    activeSounds,
    setActiveSounds,
    volumeMap,
    setVolumeMap,
    // Các props khác không cần dùng ở đây nữa
}) {

    // ✅ LOGIC ĐÃ ĐƯỢC CHUYỂN LÊN ĐÂY
    const handleToggleSound = (soundId) => {
        setActiveSounds(currentActive => {
            if (currentActive.includes(soundId)) {
                return currentActive.filter(id => id !== soundId);
            }
            return [...currentActive, soundId];
        });
    };

    // ✅ LOGIC VOLUME CŨNG ĐƯỢC CHUYỂN LÊN ĐÂY
    const handleVolumeChange = (soundId, newVolume) => {
        setVolumeMap(prev => ({ ...prev, [soundId]: newVolume }));

        // Nếu kéo volume về 0 thì tắt âm thanh
        if (newVolume === 0) {
            setActiveSounds(currentActive => currentActive.filter(id => id !== soundId));
        }
        // Nếu đang tắt mà kéo volume lên, thì bật lại âm thanh
        else if (!activeSounds.includes(soundId)) {
            setActiveSounds(currentActive => [...currentActive, soundId]);
        }
    };

    return (
        <section className="soundcard-section">
            <div className="soundcard-grid">
                {sounds.map(sound => {
                    const isPlaying = activeSounds.includes(sound.id);
                    const volume = volumeMap[sound.id] ?? sound.defaultVolume ?? 0.25;

                    return (
                        <SoundCard
                            key={sound.id}
                            sound={sound}
                            // === Props được truyền xuống đơn giản hơn ===
                            isPlaying={isPlaying}
                            volume={volume}
                            onToggle={() => handleToggleSound(sound.id)}
                            onVolumeChange={(newVolume) => handleVolumeChange(sound.id, newVolume)}
                        />
                    );
                })}
            </div>
        </section>
    );
}

export default SoundGrid;