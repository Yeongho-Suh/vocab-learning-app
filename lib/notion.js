// Notion API에서 단어 목록을 가져오는 모듈

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;
const NOTION_API_URL = `https://api.notion.com/v1/databases/${NOTION_DATABASE_ID}/query`;

/**
 * Notion 데이터베이스에서 모든 단어를 가져옵니다.
 * @returns {Promise<Array<{id: string, word: string, meaningKor: string, meaningEng: string, example: string}>>}
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
      headers: {
        'Authorization': `Bearer ${NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify(body),
      next: { revalidate: 0 },
    });

    if (!response.ok) {
      throw new Error(`Notion API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    for (const page of data.results) {
      const word = page.properties['Word']?.title?.[0]?.plain_text || '';
      const meaningKor = page.properties['Meaning (Kor)']?.rich_text?.[0]?.plain_text || '';
      const meaningEng = page.properties['Meaning (Eng)']?.rich_text?.[0]?.plain_text || '';
      const example = page.properties['Example']?.rich_text?.[0]?.plain_text || '';

      if (word) {
        allWords.push({
          id: page.id,
          word,
          meaningKor,
          meaningEng,
          example,
        });
      }
    }

    hasMore = data.has_more;
    startCursor = data.next_cursor;
  }

  return allWords;
}
