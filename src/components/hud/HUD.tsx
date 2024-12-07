import React, { useState } from 'react';
import styled from 'styled-components';
import GaugeChart from './GaugeChart';
import AreaChart from './AreaChart';
import RadarChart from './RadarChart';
import BarChart from './BarChart';
import StatusList from './StatusList';
import { motion, AnimatePresence } from 'framer-motion';
import { useTruckData } from '../../hooks/useTruckData';

const HUDWrapper = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  align-items: flex-start;
  gap: 8px;
`;

const ToggleButton = styled(motion.button)`
  background: rgba(42, 42, 60, 0.8);
  backdrop-filter: blur(10px);
  border: none;
  border-radius: 8px;
  color: #4FFBDF;
  width: 32px;
  height: 32px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  padding: 0;
  transition: background-color 0.2s;

  &:hover {
    background: rgba(52, 52, 70, 0.8);
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(79, 251, 223, 0.3);
  }
`;

const HUDContainer = styled(motion.div)`
  width: 400px;
  background: rgba(42, 42, 60, 0.8);
  backdrop-filter: blur(10px);
  border-radius: 16px;
  padding: 20px;
  color: white;
  font-family: 'Inter', sans-serif;
  max-height: calc(100vh - 40px);
  overflow-y: auto;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.2);
    border-radius: 3px;
  }
`;

const Title = styled.h2`
  font-size: 18px;
  margin: 0 0 20px 0;
  color: #4FFBDF;
`;

const Section = styled.div`
  margin-bottom: 24px;
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  margin-bottom: 24px;
`;

const StatBox = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 12px;
  text-align: center;
`;

const StatValue = styled.div`
  font-size: 24px;
  font-weight: bold;
  color: #4FFBDF;
`;

const StatLabel = styled.div`
  font-size: 12px;
  opacity: 0.8;
  margin-top: 4px;
`;

const LoadingOverlay = styled(motion.div)`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: #4FFBDF;
  font-size: 18px;
`;

const HUD: React.FC = () => {
  const truckData = useTruckData();
  const [isExpanded, setIsExpanded] = useState(true);

  if (!truckData) {
    return (
      <HUDWrapper>
        <HUDContainer
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <LoadingOverlay
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Loading truck data...
          </LoadingOverlay>
        </HUDContainer>
      </HUDWrapper>
    );
  }

  return (
    <HUDWrapper>
      <AnimatePresence mode="wait">
        {isExpanded && (
          <HUDContainer
            key="hud"
            initial={{ opacity: 0, x: 100, width: 0 }}
            animate={{ opacity: 1, x: 0, width: 400 }}
            exit={{ opacity: 0, x: 100, width: 0 }}
            transition={{ 
              duration: 0.3,
              ease: "easeInOut"
            }}
          >
            <Title>Truck Analytics</Title>
            
            <Section>
              <Grid>
                <GaugeChart
                  value={truckData.engineHealth}
                  maxValue={100}
                  label="Engine Health"
                  color="#4FFBDF"
                />
                <GaugeChart
                  value={Math.round(truckData.fuelLevel * 10) / 10}
                  maxValue={100}
                  label="Fuel Level"
                  color="#FF69B4"
                />
              </Grid>
            </Section>

            <Section>
              <Grid>
                <StatBox>
                  <StatValue>{truckData.engineTemp.toFixed(1)}°C</StatValue>
                  <StatLabel>Engine Temp</StatLabel>
                </StatBox>
                <StatBox>
                  <StatValue>{truckData.batteryLevel}%</StatValue>
                  <StatLabel>Battery</StatLabel>
                </StatBox>
                <StatBox>
                  <StatValue>{truckData.tirePressure} PSI</StatValue>
                  <StatLabel>Tire Pressure</StatLabel>
                </StatBox>
                <StatBox>
                  <StatValue>{(truckData.nextService / 1000).toFixed(1)}K mi</StatValue>
                  <StatLabel>Next Service</StatLabel>
                </StatBox>
              </Grid>
            </Section>

            <Section>
              <Title>System Health</Title>
              <RadarChart data={truckData.systemHealth} />
            </Section>

            <Section>
              <Title>Maintenance Status</Title>
              <BarChart data={truckData.maintenance} color="#FF69B4" />
            </Section>

            <Section>
              <Title>Performance History</Title>
              <AreaChart data={truckData.performance} />
            </Section>

            <Section>
              <Title>System Status</Title>
              <StatusList items={truckData.statusUpdates} />
            </Section>
          </HUDContainer>
        )}
      </AnimatePresence>
      <ToggleButton
        onClick={() => setIsExpanded(!isExpanded)}
        animate={{ rotate: isExpanded ? 0 : 180 }}
        transition={{ duration: 0.3 }}
      >
        {isExpanded ? '→' : '←'}
      </ToggleButton>
    </HUDWrapper>
  );
};

export default HUD;
