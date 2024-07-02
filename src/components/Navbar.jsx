import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import supabase from '../config/supabaseClient';

function Navbar() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState('')

  useEffect(() => {
    async function getUser() {
      try {
        const { data, error } = await supabase.auth.getSession();

        if (error) throw error;
        
        if (data && data.session && data.session.user) {
          setUser(data.session.user);
          const { data: role, error } = await supabase
            .from('profile')
            .select('role')
            .eq('id', data.session.user.id)
            .single();
          setRole(role)
        } else {
          setUser(false);
        }
      } catch (error) {
        console.error('Error getting user:', error);
        setUser(false);
      }
    }

    getUser()
  }, [])

  
  
  

  return (
    <nav className="navbar">
        <h1>MD Blog</h1>
        <div className="links">
            <Link to="/">Home</Link>
            {role == 'admin' ? <Link to="/create" style={{
              color:'white',
              backgroundColor:'#f1356d',
              borderRadius: '8px'
            }}>New Blog</Link> : <></>}
            
            {user ? <Link to="/profile">Profile</Link> : <Link to="/register" style={{
              color:'white',
              backgroundColor:'#f1356d',
              borderRadius: '8px'
            }}>Signup</Link>}
            
        </div>
    </nav>
  )
}

export default Navbar