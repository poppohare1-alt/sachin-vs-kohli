export default function OpponentStats({ format }) {
  return (
    <div className="bg-white rounded-2xl shadow-2xl p-6">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
        Stats Against Opponents
      </h3>
      <p className="text-gray-600">
        Opponent-wise statistics will be populated from database.
        {format !== 'all' && ` Showing ${format.toUpperCase()} matches only.`}
      </p>
      <div className="mt-4 text-sm text-gray-500">
        This section will display performance against:
        <ul className="list-disc list-inside mt-2">
          <li>Australia</li>
          <li>England</li>
          <li>Pakistan</li>
          <li>South Africa</li>
          <li>And more...</li>
        </ul>
      </div>
    </div>
  );
}
