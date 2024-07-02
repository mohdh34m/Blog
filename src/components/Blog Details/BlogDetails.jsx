import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import supabase from '../../config/supabaseClient';
import DetailsSkeleton from './DetailsSkeleton';

function BlogDetails() {
  let { id } = useParams()
  let navigate = useNavigate()
  let [fetchError, setFetchError] = useState(null)
  let [blog, setBlog] = useState(null)
  let [isLoading, setIsLoading] = useState(true)
  const [userID, setUserID] = useState('')


  async function userData(){
    const { data: { sessionData }} = await supabase.auth.getSession();
    if(sessionData){
      setUserID(sessionData.session.user.id)
    }
    else{
      setUserID(false)
    }
  }

  useEffect(() => {
    setTimeout(() => {
      const fetchBlog = async () => {

        

        const { data, error } = await supabase
          .from('blogs')
          .select()
          .eq('id', id)
          .single()

        if (error) {
          setFetchError(error)
        }

        if (data) {
          setIsLoading(false)
          setBlog(data)
          setFetchError(null)
        }

      }
      fetchBlog()
    }, 1000)
    userData()
  }, [])

  let handleDelete = async () => {
    const { data, error } = await supabase
      .from('blogs')
      .delete()
      .eq('id', id)
      .then(navigate('/'))

    if (error) {
      console.log(error)
    }

    if (data) {
      console.log(data)
    }
  }

  return (
    <div className="blog-details">
        {fetchError && (<p>{fetchError}</p>)}
        {userID ? (isLoading ? (<DetailsSkeleton />) : (blog && (
            <article>
                <h2>{blog.title}</h2>
                <p>Written By: {blog.author}</p>
                <div>{blog.body}</div>
                <button onClick={handleDelete}>Delete</button>
            </article>
        ))) : navigate('/signin')}
        
    </div>
  )
}

export default BlogDetails