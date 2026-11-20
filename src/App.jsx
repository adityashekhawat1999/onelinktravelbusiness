import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OneLinkTravel from './pages/OneLinkTravel';
import CBEST from './pages/CBEST';
import NotFound from './pages/NotFound';
import ServerError from './pages/ServerError';
import Forbidden from './pages/Forbidden';
import ServiceUnavailable from './pages/ServiceUnavailable';
import ErrorPage from './pages/ErrorPage';
import Header from './components/Header';
import Footer from './components/Footer';
import LanguageSelector from './components/LanguageSelector';
import WhatsAppButton from './components/WhatsAppButton';
import ErrorBoundary from './components/ErrorBoundary';
import { LanguageProvider } from './context/LanguageContext';

// Helper component for testing ErrorBoundary crash handling
const ErrorTrigger = () => {
  throw new Error('Simulation: Test error to verify ErrorBoundary and 500 page rendering.');
};

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-worksans relative">
          <Header />
          <LanguageSelector />
          <main className="flex-grow">
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/onelinktravel" element={<OneLinkTravel />} />
                <Route path="/cbest" element={<CBEST />} />

                {/* Explicit error routes */}
                <Route path="/404" element={<NotFound />} />
                <Route path="/500" element={<ServerError />} />
                <Route path="/403" element={<Forbidden />} />
                <Route path="/503" element={<ServiceUnavailable />} />
                <Route path="/error/:code" element={<ErrorPage />} />

                {/* Developer / QA simulation route */}
                <Route path="/test-500-crash" element={<ErrorTrigger />} />

                {/* Catch-all route for any unmapped paths */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </main>
          <Footer />
          <WhatsAppButton />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
