import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = () => {
  return (
    <div className="topnav">
      <Link className="homelink" to="/">Elena Byalaya</Link>
      <Link to="/about">About</Link>
    </div>
  )
}

export default TopNav;
