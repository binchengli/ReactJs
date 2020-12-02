import 'whatwg-fetch';

import ServerAPI from './server.js';

/* common */
import FunctionJS from '../common/functionJS.js';

const RegDevAPI = (() => {
    const attachset = (obj) => {
        let URL = ServerAPI.URLlist['attach_dev_dataset'];
        console.log("URL = "+URL);
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

    const attachpie = (obj) => {
        let URL = ServerAPI.URLlist['attach_dev_pie'];
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
        attachset: attachset,
        attachpie: attachpie
    };
})();

export default RegDevAPI;