import React from 'react';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
        this.handleEmailInput = this.handleEmailInput.bind(this);
        this.handlePasswordInput = this.handlePasswordInput.bind(this);
    }

    handleEmailInput(e) {
        this.setState({
            email: e.target.value
        })
    }
    handlePasswordInput(e) {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div className="container-login login-pic">
            <div className="wrap-login">

                  <span className="login-form-title" style={{paddingBottom:"36px"}}>
                    Account Login
                  </span>
                  <div className="wrap-input left-input" style={{marginBottom:"24px"}}>
                    <input className="input" type="text" name="username" placeholder="User name" value={this.state.email} onChange={this.handleEmailInput}></input>
                    <span className="focus-input"></span>
                  </div>
                  <div className="wrap-input right-input" style={{marginBottom:"24px"}}>
                    <input className="input" type="password" name="pass" placeholder="Password" value={this.state.password} onChange={this.handlePasswordInput} ></input>
                    <span className="focus-input"></span>
                  </div>
                  <div className="container-login-form-btn">
                    <button className="login-form-btn" style={{marginBottom:"8px"}} onClick={() => this.props.login(this.state.email, this.state.password)}>
                      Log in
                    </button>
                    <div className="login-form-btn" onClick={() => this.props.signup(this.state.email, this.state.password)}>
                      Sign Up
                    </div>
                  </div>
       
            </div>
          </div>
        )
    }
} 

export default Login;