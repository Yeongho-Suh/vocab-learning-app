export const metadata = {
  title: 'Daily English Word',
  description: '매일 새로운 영어 단어를 학습하세요',
  viewport: 'width=device-width, initial-scale=1',
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
