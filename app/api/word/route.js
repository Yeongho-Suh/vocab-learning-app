// GET /api/word - 오늘의 단어 가져오기
import { getTodayWord, getStatus } from '../../../lib/wordManager.js';

export async function GET() {
  try {
    const word = await getTodayWord();
    const status = await getStatus();

    return Response.json({
      success: true,
      word,
      status: {
        totalWords: status.totalWords,
        shownCount: status.shownCount,
        remainingCount: status.remainingCount,
        lastUpdated: status.lastUpdated,
      },
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
