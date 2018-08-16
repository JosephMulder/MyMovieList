import React from 'react';
import axios from 'axios';
import NavBar from './NavBar.jsx';
import Popular from './Popular.jsx';
import Profile from './Profile.jsx';
import Login from './Login.jsx';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            moviedescription: true,
            singlemovie: {title: "Hello", poster_path: '/qjy8ABAbWooV4jLG6UjzDHlv4RB.jpg', backdrop_path: '/5qxePyMYDisLe8rJiBYX8HKEyv2.jpg'},
            searcherror: false,
            showprofile: false,
            loggedIn: false,
            user: false,
            loginbutton: false
        }
        this.searchrequest = this.searchrequest.bind(this);
        this.veiwMovie = this.veiwMovie.bind(this);
        this.veiwProfile = this.veiwProfile.bind(this);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
        this.loginbutton = this.loginbutton.bind(this);
        this.checkAuth = this.checkAuth.bind(this);
        this.logout = this.logout.bind(this);
    }

    searchrequest(input) {

      axios.get('/search', {
          params: input
      })
      .then((res) => {
          if (this.state.moviedescription) {
            var opposite = !this.state.moviedescription;
          } else {
            var opposite = this.state.moviedescription;
          }
          if (res.data) {
              this.setState({
                singlemovie: res.data,
                moviedescription: opposite,
                searcherror: false
            });
          } else {
              this.setState({
                  searcherror: true
              })
          }
      })
      .catch((err) => {
          console.log(err);
      })
    }

    loginbutton() {
        this.setState({
            loginbutton: true
        });
    }

    signup(username, password) {
        axios.post('/signup', {username: username, password: password})
            .then((response) => {
                this.setState({loggedIn:true, user: response.data.username, loginbutton: false})
            })
            .catch((err) => {
                alert("Login already taken");
                console.log(err);
            })
    }

    login(username, password) {
        axios.get("/login", {
            params: {username: username, password: password}
        })
            .then((response) => {
                this.setState({loggedIn:true, user:response.data[0].username, loginbutton: false});
                this.checkAuth();
            })
            .catch((err) => {
                alert("Invalid Login");
                console.log(err);
            })
    }

    logout() {
        axios.get('/logout')
            .then((res) => {
              this.setState({
                loggedIn: false,
                user: false
              })
            })
            .catch((err) => {
                console.log(err)
            })
    }

    veiwMovie(info) {
        if (this.state.moviedescription) {
          var opposite = !this.state.moviedescription;
        } else {
          var opposite = this.state.moviedescription;
        }
        this.setState({
            singlemovie: info,
            moviedescription: opposite,
            searcherror: false
        })
    }

    veiwProfile() {
        this.setState({
            showprofile: true
        })
    }


    checkAuth(){
        axios.get('/auth')
            .then(res=>{
            if(res.data.username){

                this.setState({
                    loggedIn:true, user:res.data.username, loginbutton: false
                });
            } else {
                console.log('no auth');
            }
            })
            .catch((err) => {
                console.log(err);
            })
    }

      totop() {
        window.scrollTo(0, 0);
      }

      componentWillMount() {
          this.checkAuth();
      }

    render() {
        return (
            <div>
                <NavBar searchrequest={this.searchrequest} searcherror={this.state.searcherror} veiwProfile={this.veiwProfile} loggedIn={this.state.loggedIn} loginbutton={this.loginbutton} logout={this.logout}/>
                
                {this.state.loginbutton ? <Login signup={this.signup} login={this.login} /> : 
                (this.state.showprofile ? (this.state.loggedIn ? <Profile user={this.state.user} /> : <Login signup={this.signup} login={this.login}/> ): <Popular moviedescription={this.state.moviedescription} veiwMovie={this.veiwMovie} singlemovie={this.state.singlemovie} user={this.state.user}/>)}
                
                <footer className="footer">
                    <p id="maker">Made by:<br></br> Joseph Mulder</p> 
                    <a  className="footergit" href="https://github.com/JosephMulder"><img className="githubimage" src="https://i.imgur.com/DWOpELI.png"/></a>
                    <a className="backtotop" onClick={this.totop}><img className="backtotopimage" src="http://earnscliffe.co.uk.gridhosted.co.uk/wp-content/uploads/2014/06/back-to-top.png"/></a>
                </footer>
            </div>
        )
    }
}

export default App;