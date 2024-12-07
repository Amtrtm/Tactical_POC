import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

interface StatusItem {
  id: number;
  message: string;
  type: 'info' | 'warning' | 'error';
  timestamp: string;
}

interface StatusListProps {
  items: StatusItem[];
}

const Container = styled.div`
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background: rgba(42, 42, 60, 0.3);
  border-radius: 8px;
  padding: 8px;

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

const StatusItemContainer = styled(motion.div)<{ type: 'info' | 'warning' | 'error' }>`
  display: flex;
  align-items: center;
  padding: 8px;
  margin-bottom: 4px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  border-left: 3px solid ${props => 
    props.type === 'info' ? '#4FFBDF' :
    props.type === 'warning' ? '#FFB347' :
    '#FF6B6B'
  };
`;

const Message = styled.span`
  flex: 1;
  font-size: 12px;
  color: white;
`;

const Timestamp = styled.span`
  font-size: 10px;
  color: rgba(255, 255, 255, 0.5);
  margin-left: 8px;
`;

const StatusList: React.FC<StatusListProps> = ({ items }) => {
  return (
    <Container>
      {items.map((item) => (
        <StatusItemContainer
          key={item.id}
          type={item.type}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Message>{item.message}</Message>
          <Timestamp>{item.timestamp}</Timestamp>
        </StatusItemContainer>
      ))}
    </Container>
  );
};

export default StatusList;
