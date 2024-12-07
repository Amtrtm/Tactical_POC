import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import pitchImg from '../../assets/pitch.png';
import rollImg from '../../assets/roll.png';

interface GaugeChartProps {
  value: number;
  maxValue: number;
  label: string;
  color?: string;
  type?: 'circular' | 'pitch' | 'roll';
}

const GaugeContainer = styled.div`
  position: relative;
  width: 150px;
  height: 150px;
`;

const GaugeSVG = styled.svg`
  transform: rotate(-90deg);
`;

const VehicleImage = styled(motion.img)`
  width: 60%;
  height: 60%;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  transform-origin: center;
  filter: brightness(0) saturate(100%) invert(89%) sepia(19%) saturate(825%) hue-rotate(98deg) brightness(106%) contrast(103%);
`;

const GaugeBackground = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  border: 2px solid rgba(79, 251, 223, 0.2);
`;

const GaugeLabel = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
  color: #fff;
  z-index: 2;
`;

const Value = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #4FFBDF;
`;

const Label = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-top: 4px;
`;

const GaugeChart: React.FC<GaugeChartProps> = ({
  value,
  maxValue,
  label,
  color = '#4FFBDF',
  type = 'circular'
}) => {
  const radius = 60;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / maxValue) * circumference;
  
  if (type === 'pitch' || type === 'roll') {
    return (
      <GaugeContainer>
        <GaugeBackground />
        <VehicleImage 
          src={type === 'pitch' ? pitchImg : rollImg}
          animate={{ 
            rotate: type === 'pitch' ? -value : value
          }}
          transition={{ type: "spring", stiffness: 100 }}
          draggable={false}
        />
        <GaugeLabel>
          <Value>{value.toFixed(1)}°</Value>
          <Label>{label}</Label>
        </GaugeLabel>
      </GaugeContainer>
    );
  }

  return (
    <GaugeContainer>
      <GaugeSVG width="150" height="150" viewBox="0 0 150 150">
        {/* Background circle */}
        <circle
          cx="75"
          cy="75"
          r={radius}
          stroke="#2A2A3C"
          strokeWidth="10"
          fill="none"
        />
        
        {/* Progress circle */}
        <motion.circle
          cx="75"
          cy="75"
          r={radius}
          stroke={color}
          strokeWidth="10"
          strokeLinecap="round"
          fill="none"
          initial={{ strokeDasharray: circumference, strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - progress }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </GaugeSVG>
      
      <GaugeLabel>
        <Value>{value.toFixed(1)}</Value>
        <Label>{label}</Label>
      </GaugeLabel>
    </GaugeContainer>
  );
};

export default GaugeChart;
