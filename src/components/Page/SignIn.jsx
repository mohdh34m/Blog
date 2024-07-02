import React, { useState } from 'react';
import supabase from '../../config/supabaseClient';
import { useNavigate, Link } from 'react-router-dom';

function Signin() {
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [loginData, setLoginData] = useState({
    email:"",
    password:""
  })

  function handleLogin(event){
    setLoginData((prevLoginData)=>{
      return{
        ...prevLoginData,
        [event.target.name]:event.target.value
      }

    })
  }

  async function signInWithEmail(e) {
    e.preventDefault()
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginData.email,
      password: loginData.password,
    })

    if(data) {
      navigate('/')
      console.log(data)
    }

    if (error) {
      setError('Failed to sign in. Please try again.');
    }
  }
  console.log(loginData)
  return (
    <div className="signin-container">
      <form onSubmit={signInWithEmail} className="signin-form">
        <input
          className="signin-input"
          placeholder='Email'
          name='email'
          value={loginData.email}
          onChange={handleLogin}
          required
        />
        <input
          className="signin-input"
          placeholder='Password'
          name='password'
          type="password"
          value={loginData.password}
          onChange={handleLogin}
          required
        />
        <button type='submit' className="signin-button">
          Submit
        </button>
      </form>
      {error && <p className="signin-error">{error}</p>}
      <h3 className="signin-text">
        Don't have an account? <Link to="/register" className="signin-link">Sign up</Link>
      </h3>
    </div>
  );
}

export default Signin;
