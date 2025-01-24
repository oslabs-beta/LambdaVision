
import React from 'react';
//import './App.jsx';
//import "font";

function Header() {
  return (
    <div className="Header">
      <nav className="navbar">
        <div className="navbar-left">
          <span className="navbar-title">LambdaVision</span>
        </div>
        <div className="navbar-right">
          <span className="notification-icon">
            <i className="bell"></i> {/* notification bell icon - 
                                        import it in App.js and reference it in 
                                        JSX using `bell` label */}
            <span className="notification-badge">3</span> {/* Notification count */}
          </span>
        </div>
      </nav>
    </div>
  );
}

export default Header;

/* Notes: 

 - Things to do: 
 1.) need a flexbox in the css file for the nav bar (header)
 2.) 

*/