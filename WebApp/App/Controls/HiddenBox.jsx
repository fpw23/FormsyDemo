import Formsy from 'formsy-react';
import React from 'react';

var HiddenBox = React.createClass({

    // Add the Formsy Mixin
    mixins: [Formsy.Mixin],

    render() {

        var inputValue = this.getValue() || '';

        return (
            <input type="hidden" value={inputValue}/>
        );
}
});

export default HiddenBox;