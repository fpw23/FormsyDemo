import React from 'react';

var PageTitle = React.createClass({

    getDefaultProps() {
        return {
            Title: 'PageTitle',
            SubTitle: 'SubTitle'
        }
    },
    render() {

        var sub = <span></span>;

        if (!_.isEmpty(this.props.SubTitle))
        {
            sub = <small>{this.props.SubTitle}</small>
        }

        return (
                <div>
		 		    <h2>{this.props.Title} {sub}</h2>
                    <hr />
                </div>
		 );
    }
});

export default PageTitle;
