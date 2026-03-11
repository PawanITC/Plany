import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Track from './pages/Track';
import Logs from './pages/Logs';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/admin/listings" />} />
        <Route path="/admin" element={<Layout />}>
          <Route path="listings" element={<Dashboard />} />
          <Route path="listings/track" element={<Track />} />
          <Route path="listings/logs" element={<Logs />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
