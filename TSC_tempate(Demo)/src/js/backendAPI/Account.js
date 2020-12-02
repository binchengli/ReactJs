import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import ServerAPI from './server.js';

const AccountAPI = (() => {
    const login = (obj) => {
        let URL = ServerAPI.URLlist['acc_Auth'];
        return fetch(URL, {
            method: 'POST',
            headers: {
                //'Authorization': ServerAPI.getJWT(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: obj['username'],
                security: obj['security']
            })
        }).catch(error => {
            
            // here you will get only Fetch API errors and those you threw or rejected above
            // in most cases Fetch API error will look like common Error object
            // {
            //   name: "TypeError",
            //   message: "Failed to fetch",
            //   stack: ...
            // }
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };

    const getAccountList = (uuid) => {
        let URL = ServerAPI.URLlist['accountlist'];
        // console.log('acc_Auth URL='+URL+',json='+JSON.stringify({ mail: obj['username'], security: obj['security']}));
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ServerAPI.getJWT()
            },
            body: JSON.stringify({
                uuid: uuid,
            })
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };

    const logout = () => {
        console.log("logout");
        ServerAPI.cleanJWT();
        ServerAPI.cleanUserInfo();
        ServerAPI.cleanLoginInfo();
        ServerAPI.cleanUserPermission();
        hashHistory.push('/login');
    };
    const check = (path) => {
        return (ServerAPI.getJWT())? true : false;
    };
    const passwordRequest = (obj) => {
        let URL = ServerAPI.URLlist['acc_PasswordRequest'];
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: obj['username']
            })
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };
    const passwordReset = (obj) => {
        let URL = ServerAPI.URLlist['acc_PasswordReset'];
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: obj['username'],
                security: obj['security'],
                code: obj['code']
            })
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };

    const forget = (obj) => {
        let URL = ServerAPI.URLlist['acc_forget'];
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': ServerAPI.getJWT(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: obj['mail']
            })
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };

    const verify = (obj) => {
        let URL = ServerAPI.URLlist['acc_verify'];
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': ServerAPI.getJWT(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: obj['mail'],
                pincode: obj['pincode']
            })
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };

    const reset = (obj) => {
        let URL = ServerAPI.URLlist['acc_reset'];
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': ServerAPI.getJWT(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                mail: obj['mail'],
                newpwd: obj['newpwd']
            })
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };

    return {
        login: login,
        logout: logout,
        check: check,
        passwordRequest: passwordRequest,
        passwordReset: passwordReset,
        getAccountList:getAccountList,
        forget: forget,
        verify: verify,
        reset: reset
    };
})();

export default AccountAPI;