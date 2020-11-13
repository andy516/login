import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addUser } from "../actions";

import Error from "../error";
import "../style/Login.css";

class Register extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    existing: "hey",
    error: false,
    errorMsg: "",
    errorClass: "",
    inputClass: ""
  };

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleRegister = e => {
    e.preventDefault();
    const { username, email, password, passwordConfirm, existing } = this.state;

    if (
      username === "" ||
      email === "" ||
      password === "" ||
      passwordConfirm === ""
    ) {
      this.missingFields();
    } else if (password.length < 6 || password !== passwordConfirm) {
      this.matchPassword();
    } else if (existing === username) {
      this.userExist();
    } else {
      const newUser = {
        username: username,
        email: email,
        password: password
      };

      this.registerSuccess();
      this.clearInputs();
      this.props.addUser(newUser);
      // this.props.history.push("/login");
    }
  };

  missingFields = () => {
    this.errorStateFields();

    this.setState({
      error: true,
      errorMsg: "請填寫所有表格",
      errorClass: "is-danger"
    });
    setTimeout(
      () => this.setState({ error: false, errorMsg: "", errorClass: "" }),
      4000
    );
  };

  matchPassword = () => {
    this.setState({
      error: true,
      errorMsg:
        "密碼為6個字符",
      errorClass: "is-danger"
    });
    setTimeout(
      () => this.setState({ error: false, errorMsg: "", errorClass: "" }),
      4000
    );
  };

  userExist = () => {
    document.getElementById("userName").classList = "input is-danger";

    this.setState({
      error: true,
      errorMsg: "此用戶已存在",
      errorClass: "is-danger"
    });
    setTimeout(
      () => this.setState({ error: false, errorMsg: "", errorClass: "" }),
      4000
    );
  };

  registerSuccess = () => {
    this.setState({
      error: true,
      errorMsg: `註冊成功! 謝謝你的註冊 ${this.state.username}!`,
      errorClass: "is-success"
    });
    setTimeout(
      () => this.setState({ error: false, errorMsg: "", errorClass: "" }),
      4000
    );
  };

  clearInputs = () => {
    this.setState({
      username: "",
      email: "",
      password: "",
      passwordConfirm: ""
    });
  };

  errorStateFields = () => {
    const { username, email, password, passwordConfirm } = this.state;

    if (username === "") {
      document.getElementById("userName").classList = "input is-danger";
    } else {
      document.getElementById("userName").classList = "input is-success";
    }
    if (email === "") {
      document.getElementById("email").classList = "input is-danger";
    } else {
      document.getElementById("email").classList = "input is-success";
    }
    if (password === "") {
      document.getElementById("password").classList = "input is-danger";
    } else {
      document.getElementById("password").classList = "input is-success";
    }
    if (passwordConfirm === "") {
      document.getElementById("passwordConfirm").classList = "input is-danger";
    } else {
      document.getElementById("passwordConfirm").classList = "input is-success";
    }
  };

  render() {
    const {
      errorMsg,
      errorClass,
      username,
      email,
      password,
      passwordConfirm,
      inputClass
    } = this.state;

    this.props.userExist.map(e => console.log(e.username));

    return (
      <div className="container">
        {this.state.error ? (
          <Error classType={errorClass} message={errorMsg} />
        ) : (
          ""
        )}
        <form className="section">
          <h1 className="title is-1">註冊</h1>
          <div className="field">
            <label className="label">帳號:</label>
            <input
              id="userName"
              onChange={this.handleChange}
              name="username"
              type="text"
              className="input"
              placeholder="請輸入帳號"
              value={username}
            />
          </div>
          <div className="field">
            <label className="label">信箱:</label>
            <input
              id="email"
              onChange={this.handleChange}
              name="email"
              type="email"
              className={"input" + inputClass}
              placeholder="請輸入信箱"
              value={email}
            />
          </div>
          <div className="field">
            <label className="label">密碼:</label>
            <input
              id="password"
              onChange={this.handleChange}
              name="password"
              type="password"
              className={"input" + inputClass}
              placeholder="請輸入密碼"
              value={password}
            />
          </div>
          <div className="field">
            <label className="label">確認密碼:</label>
            <input
              id="passwordConfirm"
              onChange={this.handleChange}
              name="passwordConfirm"
              type="password"
              className={"input" + inputClass}
              placeholder="輸入確認密碼"
              value={passwordConfirm}
            />
          </div>
          <div className="field">
            <button onClick={this.handleRegister} className="button is-primary">
              註冊
            </button>
          </div>
          <div className="field">
            <p>
              我已有帳號 <Link to="/login">點我</Link>
            </p>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  userExist: state.user.storedUsers
});

export default connect(
  mapStateToProps,
  { addUser }
)(Register);