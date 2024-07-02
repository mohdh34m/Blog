import { useState, useEffect } from 'react';
import supabase from '../../config/supabaseClient';

const useFetch = () => {
  const [fetchError, setFetchError] = useState(null)
  const [blogs, setblogs] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
    const fetchblogs = async () => {
      const { data, error } = await supabase
        .from('blogs')
        .select()
      
      if (error) {
        setFetchError('Could not fetch the blogs')
        setblogs(null)
      }
      if (data) {
        setIsLoading(false)
        setblogs(data)
        setFetchError(null)
      }
    }

    fetchblogs()

  }, 1000);
}, [])
  

  return {blogs, fetchError, isLoading};
}
 
export default useFetch;