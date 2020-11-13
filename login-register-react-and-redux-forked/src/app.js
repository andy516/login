import React from "react";
import { connect } from "react-redux";
import { setUser } from "./actions";

import "./style/App.css";



class App extends React.Component {
  componentWillMount() {
    if (this.props.user) {
      this.props.history.push("/");
    } else {
      this.props.history.push("/login");
    }
  }

  state = {
    isLoading: true,
    test: [],
    error: null
  };

  fetchUsers() {
    fetch("https://opendata.cwb.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-3DED4E61-41D6-4E5D-BD04-0DD81978C290")
      .then(response => response.json())
      .then(data =>
        this.setState({
          test: data.records.location,
          isLoading: false,
        })
      )
      .catch(error => this.setState({ error, isLoading: false }));
  }

  componentDidMount() {
    this.fetchUsers();
  }

  handleSignOut = e => {
    e.preventDefault();

    this.props.setUser(false);
    this.props.history.push("/login");
  };

  render() {
    const { isLoading, test, error } = this.state;
    return (
      <div className="section">
        <h1 className="title is-1"></h1>
        <React.Fragment>
          <h1>中央氣象公開資料</h1>
          <h2>今明36小時天氣資料</h2>
          {error ? <p>{error.message}</p> : null}
          {!isLoading ? (
            test.map(location => {
              const { locationName, weatherElement} = location;
              return (
                <div className="table1" key={locationName}>

                  <table>
                  <thead>
                    <tr>
                  <th>地區名稱</th>
                  <th>天氣狀況</th>
                  <th>最低溫度</th>
                  <th>最高溫度</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                  <td>{locationName}</td>
                  <td>{weatherElement[0].time[0].parameter.parameterName}</td>
                  <td>{weatherElement[2].time[0].parameter.parameterName} {weatherElement[2].time[0].parameter.parameterUnit}</td>
                  <td>{weatherElement[4].time[0].parameter.parameterName} {weatherElement[4].time[0].parameter.parameterUnit}</td>
                  </tr>
                  </tbody>
                  </table>
                </div>
              );
            })
          ) : (
            <h3>取得中...</h3>
          )}
        </React.Fragment>
        <button onClick={this.handleSignOut} className="button is-danger">
          登出
        </button>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.user.user
});

export default connect(
  mapStateToProps,
  { setUser }
)(App);