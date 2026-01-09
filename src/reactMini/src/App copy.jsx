
import React, { useState, useEffect } from 'react';

// ============= MOCK DATA & CONSTANTS =============
const NOTE_OPTIONS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const MODES = [
  { value: 'major', label: 'мажор' },
  { value: 'naturalMinor', label: 'натуральный минор' },
  { value: 'harmonicMinor', label: 'гармонический минор' }
];

// ============= AUTH COMPONENT =============
function AuthModal({ onClose, onLogin }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = () => {
    setError('');

    if (!email || !password) {
      setError('Заполните все поля');
      return;
    }

    if (!isLogin && !name) {
      setError('Введите имя');
      return;
    }

    // Simulate authentication
    const userData = {
      email,
      name: isLogin ? email.split('@')[0] : name,
      id: Math.random().toString(36).substr(2, 9)
    };

    localStorage.setItem('musicAppUser', JSON.stringify(userData));
    onLogin(userData);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="auth-overlay">
      <div className="auth-modal">
        <button className="auth-close" onClick={onClose}>×</button>
        <h2>{isLogin ? '🎵 Вход' : '🎵 Регистрация'}</h2>
        
        <div className="auth-form">
          {!isLogin && (
            <div className="form-group">
              <label>Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ваше имя"
              />
            </div>
          )}
          
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="your@email.com"
            />
          </div>
          
          <div className="form-group">
            <label>Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="••••••••"
            />
          </div>

          {error && <div className="auth-error">{error}</div>}

          <button onClick={handleSubmit} className="auth-submit">
            {isLogin ? 'Войти' : 'Зарегистрироваться'}
          </button>
        </div>

        <div className="auth-switch">
          {isLogin ? 'Нет аккаунта?' : 'Уже есть аккаунт?'}
          <button onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Зарегистрироваться' : 'Войти'}
          </button>
        </div>
      </div>
    </div>
  );
}

// ============= USER MENU =============
function UserMenu({ user, onLogout }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isOpen && !e.target.closest('.user-menu-container')) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isOpen]);

  return (
    <div className="user-menu-container">
      <button className="user-avatar" onClick={() => setIsOpen(!isOpen)}>
        {user.name.charAt(0).toUpperCase()}
      </button>
      
      {isOpen && (
        <div className="user-dropdown">
          <div className="user-info">
            <strong>{user.name}</strong>
            <span>{user.email}</span>
          </div>
          <button onClick={onLogout} className="logout-btn">
            Выйти
          </button>
        </div>
      )}
    </div>
  );
}

