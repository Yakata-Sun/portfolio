// src/components/icons/index.js

// TXT — Document
export const sidebarActions = [
    {
     icon: '📄',
      label: 'Загрузить TXT',
      onClick: () => document.getElementById('txt-upload').click(),
    },
    {
      icon: '🎼',
      label: 'Загрузить MIDI',
      onClick: () => document.getElementById('midi-upload').click(),
    },
    {
      icon: '🧭',
      label: 'Определить тональность',
      onClick: handleDetectKey,
      disabled: !inputMelody.trim(),
    },
    {
      icon: '▶️',
      label: 'Воспроизвести оригинал',
      onClick: handlePlayOriginal,
      disabled: isPlaying || !inputMelody.trim(),
    },
    {
      icon: '🔄',
      label: 'Транспонировать',
      onClick: handleTranspose,
      disabled: !inputMelody.trim(),
    },
    {
      icon: '🎧',
      label: 'Воспроизвести результат',
      onClick: handlePlayTransposed,
      disabled: isPlaying || !result.trim(),
    },
  ];