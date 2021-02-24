// import logo from './logo.svg';
import React from 'react';
import './App.less';
// import 'antd/dist/antd.less'

class App extends React.Component {
  render() {
    return (
        <div>
          {this.props.children}
        </div>
    );
  }
}

export default App;
