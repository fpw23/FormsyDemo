import ReactDOM from 'react-dom'
import React from "react";
import * as Tools from "./Tools";

var Router = Tools.Routing.Router;
var Route = Tools.Routing.Route;
var IndexRoute = Tools.Routing.IndexRoute;
var hashHistory = Tools.Routing.hashHistory;
import UnknownRoute from './Core/UnknownRoute';

import * as Pages from "./Pages";
import Root from "./Root";

//big global stuff
String.prototype.contains = function (it) { return this.indexOf(it) != -1; };

var appIsHandlingUncaughtError = false;

window.onerror = () => {
    if (!appIsHandlingUncaughtError)
    {
        appIsHandlingUncaughtError = true;
        Tools.Notify.show('Check console log for an uncaught error :(', 'Uncaught Error', 'error');
        appIsHandlingUncaughtError = false;
    }
};

var Setup = function (ele) {

    ReactDOM.render(
        <Router history={hashHistory}>
        <Route path="/" component={Root}>
            <IndexRoute component={Pages.PageTwo} />
            <Route path="pageone" component={Pages.PageOne}></Route>
            <Route path="pagetwo" component={Pages.PageTwo}></Route>

            <Route path="*" component={UnknownRoute} />
        </Route>
    </Router>,
       document.getElementById(ele));
}


export default { Setup };