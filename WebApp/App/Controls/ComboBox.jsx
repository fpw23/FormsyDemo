import Formsy from 'formsy-react';
import React from 'react';
import _ from 'lodash';
import rand from "shortid";
import ToolTip from './BootToolTip';
import BootCol from './BootCol';

var ComboBox = React.createClass({

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
            textProp: 'label',
            valueProp: 'value',
            ColSize: 0
        }
    },
    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
        this.setValue(event.currentTarget.value);
        if (_.isFunction(this.props.onChange)) {
            this.props.onChange(this.props.name, event.currentTarget.value);
        }
    },
    render() {

        // Set a specific className based on the validation
        // state of this component. showRequired() is true
        // when the value is empty and the required prop is
        // passed to the input. showError() is true when the
        // value typed is invalid

        var optionNodes = this.props.options.map((item, index) => {
            return (
                <option key={index} value={item[this.props.valueProp] }>{item[this.props.textProp]}</option>
             );
        });
       
        var className = this.showError() ? 'form-group has-error' : 'form-group';
        var errorMessage = this.getErrorMessage();

        if (this.showRequired())
        {
            className = 'form-group has-error';
            errorMessage = "This field is required";
        }

        if (this.isPristine())
        {
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

        return (
          <div className={className}>
              { this.props.label ? <label className="control-label">{this.props.label}</label> : '' } {helpIcon}
            <select className="form-control" value={this.getValue()} onChange={this.changeValue} disabled={this.isFormDisabled() || this.props.disabled}>
              {optionNodes}
            </select>
            <p className="help-block">{errorMessage}</p>
          </div>
        );
}
});

export default ComboBox;