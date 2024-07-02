import BlogSkeleton from './components/Blog List/BlogSkeleton';
import Bloglist from './components/Blog List/Bloglist';
import useFetch from './components/Hook/useFetch';



function Home() {

  let {blogs: blog, fetchError, isLoading} = useFetch()

  return (
    <div className="home">
        {isLoading && <BlogSkeleton listsToRender={5} />}
        {fetchError && (<p>{fetchError}</p>)}
        {blog && <Bloglist blogs={blog}/>}
        
    </div>
  )
}

export default Home;