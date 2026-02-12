import { useCallback, useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Route, Routes, useLocation } from 'react-router-dom';
import PortfolioPage from './pages/PortfolioPage';
import Dashboard from './pages/Dashboard';
import {
  clonePortfolioData,
  createEmptyPortfolioData,
  normalizePortfolioData,
} from './utils/portfolioData';
import {
  getPortfolio,
  getPortfolioSlug,
  updatePortfolio,
} from './utils/portfolioApi';

function ScrollToHash() {
  const location = useLocation();

  useEffect(() => {
    if (!location.hash) {
      return;
    }

    const targetId = location.hash.replace('#', '');
    const timer = setTimeout(() => {
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 0);

    return () => clearTimeout(timer);
  }, [location.hash, location.pathname]);

  return null;
}

function App() {
  const [portfolioData, setPortfolioData] = useState(createEmptyPortfolioData);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  const portfolioSlug = getPortfolioSlug();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: 'ease-out-cubic',
      once: false,
    });
  }, []);

  useEffect(() => {
    let isCancelled = false;

    const loadPortfolio = async () => {
      setIsLoading(true);
      setLoadError('');

      try {
        const loadedData = await getPortfolio(portfolioSlug);
        if (isCancelled) {
          return;
        }
        setPortfolioData(clonePortfolioData(loadedData));
      } catch (error) {
        if (isCancelled) {
          return;
        }
        const message =
          error instanceof Error
            ? error.message
            : 'Failed to load portfolio data from database.';
        setLoadError(message);
      } finally {
        if (!isCancelled) {
          setIsLoading(false);
        }
      }
    };

    loadPortfolio();

    return () => {
      isCancelled = true;
    };
  }, [portfolioSlug]);

  const handleSaveData = useCallback(async (nextData, section) => {
    const normalizedDraft = normalizePortfolioData(nextData);
    const savedData = await updatePortfolio(normalizedDraft, portfolioSlug, section);
    const clonedData = clonePortfolioData(savedData);
    setPortfolioData(clonedData);
    return clonedData;
  }, [portfolioSlug]);

  return (
    <>
      <ScrollToHash />
      <Routes>
        <Route
          path="/"
          element={
            <PortfolioPage
              data={portfolioData}
              isLoading={isLoading}
              loadError={loadError}
            />
          }
        />
        <Route
          path="/dashboard"
          element={
            <Dashboard
              data={portfolioData}
              onSave={handleSaveData}
              isLoading={isLoading}
              loadError={loadError}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
