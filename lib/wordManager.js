// 단어 랜덤 선택 및 노출 이력 관리 모듈 (Notion 기반)
import {
  getAllWords,
  updateShownDate,
  clearAllShownDates,
  ensureShownDateProperty,
} from './notion.js';

/**
 * KST 오전 6시 기준으로 "논리적 날짜"를 반환합니다.
 * 오전 6시 이전이면 전날로 취급합니다.
 */
function getKSTLogicalDate(date = new Date()) {
  const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
  if (kst.getUTCHours() < 6) {
    kst.setUTCDate(kst.getUTCDate() - 1);
  }
  const y = kst.getUTCFullYear();
  const m = String(kst.getUTCMonth() + 1).padStart(2, '0');
  const d = String(kst.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

/**
 * 오늘의 단어를 가져옵니다.
 * - ShownDate가 오늘인 단어가 있으면 그대로 반환
 * - 없으면 새로운 단어를 랜덤 선택
 */
export async function getTodayWord() {
  await ensureShownDateProperty();

  const allWords = await getAllWords();
  const today = getKSTLogicalDate();

  // 오늘 이미 선택된 단어 확인
  const todayWord = allWords.find((w) => w.shownDate === today);
  if (todayWord) {
    return todayWord;
  }

  // 새로운 단어 선택
  return await selectNewWord(allWords, today);
}

/**
 * 새로운 단어를 랜덤으로 선택합니다.
 */
export async function selectNewWord(allWords, today) {
  if (!allWords) {
    await ensureShownDateProperty();
    allWords = await getAllWords();
  }
  if (!today) {
    today = getKSTLogicalDate();
  }

  if (allWords.length === 0) {
    throw new Error('Notion 데이터베이스에 단어가 없습니다.');
  }

  // ShownDate가 없는 단어 = 아직 보여주지 않은 단어
  let availableWords = allWords.filter((w) => !w.shownDate);

  // 모든 단어를 다 보여줬으면 이력 초기화
  if (availableWords.length === 0) {
    await clearAllShownDates(allWords);
    availableWords = allWords.map((w) => ({ ...w, shownDate: null }));
  }

  // 랜덤 선택
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const selectedWord = availableWords[randomIndex];

  // Notion에 ShownDate 업데이트
  await updateShownDate(selectedWord.id, today);
  selectedWord.shownDate = today;

  return selectedWord;
}

/**
 * 현재 상태 정보를 반환합니다.
 */
export async function getStatus(allWords) {
  if (!allWords) {
    allWords = await getAllWords();
  }

  const shownCount = allWords.filter((w) => w.shownDate).length;

  return {
    totalWords: allWords.length,
    shownCount,
    remainingCount: allWords.length - shownCount,
  };
}
