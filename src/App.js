// import './App.css';
import Nav from './components/Nav'
import './App.css'
import Footer from './components/Footer';
import { Outlet, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import DetailPage from './pages/DetailPage';
import SearchPage from './pages/SearchPage';

const Layout = () => {
  return (
    <div>
      <Nav />

      <Outlet />

      <Footer />   
    </div>
  )
}

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Layout/>}> {/* 레이아웃 = 화면구성 */}
          <Route index element={<MainPage/>} /> {/* 초기화면 */}
          <Route path=":movieId" element={<DetailPage/>} />
          <Route path="search" element={<SearchPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
