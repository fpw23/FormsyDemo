import React from 'react';
import ReactTooltip from "react-tooltip";
import rand from "shortid";

var BootToolTip = React.createClass({

    propTypes: {
        helpText: React.PropTypes.string.isRequired

    },
    getInitialState() {
        return {
            controlId: rand.generate()
        };
    },

    render() {

        return (
		 		<span>
                    <i className="fa fa-question-circle fa-lg text-info" data-tip data-for={this.state.controlId}></i>
                    <ReactTooltip id={this.state.controlId} place="right" type="info" effect="solid">
                        <span dangerouslySetInnerHTML={{__html: this.props.helpText}}></span>
                    </ReactTooltip>
		 		</span>
		 );
    }
});

export default BootToolTip;
