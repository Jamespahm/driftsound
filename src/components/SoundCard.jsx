// File: components/SoundCard.jsx

import React, { useEffect, useRef } from 'react';

function SoundCard({
    sound,
    isPlaying,
    volume,
    masterVolume, // Prop mới cho âm lượng tổng
    onToggle,
    onVolumeChange
}) {
    const audioRef = useRef(null);

    // Xử lý sự kiện khi người dùng kéo thanh trượt volume
    const handleSliderChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        // Báo cho component cha biết là volume riêng đã thay đổi
        onVolumeChange(newVolume);
    };

    // useEffect để play/pause âm thanh
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        if (isPlaying) {
            // ✅ Tính toán âm lượng cuối cùng = volume riêng * volume tổng
            const finalVolume = volume * masterVolume;
            audio.volume = finalVolume;
            audio.play().catch(error => console.log("Lỗi khi phát audio:", error));
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [isPlaying, sound.src]); // Chạy lại khi trạng thái play hoặc nguồn audio thay đổi

    // useEffect để cập nhật volume khi có sự thay đổi
    useEffect(() => {
        const audio = audioRef.current;
        if (audio && isPlaying) {
            // ✅ Tính toán và cập nhật lại âm lượng cuối cùng
            const finalVolume = volume * masterVolume;
            audio.volume = finalVolume;
        }
    }, [volume, masterVolume, isPlaying]); // Chạy lại khi 1 trong 3 giá trị này thay đổi

    // useEffect để thiết lập lặp lại cho âm thanh
    useEffect(() => {
        const audio = audioRef.current;
        if (audio) {
            audio.loop = true;
        }
    }, []);

    return (
        // Khi click vào thẻ, gọi hàm onToggle từ cha
        <div className={`sound-card ${isPlaying ? 'active' : ''}`} onClick={onToggle}>
            <audio ref={audioRef} src={sound.src}></audio>
            <img className="sound-icon" src={sound.icon} alt={sound.name} />
            {/* <span className="sound-name">{sound.name}</span> */}
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

export default React.memo(SoundCard);