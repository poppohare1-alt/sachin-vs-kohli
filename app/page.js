'use client';

import { useState } from 'react';

export default function HomePage() {
  const [format, setFormat] = useState('all');

  return (
    <div className="min-h-screen bg-gradient-to-br from-india-blue-900 via-india-blue-800 to-india-orange-600">
      <header className="bg-india-blue-950 border-b-4 border-india-orange-500 shadow-2xl">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <h1 className="text-5xl font-bold text-center">
            <span className="text-white">SACHIN</span>
            <span className="text-india-orange-400 mx-4">VS</span>
            <span className="text-white">KOHLI</span>
          </h1>
          <p className="text-center text-india-blue-200 mt-3">
            Complete Career Statistics • All International Formats
          </p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Website is running! 🎉
          </h2>
          <p className="text-gray-600 mb-6">
            Your Sachin vs Kohli website is successfully deployed!
          </p>
          <p className="text-sm text-gray-500">
            Admin panel: <a href="/admin/login" className="text-india-blue-600 hover:underline">/admin/login</a>
          </p>
        </div>
      </div>
    </div>
  );
}
