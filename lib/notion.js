// Notion API에서 단어 목록을 가져오고 상태를 관리하는 모듈

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_URL = `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`;

const HEADERS = {
  'Authorization': `Bearer ${NOTION_API_KEY}`,
  'Content-Type': 'application/json',
  'Notion-Version': '2022-06-28',
};

/**
 * Notion 데이터베이스에 ShownDate 속성이 없으면 추가합니다.
 */
export async function ensureShownDateProperty() {
  const response = await fetch(
    `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`,
    { method: 'GET', headers: HEADERS }
  );

  if (!response.ok) {
    throw new Error(`Notion API error: ${response.status}`);
  }

  const db = await response.json();

  if (!db.properties['ShownDate']) {
    await fetch(`https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}`, {
      method: 'PATCH',
      headers: HEADERS,
      body: JSON.stringify({
        properties: {
          ShownDate: { date: {} },
        },
      }),
    });
  }
}

/**
 * Notion 데이터베이스에서 모든 단어를 가져옵니다 (ShownDate 포함).
 */
export async function getAllWords() {
  const allWords = [];
  let hasMore = true;
  let startCursor = undefined;

  while (hasMore) {
    const body = {};
    if (startCursor) {
      body.start_cursor = startCursor;
    }

    const response = await fetch(NOTION_API_URL, {
      method: 'POST',
      headers: HEADERS,
      body: JSON.stringify(body),
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    for (const page of data.results) {
      const word = (page.properties['Word']?.title || []).map(t => t.plain_text).join('');
      const meaningKor = (page.properties['Meaning (Kor)']?.rich_text || []).map(t => t.plain_text).join('');
      const meaningEng = (page.properties['Meaning (Eng)']?.rich_text || []).map(t => t.plain_text).join('');
      const example = (page.properties['Example']?.rich_text || []).map(t => t.plain_text).join('');
      const shownDate = page.properties['ShownDate']?.date?.start || null;

      if (word) {
        allWords.push({
          id: page.id,
          word,
          meaningKor,
          meaningEng,
          example,
          shownDate,
        });
      }
    }

    hasMore = data.has_more;
    startCursor = data.next_cursor;
  }

  return allWords;
}

/**
 * 특정 단어의 ShownDate를 업데이트합니다.
 */
export async function updateShownDate(pageId, dateString) {
  const response = await fetch(`https://api.notion.com/v1/pages/${pageId}`, {
    method: 'PATCH',
    headers: HEADERS,
    body: JSON.stringify({
      properties: {
        ShownDate: {
          date: dateString ? { start: dateString } : null,
        },
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update ShownDate: ${response.status}`);
  }
}

/**
 * 모든 단어의 ShownDate를 초기화합니다 (새 사이클 시작).
 */
export async function clearAllShownDates(words) {
  const promises = words.map((w) => updateShownDate(w.id, null));
  await Promise.all(promises);
}
