// Notion API 연결 테스트 스크립트
require('dotenv').config({ path: '.env.local' });
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_API_KEY });
const databaseId = process.env.NOTION_DATABASE_ID;

async function testConnection() {
  try {
    console.log('Notion API 연결 테스트 중...\n');

    // 데이터베이스 정보 확인
    const db = await notion.databases.retrieve({ database_id: databaseId });
    console.log(`✅ 데이터베이스 연결 성공: "${db.title?.[0]?.plain_text}"\n`);

    // 데이터 조회 (v5: REST API 직접 호출)
    const response = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_API_KEY}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({}),
    });

    const data = await response.json();
    console.log(`총 ${data.results.length}개의 단어를 찾았습니다.\n`);

    // 단어 샘플 출력
    if (data.results.length > 0) {
      console.log('--- 샘플 데이터 ---');
      data.results.forEach((page, index) => {
        const word = page.properties['Word']?.title?.[0]?.plain_text || '(없음)';
        const meaningKor = page.properties['Meaning (Kor)']?.rich_text?.[0]?.plain_text || '(없음)';
        const meaningEng = page.properties['Meaning (Eng)']?.rich_text?.[0]?.plain_text || '(없음)';
        const example = page.properties['Example']?.rich_text?.[0]?.plain_text || '(없음)';

        console.log(`\n[${index + 1}] ${word}`);
        console.log(`    한글 뜻: ${meaningKor}`);
        console.log(`    영어 뜻: ${meaningEng}`);
        console.log(`    예문: ${example}`);
      });
    }

  } catch (error) {
    console.error('❌ 연결 실패:', error.message);
  }
}

testConnection();
