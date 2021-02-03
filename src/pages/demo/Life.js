import React from 'react'
import Child from './Child'
// import './Life.css'
import './Life.less'
import {Button, Input} from "antd";
import 'antd/dist/antd.less'
//
class Life extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            count: 0
        }
    }

    /*state = {
        count: 0
    };*/

    handleAdd = () => {
        this.setState({
            count: this.state.count + 1
        })
    };
    handleClick() {     //需要绑定 this ，不绑定的话，this 的指向不是当前组件的实例
        this.setState({
            count: this.state.count + 1
        })
    }
    render() {
        // let style = {
        //     padding: 50
        // };
        return (
            <div className="content">
                <p>React生命周期介绍</p>
                <Input/>
                <Button onClick={this.handleAdd}>AntD 点我一下</Button>
                <button onClick={this.handleAdd}>clicked me</button>
                <button onClick={this.handleClick.bind(this)}>clicked me</button>
                <p>{this.state.count}</p>
                <Child name={this.state.count} />
            </div>
        );
    }
}

export default Life
