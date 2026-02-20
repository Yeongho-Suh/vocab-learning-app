'use client';

import { useState, useEffect } from 'react';
import './globals.css';

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
            <p className="example-text">{word.example}</p>
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
