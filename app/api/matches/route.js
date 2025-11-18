import { NextResponse } from 'next/server';
import { query } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const limit = searchParams.get('limit') || 50;
    const offset = searchParams.get('offset') || 0;

    const result = await query(
      `SELECT m.*, 
              p1.name as player_name,
              bp.runs_scored, bp.balls_faced, bp.strike_rate
       FROM matches m
       LEFT JOIN batting_performances bp ON m.id = bp.match_id
       LEFT JOIN players p1 ON bp.player_id = p1.id
       ORDER BY m.match_date DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset]
    );

    return NextResponse.json({
      matches: result.rows,
      count: result.rowCount
    });
  } catch (error) {
    console.error('Error fetching matches:', error);
    return NextResponse.json(
      { error: 'Failed to fetch matches', details: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    
    // Insert match
    const matchResult = await query(
      `INSERT INTO matches (match_date, format, opponent, venue, city, country)
       VALUES ($1, $2, $3, $4, $5, $6)
       RETURNING id`,
      [body.match_date, body.format, body.opponent, body.venue, body.city, body.country]
    );

    const matchId = matchResult.rows[0].id;

    // Insert batting performance if provided
    if (body.batting) {
      await query(
        `INSERT INTO batting_performances 
         (player_id, match_id, runs_scored, balls_faced, fours, sixes, strike_rate)
         VALUES ($1, $2, $3, $4, $5, $6, $7)`,
        [
          body.batting.player_id,
          matchId,
          body.batting.runs_scored,
          body.batting.balls_faced,
          body.batting.fours,
          body.batting.sixes,
          body.batting.strike_rate
        ]
      );
    }

    return NextResponse.json({
      success: true,
      matchId: matchId
    });
  } catch (error) {
    console.error('Error creating match:', error);
    return NextResponse.json(
      { error: 'Failed to create match', details: error.message },
      { status: 500 }
    );
  }
}
