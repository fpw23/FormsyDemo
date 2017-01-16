import React from 'react';
import _ from 'lodash';

var BootCol = React.createClass({

    getDefaultProps() {
        return {
            Size: 6,
        }
    },
    render() {

        var css = "";
        var mdSet = false;

        if (_.isNumber(this.props.Size))
        {
            css += " col-md-" + this.props.Size;
        } 
            
        if (_.isNumber(this.props.SizeMD) & !mdSet)
        {
            css += " col-md-" + this.props.Size;
        }

        if (_.isNumber(this.props.SizeLG)) {
            css += " col-lg-" + this.props.Size;
        }

        if (_.isNumber(this.props.SizeSM)) {
            css += " col-sm-" + this.props.Size;
        }

        if (_.isNumber(this.props.SizeXS)) {
            css += " col-xs-" + this.props.Size;
        }
        

        return (
		 		<div className={css}>
                     {this.props.children}
                 </div>
		 );
    }
});

export default BootCol;
