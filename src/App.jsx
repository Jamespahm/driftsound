// File: App.jsx

import { useState } from 'react';
import MainLayout from './layouts/MainLayout';

function App() {
  const [activeSounds, setActiveSounds] = useState([]);
  const [pausedSounds, setPausedSounds] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  // Thêm state cho âm lượng tổng, giá trị từ 0 đến 1
  const [masterVolume, setMasterVolume] = useState(0.75);
  //  Thêm state để lưu âm lượng trước khi tắt tiếng
  const [volumeBeforeMute, setVolumeBeforeMute] = useState(0.75);

  // Hàm xử lý tắt/bật âm lượng tổng
  const handleMuteToggle = () => {
    // Nếu đang có tiếng
    if (masterVolume > 0) {
      setVolumeBeforeMute(masterVolume); // Lưu lại âm lượng hiện tại
      setMasterVolume(0); // Tắt tiếng
    } else {
      // Nếu đang tắt tiếng, khôi phục lại âm lượng đã lưu
      setMasterVolume(volumeBeforeMute);
    }
  };

  return (
    <MainLayout
      activeSounds={activeSounds}
      setActiveSounds={setActiveSounds}
      pausedSounds={pausedSounds}
      setPausedSounds={setPausedSounds}
      isPaused={isPaused}
      setIsPaused={setIsPaused}
      // Truyền state và hàm set xuống dưới
      masterVolume={masterVolume}
      setMasterVolume={setMasterVolume}
      // Truyền hàm xử lý xuống dưới
      onMuteToggle={handleMuteToggle}
    />
  );
}

export default App;