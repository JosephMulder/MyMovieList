import React, { Component } from 'react';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem, FormGroup, FormControl, Button } from 'react-bootstrap';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            term: ''
        }
        this.search = this.search.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
      this.setState({
          term: e.target.value
      });
    }

    search() {
        this.props.searchrequest(this.state.term);
    }

    render() {
        return (
            <Navbar id="colorme">
              <Navbar.Header id="top">
                <Navbar.Brand>
                    <a href="/">MyMovieList</a>
                </Navbar.Brand>
              </Navbar.Header>
              <Nav>
    <NavItem eventKey={1} onClick={this.props.veiwProfile}>
      Profile
    </NavItem>

    {/* <NavDropdown eventKey={3} title="Genres" id="basic-nav-dropdown">
      <MenuItem eventKey={3.1}>Action</MenuItem>
      <MenuItem eventKey={3.2}>Comedy</MenuItem>
      <MenuItem eventKey={3.3}>Romance</MenuItem>
      <MenuItem divider />
      <MenuItem eventKey={3.4}>Horror</MenuItem>
    </NavDropdown> */}
  </Nav>
              <Navbar.Collapse>
    {/* What were going to do is have a anonomous function that conditionally invokes two different things based on if someone is logged in */}
              <Button id="buttoned" onClick={() => (this.props.loggedIn ? this.props.logout(): this.props.loginbutton())}>{this.props.loggedIn ? <div>Sign Out</div> : <div>Login</div>}</Button>
              {/* <Button id="buttoned" onClick={this.props.loginbutton}>{this.props.loggedIn ? <div>Sign Out</div> : <div>Login</div>}</Button> */}
                <Navbar.Form pullRight>
                        {this.props.searcherror ? <div>Movie was not found</div> : <div></div>}
                    <FormGroup>
                        <FormControl type="text" placeholder="Search" value={this.state.term} onChange={this.onChange}/>
                    </FormGroup>{' '}
                    <Button type="submit" onClick={this.search}>Search</Button>
                </Navbar.Form>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;