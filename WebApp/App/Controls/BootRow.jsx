import React from 'react';
import _ from 'lodash';

var BootRow = React.createClass({

    render() {
        return (
		 		<div className="row">
                     {this.props.children}
                 </div>
		 );
    }
});

export default BootRow;
