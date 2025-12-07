import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FeedbackPage } from './pages/FeedbackPage';
import { LinkGenerator } from './components/admin/LinkGenerator';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 피드백 페이지 */}
        <Route path="/feedback" element={<FeedbackPage />} />

        {/* 상담사용 링크 생성 페이지 */}
        <Route path="/admin/generate" element={<LinkGenerator />} />

        {/* 기본 경로 - 링크 생성 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/admin/generate" replace />} />

        {/* 404 */}
        <Route path="*" element={<Navigate to="/admin/generate" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
