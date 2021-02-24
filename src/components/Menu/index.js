import React from 'react'
import menuConfig from '../../config/menuConfig'
import {Menu} from "antd";
import {NavLink} from "react-router-dom";
// import { MailOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less'
import 'antd/dist/antd.less'; // 引入官方提供的 less 样式入口文件

import { connect } from 'react-redux'
import { bindActionCreators } from "redux";

import { switchMenu } from "../../redux/action";


// const { SubMenu } = Menu;
const SubMenu = Menu.SubMenu;

class MenuBar extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            // menuTreeNode: {}
            currentKey: ''
        }
    }
    componentWillMount() {
        const menuTreeNode = this.renderMenu(menuConfig);
        // console.log('log menu.', menuTreeNode)
        let currentKey = window.location.hash.replace(/#|\?.*$/g, '');
        this.setState({ menuTreeNode, currentKey });
    }
    //渲染菜单
    renderMenu = (data) => {
        return data.map(item => {

            // console.log('log item.', item)
            if (item.children) {
                // console.log('log two.', item)
                return (
                    <SubMenu title={item.title} key={item.key}>
                        { this.renderMenu(item.children)}
                    </SubMenu>
                )
            }
            return (
                <Menu.Item title={item.title} key={item.key}>
                    <NavLink to={item.key}>{item.title}</NavLink>
                </Menu.Item>
            )
            /*return (
                <Menu theme="dark" mode="vertical">
                    <SubMenu key={item.key} title={item.title}>
                        <Menu.Item key={item.key}>{item.title}</Menu.Item>
                    </SubMenu>
                </Menu>
            )*/
        })
    }

    handleClick = ({item, key}) => {
        this.props.switchTitle(item.props.title);
        this.setState({
            currentKey: key
        })
    }

    render() {
        // console.log('state.', this.state.menuTreeNode)
        return (
            <div>
                <div className="logo">
                    <img src="/assets/user_location.png" alt=""/>
                    <h1>show something</h1>
                </div>
                <Menu
                    theme="dark"
                    mode="vertical"
                    selectedKeys={this.state.currentKey}
                    onClick={this.handleClick}>
                    {/*<SubMenu key="sub1" icon={<MailOutlined />} title="Navigation123" onClick={() => console.log('log some.')}>
                        <Menu.Item key="9">Option 9</Menu.Item>
                        <Menu.Item key="10">Option 10</Menu.Item>
                        <Menu.Item key="11">Option 11</Menu.Item>
                        <Menu.Item key="12">Option 12</Menu.Item>
                    </SubMenu>*/}
                    { this.state.menuTreeNode }
                    <Menu.Item>菜单项</Menu.Item>
                    <SubMenu title="子菜单">
                        <Menu.Item>子菜单项</Menu.Item>
                    </SubMenu>
                </Menu>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        menuName: state.menuName,
    }
};
const mapDispatchToProps = dispatch => bindActionCreators({
    switchTitle: switchMenu,
}, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(MenuBar);