// ============= MAIN APP =============
function App() {
  const [user, setUser] = useState(null);
  const [showAuth, setShowAuth] = useState(false);
  const [inputMelody, setInputMelody] = useState('C4 E4 G4 Bb4');
  const [originalKey, setOriginalKey] = useState(['C', 'major']);
  const [newKey, setNewKey] = useState(['D', 'harmonicMinor']);
  const [result, setResult] = useState('');

  useEffect(() => {
    // Check for saved user
    const savedUser = localStorage.getItem('musicAppUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        localStorage.removeItem('musicAppUser');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setShowAuth(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('musicAppUser');
    setUser(null);
  };

  const handleTranspose = () => {
    // Simplified transpose logic for demo
    const notes = inputMelody.split(' ').filter(n => n.trim());
    setResult(notes.map(n => n.toUpperCase()).join(' '));
  };



  return (
    <div className="AppModern">
      {showAuth && <AuthModal onClose={() => setShowAuth(false)} onLogin={handleLogin} />}

      <div className="app-layout">
        {/* Sidebar */}
       

        {/* Main Content */}
        <main className="main-content">
          <header className="app-header">
            <h1>🎵 Транспонирование мелодии</h1>
            <div className="header-actions">
              {user ? (
                <UserMenu user={user} onLogout={handleLogout} />
              ) : (
                <button className="login-btn" onClick={() => setShowAuth(true)}>
                  Войти
                </button>
              )}
            </div>
          </header>

          {user && (
            <div className="welcome-banner">
              <span>👋 Добро пожаловать, {user.name}!</span>
            </div>
          )}

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
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <select value={originalKey[1]} onChange={(e) => setOriginalKey([originalKey[0], e.target.value])}>
                    {MODES.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="key-select-group">
                <label>Целевая тональность</label>
                <div className="key-selectors">
                  <select value={newKey[0]} onChange={(e) => setNewKey([e.target.value, newKey[1]])}>
                    {NOTE_OPTIONS.map((n) => (
                      <option key={n} value={n}>{n}</option>
                    ))}
                  </select>
                  <select value={newKey[1]} onChange={(e) => setNewKey([newKey[0], e.target.value])}>
                    {MODES.map((m) => (
                      <option key={m.value} value={m.value}>{m.label}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </section>

          {/* Result Section */}
          <section className="result-section">
            <div className="output-card">
              <div className="output-header">
                <h3>Результат транспонирования</h3>
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

          <footer className="app-footer">
            <p>
              Поддержка: <strong>мажор</strong>, <strong>натуральный</strong> и <strong>гармонический минор</strong>.
              Например: C мажор → A гармонический минор: G → G♯ (VII♯).
            </p>
          </footer>
        </main>
      </div>

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .AppModern {
          min-height: 100vh;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .app-layout {
          display: flex;
          min-height: 100vh;
        }

        /* Sidebar */
        .sidebar {
          width: 80px;
          background: rgba(255, 255, 255, 0.1);
          backdrop-filter: blur(10px);
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 20px 0;
        }

        .sidebar-header {
          font-size: 32px;
          margin-bottom: 30px;
        }

        .sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .sidebar-btn {
          width: 50px;
          height: 50px;
          border: none;
          background: rgba(255, 255, 255, 0.2);
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s;
          font-size: 24px;
        }

        .sidebar-btn:hover:not(.disabled) {
          background: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }

        .sidebar-btn.disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }

        /* Main Content */
        .main-content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
        }

        .app-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
        }

        .app-header h1 {
          color: white;
          font-size: 32px;
          font-weight: 700;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        /* Welcome Banner */
        .welcome-banner {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 12px;
          padding: 15px 25px;
          margin-bottom: 25px;
          color: #667eea;
          font-weight: 600;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }

        

        /* Existing Styles */
        .input-section, .result-section {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 20px;
          padding: 30px;
          margin-bottom: 30px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
        }

        .form-row {
          margin-bottom: 25px;
        }

        .form-row label {
          display: block;
          margin-bottom: 10px;
          color: #333;
          font-weight: 600;
        }

        .input-melody {
          width: 100%;
          padding: 12px;
          border: 2px solid #e0e0e0;
          border-radius: 10px;
          font-size: 16px;
          transition: border-color 0.3s;
        }

        .input-melody:focus {
          outline: none;
          border-color: #667eea;
        }

        .keys-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        .key-select-group label {
          display: block;
          margin-bottom: 10px;
          color: #333;
          font-weight: 600;
        }

        .key-selectors {
          display: flex;
          gap: 10px;
        }

        .key-selectors select {
          flex: 1;
          padding: 10px;
          border: 2px solid #e0e0e0;
          border-radius: 8px;
          font-size: 14px;
          cursor: pointer;
          transition: border-color 0.3s;
        }

        .key-selectors select:focus {
          outline: none;
          border-color: #667eea;
        }

        .output-card {
          background: white;
          border-radius: 15px;
          padding: 25px;
        }

        .output-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }

        .output-header h3 {
          color: #333;
          font-size: 20px;
        }

        .output-box {
          background: #f5f5f5;
          border-radius: 10px;
          padding: 20px;
          min-height: 80px;
          display: flex;
          align-items: center;
        }

        .output-box code {
          font-family: 'Monaco', 'Courier New', monospace;
          font-size: 16px;
          color: #333;
        }

        .placeholder {
          color: #999;
          font-style: italic;
        }

        .app-footer {
          text-align: center;
          color: white;
          padding: 20px;
          font-size: 14px;
        }

        @media (max-width: 768px) {
          .keys-row {
            grid-template-columns: 1fr;
          }
          
          .sidebar {
            width: 60px;
          }
          
          .sidebar-btn {
            width: 45px;
            height: 45px;
            font-size: 20px;
          }
          
          .main-content {
            padding: 20px;
          }

          .app-header h1 {
            font-size: 24px;
          }
        }
      `}</style>
    </div>
  );
}

export default App;