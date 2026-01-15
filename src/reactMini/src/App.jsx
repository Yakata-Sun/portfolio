import React, { useState } from 'react';
import midiParser from 'midi-parser-js';
import './App.css';
import { NOTE_OPTIONS } from './constants/notes';
import { MODES } from './constants/modes';
import { parseNotesToMidi, midiNumberToNote } from './utils/noteUtils';
import { transposeScaleAware } from './utils/scaleUtils';
import { useAudioContext } from './hooks/useAudioContext';
import { detectKey } from './utils/keyDetection';
import CircleOfFifths from './components/CircleOfFifths';
import KeyScoreChart from './components/KeyScoreChart';
import SidebarActions from './components/SidebarAction';

function App() {
  const [inputMelody, setInputMelody] = useState('C4 E4 G4 Bb4');
  const [originalKey, setOriginalKey] = useState(['C', 'major']);
  const [newKey, setNewKey] = useState(['D', 'harmonicMinor']);
  const [result, setResult] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [midiFile, setMidiFile] = useState(null);
  const [detectedData, setDetectedData] = useState(null);
  const { playMelody } = useAudioContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const playNoteString = (noteString) => {
    const midiNumbers = parseNotesToMidi(noteString);
    if (midiNumbers.length > 0) playMelody(midiNumbers);
  };

  const handlePlayOriginal = () => playNoteString(inputMelody);
  const handlePlayTransposed = () => playNoteString(result);

  const handleTranspose = () => {
    try {
      const midiNumbers = parseNotesToMidi(inputMelody);
      if (midiNumbers.length === 0) {
        setResult('');
        return;
      }
      const transposedMidi = transposeScaleAware(midiNumbers, originalKey, newKey);
      const transposedNotes = transposedMidi.map(midiNumberToNote);
      setResult(transposedNotes.join(' '));
    } catch (err) {
      console.error('Ошибка транспонирования:', err);
      alert('Ошибка транспонирования: ' + (err.message || err));
      setResult('');
    }
  };

  const handleTextFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      let content = e.target.result.trim();
      content = content
        .replace(/[^A-Ga-g#b0-9\s]/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
      setInputMelody(content);
      setResult('');
    };
    reader.readAsText(file);
  };

  const handleMidiFileUpload = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const uint8Array = new Uint8Array(e.target.result);
        const midi = midiParser.parse(uint8Array);
        setMidiFile(midi);

        const allNotes = [];
        midi.tracks.forEach((track) => {
          track.forEach((event) => {
            if (event.subtype === 'noteOn' && event.velocity > 0 && typeof event.noteNumber === 'number') {
              try {
                allNotes.push(midiNumberToNote(event.noteNumber));
              } catch {
                /* ignore */
              }
            }
          });
        });

        setInputMelody(allNotes.slice(0, 32).join(' '));
        setResult('');
      } catch (err) {
        alert('Ошибка разбора MIDI: ' + (err.message || err));
        setMidiFile(null);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const handleDetectKey = () => {
    try {
      const midiNumbers = parseNotesToMidi(inputMelody);
      if (midiNumbers.length === 0) {
        alert('Введите ноты для анализа!');
        return;
      }

      const result = detectKey(midiNumbers);
      if (result && result.best) {
        setOriginalKey(result.best.key);
        setDetectedData(result);
      } else {
        setDetectedData({ best: null, explanation: 'Не удалось определить тональность.' });
      }
    } catch (err) {
      console.error('Ошибка определения тональности:', err);
      alert('Ошибка анализа: ' + (err.message || 'неизвестная ошибка'));
      setDetectedData(null);
    }
  };


  const handleGoHome = () => {
  // Переход на главную страницу
  window.location.href = '/';
};

  return (
    <div className="AppModern">

      {/* Hidden file inputs */}
      <input id="txt-upload" type="file" accept=".txt" onChange={handleTextFileUpload} style={{ display: 'none' }} />
      <input
        id="midi-upload"
        type="file"
        accept=".mid,.midi"
        onChange={handleMidiFileUpload}
        style={{ display: 'none' }}
      />

      {/* Layout: Sidebar + Main */}
      <div className="app-layout">
        {/* === Sidebar with icons === */}
        <SidebarActions
          inputMelody={inputMelody}
          setInputMelody={setInputMelody}
          setResult={setResult}
          handleDetectKey={handleDetectKey}
          handleTranspose={handleTranspose}
          handlePlayOriginal={handlePlayOriginal}
          handleGoHome={handleGoHome}
        />
        

        {/* === Main Content === */}
        <main className="main-content">
          <header className="app-header">
            <h1>🎵 Транспонирование мелодии</h1>

            {midiFile && (
              <span className="midi-badge">
                🎼 {midiFile.header.format}, {midiFile.tracks.length} трек(ов)
              </span>
            )}
          </header>

          {/* Input Section */}
          <section className="input-section">
            <div className="form-row">
              <label>Мелодия (ноты через пробел)</label>
              <input
                type="text"
                value={inputMelody}
                onChange={(e) => setInputMelody(e.target.value)}
                placeholder="C4 D4 E4 F4 G4..."
                className="input-melody"
              />
            </div>

            <div className="form-row keys-row">
              <div className="key-select-group">
                <label>Исходная тональность</label>
                <div className="key-selectors">
                  <select value={originalKey[0]} onChange={(e) => setOriginalKey([e.target.value, originalKey[1]])}>
                    {NOTE_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <select value={originalKey[1]} onChange={(e) => setOriginalKey([originalKey[0], e.target.value])}>
                    {MODES.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="key-select-group">
                <label>Целевая тональность</label>
                <div className="key-selectors">
                  <select value={newKey[0]} onChange={(e) => setNewKey([e.target.value, newKey[1]])}>
                    {NOTE_OPTIONS.map((n) => (
                      <option key={n} value={n}>
                        {n}
                      </option>
                    ))}
                  </select>
                  <select value={newKey[1]} onChange={(e) => setNewKey([newKey[0], e.target.value])}>
                    {MODES.map((m) => (
                      <option key={m.value} value={m.value}>
                        {m.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Detection & Result Section */}
          <section className="result-section">
            {detectedData && (
              <div className={`detection-card ${isCollapsed ? 'collapsed' : ''}`} 
     onClick={() => isCollapsed && setIsCollapsed(false)}>
  <h3>
    🔍 Анализ тональности
    <span className="toggle-icon" 
          onClick={(e) => { e.stopPropagation(); setIsCollapsed(!isCollapsed); }}>
      ▼
    </span>
  </h3>

                {detectedData.best ? (
                  <>
                    <p>
                      <strong>Наиболее вероятно:</strong> {detectedData.best.key[0]} {detectedData.best.key[1]}
                      <span className="confidence">({(detectedData.best.confidence * 100).toFixed(0)}%)</span>
                    </p>
                    <p className="explanation">{detectedData.best.explanation}</p>
                    <button className="btn-use-key" onClick={() => setOriginalKey(detectedData.best.key)}>
                      ✅ Использовать как исходную
                    </button>

                    {/* Визуализации: круг квинт + диаграмма — в 2 колонки */}
                    <div className="visualizations-grid">
                      <div className="viz-card">
                        <h4>Круг квинт</h4>
                        <CircleOfFifths detectedData={detectedData} bestKey={detectedData.best.key} />
                      </div>
                      <div className="viz-card">
                        <h4>Баллы тональностей</h4>
                        <KeyScoreChart best={detectedData.best} alternatives={detectedData.alternatives} />
                      </div>
                    </div>

                    {detectedData.alternatives?.length > 0 && (
                      <div className="alternatives">
                        <h4>Другие варианты</h4>
                        <ul>
                          {detectedData.alternatives.slice(0, 3).map((alt, i) => (
                            <li key={i}>
                              {alt.key[0]} {alt.key[1]} ({(alt.confidence * 100).toFixed(0)}%)
                              {i === 0 && ' — например, при модальной каденции'}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </>
                ) : (
                  <p className="no-key">⚠️ {detectedData.explanation}</p>
                )}
              </div>
            )}

            {/* Result Output */}
            <div className="output-card">
              <div className="output-header">
                <h3>Результат транспонирования</h3>
                {result && (
                  <button className="btn-play-result" onClick={handlePlayTransposed} disabled={isPlaying}>
                    ▶️ Воспроизвести
                  </button>
                )}
              </div>
              <div className="output-box">
                {result ? (
                  <code>{result}</code>
                ) : (
                  <span className="placeholder">Результат появится после транспонирования</span>
                )}
              </div>
            </div>
          </section>

          {/* Info Footer */}
          <footer className="app-footer">
            <p>
              Поддержка: <strong>мажор</strong>, <strong>натуральный</strong> и <strong>гармонический минор</strong>.
              Например: C мажор → A гармонический минор: G → G♯ (VII♯).
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default App;