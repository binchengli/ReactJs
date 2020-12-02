import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import ServerAPI from './server.js';

/* common */
import FunctionJS from '../common/functionJS.js';

const StorageAPI = (() => {
    const allplans = (obj) => {
        let URL = ServerAPI.URLlist['storageplan_getplan'];
        return fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': ServerAPI.getJWT()
            }
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };

    const planlist = (obj) => {
        let URL = ServerAPI.URLlist['storageplan_dataset'];
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': ServerAPI.getJWT(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeslot: obj['timeslot'],
                fetch: obj['fetch'],
                timezone: obj['timezone']
            })
        })
        .then((response) => { 
            return ServerAPI.httpCheck(response);
        });
    };
    return {
        planlist: planlist,
        allplans: allplans
    };
})();

export default StorageAPI;