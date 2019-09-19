import React from 'react';
import { Link } from 'react-router-dom';
import AuthApiService from '../../services/auth-api-service';
import './RegistrationForm.css';

class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      username: '',
      password1: '',
      password2: '',
      name: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.password1 !== this.state.password2) {
      this.setState({
        error: 'Passwords must match'
      })
    }
    else {
      const { name, username, password1 } = this.state;
      AuthApiService.postUser({
        display_name: name,
        username: username,
        password: password1
      })
        .then((user) => {
          this.props.onRegistrationSuccess();
        })
        .catch((res) => {
          this.setState({ error: res.error });
        });
    }
  };

  render() {
    const { error } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className="registration-form">
        <h2>Register for an account</h2>
        <div role="alert" className="error">
          {error && <p>{error}</p>}
        </div>
        <div className="registration-input">
          <label htmlFor="registration-name-input">Enter your name:</label>
          <input
            onChange={this.handleChange}
            type="text"
            id="registration-name-input"
            name="name"
            value={this.state.name}
            required
          />
        </div>
        <div className="registration-input">
          <label htmlFor="registration-username-input">
            Choose a username:
          </label>
          <input
            onChange={this.handleChange}
            type="text"
            id="registration-username-input"
            name="username"
            value={this.state.username}
            required
          />
        </div>
        <div className="registration-input">
          <label htmlFor="registration-password-input1">
            Choose a password:
          </label>
          <input
            onChange={this.handleChange}
            id="registration-password-input1"
            name="password1"
            type="password"
            value={this.state.password1}
            required
          />
        </div>
        <div className="registration-input">
          <label htmlFor="registration-password-input2">
            Re-enter your password:
          </label>
          <input
            onChange={this.handleChange}
            id="registration-password-input2"
            name="password2"
            type="password"
            value={this.state.password2}
            required
          />
        </div>
        <button type="submit">Sign up!</button>
        <p><Link to="/login">Already have an account?</Link></p>
      </form>
    );
  }
}

export default RegistrationForm;
