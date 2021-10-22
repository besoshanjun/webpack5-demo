import React, { Component } from "react";
import { hot } from "react-hot-loader/root";
// import handleProxy from './utils/debug';

class App extends Component {

  render() {
    const { name } = this.props;
    console.log(process.env.NODE_ENV);
    debug.live('render')
    debug.view('啊哈哈')
    return (
      <>
        <h1>hello {name}!</h1>
      </>
    );
  }
}

export default hot(App);
