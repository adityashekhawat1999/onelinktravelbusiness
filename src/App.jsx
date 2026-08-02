import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import OneLinkTravel from './pages/OneLinkTravel';
import CBEST from './pages/CBEST';
import Header from './components/Header';
import Footer from './components/Footer';
import LanguageSelector from './components/LanguageSelector';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col font-worksans relative">
          <Header />
          <LanguageSelector />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/onelinktravel" element={<OneLinkTravel />} />
              <Route path="/cbest" element={<CBEST />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
