// File: components/SoundCard.jsx
import React, { useEffect, useRef } from 'react';

function SoundCard({
    sound,
    isPlaying,
    volume,
    onToggle,
    onVolumeChange
}) {
    const audioRef = useRef(null);

    // Xử lý khi thanh trượt volume thay đổi
    const handleSliderChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        // Báo cho cha (SoundGrid) biết là volume đã thay đổi
        onVolumeChange(newVolume);
    };

    // Đồng bộ trạng thái isPlaying với thẻ <audio>
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            audio.volume = volume; // Đặt volume trước khi play
            audio.play().catch(error => console.log("Audio play failed:", error));
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [isPlaying, sound.src]); // Thêm sound.src để audio load lại khi cần

    // Đồng bộ volume khi state thay đổi
    useEffect(() => {
        const audio = audioRef.current;
        if (audio && isPlaying) {
            audio.volume = volume;
        }
    }, [volume, isPlaying]);

    // Thiết lập loop cho audio
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) audio.loop = true;
    }, []);

    return (
        // Khi click vào thẻ, gọi hàm onToggle từ cha
        <div className={`sound-icon ${isPlaying ? 'active' : ''}`} onClick={onToggle}>
            <audio ref={audioRef} src={sound.src}></audio>
            <img src={sound.icon} alt={sound.name} />
            <div
                className="volume-wrapper"
                style={{ visibility: isPlaying ? 'visible' : 'hidden' }}
                onClick={(e) => e.stopPropagation()} // Ngăn click vào slider làm tắt âm thanh
            >
                <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    value={volume}
                    onChange={handleSliderChange}
                    className="volume-slider"
                />
            </div>
        </div>
    );
}

// Dùng React.memo để tránh re-render không cần thiết
export default SoundCard;