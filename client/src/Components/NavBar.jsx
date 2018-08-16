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

    search(event) {
        console.log('this runs!', this.state.term);
        event.preventDefault();
        event.stopPropagation();
        this.props.searchrequest(this.state.term);
    }

    render() {
        return (
            <Navbar id="colorme">
              <Navbar.Header>
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
              <Button id="buttoned" onClick={() => (this.props.loggedIn ? this.props.logout(): this.props.loginbutton())}>{this.props.loggedIn ? <div>Sign Out</div> : <div>Login</div>}</Button>
                <Navbar.Form pullRight>
                        {this.props.searcherror ? <div>Movie was not found</div> : <div></div>}
{/*                         
                    <FormGroup onSubmit={this.search}>
                        <FormControl type="text" placeholder="Search" value={this.state.term} onChange={this.onChange}/>

                        <Button type="submit" onClick={this.search}>Search</Button>
                    </FormGroup>{' '}
                     */}
                    <form onSubmit={this.search}>
                        <input  className="inputsearch" type="text" placeholder="Search" value={this.state.term} onChange={this.onChange}/>
                        <button className="buttonsearch" type="submit" >Search</button>
                    </form>
                </Navbar.Form>
              </Navbar.Collapse>
            </Navbar>
        )
    }
}

export default NavBar;