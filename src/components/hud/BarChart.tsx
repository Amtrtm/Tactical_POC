import React from 'react';
import styled from 'styled-components';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface BarChartProps {
  data: Array<{
    name: string;
    value: number;
  }>;
  color?: string;
}

const ChartContainer = styled.div`
  width: 100%;
  height: 150px;
  background: rgba(42, 42, 60, 0.3);
  border-radius: 8px;
  padding: 16px;
`;

const CustomTooltip = styled.div`
  background: rgba(42, 42, 60, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  padding: 8px;
  color: white;
`;

const BarChart: React.FC<BarChartProps> = ({
  data,
  color = '#4FFBDF'
}) => {
  const CustomTooltipContent = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <CustomTooltip>
          <p>{`${label}: ${payload[0].value}`}</p>
        </CustomTooltip>
      );
    }
    return null;
  };

  return (
    <ChartContainer>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart data={data} margin={{ top: 5, right: 5, bottom: 5, left: 5 }}>
          <XAxis
            dataKey="name"
            tick={{ fill: '#fff', fontSize: 10 }}
            axisLine={{ stroke: '#444' }}
          />
          <YAxis
            tick={{ fill: '#fff', fontSize: 10 }}
            axisLine={{ stroke: '#444' }}
          />
          <Tooltip content={CustomTooltipContent} />
          <Bar
            dataKey="value"
            fill={color}
            radius={[4, 4, 0, 0]}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
};

export default BarChart;
