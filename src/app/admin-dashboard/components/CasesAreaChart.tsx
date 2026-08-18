'use client';
import React from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const data = [
  { month: 'Aug 25', cases: 187 },
  { month: 'Sep 25', cases: 214 },
  { month: 'Oct 25', cases: 198 },
  { month: 'Nov 25', cases: 241 },
  { month: 'Dec 25', cases: 176 },
  { month: 'Jan 26', cases: 259 },
  { month: 'Feb 26', cases: 232 },
  { month: 'Mar 26', cases: 278 },
  { month: 'Apr 26', cases: 301 },
  { month: 'May 26', cases: 264 },
  { month: 'Jun 26', cases: 318 },
  { month: 'Jul 26', cases: 289 },
  { month: 'Aug 26', cases: 34 },
];

interface TooltipProps {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0F2A42] border border-[#1E3A54] rounded-lg px-3 py-2 shadow-lg">
        <p className="text-[#7A9BB5] text-xs mb-1">{label}</p>
        <p className="text-[#E2EAF2] font-bold font-mono-data text-sm">{payload[0].value} cases</p>
      </div>
    );
  }
  return null;
};

export default function CasesAreaChart() {
  return (
    <ResponsiveContainer width="100%" height={180}>
      <AreaChart data={data} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
        <defs>
          <linearGradient id="casesGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#123B5D" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#123B5D" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E3A54" />
        <XAxis dataKey="month" tick={{ fontSize: 11, fill: '#7A9BB5' }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: '#7A9BB5' }} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Area type="monotone" dataKey="cases" stroke="#4A90D9" strokeWidth={2} fill="url(#casesGrad)" />
      </AreaChart>
    </ResponsiveContainer>
  );
}