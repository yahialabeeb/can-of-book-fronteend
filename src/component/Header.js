import React from "react";
import Login from "./Login";
import { Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
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
        <Login 
        componentDidMount={this.props.componentDidMount}
        />
      </Navbar>
    );
  }
}

export default Header;
