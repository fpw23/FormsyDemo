import { React } from 'react';
import _ from 'lodash';
import localStorageManager from 'local-storage-manager';

var getData = (key) => {
    return localStorageManager.get(key);
};

var saveData = (key, value) => {
    localStorageManager.set(key, value);
};

export {
   getData as Get,
   saveData as Save
}
