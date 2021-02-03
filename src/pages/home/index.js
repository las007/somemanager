import React from 'react'
import './index.less';

export default class Home extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="home-page">
                欢迎来到首页界面，有付出就终会有收获的，请努力前行吧！！
            </div>
        )
    }
}
