import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/auth/Login.js';
import Dashboard from './pages/user/Dashboard.js';
import CreateQuiz from './pages/user/CreateQuiz.js';

function App() {
  return (
    <>
    <BrowserRouter>
      <Routes>
        <Route path= '/' element={<Login/>}/>
        <Route path= '/dashboard' element={<Dashboard/>}/>
        <Route path= '/createquiz' element={<CreateQuiz/>}/>
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
