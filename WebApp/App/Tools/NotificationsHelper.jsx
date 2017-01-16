import _ from 'lodash';
import rand from 'shortid';
import { NotificationManager } from 'react-notifications';

let MessageTypes = {
    Undefined: 1,
    Error: 2,
    Warning: 3,
    Validation: 4,
    Info: 5,
    Success: 6
};

function show(message, title, type, callBack) {
    var newNotification = {
        id: rand.generate(),
        type: type || 'info',
        title: title || 'Information',
        message: message
    };

    if (type == 'error') {
        newNotification.timeOut = 0;
    }

    if (_.isFunction(callBack)) {
        newNotification.onClick = callBack;
    }

    NotificationManager.create(newNotification);
}

function showList(messages) {
    if (!_.isArray(messages)) {
        return;
    }

    if (messages.length == 0) {
        return;
    }

    _.each(messages, (m) => {

        var type = 'info';
        var title = m.Title || 'Information';
        switch (m.MessageType) {
            case MessageTypes.Warning:
                type = 'warning';
                title = 'Warning';
                break;
            case MessageTypes.Error:
                type = 'error';
                title = 'Error';
                break;
            case MessageTypes.Validation:
                type = "warning";
                break;
        }

        show(
            m.Message,
            title,
            type
        );
    });
}

export  {
    showList,
    show,
    MessageTypes
}