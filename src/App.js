import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import Footer from './components/layout/Footer';
import Alert from './components/layout/Alert';

import Navbar from './components/layout/Navbar';
import { GithubProvider } from './context/github/GithubContext'
import {AlertProvider} from './context/alert/AlertContext'

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
      <Router>

        <div className='flex flex-col justify-between h-screen'>
          <Navbar />
          <main className='container mx-auto px-3 pb-12'>
            <Alert/>
            <Routes>
              <Route path="/" element={<Home></Home>}></Route>
              <Route path="/notfound" element={<NotFound></NotFound>}></Route>
              <Route path="/*" element={<NotFound></NotFound>}></Route>
              <Route path="/about" element={<About></About>}></Route>
            </Routes>
          </main>
          <Footer></Footer>
        </div>
      </Router>
      </AlertProvider>
    </GithubProvider>

  );
}

export default App;
