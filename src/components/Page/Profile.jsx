import React, { useEffect, useState } from 'react';
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(null);
  const [joinDate, setJoinDate] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.auth.getSession();

      if (data?.session) {
        const { data: profileData, error: profileError } = await supabase
          .from('profile')
          .select('*')
          .eq('id', data.session.user.id)
          .single();

        if (profileData) {
          setProfile(profileData);
          setUser(data.session);
          const timestamp = data.session.user.created_at;
          const date = new Date(timestamp.substring(0, 19));
          formatDate(date)
        }

        if (profileError) {
          console.error('Error fetching profile:', profileError.message);
        }
      }
      else{
        setUser(false)
      }

      if (error) {
        console.error('Error fetching session:', error.message);
      }
    }

    fetchData();
  }, []);

  const formatDate = (date) => {
    if (!date) return '';
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    setJoinDate(date.toLocaleDateString('en-US', options))
  };

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    navigate('/')
  }

  async function deleteUser() {
    await supabase.rpc('delete_user');
    localStorage.clear();
    navigate('/')
  }

  
  return (
    <>
      {user ? (
        <div>
          <div className="container">
            <img src={profile?.['profile-pic']} alt="Logo" className="logo" />
            <div className="profile-info">
              <h1>{profile.username}</h1>
              {profile && <p>{profile.email}</p>}
              <div className="join-date">
                <span>Joined on {joinDate}</span>
              </div>
              <button className='edit'>
                <Link to="/edit-profile" className='link'>Edit Profile</Link>
              </button>
            </div>
          </div>
          <div className="logout-container">
            <h1>Log out</h1>
            <button className='logout' onClick={signOut}>Log out</button>
          </div>
          <div className="delete-container">
            <h1>Danger Zone</h1>
            <button className='delete' onClick={deleteUser}>Delete Account</button>
          </div>
        </div>
      ) : navigate('/signin')}
    </>
  );
}

export default Profile;
