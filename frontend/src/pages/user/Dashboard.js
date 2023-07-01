import React, { useContext, useEffect, useState } from 'react';
import Navbar from '../../components/Navbar.js';
import { AuthContext } from '../../context/AuthContext.js';
import CreatedQuizzes from '../../components/CreatedQuizzes.js';
import TakenQuizzes from '../../components/TakenQuizzes.js';

function Dashboard() {
  const [active, setActive] = useState(1);
  const { activeUsername } = useContext(AuthContext);

  useEffect(() => {
    console.log('Active User name: ', activeUsername);
  });

  return (
    <>
      <Navbar />
      <div className='dashboard-navigate'>
        <div
          className={`dashboard-navigate-element ${active === 1 ? 'active' : ''}`}
          onClick={() => setActive(1)}
        >
          Created Quizzes
        </div>
        <div
          className={`dashboard-navigate-element ${active === 2 ? 'active' : ''}`}
          onClick={() => setActive(2)}
        >
          Taken Quizzes
        </div>
      </div>
      {active === 1 ? <CreatedQuizzes username={activeUsername} /> : <TakenQuizzes />}
    </>
  );
}

export default Dashboard;
