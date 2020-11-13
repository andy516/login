import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { setUser } from "../actions";

import Error from "../error";
import "../style/Login.css";

class Login extends React.Component {
  state = {
    username: "",
    password: "",
    error: false,
    errorMsg: "",
    errorClass: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    const { storedUser } = this.props;
    const { username, password } = this.state;

    function checkUser(e) {
      return e.username === username && e.password === password;
    }
    if (storedUser.find(checkUser)) {
      this.props.setUser(true);
      this.props.history.push("/");
    } else {
      this.failedLogin();
    }

    e.preventDefault();
  };

  failedLogin = () => {
    this.handleInputs();
    this.setState({
      error: true,
      errorClass: "is-danger",
      errorMsg: "帳號與密碼不符合"
    });
    setTimeout(() => {
      this.setState({
        error: false,
        errorClass: "",
        errorMsg: ""
      });
    }, 4000);
  };

  handleInputs = () => {
    document.getElementById("userNameLogin").classList = "input is-danger";
    document.getElementById("passwordLogin").classList = "input is-danger";

    setTimeout(() => {
      document.getElementById("userNameLogin").classList = "input";
      document.getElementById("passwordLogin").classList = "input";
    }, 4000);
  };

  render() {
    const { errorMsg, errorClass } = this.state;

    return (
      <div className="container">
        {this.state.error ? (
          <Error classType={errorClass} message={errorMsg} />
        ) : (
          ""
        )}
        <form className="section">
          <h1 className="title is-1">登入</h1>
          <div className="field">
            <label className="label">帳號:</label>
            <input
              id="userNameLogin"
              onChange={this.handleChange}
              name="username"
              type="text"
              className="input"
              placeholder="請輸入帳號"
            />
          </div>
          <div className="field">
            <label className="label">密碼:</label>
            <input
              id="passwordLogin"
              onChange={this.handleChange}
              name="password"
              type="password"
              className="input"
              placeholder="請輸入密碼"
            />
          </div>
          <div className="field">
            <button onClick={this.handleSubmit} className="button is-primary">
              登入
            </button>
          </div>
          <div className="field">
            <p>
              我還沒有帳號 <Link to="/register">註冊</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  storedUser: state.user.storedUsers
});

export default connect(
  mapStateToProps,
  { setUser }
)(Login);
