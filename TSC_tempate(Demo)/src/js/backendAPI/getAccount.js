import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import ServerAPI from './server.js';
import AccountAPI from './Account.js';
const GetAccounts = (() => {
   

    const getAccountList = (Useruuid) => {
        let URL = ServerAPI.URLlist['accountlist'].replace('{uuid}', Useruuid);
        //    console.log('getAccountList URL='+URL+",Authorization="+ServerAPI.getJWT());
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
        getAccountList:getAccountList
    };
})();

export default GetAccounts;