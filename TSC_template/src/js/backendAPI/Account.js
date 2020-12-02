import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import ServerAPI from './server.js';

const AccountAPI = (() => {
    const login = (obj) => {
        let URL = ServerAPI.URLlist['acc_Auth'];
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: obj['username'],
                security: obj['security']
            })
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };
    const logout = () => {
        ServerAPI.cleanJWT();
        ServerAPI.cleanUserInfo();
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

    return {
        login: login,
        logout: logout,
        check: check,
        passwordRequest: passwordRequest,
        passwordReset: passwordReset
    };
})();

export default AccountAPI;