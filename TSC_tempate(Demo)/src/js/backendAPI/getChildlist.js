import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import ServerAPI from './server.js';
import AccountAPI from './Account.js';
const getChildlists = (() => {
   

    const getChildlist = (Useruuid) => {
        let URL = ServerAPI.URLlist['childlist'].replace('{uuid}', Useruuid);
            console.log('getChildlist URL='+URL+",Authorization="+ServerAPI.getJWT());
        return fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ServerAPI.getJWT()
            },
        })
        .then((response) => {
            return httpCheck(response);
        });
    };

    
    const check = (path) => {
        return (ServerAPI.getJWT())? true : false;
    };
    
    const httpCheck = (response) => {
        console.log('response='+JSON.stringify(response));
        if (response) 
        {
            switch(response.status)
            {
                case 200:
                  
                    return response.json();
                    break;
                case 401:
                    console.log(`ERROR (401), Unauthorized.`);
                    AccountAPI.logout();
                    break;
                default:
                    return response.json();
                    break;
            };
        };
    };

    return {
        check: check,
        getChildlist:getChildlist
    };
})();

export default getChildlists;