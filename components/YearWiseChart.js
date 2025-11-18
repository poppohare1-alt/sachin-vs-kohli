'use client';

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function YearWiseChart({ data }) {
  // Sample data - replace with real data from API
  const sampleData = [
    { year: '2008', sachin: 1063, kohli: 159 },
    { year: '2009', sachin: 947, kohli: 325 },
    { year: '2010', sachin: 1562, kohli: 995 },
    { year: '2011', sachin: 1079, kohli: 1381 },
    { year: '2012', sachin: 1432, kohli: 1733 },
    { year: '2013', sachin: 708, kohli: 1268 }
  ];

  const chartData = data || sampleData;

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Career Progression
      </h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="sachin" 
            stroke="#0056e0" 
            strokeWidth={3} 
            name="Sachin" 
          />
          <Line 
            type="monotone" 
            dataKey="kohli" 
            stroke="#ff8f00" 
            strokeWidth={3} 
            name="Kohli" 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
