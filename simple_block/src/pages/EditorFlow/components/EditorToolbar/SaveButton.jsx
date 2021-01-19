import React from "react";
import { withPropsAPI } from "gg-editor";

class Save extends React.Component {
  handleClick = () => {
    const { propsAPI } = this.props;

    console.log(propsAPI.save());
  };

  render() {
    return (
      <div style={{ padding: 8 }}>
        <button onClick={this.handleClick}>Save</button>
      </div>
    );
  }
}

export default withPropsAPI(Save);