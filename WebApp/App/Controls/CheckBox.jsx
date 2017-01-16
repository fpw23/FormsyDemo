import Formsy from 'formsy-react';
import React from 'react';
import ToolTip from './BootToolTip';
import rand from "shortid";
import _ from 'lodash';
import BootCol from './BootCol';

var CheckBox = React.createClass({

    getInitialState(){
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

    mixins: [Formsy.Mixin],

    changeValue(event) {
        this.setValue(event.currentTarget.checked);
        if (_.isFunction(this.props.onChange))
        {
            this.props.onChange(event.currentTarget.checked);
        }
    },

    clearError() {
        this.context.formsy.validate(this);
    },
    render() {
    
        var className = this.showError() ? 'form-group has-error ' : 'form-group ';

        var errorMessage = this.getErrorMessage();

        if (this.showRequired() & !this.isPristine())
        {
            className = 'form-group has-error ';
            errorMessage = "This field is required";
        }
        

        if (this.props.ControlSize) {
            if (this.props.ControlSize == "sm") {
                className = className + "form-group-sm ";
            }

            if (this.props.ControlSize == "lg") {
                className = className + "form-group-lg ";
            }
        }

        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message

        var helpIcon = '';

        if (this.props.helpText)
        {
            helpIcon = <ToolTip helpText={this.props.helpText}></ToolTip>;
        }       

        var labelCSS = "control-label ";
        var controlCSS = "";
        var inputCSS = "";
        if (this.props.Horizontal == true)
        {
            labelCSS = labelCSS + "col-sm-3 ";
            controlCSS = "col-sm-9";
        }


        var ctrl = (
          <div className={className}>
              { this.props.label ? <label className={labelCSS}>{this.props.label}</label> : '' } {helpIcon}

              <div className={controlCSS}>
                  
            <input className={inputCSS} type="checkbox"
                   checked={this.getValue() === true} onChange={this.changeValue} value={this.getValue()} /> {this.props.caption}
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

export default CheckBox;