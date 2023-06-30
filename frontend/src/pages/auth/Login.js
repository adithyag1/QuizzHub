import React from 'react'
import '../../App.css';

function Login() {
  return (
    <div className='background-login-register'>
        <div className='welcome-statement'>
            Welcome to <div  className='quizzhub-title'>QuizzHub</div>
        </div>
        <div className='login-form'>
        <div className='login-header'>Login</div>
        <input type='text' className='text-box-plain' placeholder='Username'/>
            <input type='text' className='text-box-plain' placeholder='Password'/>
        <button className='login-button'>Login</button>
        <div className='login-footer-statement'>Don't have account? <a href='/register' className='login-footer-statement-register' >Register</a></div>

      </div>
        {/* <div className='login-form'>
            <div className='login-header'>Login</div>
            <input type='text' className='text-box-plain' placeholder='Username'/>
            <input type='text' className='text-box-plain' placeholder='Password'/>
            <button className='login-button'>Login</button>
            <div className='login-footer-statement'>Don't have account? <a href='/register' className='login-footer-statement-register' >Register</a></div>
        </div> */}
    </div>
  )
}

export default Login