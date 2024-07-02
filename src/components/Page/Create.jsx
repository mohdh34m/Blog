import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import supabase from '../../config/supabaseClient';

function Create() {
  let [title, setTitle] = useState('')
  let [body, setBody] = useState('')
  let [author, setAuthor] = useState('')
  let [formError, setFormError] = useState('')
  const [role, setRole] = useState('')
  let navigate = useNavigate()

  let handleSubmit = async (e) => {
    e.preventDefault()
    const { data, error } = await supabase
      .from('blogs')
      .insert([{ title, body, author }])
      .then(navigate('/'))

    if (error) {
      console.log(error)
      setFormError('Please fill in all the fields correctly.')
    }
  }

  useEffect(() => {
    async function fetchUserRole() {
      try {
        const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (sessionData && sessionData.session && sessionData.session.user) {
          const userId = sessionData.session.user.id;

          const { data: roleData, error: roleError } = await supabase
            .from('profile')
            .select('role')
            .eq('id', userId)
            .single();

          if (roleError) throw roleError;

          setRole(roleData ? roleData.role : false);
        } else {
          setRole(false);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole(false);
      }
    }
    fetchUserRole()
  }, [])

  return (
    <div>
      {role == "admin" ? (
        <div className="create">
          <h2>Add new Blog</h2>
          <form onSubmit={handleSubmit}>
            <label>Blog title</label>
            <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} />
            <label>Blog body</label>
            <textarea required value={body} onChange={(e) => setBody(e.target.value)}></textarea>
            <label>Blog author</label>
            <select value={author} onChange={(e) => setAuthor(e.target.value)}>
              <option value="marry">marry</option>
              <option value="George">George RR Martin</option>
            </select>
            <button>Add blog</button>
            {formError && <p className="error">{formError}</p>}
          </form>
        </div>
      ) : navigate('/')}
    </div>
  )
}

export default Create