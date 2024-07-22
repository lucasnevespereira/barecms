import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/Home';
import SiteDetailsPage from '@/pages/sites/Detail';
import CollectionDetailsPage from '@/pages/collections/Detail';

function App() {
  return (
    <BrowserRouter>
      <div className='app p-5 text-foreground min-h-screen flex flex-col'>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/sites/:id" element={<SiteDetailsPage />} />
          <Route path="/collections/:id" element={<CollectionDetailsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
