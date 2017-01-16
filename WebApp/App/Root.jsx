import React from 'react';
import { NotificationContainer } from 'react-notifications';

let Root = React.createClass({

    contextTypes: {
        router: React.PropTypes.object.isRequired,
    },

    render() {
        return (
             <div className="container">
                 <nav className="navbar navbar-default">
                    <div className="container-fluid">
                        <div className="navbar-header">
                            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            </button>
                            <a className="navbar-brand" href="#">Formsy Demo!</a>
                        </div>
                        <div id="navbar" className="navbar-collapse collapse">
                            <ul className="nav navbar-nav">
                                <li><a href="#/pageone">Page One</a></li>
                                <li><a href="#/pagetwo">Page Two</a></li>
                            </ul>
                        </div>
                    </div>
                 </nav>
             <div className="row" style={{marginBottom: 15}} >
                 <div className="col-md-12">
                     {React.cloneElement(this.props.children, { router: this.context.router })}
                 </div>
             </div>
             <div style={{ height: 100}} ></div>
             <NotificationContainer></NotificationContainer>
             </div>


    );
    }
});

export default Root;