import React from 'react'
import {Link} from 'react-router-dom';
const  NavBar = () => {
  return (
    <div>
       <nav className="navbar navbar-expand-sm bg-dark navbar-dark mb-3">
      <div className="container">
        <Link to="/" className="navbar-brand">CRUD</Link>
        <div>
          <ul className="nav navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link"><i className="fas fa-home"></i> Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/add" className="nav-link"><i className="fas fa-plus"></i> Add</Link>
            </li>
            {/* <li className="nav-item">
              <Link to="/about" className="nav-link"><i className="fas fa-question"></i> About</Link>
            </li> */}
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}

export default NavBar;
