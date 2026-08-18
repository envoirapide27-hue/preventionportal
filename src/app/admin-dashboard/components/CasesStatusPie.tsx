'use client';
import React from 'react';
import {
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Under Review', value: 89, color: '#D97706' },
  { name: 'Investigation', value: 134, color: '#2563EB' },
  { name: 'Notice Issued', value: 67, color: '#7C3AED' },
  { name: 'Charged', value: 45, color: '#B3261E' },
  { name: 'Closed', value: 312, color: '#4B5563' },
  { name: 'Convicted', value: 22, color: '#991B1B' },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ name: string; value: number }>;
}

const CustomTooltip = ({ active, payload }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F2A42] border border-[#1E3A54] rounded-lg px-3 py-2 shadow-lg">
        <p className="text-[#E2EAF2] text-xs font-medium">{payload[0].name}</p>
        <p className="text-[#E2EAF2] font-bold font-mono-data text-sm">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function CasesStatusPie() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="45%"
          innerRadius={45}
          outerRadius={70}
          paddingAngle={2}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-status-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend
          formatter={(value) => <span style={{ color: '#7A9BB5', fontSize: '10px' }}>{value}</span>}
          iconSize={8}
          wrapperStyle={{ fontSize: '10px' }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}