// GET /api/word - 오늘의 단어 가져오기
import { getAllWords } from '../../../lib/notion.js';
import { getTodayWord, getStatus } from '../../../lib/wordManager.js';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const word = await getTodayWord();
    const allWords = await getAllWords();
    const status = await getStatus(allWords);

    return Response.json({
      success: true,
      word,
      status,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
