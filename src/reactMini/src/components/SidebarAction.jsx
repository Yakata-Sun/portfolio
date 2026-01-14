// src/components/SidebarActions.jsx
import React from 'react';

// ВАЖНО: sidebarActions — это массив объектов вида:

const SidebarActions = ({
  inputMelody,
  setInputMelody,
  setResult,
  handleDetectKey,
  handleTranspose,
  handlePlayOriginal,
  handleGoHome
  // Дополнительные пропсы при необходимости
}) => {
  // Динамически обновляем действия с актуальными колбэками и состояниями
  const actions = [
    {
      icon: '📄',
      label: 'Загрузить TXT',
      onClick: () => document.getElementById('txt-upload')?.click(),
    },
    {
      icon: '🎼',
      label: 'Загрузить MIDI',
      onClick: () => document.getElementById('midi-upload')?.click(),
    },
    {
      icon: '🧭',
      label: 'Очистить',
      onClick: () => {
        setInputMelody('');
        setResult('');
      },
      disabled: !inputMelody.trim(),
    },
    {
      icon: '▶️',
      label: 'Определить тональность',
      onClick: handleDetectKey,
      disabled: !inputMelody.trim(),
    },
    {
      icon: '🔄',
      label: 'Транспонировать',
      onClick: handleTranspose,
      disabled: !inputMelody.trim(),
    },
    {
      icon: '🎧',
      label: 'Воспроизвести оригинал',
      onClick: handlePlayOriginal,
      disabled: !inputMelody.trim(),
    }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <button className="sidebar-btn" onClick={handleGoHome} title="Вернуться">⤴  </button>
      </div>
      <nav className="sidebar-nav">
        {actions.map((action, idx) => (
          <button
            key={idx}
            className={`sidebar-btn ${action.disabled ? 'disabled' : ''}`}
            onClick={action.onClick}
            title={action.label}
            disabled={action.disabled}
            aria-label={action.label}
          >
            <span className="btn-icon">{action.icon}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarActions;