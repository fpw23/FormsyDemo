import Formsy from 'formsy-react';
import React from 'react';
import rand from "shortid";
import MaskedInput from 'react-maskedinput';
import ToolTip from './BootToolTip';
import BootCol from './BootCol';

var TextMaskedBox = React.createClass({

    getInitialState() {
        return {
            controlId: rand.generate()
        };
    },

    propTypes: { 
        mask: React.PropTypes.string.isRequired,
        placeholder: React.PropTypes.string,
        ColSize: React.PropTypes.number
    },

    getDefaultProps() {
        return {
            ColSize: 0
        }
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
        this.setValue(event.currentTarget.value);
    },

    render() {

        // Set a specific className based on the validation
        // state of this component. showRequired() is true
        // when the value is empty and the required prop is
        // passed to the input. showError() is true when the
        // value typed is invalid


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

        if (this.props.helpText)
        {
            helpIcon = <ToolTip helpText={this.props.helpText}></ToolTip>;
        }

        var ctrl = (
          <div className={className}>
             { this.props.label ? <label className="control-label">{this.props.label}</label> : '' } {helpIcon}
            <MaskedInput className="form-control"  onChange={this.changeValue} value={this.getValue()} mask={this.props.mask}  />
            <p className="help-block">{errorMessage}</p>
          </div>
        );

        if (this.props.ColSize > 0)
        {
            return <BootCol Size={this.props.ColSize}>{ctrl}</BootCol>;
        } else {
            return ctrl;
        }
    }

});

export default TextMaskedBox;