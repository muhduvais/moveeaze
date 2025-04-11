import { Toaster } from 'sonner';
import './App.css';
import Layout from './components/Layout';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { TabProvider } from './contexts/TabContext';

function App() {

  return (
    <Router>
      <TabProvider>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/search" replace />} />
            <Route path="search" element={<Search />} />
            <Route path="favorites" element={<Favorites />} />
          </Route>
        </Routes>
        <Toaster position="top-center" />
      </TabProvider>
    </Router>
  );
}

export default App;
