import Formsy from 'formsy-react';
import React from 'react';
import ReactDOM  from 'react-dom';
import rand from "shortid";
import $ from 'jquery';
import _ from 'lodash';
import striptags from 'striptags';
import ToolTip from './BootToolTip';
import BootCol from './BootCol';

var TextRichBox = React.createClass({

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
            height: 300,
            ColSize: 0
        }
    },

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    // setValue() will set the value of the component, which in
    // turn will validate it and the rest of the form
    changeValue() {

        var nonHTMLText = striptags(this.lastValue);

        if (_.isEmpty(nonHTMLText)) {
            this.lastValue = '';
        }

        this.setValue(this.lastValue);
    },
    componentDidMount() {

        this.inputDom = ReactDOM.findDOMNode(this.refs.inputText);
        this.lastValue = '';

        $(this.inputDom).summernote({
            height: this.props.height,
            callbacks: {
                onBlur: this.changeValue,
                onChange: (contents, $editable) => {

                    this.lastValue = contents;
                }
            }
        });

        $(this.inputDom).summernote('code', this.lastValue);
    },
    componentWillUnmount() {
        if (this.inputDom) {
            $(this.inputDom).summernote('destroy');
        }
    },
    componentDidUpdate(prevProps, prevState) {
        this.lastValue = this.getValue() || '';
        $(this.inputDom).summernote('code', this.lastValue);

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

        //if (this.refs.inputText) {
        //    $(this.refs.inputText).code(this.getValue());
        //}


        // An error message is returned ONLY if the component is invalid
        // or the server has returned an error message


        var helpIcon = '';

        if (this.props.helpText) {
            helpIcon = <ToolTip helpText={this.props.helpText }></ToolTip>;
        }

        var textAreaId = this.state.controlId + "_textarea";

        var ctrl = (
          <div className={className}>
              { this.props.label ? <label className="control-label">{this.props.label}</label> : ''} {helpIcon}
            <textarea id={textAreaId} ref="inputText" value={this.getValue() || ''}></textarea>
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

export default TextRichBox;