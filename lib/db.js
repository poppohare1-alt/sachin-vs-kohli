import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
  console.error('❌ Database connection error:', err);
});

export async function query(text, params) {
  const start = Date.now();
  try {
    const res = await pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text, duration, rows: res.rowCount });
    return res;
  } catch (error) {
    console.error('Database query error:', error);
    throw error;
  }
}

export async function getPlayerByName(name) {
  const result = await query(
    'SELECT * FROM players WHERE name ILIKE $1',
    [name]
  );
  return result.rows[0];
}

export async function getPlayerCareerStats(playerId, format = null) {
  let formatCondition = '';
  const params = [playerId];
  
  if (format) {
    formatCondition = 'AND m.format = $2';
    params.push(format);
  }

  const battingQuery = `
    SELECT 
      COUNT(DISTINCT bp.match_id) as matches,
      COUNT(bp.id) as innings,
      SUM(bp.runs_scored) as total_runs,
      AVG(bp.runs_scored) as average_runs,
      MAX(bp.runs_scored) as highest_score,
      SUM(bp.balls_faced) as total_balls,
      SUM(bp.fours) as total_fours,
      SUM(bp.sixes) as total_sixes,
      COUNT(CASE WHEN bp.runs_scored >= 100 THEN 1 END) as centuries,
      COUNT(CASE WHEN bp.runs_scored >= 50 AND bp.runs_scored < 100 THEN 1 END) as fifties,
      AVG(bp.strike_rate) as avg_strike_rate
    FROM batting_performances bp
    JOIN matches m ON bp.match_id = m.id
    WHERE bp.player_id = $1 ${formatCondition}
  `;

  const bowlingQuery = `
    SELECT 
      SUM(bp.overs) as total_overs,
      SUM(bp.wickets) as total_wickets,
      SUM(bp.runs_conceded) as total_runs_conceded,
      AVG(bp.economy) as avg_economy
    FROM bowling_performances bp
    JOIN matches m ON bp.match_id = m.id
    WHERE bp.player_id = $1 ${formatCondition}
  `;

  const [batting, bowling] = await Promise.all([
    query(battingQuery, params),
    query(bowlingQuery, params)
  ]);

  return {
    batting: batting.rows[0],
    bowling: bowling.rows[0]
  };
}

export async function getYearWiseStats(playerId) {
  const yearQuery = `
    SELECT 
      EXTRACT(YEAR FROM m.match_date) as year,
      COUNT(DISTINCT bp.match_id) as matches,
      SUM(bp.runs_scored) as total_runs,
      AVG(bp.runs_scored) as avg_runs,
      COUNT(CASE WHEN bp.runs_scored >= 100 THEN 1 END) as centuries
    FROM batting_performances bp
    JOIN matches m ON bp.match_id = m.id
    WHERE bp.player_id = $1
    GROUP BY year
    ORDER BY year
  `;

  const result = await query(yearQuery, [playerId]);
  return result.rows;
}

export default pool;
