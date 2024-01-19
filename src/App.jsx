import './App.css'
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Account from './pages/Account';
import LogIn from './pages/LogIn';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import Article from './pages/Article';

function App() {

  return (
    <div>
      <Routes>
        <Route path="/home" element={<Home/>}/>
        <Route path="/account" element={<Account/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/login" element={<LogIn/>}/>
        <Route path="/article" element={<Article/>}/>
        <Route path="/notfound" element={<NotFound/>}/>
      </Routes>
    </div>
  )
}

export default App
