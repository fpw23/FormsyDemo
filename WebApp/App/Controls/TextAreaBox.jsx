import Formsy from 'formsy-react';
import React  from 'react';
import rand from "shortid";
import ToolTip from './BootToolTip';
import BootCol from './BootCol';

var TextAreaBox = React.createClass({

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

    getDefaultProps: function () {
        return {
            rows: 3,
            cols: 0, // React doesn't render the cols attribute if it is zero,
            ColSize: 0
        };
    },

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

        var inputType = this.props.name.contains('Password') ? 'password' : 'text';

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
            <textarea className="form-control" rows={this.props.rows}
                      value={this.getValue()}
                      onChange={this.changeValue}
                      disabled={this.isFormDisabled() || this.props.disabled}></textarea>
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

export default TextAreaBox;
