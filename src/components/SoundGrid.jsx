
//SoundGrid.jsx
import { useEffect } from 'react';
import sounds from '../data/sounds';
import SoundCard from './SoundCard';

function SoundGrid({
    activeSounds,
    setActiveSounds,
    pausedSounds,
    setPausedSounds,
    isPaused,
    volumeMap,
    setVolumeMap,
    resumeFlag,
    setResumeFlag
}) {
    useEffect(() => {
        if (resumeFlag) {
            const timer = setTimeout(() => setResumeFlag(false), 300);
            return () => clearTimeout(timer);
        }
    }, [resumeFlag]);

    return (
        <section className="soundcard-section">
            <div className="soundcard-grid">
                {sounds.map(sound => (
                    <SoundCard
                        key={sound.id}
                        sound={sound}
                        activeSounds={activeSounds}
                        setActiveSounds={setActiveSounds}
                        pausedSounds={pausedSounds}
                        setPausedSounds={setPausedSounds}
                        isPaused={isPaused}
                        volumeMap={volumeMap}
                        setVolumeMap={setVolumeMap}
                        resumeFlag={resumeFlag}
                        setResumeFlag={setResumeFlag}
                    />
                ))}
            </div>
        </section>
    );
}

export default SoundGrid;
