import './Head.css'
import './Header.css';
import { NavLink } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { useAuth } from '../contexts/AuthContext';
import { useState } from 'react';

function Header(props) {
  // Initialize user state with the useAuth hook
  const [user, setUser] = useState(useAuth());

  // Function to handle user sign out
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      setUser(false); // Set the user state to false after signing out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <>
      <header className="main-header">
        <div className="header-wrapper">
          <div className="main-logo">
            <NavLink to="/">DevLink</NavLink>
          </div>
          <nav>
            <ul className="main-menu">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              {user.user && (
                <li>
                  <NavLink to="/devs">Devs</NavLink>
                </li>
              )}
              <li>
                <NavLink to="/jobs">Jobs</NavLink>
              </li>
              {user.user && (
                <li>
                  <NavLink to="/quiz">Quiz</NavLink>
                </li>
              )}
              {user.user && (
                <li>
                  <NavLink to="/chats">Chats</NavLink>
                </li>
              )}
              {user.user && (
                <li>
                  <NavLink to="/" onClick={handleSignOut}>
                    Logout
                  </NavLink>
                </li>
              )}
              {!user.user && (
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
              )}
              {!user.user && (
                <li>
                  <NavLink to="/signup">Sign Up</NavLink>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
