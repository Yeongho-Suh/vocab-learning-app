// POST /api/refresh - 새로운 단어 선택 (스케줄러 또는 수동 호출)
import { selectNewWord } from '../../../lib/wordManager.js';

export async function POST(request) {
  try {
    // 간단한 인증 (선택사항: 환경변수로 비밀키 설정 가능)
    const authHeader = request.headers.get('authorization');
    const secret = process.env.REFRESH_SECRET;

    if (secret && authHeader !== `Bearer ${secret}`) {
      return Response.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const word = await selectNewWord();

    return Response.json({
      success: true,
      message: '새로운 단어가 선택되었습니다.',
      word,
    });
  } catch (error) {
    return Response.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
