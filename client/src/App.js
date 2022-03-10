import './App.css';
import { Routes, Route } from "react-router-dom"
import { useContext } from 'react';
import Navbar from './components/Navbar';
import Signup from './components/Signup';
import Login from './components/Login';
import Home from './components/Home';
import BrowseTasks from './components/BrowseTasks';
import PostTask from './components/PostTask';
import TaskDetails from './components/TaskDetails';
import MakeOffer from './components/MakeOffer';
import EditTask from './components/EditTask';
import UserProfile from './components/UserProfile';
import { AuthContext } from './context/auth'

function App() {

  const {isLoggedIn} = useContext(AuthContext)

  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={isLoggedIn?<BrowseTasks/>:<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/browse-tasks" element={<BrowseTasks/>}/>
        <Route path="/post-task" element={<PostTask/>}/>
        <Route path= "/task-details/:id" element={<TaskDetails/>}/>
        <Route path="/make-offer/:id" element={<MakeOffer/>}/>
        <Route path="/edit-task/:id" element={<EditTask/>}/>
        <Route path="/user-profile/:id" element={<UserProfile/>}/>
      </Routes>
    </div>
  );
}

export default App;
