import { React } from 'react';

let CSSAlignCenter = {
    marginTop: 20,
    left: '50%',
    marginLeft: -100,
    textAlign: 'center'
};

function renderLoadingScreen(message) {

    var msg = message || 'Loading';
    return (
                <div style={CSSAlignCenter}>
                    <img src="/Content/images/gears.gif" /> <h4 className="text-info">{msg}</h4>
                </div>
            );
}

function renderLoadingScreenSmall(message) {

    var msg = message || 'Loading';
    return (
                <div>
                    <img src="/Content/images/ellipsis.gif" style={{height: 45, paddingLeft: 5}} /><h4 className="text-info pull-left">{msg}...</h4>
                </div>
           );
}


export {
    renderLoadingScreen,
    renderLoadingScreenSmall
}