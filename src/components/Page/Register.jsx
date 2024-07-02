import React, { useState } from 'react';
import supabase from '../../config/supabaseClient';
import { Link, useNavigate } from 'react-router-dom';

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    userName: '',
    email: '',
    password: ''
  });
  const [error, setError] = useState(null);

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.userName,
          }
        }
      });

      if (error) {
        throw error;
      } else {
        alert('Check your email for verification link');
        navigate('/signin');
      }
    } catch (error) {
      console.error('Sign up error:', error.message);
      setError(error.message);
    }
  }

  return (
    <div className='form-container'>
      <form onSubmit={handleSubmit}>
        <input
          className="register-input"
          placeholder='Username'
          name='userName'
          value={formData.userName}
          onChange={handleChange}
          required
        />

        <input
          className="register-input"
          placeholder='Email'
          name='email'
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          className="register-input"
          placeholder='Password'
          name='password'
          type="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type='submit' className="register-button">
          Submit
        </button>
      </form>
      {error && <p className="register-error">{error}</p>}
      <h3>Already a User? <Link to="/signin" className="register-link">Log In</Link></h3>
    </div>
  );
}

export default Register;
