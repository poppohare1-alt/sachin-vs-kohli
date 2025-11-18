import { NextResponse } from 'next/server';
import { getPlayerByName, getPlayerCareerStats, getYearWiseStats } from '@/lib/db';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const format = searchParams.get('format') || null;

    const sachin = await getPlayerByName('Sachin Tendulkar');
    const kohli = await getPlayerByName('Virat Kohli');

    if (!sachin || !kohli) {
      return NextResponse.json(
        { error: 'Players not found in database' },
        { status: 404 }
      );
    }

    const [sachinStats, kohliStats] = await Promise.all([
      getPlayerCareerStats(sachin.id, format === 'all' ? null : format?.toUpperCase()),
      getPlayerCareerStats(kohli.id, format === 'all' ? null : format?.toUpperCase())
    ]);

    const [sachinYears, kohliYears] = await Promise.all([
      getYearWiseStats(sachin.id),
      getYearWiseStats(kohli.id)
    ]);

    const response = {
      sachin: {
        player: sachin,
        batting: sachinStats.batting,
        bowling: sachinStats.bowling,
        yearWise: sachinYears
      },
      kohli: {
        player: kohli,
        batting: kohliStats.batting,
        bowling: kohliStats.bowling,
        yearWise: kohliYears
      },
      format: format || 'all',
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch statistics', details: error.message },
      { status: 500 }
    );
  }
}

export const revalidate = 3600;
