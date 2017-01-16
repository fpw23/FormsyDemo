import DatePicker from 'react-datepicker';
import Formsy from 'formsy-react';
import React from 'react';
import moment from 'moment';
import rand from "shortid";
import _ from 'lodash';
import ToolTip from './BootToolTip';
import BootCol from './BootCol';

var DateBox = React.createClass({

    getInitialState() {
        return {
            controlId: rand.generate()
        };
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],
    propTypes: {
        ColSize: React.PropTypes.number
    },
    getDefaultProps()
    {
        return {
            dateFormat: "MM/DD/YYYY",
            minDate: moment("1990-01-01"),
            maxDate: moment("2099-12-31"),
            ColSize: 0
        }

    },

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(newDate) {
        var nextDate = newDate.format('M/D/YYYY');
        this.setValue(nextDate + ' 12:00 am');
    },

    getCustomValue() {
        var val = this.getValue();

        if (_.isNull(val) || _.isUndefined(val) || _.isEmpty(val))
        {
            return val;
        }

        if (_.isString(val))
        {
            return moment(val);
        }
        
        return val;
    },

    render() {

        // Set a specific className based on the validation
        // state of this component. showRequired() is true
        // when the value is empty and the required prop is
        // passed to the input. showError() is true when the
        // value typed is invalid

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

        var ctrl = (
          <div className={className}>
            { this.props.label ? <label className="control-label">{this.props.label}</label> : '' } {helpIcon}
            <DatePicker className="form-control" selected={this.getCustomValue() } {...this.props} onChange={this.changeValue} />
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

export default DateBox;