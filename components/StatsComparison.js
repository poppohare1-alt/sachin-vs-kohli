import { Trophy, TrendingUp } from 'lucide-react';

export default function StatsComparison({ stats, format }) {
  if (!stats) return null;

  const { sachin, kohli } = stats;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <PlayerCard
        name="Sachin Tendulkar"
        nickname="The Master Blaster"
        period="1989 - 2013"
        color="blue"
        stats={sachin}
        format={format}
      />

      <PlayerCard
        name="Virat Kohli"
        nickname="The Chase Master"
        period="2008 - Present"
        color="orange"
        stats={kohli}
        format={format}
      />
    </div>
  );
}

function PlayerCard({ name, nickname, period, color, stats }) {
  const isBlue = color === 'blue';
  const gradientClass = isBlue
    ? 'from-blue-600 to-blue-700'
    : 'from-orange-500 to-orange-600';
  const borderClass = isBlue ? 'border-blue-600' : 'border-orange-600';

  const battingStats = stats?.batting || {};

  return (
    <div className={`bg-white rounded-2xl shadow-2xl overflow-hidden border-t-4 ${borderClass}`}>
      <div className={`bg-gradient-to-r ${gradientClass} p-6 text-white`}>
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-3xl font-bold">{name}</h2>
            <p className="text-sm opacity-90 mt-1">{nickname}</p>
            <p className="text-xs opacity-75 mt-1">{period}</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-2">
        <StatRow label="Matches" value={battingStats.matches || 0} />
        <StatRow label="Runs" value={(battingStats.total_runs || 0).toLocaleString()} highlight />
        <StatRow label="Average" value={(battingStats.average_runs || 0).toFixed(2)} />
        <StatRow label="Centuries" value={battingStats.centuries || 0} highlight />
        <StatRow label="Fifties" value={battingStats.fifties || 0} />
      </div>
    </div>
  );
}

function StatRow({ label, value, highlight }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-gray-100">
      <span className="text-gray-600 font-medium text-sm">{label}</span>
      <span className={`font-bold ${highlight ? 'text-lg text-blue-700' : 'text-gray-800'}`}>
        {value}
      </span>
    </div>
  );
}
