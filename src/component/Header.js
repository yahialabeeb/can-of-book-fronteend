import React from "react";
import LoginButton from "./LoginButton";
import { Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";

import LogoutButton from "./LogoutButton";
// import './header.css';

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand>My Favorite Books</Navbar.Brand>
        <NavItem>
          <Link to="/" className="nav-link">
            Home
          </Link>
        </NavItem>
        <NavItem>
          <Link to="/profile" className="nav-link">
            profile
          </Link>
        </NavItem>
        <LoginButton
        componentDidMount={this.props.componentDidMount}/>
        <LogoutButton/>
        {/* <Login 
        componentDidMount={this.props.componentDidMount}
        handelLogout={this.props.handelLogout}
        /> */}
      </Navbar>
    );
  }
}

export default Header;
