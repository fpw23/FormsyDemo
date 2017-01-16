import Formsy from 'formsy-react';
import React from 'react';
import rand from "shortid";
import FilteredMultiSelect from 'react-filtered-multiselect';
import ToolTip from './BootToolTip';
import BootCol from './BootCol';


const BOOTSTRAP_CLASSES = {
    filter: 'form-control',
    select: 'form-control',
    button: 'btn btn btn-block btn-default',
    buttonActive: 'btn btn btn-block btn-primary'
}

var MultiBox = React.createClass({

    getInitialState(){
        return {
            controlId: rand.generate()
        };
    },
    getDefaultProps() {
        return {
            ColSize: 0
        }
    },
    propTypes: {
        availableOptions: React.PropTypes.array.isRequired,
        textProp: React.PropTypes.string,
        valueProp: React.PropTypes.string,
        ColSize: React.PropTypes.number
    },
    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],
    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue(event) {
        this.setValue(event.currentTarget.value);
    },
    handleDeselect(deselectedOptions) {
        var selectedOptions = this.getValue().slice()
        deselectedOptions.forEach(option => {
            selectedOptions.splice(selectedOptions.indexOf(option), 1)
        })
        this.setValue(selectedOptions);
    },
    handleSelect(selectedOptions) {
        selectedOptions.sort((a, b) => a.id - b.id)
        this.setValue(selectedOptions);
    },
    render() {

      
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

  
        var helpIcon = '';

        if (this.props.helpText)
        {
            helpIcon = <ToolTip helpText={this.props.helpText}></ToolTip>;
        }

        var selectedOptions = this.getValue();

        var ctrl = (
          <div className={className}>
              { this.props.label ? <label className="control-label">{this.props.label}</label> : '' } {helpIcon}

              <div className="row">
                  <div className="col-md-6">
                    <FilteredMultiSelect buttonText="Add"
                                         classNames={BOOTSTRAP_CLASSES}
                                         onChange={this.handleSelect}
                                         options={this.props.availableOptions}
                                         selectedOptions={selectedOptions}
                                         textProp={this.props.textProp}
                                         valueProp={this.props.valueProp} />
                  </div>
                  <div className="col-md-6">
                    <FilteredMultiSelect buttonText="Remove"
                                         classNames={BOOTSTRAP_CLASSES}
                                         onChange={this.handleDeselect}
                                         options={selectedOptions}
                                         textProp={this.props.textProp}
                                         valueProp={this.props.valueProp} />
                  </div>
              </div>
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

export default MultiBox;