'use client';

import { useState, useEffect } from 'react';
import './globals.css';

/**
 * 단어의 어근(stem)을 추출하여 예문에서 매칭되는 부분을 빨간색으로 하이라이트합니다.
 * 예: "denounce" → "denouncing", "let off steam" → "letting off steam"
 */
function highlightWordInExample(wordText, exampleText) {
  if (!wordText || !exampleText) return exampleText;

  // 단어를 개별 단어로 분리하고, 3글자 이하 단어(of, a, the 등)는 제외
  const words = wordText.trim().split(/\s+/).filter((w) => w.length > 3);

  // 각 단어의 어근을 추출 (trailing 'e' 제거로 denounce→denounc 등 처리)
  const stems = words.map((w) => {
    const clean = w.replace(/[^a-zA-Z]/g, '').toLowerCase();
    const stem = clean
      .replace(/(ing|ed|es|er|est|ly|tion|sion|ment|ness|ful|less|ous|ive|able|ible)$/i, '')
      .replace(/e$/, '');
    return stem.length >= 3 ? stem : clean.slice(0, Math.min(4, clean.length));
  });

  // 어근이 없으면 원본 텍스트 그대로 반환
  if (stems.length === 0) return exampleText;

  // 어근 기반 정규식: 캡처 그룹으로 감싸서 split 시 매칭 부분도 배열에 포함
  const patternStr = stems
    .map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + '[a-zA-Z]*')
    .join('|');
  const regex = new RegExp(`(\\b(?:${patternStr}))`, 'gi');

  const parts = exampleText.split(regex);

  return parts.map((part, i) => {
    // 각 part가 어근과 매칭되는지 확인
    const isMatch = stems.some((stem) =>
      part.toLowerCase().startsWith(stem.toLowerCase())
    );
    if (isMatch) {
      return <span key={i} className="highlight">{part}</span>;
    }
    return part;
  });
}

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [nextUpdate, setNextUpdate] = useState('');

  const fetchWord = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/word');
      const json = await res.json();
      if (json.success) {
        setData(json);
      } else {
        setError(json.error || '단어를 불러올 수 없습니다.');
      }
    } catch (err) {
      setError('서버에 연결할 수 없습니다.');
    } finally {
      setLoading(false);
    }
  };

  // 다음 갱신 시간 계산 (KST 오전 6시)
  const updateNextRefreshTime = () => {
    const now = new Date();
    const kstOffset = 9 * 60 * 60 * 1000;
    const kstNow = new Date(now.getTime() + kstOffset);

    const next6AM = new Date(kstNow);
    next6AM.setUTCHours(6, 0, 0, 0);

    // 이미 오전 6시가 지났으면 내일 오전 6시
    if (kstNow.getUTCHours() >= 6) {
      next6AM.setUTCDate(next6AM.getUTCDate() + 1);
    }

    // UTC로 변환
    const nextUTC = new Date(next6AM.getTime() - kstOffset);
    const diff = nextUTC - now;

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    setNextUpdate(`다음 단어까지 ${hours}시간 ${minutes}분`);
  };

  useEffect(() => {
    fetchWord();
    updateNextRefreshTime();
    const timer = setInterval(updateNextRefreshTime, 60000);
    return () => clearInterval(timer);
  }, []);

  if (loading) {
    return (
      <div className="container">
        <div className="loading">
          <div className="loading-spinner"></div>
          <p className="loading-text">단어를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container">
        <div className="error">
          <p className="error-message">{error}</p>
          <button className="retry-button" onClick={fetchWord}>
            다시 시도
          </button>
        </div>
      </div>
    );
  }

  const { word, status } = data;

  return (
    <div className="container">
      <div className="header">
        <h1>Daily English Word</h1>
      </div>

      <div className="card">
        <div className="word-section">
          <h2 className="word">{word.word}</h2>
        </div>

        <div className="meaning-section">
          <div className="meaning-item">
            <span className="meaning-label">Korean</span>
            <span className="meaning-kor">{word.meaningKor}</span>
          </div>

          {word.meaningEng && (
            <div className="meaning-item">
              <span className="meaning-label">English</span>
              <span className="meaning-eng">{word.meaningEng}</span>
            </div>
          )}
        </div>

        {word.example && (
          <div className="example-section">
            <div className="example-label">Example</div>
            <p className="example-text">{highlightWordInExample(word.word, word.example)}</p>
          </div>
        )}
      </div>

      <div className="status-bar">
        <div className="status-item">
          <span className="status-label">전체</span>
          <span className="status-value">{status.totalWords}</span>
        </div>
        <div className="status-item">
          <span className="status-label">학습</span>
          <span className="status-value">{status.shownCount}</span>
        </div>
        <div className="status-item">
          <span className="status-label">남은</span>
          <span className="status-value">{status.remainingCount}</span>
        </div>
      </div>

      <p className="next-update">{nextUpdate}</p>
    </div>
  );
}
