import Navbar from './components/Navbar';
import Home from './Home';
import Register from './components/Page/Register';
import SignIn from './components/Page/SignIn';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Create from './components/Page/Create';
import BlogDetails from './components/Blog Details/BlogDetails';
import NotFound from './components/Page/NotFound';
import Profile from './components/Page/Profile';
import EditProfile from './components/Edit Profile/EditProfile';




function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/register' element={<Register />} />
            <Route path='/signin' element={<SignIn />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/edit-profile' element={<EditProfile />} />
            <Route path='/create' element={<Create />} />
            <Route path='/blogs/:id' element={<BlogDetails />} />
            <Route path='*' element={<NotFound />}/>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
