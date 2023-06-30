import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login.js';
import Dashboard from './pages/user/Dashboard.js';
import CreateQuiz from './pages/user/CreateQuiz.js';
import TakeQuiz from './pages/user/TakeQuiz.js';
import SearchQuiz from './pages/user/SearchQuiz.js';
import { useState } from 'react';
import { AuthContext } from './context/AuthContext.js';
import ViewQuiz from './pages/user/ViewQuiz.js';

function App() {
  const [activeUsername, setActiveUsername] = useState(null);
  const [activeUserId, setActiveUserId] = useState(null);
  return (
    <>
      <BrowserRouter>
        <AuthContext.Provider value={{ activeUsername, setActiveUsername, activeUserId, setActiveUserId }}>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/createquiz' element={<CreateQuiz />} />
            <Route path='/takequiz' element={<TakeQuiz />} />
            <Route path='/searchquiz' element={<SearchQuiz />} />
            <Route path='/viewquiz/:quizid' element={<ViewQuiz/>}/>
          </Routes>
        </AuthContext.Provider>
      </BrowserRouter>
    </>
  );
}

export default App;
