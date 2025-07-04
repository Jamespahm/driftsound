// File: App.jsx
import { useState } from 'react';
import MainLayout from './layouts/MainLayout';

function App() {
  const [activeSounds, setActiveSounds] = useState([]);
  const [pausedSounds, setPausedSounds] = useState([]);
  const [isPaused, setIsPaused] = useState(false);

  return (
    <MainLayout
      activeSounds={activeSounds}
      setActiveSounds={setActiveSounds}
      pausedSounds={pausedSounds}
      setPausedSounds={setPausedSounds}
      isPaused={isPaused}
      setIsPaused={setIsPaused}
    />
  );
}

export default App;