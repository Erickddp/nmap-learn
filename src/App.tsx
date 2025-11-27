import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { Learn } from './pages/Learn';
import { Practice } from './pages/Practice';
import { Exams } from './pages/Exams';
import { Achievements } from './pages/Achievements';
import { About } from './pages/About';

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/learn" element={<Learn />} />
          <Route path="/learn/:lessonId" element={<Learn />} />
          <Route path="/practice" element={<Practice />} />
          <Route path="/practice/:scenarioId" element={<Practice />} />
          <Route path="/exams" element={<Exams />} />
          <Route path="/exams/:quizId" element={<Exams />} />
          <Route path="/achievements" element={<Achievements />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;

