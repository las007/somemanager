import React from 'react';
import { HashRouter, Route, Link, Switch } from "react-router-dom";
import Main from '../route1/main'
import About from '../route1/about'
import Topic from '../route1/topic'

export default class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li>
                            <Link to="/">Main1</Link>
                        </li>
                        <li>
                            <Link to="/about">About1</Link>
                        </li>
                        <li>
                            <Link to="/topic">Topic1</Link>
                        </li>
                    </ul>
                    <hr />

                    <Switch>
                        <Route exact={true} path="/" component={Main} />
                        <Route path="/about" component={About} />
                        <Route path="/topic" component={Topic} />
                    </Switch>
                </div>
            </HashRouter>
        )
    }
}
