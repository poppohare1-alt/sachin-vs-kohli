export default function FormatTabs({ selected, onChange }) {
  const formats = [
    { id: 'all', label: 'All Formats', icon: '🏏' },
    { id: 'test', label: 'Test', icon: '⚪' },
    { id: 'odi', label: 'ODI', icon: '🔴' },
    { id: 't20i', label: 'T20I', icon: '🟡' }
  ];

  return (
    <div className="flex justify-center gap-3 flex-wrap">
      {formats.map(format => (
        <button
          key={format.id}
          onClick={() => onChange(format.id)}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all transform ${
            selected === format.id
              ? 'bg-orange-500 text-white shadow-xl scale-110'
              : 'bg-white/90 text-gray-700 hover:bg-white hover:shadow-lg'
          }`}
        >
          <span className="text-lg">{format.icon}</span>
          {format.label}
        </button>
      ))}
    </div>
  );
}
