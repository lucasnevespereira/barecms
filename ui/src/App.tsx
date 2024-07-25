import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer'
import Header from './components/Header'
import HomePage from './pages/Home';
import SiteDetailsPage from '@/pages/sites/Detail';
import CollectionDetailsPage from '@/pages/collections/Detail';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import PrivateRoute from './middlewares/PrivateRoute';
import Profile from './pages/Profile';

function App() {
  return (
    <BrowserRouter>
      <div className='app p-5 text-foreground min-h-screen flex flex-col'>
        <Header />
        <main className='flex-1'>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/sites/:id" element={<SiteDetailsPage />} />
            <Route path="/sites/:siteId/collections/:id" element={<CollectionDetailsPage />} />
            <Route element={<PrivateRoute />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/sites/:id" element={<SiteDetailsPage />} />
              <Route path="/sites/:siteId/collections/:id" element={<CollectionDetailsPage />} />
            </Route>
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  )
}

export default App
