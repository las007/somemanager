import React from 'react';
import {HashRouter as Router, Route} from "react-router-dom";
import Main from "../route1/main";
import About from "../route1/about";
import Topic from "../route1/topic";
import Home from "./Home";

export default class IRouter extends React.Component {
    render() {
        return (
            <Router>
                <Home>
                    {/*嵌套路由*/}
                    <Route path="/" render={() =>
                        <Main>
                            <Route path="/a" component={About} />
                        </Main>
                    } />
                    <Route path="/about" component={About} />
                    <Route path="/topic" component={Topic} />
                </Home>
            </Router>
        );
    }
}
