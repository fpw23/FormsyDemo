import DatePicker from 'react-datepicker';
import Formsy from 'formsy-react';
import React from 'react';
import moment from 'moment';
import rand from "shortid";
import ToolTip from './BootToolTip';
import BootCol from './BootCol';
import BootRow from './BootRow';

var DateTimeBox = React.createClass({

    getInitialState() {
        return {
            controlId: rand.generate()
        };
    },
    propTypes: {
        ColSize: React.PropTypes.number
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],
   
    getDefaultProps() {
        return {
            defaultTimeText: "",
            ColSize: 0
        }
    },

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(newDate) {
        var val = this.getCustomValue();

        if (!_.isEmpty(val)) {

            if (_.isString(val)) {
                var currentTime = moment(val).format('h:mm a');
                var nextDate = newDate.format('M/D/YYYY');
                this.setValue(nextDate + ' ' + currentTime);
            }

            if (_.isObject(val)) {
                var currentTime = val.format('h:mm a');
                var nextDate = newDate.format('M/D/YYYY');
                this.setValue(nextDate + ' ' + currentTime);
            }
        } else {
            var nextDate = newDate.format('M/D/YYYY');
            this.setValue(nextDate + ' 12:00 am');
        }
    },

    changeValueTime(event) {

        var val = this.getCustomValue();

        if (!_.isEmpty(val) & !_.isEmpty(event.currentTarget.value)) {

            if (_.isString(val)) {
                this.setValue(val + ' ' + event.currentTarget.value);
            }

            if (_.isObject(val)) {
                var currentDate = val.format('M/D/YYYY');
                this.setValue(currentDate + ' ' + event.currentTarget.value);
            }

        }
    },

    getCustomValue() {
        var val = this.getValue();

        if (_.isNull(val) || _.isUndefined(val) || _.isEmpty(val)) {
            return val;
        }

        if (_.isString(val)) {
            return moment(val);
        }

        return val;
    },

    getCustomValueTime() {
        var val = this.getValue();

        if (_.isNull(val) || _.isUndefined(val) || _.isEmpty(val)) {
            return null;
        }

        if (_.isString(val)) {
            return moment(val).format('h:mm a');
        }
        return val;
    },

    getTimeOptions() {

        var theTime = moment(new Date(2000, 1, 1, 0, 0, 0));
        var times = [];
        var loop = 0;

        while (loop <= 95)
        {
            times.push(theTime.format('h:mm a'));
            theTime.add(15, 'm');
            loop++;
        }

        var optionNodes = _.map(times, (t, i) => {
            if (!_.isEmpty(this.props.defaultTimeText))
            {
                var display = t == "12:00 am" ? this.props.defaultTimeText : t;
                return (<option key={i} value={t}>{display}</option>);
            } else {
                    return (<option key={i} value={t}>{t}</option>);
            }
        });

        return optionNodes;
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

        var inputProps = { className: "form-control" };

var ctrl = (
  <div className={className}>
      { this.props.label ? <label className="control-label">{this.props.label}</label> : '' } {helpIcon}
      <div>
        <BootRow>
            <BootCol Size={6}>
                <DatePicker autoComplete="off" className="form-control" selected={this.getCustomValue()} onChange={this.changeValue} />
                <small>Date</small>
            </BootCol>
            <BootCol Size={6}>
                <select className="form-control" value={this.getCustomValueTime() || ''} onChange={this.changeValueTime}>
                    {this.getTimeOptions()}
                </select>
                <small>Time</small>
            </BootCol>
        </BootRow>
        <p className="help-block">{errorMessage}</p>
      </div>
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

export default DateTimeBox;