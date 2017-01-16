import React from 'react';
import Formsy from 'formsy-react';
import rand from "shortid";
import ToolTip from './BootToolTip';
import BootCol from './BootCol';


var StaticBox = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    getInitialState() {
        return {
            controlId: rand.generate()
        };
    },
    propTypes: {
        ColSize: React.PropTypes.number
    },
    getDefaultProps() {
        return {
            ColSize: 0
        }
    },

    render() {

        var className = this.showError() ? 'form-group has-error' : 'form-group';
        var errorMessage = this.getErrorMessage();

        if (this.showRequired()) {
            className = 'form-group has-error';
            errorMessage = "This field is required";
        }

        if (this.isPristine()) {
            className = 'form-group';
            errorMessage = '';
        }

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message

        var helpIcon = '';

        if (this.props.helpText) {
            helpIcon = <ToolTip helpText={this.props.helpText }></ToolTip>;
        }

        var ctrl = (
    <div className={className}>
        { this.props.label ? <label className="control-label">{this.props.label}</label> : ''} {helpIcon}
    <p className="form-control-static">{this.getValue()}</p>
    <p className="help-block">{errorMessage}</p>
    </div>
        );

        if (this.props.ColSize > 0) {
            return <BootCol Size={this.props.ColSize }>{ctrl}</BootCol>;
        } else {
            return ctrl;
        }

    }
});

export default StaticBox;