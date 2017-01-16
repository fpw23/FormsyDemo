import Formsy from 'formsy-react';
import React from 'react';
import _ from 'lodash';
import rand from "shortid";
import {RadioGroup, Radio} from 'react-radio-group'
import ToolTip from './BootToolTip';


var RadioGroupBox = React.createClass({

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
            showInline: false,
            textProp: 'label',
            valueProp: 'value',
            ColSize: 0
        }

    },
    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(value) {
        this.setValue(value);
        if (_.isFunction(this.props.onChange)) {
            this.props.onChange(this.props.name, value);
        }
    },
    render() {

        var isInline = this.props.showInline;

        var optionNodes = this.props.options.map((item, index) => {
            if (!isInline)
            {
                return (<div key={index} className="radio"><label><Radio  value={item[this.props.valueProp] } />{item[this.props.textProp]}</label></div>);
            } else {
                return (<label key={index} className="radio-inline"><Radio value={item[this.props.valueProp] } />{item[this.props.textProp]}</label>);
            }
        });

        var className = this.showError() ? 'form-group has-error' : 'form-group';
        var errorMessage = this.getErrorMessage();

        if (this.showError() & _.isEmpty(errorMessage)) {
            errorMessage = this.customValidationMessage;
        }

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

        var ctrl = (

          

          <div className={className}>
            {this.props.label ? <label className="control-label">{this.props.label}</label> : "" } {helpIcon}
            <RadioGroup name={this.state.controlId + '_rg'} selectedValue={this.getValue() || ""} onChange={this.changeValue}>
                {optionNodes}
            </RadioGroup>
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

export default RadioGroupBox;