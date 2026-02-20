// 단어 랜덤 선택 및 노출 이력 관리 모듈
import { promises as fs } from 'fs';
import path from 'path';
import { getAllWords } from './notion.js';

const DATA_FILE = path.join(process.cwd(), 'data', 'word-state.json');

/**
 * 현재 상태를 파일에서 읽어옵니다.
 */
async function loadState() {
  try {
    const data = await fs.readFile(DATA_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return {
      currentWord: null,
      shownWordIds: [],
      lastUpdated: null,
    };
  }
}

/**
 * 상태를 파일에 저장합니다.
 */
async function saveState(state) {
  const dir = path.dirname(DATA_FILE);
  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(DATA_FILE, JSON.stringify(state, null, 2), 'utf-8');
}

/**
 * 오늘의 단어가 이미 선택되었는지 확인합니다.
 * 매일 오전 6시(KST) 기준으로 날짜를 비교합니다.
 */
function isSameDay(lastUpdated) {
  if (!lastUpdated) return false;

  const now = new Date();
  const last = new Date(lastUpdated);

  // KST (UTC+9) 기준으로 오전 6시를 경계로 날짜 구분
  const getKSTDay = (date) => {
    const kst = new Date(date.getTime() + 9 * 60 * 60 * 1000);
    // 오전 6시 이전이면 전날로 취급
    if (kst.getUTCHours() < 6) {
      kst.setUTCDate(kst.getUTCDate() - 1);
    }
    return `${kst.getUTCFullYear()}-${kst.getUTCMonth()}-${kst.getUTCDate()}`;
  };

  return getKSTDay(now) === getKSTDay(last);
}

/**
 * 오늘의 단어를 가져옵니다.
 * - 이미 오늘 선택된 단어가 있으면 그대로 반환
 * - 없으면 새로운 단어를 랜덤 선택
 */
export async function getTodayWord() {
  const state = await loadState();

  // 오늘 이미 단어가 선택되었으면 그대로 반환
  if (state.currentWord && isSameDay(state.lastUpdated)) {
    return state.currentWord;
  }

  // 새로운 단어 선택
  return await selectNewWord();
}

/**
 * 새로운 단어를 랜덤으로 선택합니다.
 * - 아직 보여주지 않은 단어 중에서 선택
 * - 모든 단어를 다 보여줬으면 이력 초기화
 */
export async function selectNewWord() {
  const state = await loadState();
  const allWords = await getAllWords();

  if (allWords.length === 0) {
    throw new Error('Notion 데이터베이스에 단어가 없습니다.');
  }

  // 아직 보여주지 않은 단어 필터링
  let availableWords = allWords.filter(
    (w) => !state.shownWordIds.includes(w.id)
  );

  // 모든 단어를 다 보여줬으면 이력 초기화
  if (availableWords.length === 0) {
    state.shownWordIds = [];
    availableWords = allWords;
  }

  // 랜덤 선택
  const randomIndex = Math.floor(Math.random() * availableWords.length);
  const selectedWord = availableWords[randomIndex];

  // 상태 업데이트 및 저장
  state.currentWord = selectedWord;
  state.shownWordIds.push(selectedWord.id);
  state.lastUpdated = new Date().toISOString();

  await saveState(state);

  return selectedWord;
}

/**
 * 현재 상태 정보를 반환합니다.
 */
export async function getStatus() {
  const state = await loadState();
  const allWords = await getAllWords();

  return {
    totalWords: allWords.length,
    shownCount: state.shownWordIds.length,
    remainingCount: allWords.length - state.shownWordIds.length,
    lastUpdated: state.lastUpdated,
  };
}
