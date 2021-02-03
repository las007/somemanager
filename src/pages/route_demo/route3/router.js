import React from 'react';
import {HashRouter as Router, Route, Switch} from "react-router-dom";
import Main from "./main";
import About from "../route1/about";
import Topic from "../route1/topic";
import Home from "./Home";
import Info from "./info";
import NoMatch from './noMatch'

export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                {/*1、路由的基本实现*/}
                <Home>
                    <Switch>
                        {/*2、嵌套路由*/}
                        <Route path="/main" render={() =>
                            <Main>
                                {/*3、动态路由*/}
                                <Route path="/main/:id" component={Info} />
                            </Main>
                        } />
                        <Route path="/about" component={About} />
                        <Route exact={true} path="/about/abc" component={About} />
                        <Route path="/topic" component={Topic} />
                        {/*4、404的匹配*/}
                        <Route component={NoMatch} />
                    </Switch>
                </Home>
            </Router>
        );
    }
}
