import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import Article from './pages/Article';
import NavBar from './componnents/NavBar';
import SignIn from './pages/Signin';


function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/account" element={<Account />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/article/:article_id" element={<Article />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </div>

  )
}

export default App
