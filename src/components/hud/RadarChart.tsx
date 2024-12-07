import React from 'react';
import styled from 'styled-components';
import { Radar, RadarChart as RechartsRadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface RadarChartProps {
  data: Array<{
    subject: string;
    value: number;
    fullMark: number;
  }>;
}

const ChartContainer = styled.div`
  width: 100%;
  height: 200px;
  background: rgba(42, 42, 60, 0.3);
  border-radius: 8px;
  padding: 16px;
`;

const RadarChart: React.FC<RadarChartProps> = ({ data }) => {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid stroke="rgba(255, 255, 255, 0.2)" />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: '#fff', fontSize: 10 }}
          />
          <Radar
            name="Performance"
            dataKey="value"
            stroke="#4FFBDF"
            fill="#4FFBDF"
            fillOpacity={0.3}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default RadarChart;
