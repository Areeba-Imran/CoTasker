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
                    <Link to='/browse-tasks' className="cotaskerLink">
                        <h1 className='appName'>Co Tasker</h1>			
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
                                <Link to={`/user-profile/${user._id}`} className='nav-links'>
                                    <li><button className="dropdown-item" type="button"><i className="bi bi-person-fill"></i> My Profile</button></li>
                                </Link>
                                <Link to={`posted-tasks`} className='nav-links'>
                                    <li><button className="dropdown-item" type="button"><i className="bi bi-view-stacked"></i> Posted Tasks</button></li>
                                </Link>
                                <Link to={`view-offers`} className='nav-links'>
                                    <li><button className="dropdown-item" type="button"><i className="bi bi-list-task"></i> View Offers</button></li>
                                </Link>
                                <li><button className="dropdown-item" type="button"><i className="bi bi-envelope-paper"></i> Inbox</button></li>
                            </ul>
                        </div>
                    </div>
                    
                </nav>
            ) : (
                <nav className='navbar'>
                    <h1 className='appName'>Co Tasker</h1>
                    <div className='nav-btns-section2'>
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
