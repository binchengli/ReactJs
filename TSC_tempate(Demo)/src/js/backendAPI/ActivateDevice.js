import 'whatwg-fetch';

import ServerAPI from './server.js';

/* common */
import FunctionJS from '../common/functionJS.js';

const ActivateDevAPI = (() => {
    const activateset = (obj) => {
        let URL = ServerAPI.URLlist['activate_dev_dataset'];
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': ServerAPI.getJWT(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeslot: obj['timeslot'],
                timezone: obj['timezone']
            })
        })
        .then((response) => { 
            return ServerAPI.httpCheck(response);
        });
    };

    const activatepie = (obj) => {
        let URL = ServerAPI.URLlist['activate_dev_pie'];
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': ServerAPI.getJWT(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeslot: obj['timeslot'],
                timezone: obj['timezone']
            })
        })
        .then((response) => { 
            return ServerAPI.httpCheck(response);
        });
    };

    return {
        activateset: activateset,
        activatepie: activatepie
    };
})();

export default ActivateDevAPI;