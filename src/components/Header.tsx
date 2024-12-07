import React, { useState } from 'react';
import '../styles/animations.css';

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      height: '60px',
      backgroundColor: 'rgba(26, 26, 26, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0 40px',
      zIndex: 1000,
      borderBottom: '1px solid rgba(97, 200, 255, 0.2)'
    }}>
      <div style={{
        display: 'flex',
        gap: '30px',
        justifyContent: 'center',
        flex: 1
      }}>
        {['Vehicle', 'Settings', 'Fire Mission'].map((item) => (
          <button
            key={item}
            className="glow-button"
            style={{
              background: 'none',
              border: 'none',
              color: '#61c8ff',
              fontSize: '30px',
              cursor: 'pointer',
              transition: 'all 0.3s',
              backgroundColor: hoveredItem === item ? 'rgba(97, 200, 255, 0.15)' : 'transparent',
              boxShadow: hoveredItem === item ? '0 0 10px rgba(97, 200, 255, 0.2)' : 'none',
              fontWeight: hoveredItem === item ? '500' : 'normal'
            }}
            onMouseEnter={() => setHoveredItem(item)}
            onMouseLeave={() => setHoveredItem(null)}
            onClick={() => console.log(`Clicked ${item}`)}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Header;
