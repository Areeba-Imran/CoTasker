import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/auth'
import UserProfile from './UserProfile';

export default function Navbar() {

    const { isLoggedIn, user, logoutUser } = useContext(AuthContext)

    return (
    
        isLoggedIn ?
            (
                <nav className='navbar'>
                    <Link to='/post-task-categories' className='appName'>
                        <h1>Co Tasker</h1>			
                    </Link>
                    <div className='nav-btns-section'>
                        <Link to='/post-task'>
                            <button className='btn btn-outline-light'>Post a Task</button>
                        </Link>
                        <Link to='/browse-tasks'>
                            <button className='btn btn-outline-light'>Browse Tasks</button>
                        </Link>
                        <Link to='/login'>
                            <button onClick={logoutUser} className='btn btn-outline-light'>Logout</button>
                        </Link>
                       
                        <div className="dropdown">
                            <button id="dropdownMenu" data-bs-toggle="dropdown" aria-expanded="false">
                                <img src={user.imagePath} alt="profie" className='navbar-profile-icon'/>
                            </button>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenu">
                                <Link to={`/user-profile/${user._id}`}>
                                    <li><button className="dropdown-item" type="button"><i className="bi bi-person-fill"></i> My Profile</button></li>
                                </Link>
                                <li><button className="dropdown-item" type="button">Another action</button></li>
                                <li><button className="dropdown-item" type="button">Something else here</button></li>
                            </ul>
                        </div>
                    </div>
                    
                </nav>
            ) : (
                <nav className='navbar'>
                    <h1 className='appName'>Co Tasker</h1>
                    <div className='nav-btns-section'>
                        <Link to='/signup'>
                            <button className='btn btn-outline-light'>Signup</button>
                        </Link>
                        <Link to='/login'>
                            <button className='btn btn-outline-light'>Login</button>
                        </Link>
                    </div>
                </nav>
            )
    )
}
