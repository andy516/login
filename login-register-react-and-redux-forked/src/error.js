import React from "react";

class Error extends React.Component {
  render() {
    return (
      <div className={"error notification " + this.props.classType}>
        {this.props.message}
      </div>
    );
  }
}

export default Error;
