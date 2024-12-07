import React, { useState } from 'react';
import styled from 'styled-components';

interface DockItemProps {
  scale: number;
}

const DockContainer = styled.div`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 12px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(8px);
  border-radius: 16px;
  z-index: 1000;
`;

const DockItem = styled.div<DockItemProps>`
  width: 50px;
  height: 50px;
  transform: ${props => `scale(${props.scale})`};
  transition: transform 0.2s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  
  &:hover {
    .icon-label {
      opacity: 1;
      transform: translateY(-5px);
    }
  }
`;

const IconImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  transition: all 0.2s ease-out;
  
  &:hover {
    filter: brightness(1.2);
  }
`;

const IconLabel = styled.span`
  color: white;
  font-size: 12px;
  margin-top: 5px;
  opacity: 0;
  transition: all 0.2s ease-out;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  position: absolute;
  bottom: 100%;
  left: 50%;
  transform: translateX(-50%) translateY(0);
  background: rgba(0, 0, 0, 0.8);
  padding: 4px 8px;
  border-radius: 4px;
  pointer-events: none;
`;

interface DockIconProps {
  icon: string;
  label: string;
  onClick?: () => void;
}

const Dock: React.FC = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const icons: DockIconProps[] = [
    {
      icon: '/icons/home.png',
      label: 'Reset View',
      onClick: () => console.log('Reset view clicked')
    },
    {
      icon: '/icons/camera.png',
      label: 'Camera',
      onClick: () => console.log('Camera clicked')
    },
    {
      icon: '/icons/rotate.png',
      label: 'Auto Rotate',
      onClick: () => console.log('Auto rotate clicked')
    },
    {
      icon: '/icons/settings.png',
      label: 'Settings',
      onClick: () => console.log('Settings clicked')
    },
    {
      icon: '/icons/info.png',
      label: 'Info',
      onClick: () => console.log('Info clicked')
    }
  ];

  const getScale = (index: number) => {
    if (hoveredIndex === null) return 1;
    const distance = Math.abs(index - hoveredIndex);
    if (distance === 0) return 1.5;
    if (distance === 1) return 1.2;
    return 1;
  };

  return (
    <DockContainer>
      {icons.map((icon, index) => (
        <DockItem
          key={index}
          scale={getScale(index)}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={icon.onClick}
        >
          <IconImage src={icon.icon} alt={icon.label} />
          <IconLabel className="icon-label">{icon.label}</IconLabel>
        </DockItem>
      ))}
    </DockContainer>
  );
};

export default Dock;
