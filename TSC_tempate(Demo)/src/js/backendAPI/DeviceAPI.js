import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import ServerAPI from './server.js';
import AccountAPI from './Account.js';
const DeviceAPI = (() => {
   

    const dev_account_list = (Useruuid) => {
        let URL = ServerAPI.URLlist['account_list'].replace('{uuid}', Useruuid);
            console.log('device_account_list URL='+URL+",Authorization="+ServerAPI.getJWT());
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
    const dev_account_device_list = (Useruuid) => {
        let URL = ServerAPI.URLlist['account_device_list'].replace('{uuid}', Useruuid);
            console.log('dev_account_device_list URL='+URL+",Authorization="+ServerAPI.getJWT());
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
    const all_device_list  =()=> {
        let URL = ServerAPI.URLlist['all_device_list'];
            console.log('all_device_list URL='+URL+",Authorization="+ServerAPI.getJWT());
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
    const device_info = (Useruuid)=>{
        let URL = ServerAPI.URLlist['device_info'].replace('{uuid}', Useruuid);
        console.log('device_info URL='+URL+",Authorization="+ServerAPI.getJWT());
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
        check:                      check,
        dev_account_list:           dev_account_list,
        dev_account_device_list:    dev_account_device_list,
        all_device_list:            all_device_list,
        device_info:                device_info
    };
})();

export default DeviceAPI;