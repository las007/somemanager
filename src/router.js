import React from "react";
import {HashRouter, Route, Switch} from "react-router-dom";
import App from './App';
import Admin from './admin';
import Buttons from './pages/ui/buttons';
import Modal from './pages/ui/modals';
import Login from './pages/login';
import NoMatch from './pages/nomatch';

export default class IRouter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/admin" render={() =>
                            <Admin>
                                <Switch>
                                    <Route path="/admin/ui/buttons" component={Buttons} />
                                    <Route path="/admin/ui/modals" component={Modal} />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>} />
                        <Route path="/order/detail" component={Admin} />
                    </Switch>
                </App>
            </HashRouter>
        )
    }
}
