import React from 'react'
import {Row, Col} from "antd";
//es6 语法
//import { a } from { a, b, c }

import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'
import './style/common.less'
// import Home from './pages/home'
// import 'antd/dist/antd.less'
// import 'antd/lib/style/themes/default.less';
import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件
// import 'your-theme-file.less'; // 用于覆盖上面定义的变量

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Row className="container">
                    <Col span={3} className="navLeft">
                        <Menu />
                    </Col>
                    <Col span={21} className="main">
                        <Header />
                        <Row className="content">
                            {/*<Home />*/}
                            { this.props.children }
                        </Row>
                        <Footer />
                    </Col>
                </Row>
            </div>
        )
    }
}
