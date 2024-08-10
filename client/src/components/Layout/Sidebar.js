import React from 'react';
import { Link } from 'react-router-dom';
import { FaCalendarAlt, FaPlusCircle, FaSignOutAlt } from 'react-icons/fa';
import auth from '../../services/auth';
import '../../styles/App.css'

const Sidebar = () => {
  const handleLogout = () => {
    auth.logout();
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <h2>Event Manager</h2>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <FaCalendarAlt /> All Events
            </Link>
          </li>
          <li>
            <Link to="/create-event">
              <FaPlusCircle /> Create Event
            </Link>
          </li>
          <li>
            <button onClick={handleLogout}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;