import 'whatwg-fetch';

import ServerAPI from './server.js';

/* common */
import FunctionJS from '../common/functionJS.js';

const DeactivateDevAPI = (() => {
    const deactivateset = (obj) => {
        let URL = ServerAPI.URLlist['deactivate_dev_dataset'];
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

    const deactivatepie = (obj) => {
        let URL = ServerAPI.URLlist['deactivate_dev_pie'];
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
        deactivateset: deactivateset,
        deactivatepie: deactivatepie
    };
})();

export default DeactivateDevAPI;