import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FeedbackPage } from './pages/FeedbackPage';
import { LinkGenerator } from './components/admin/LinkGenerator';

function App() {
  const basename = import.meta.env.BASE_URL.replace(//$/, '') || '';
  
  return (
    <BrowserRouter basename={basename}>
      <Routes>
        {/* 피드백 페이지 */}
        <Route path="/feedback" element={<FeedbackPage />} />

        {/* 상담사용 링크 생성 페이지 */}
        <Route path="/admin/generate" element={<LinkGenerator />} />

        {/* 기본 경로 - 링크 생성 페이지로 리다이렉트 */}
        <Route path="/" element={<Navigate to="/admin/generate" replace />} />

        {/* 404 - 피드백 경로가 아닌 경우에만 리다이렉트 */}
        <Route path="*" element={<Navigate to="/admin/generate" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
