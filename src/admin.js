import React from 'react'
import {Row, Col} from "antd";
//es6 语法
//import { a } from { a, b, c }

import Header from './components/Header'
import Footer from './components/Footer'
import Menu from './components/Menu'
import './style/common.less'
import Home from './pages/home'

export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div>
                <Row className="container">
                    <Col span="3" className="navLeft">
                        <Menu />
                    </Col>
                    <Col span="21" className="main">
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
