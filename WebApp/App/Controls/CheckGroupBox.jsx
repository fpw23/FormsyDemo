import Formsy from 'formsy-react';
import React from 'react';
import _ from 'lodash';
import rand from "shortid";
import CheckGroup from "react-checkbox-group";
import ToolTip from './BootToolTip';
import BootCol from './BootCol';

var CheckGroupBox = React.createClass({

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
            onValidate: null,
            showInline: false,
            onChangeFormat: null,
            onGetFormat: null,
            options: [],
            formatType: 'default', //types are default(just pass the value) custom(calls the onChangeFormat prop),
            textProp: 'label',
            valueProp: 'value',
            ColSize: 0
        }
    },
    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],
    getCustomValue() {

        var ret = this.getValue() || "";

        switch (this.props.formatType) {
            case 'custom':
                if (_.isFunction(this.onGetFormat)) {
                    ret = this.onGetFormat(ret, _.pluck(this.props.options, 'value'));
                }
                break;
        }

        if (_.isArray(ret)) {
            return ret;
        } else {
            return [];
        }

    },
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(value) {
       
        var newValue = value;

        switch(this.props.formatType)
        {
            case 'custom':
                if (_.isFunction(this.onChangeFormat)) {
                    newValue = this.onChangeFormat(newValue, _.pluck(this.props.options, 'value'));
                }
                break;
        }

        this.setValue(newValue);

        if (_.isFunction(this.props.onChange)) {
            this.props.onChange(this.props.name, newValue);
        }
    },
    render() {

       

        var className = this.showError() ? 'form-group has-error' : 'form-group';
        var errorMessage = this.getErrorMessage();

        if (this.showError() & _.isEmpty(errorMessage)) {
            errorMessage = this.customValidationMessage;
        }

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
    {this.props.label ? <label className="control-label">{this.props.label}</label> : "" } {helpIcon}
    <CheckGroup name={this.state.controlId + '_cg'} value={this.getCustomValue()} onChange={this.changeValue}>
        {
            Checkbox => {
                var items = this.props.options.map((item, index) => {
                    if (!this.props.showInline) {
                        return (<div key={index} className="checkbox"><label><Checkbox  type="checkbox" value={item[this.props.valueProp] } />{item[this.props.textProp]}</label></div>);
                    } else {
                        return (<label key={index} className="checkbox-inline"><Checkbox  type="checkbox" value={item[this.props.valueProp] } />{item[this.props.textProp]}</label>);
                    }
                });

                return <div>{items}</div>;
            }
        }
    </CheckGroup>
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

export default CheckGroupBox;