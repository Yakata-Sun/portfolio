
import React, { useState, useEffect } from 'react';

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

export default UserMenu;