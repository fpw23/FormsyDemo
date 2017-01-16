import React from 'react';
import _ from 'lodash';

var BootButton = React.createClass({

    getDefaultProps() {
        return {
            text: 'Ok',
            type: 'success'
        };
    },
    render() {
    
        var css = "btn btn-margin-right";

        if (this.props.type)
        {
            css += " btn-" + this.props.type;
        } 

        return (
		 		<button type="button" className={css} onClick={this.props.onClick}>{this.props.text || 'OK'}</button>
		 );
    }
});

export default BootButton;
