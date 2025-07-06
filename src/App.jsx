// File: App.jsx

import { useState } from 'react';
import MainLayout from './layouts/MainLayout';

function App() {
  const [activeSounds, setActiveSounds] = useState([]);
  const [pausedSounds, setPausedSounds] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
  // ✅ MỚI: Thêm state cho âm lượng tổng, giá trị từ 0 đến 1
  const [masterVolume, setMasterVolume] = useState(0.75);

  return (
    <MainLayout
      activeSounds={activeSounds}
      setActiveSounds={setActiveSounds}
      pausedSounds={pausedSounds}
      setPausedSounds={setPausedSounds}
      isPaused={isPaused}
      setIsPaused={setIsPaused}
      // ✅ MỚI: Truyền state và hàm set xuống dưới
      masterVolume={masterVolume}
      setMasterVolume={setMasterVolume}
    />
  );
}

export default App;