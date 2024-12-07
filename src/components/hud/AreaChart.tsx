import React from 'react';
import styled from 'styled-components';
import { AreaChart as RechartsAreaChart, Area, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface AreaChartProps {
  data: Array<{ name: string; value: number }>;
  color?: string;
}

const ChartContainer = styled.div`
  width: 100%;
  height: 100px;
  background: rgba(42, 42, 60, 0.3);
  border-radius: 8px;
  padding: 16px;
`;

const AreaChart: React.FC<AreaChartProps> = ({
  data,
  color = '#4FFBDF'
}) => {
  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsAreaChart data={data}>
          <defs>
            <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={color} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={color} stopOpacity={0}/>
            </linearGradient>
          </defs>
          <XAxis 
            dataKey="name" 
            tick={{ fill: '#fff', fontSize: 10 }}
            axisLine={{ stroke: '#444' }}
          />
          <YAxis 
            tick={{ fill: '#fff', fontSize: 10 }}
            axisLine={{ stroke: '#444' }}
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fillOpacity={1}
            fill="url(#colorGradient)"
          />
        </RechartsAreaChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default AreaChart;
