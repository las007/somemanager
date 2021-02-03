import React from 'react'
import { Row, Col } from "antd";
import './index.less'
import Util from '../../utils/utils'
import axios from '../../axios'

export default class Header extends React.Component{
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentWillMount() {
        this.setState({
            userName: 'las007'
        })
        setInterval(() => {
            let sysTime = Util.formateDate(new Date().getTime());   //获取时间戳
            this.setState({
                sysTime
            })
        }, 1000);
        this.getWeatherData();
    }
    getWeatherData() {
        axios.jsonp({
            url: 'https://yiketianqi.com/api?version=v9&appid=93169272&appsecret=T821Nstg&cityid=101280800'
        }).then(res => {
            console.log('log res.', res.data[0].wea);
            let data = res.data[0];
            this.setState({
                weather: data.wea
            })
        })
    }

    render() {
        return (
            <div className="header">
                <Row className="header-top">
                    <Col span="24">
                        <span>你好！欢迎，{this.state.userName}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                <Row className="breadcrumb">
                    <Col span="4" className="breadcrumb-title">
                        首页
                    </Col>
                    <Col className="weather">
                        <span className="date">{this.state.sysTime}</span>
                        <span className="weather-detail">{this.state.weather}</span>
                    </Col>
                </Row>
            </div>
        )
    }

}
