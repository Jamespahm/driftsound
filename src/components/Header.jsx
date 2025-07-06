// File: components/Header.jsx
import React, { useState } from 'react';

// ✅ MỚI: Nhận props từ cha
function Header({ masterVolume, setMasterVolume }) {

    const handleMasterVolumeChange = (e) => {
        setMasterVolume(parseFloat(e.target.value));
    };

    // ✅ MỚI: Logic để đổi icon dựa trên mức volume
    const getVolumeIcon = () => {
        if (masterVolume === 0) {
            return "/icons/volume-xmark.svg";
        }
        if (masterVolume < 0.5) {
            return "/icons/volume-low.svg";
        }
        return "/icons/volume-hight.svg"; // hoặc volume.svg của bạn
    };

    return (
        <header className="main-header">
            <a href="#" className="logo">DriftSound</a>

            <div className="slogan">
                <p>Enjoy your space with <strong>Ambient sounds</strong></p>
            </div>

            <div className="header-right">
                <div className="header-icons">
                    {/* ✅ MỚI: Bọc icon và thanh trượt vào một div */}
                    <div className="volume-control-container">
                        <img className="icon-header-hide" src={getVolumeIcon()} alt="Volume" />
                        <div className="volume-slider-wrapper">
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={masterVolume}
                                onChange={handleMasterVolumeChange}
                                className="master-volume-slider"
                            />
                        </div>
                    </div>
                    <img src="/icons/list.svg" alt="Menu" />
                </div>
            </div>
        </header>
    )
}

export default Header;