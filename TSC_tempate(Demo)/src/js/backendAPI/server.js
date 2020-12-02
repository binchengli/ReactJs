import 'whatwg-fetch';

import AccountAPI from './Account.js';
import ConstDef from '../common/constDef.js';
import FunctionJS from '../common/functionJS.js';
import { hashHistory } from 'react-router';

const ServerAPI = (() => {
    //'https://54.169.219.137/api/';//
    let domain = ('' != process.env['APIDOMAIN'])? process.env['APIDOMAIN'] : `https://${location.hostname}:${process.env['APIPORT']}/api/`;
    let storageDomain ='';//= ('' != process.env['STORAGEDOMAIN'])? process.env['STORAGEDOMAIN'] : `https://${location.hostname}:${process.env['STORAGEPORT']}/`;

    let LS_JWT = `${process.env['LSNAME']}_JWT`;
    let LS_userUuid = `${process.env['LSNAME']}_uuid`;
    let LS_login = `_login`;

    const options = {
        title: 'Title',
        message: 'Message',
        buttons: [
          {
            label: 'Yes',
            onClick: () => alert('Click Yes')
          },
          {
            label: 'No',
            onClick: () => alert('Click No')
          }
        ],
        childrenElement: () => <div />,
        customUI: ({ title, message, onClose }) => <div>Custom UI</div>,
        willUnmount: () => {}
    }
    
    const httpCheck = (response) => {
        if (response) 
        {
            switch(response.status)
            {
                case 200:
                    if(response.headers.get('authorization'))
                    {
                        ServerAPI.saveJWT(response.headers.get('authorization'));
                    };
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
    const errorCodeCheck = (response) => {
        let consoleMessage = '';
        let alertMessage = '';

        if(response)
            return response;
    };
    const saveJWT = (token) => {
        if(token)
        {
            localStorage.setItem(LS_JWT, token);
        };
    };
    const saveUserPermission = (token) => {
        if(token)
            localStorage.setItem('UserPermission', token);
    }
    const getJWT = () => {
        return localStorage.getItem(LS_JWT);
    };
    const getUserPermission = () => {
        return localStorage.getItem('UserPermission');
    };
    const cleanJWT = () => {
        localStorage.removeItem(LS_JWT);
    };
    const cleanUserPermission = () => {
        localStorage.removeItem('UserPermission');
    };
    const saveUserInfo = (user) => {
        localStorage.setItem(LS_userUuid, user.uuid);
    };
    const getUserInfo = () => {
        let returnInfo = {
            uuid: localStorage.getItem(LS_userUuid),
        };
        return returnInfo;
    };
    const cleanUserInfo = () => {
        localStorage.removeItem(LS_userUuid);
    };
    const saveLoginInfo = (user) => {
        
        localStorage.setItem(LS_login, JSON.stringify(user));
    };
    const getLoginInfo = () => {
   
        return JSON.parse(localStorage.getItem(LS_login));
    };
    const cleanLoginInfo = () => {
        localStorage.removeItem(LS_login);
    };

    /* API URL List */ 
    const URLlist = {
        refresh                         : domain + 'v1/refresh',

        /* account */
        acc_Auth                        : domain + 'auth',
        accountlist                     : domain + 'account/{uuid}/list',
        create                          : domain + 'account',
        putlogo                         : domain + 'account/{uuid}/logo',
        getsetting                      : domain + 'account/{uuid}/info',
        acc_forget                      : domain + 'account/forget',
        acc_verify                      : domain + 'account/verify',
        acc_reset                       : domain + 'account/reset',
        //childlist                     : domain + 'account/{uuid}/list/managed',

        /*Device */
        account_list                    : domain + 'account/{uuid}/list',
        account_device_list             : domain + 'account/{uuid}/device/list',
        all_device_list                 : domain + 'device/list',
        device_info                     : domain + 'device/{uuid}/info',

        /* stastics */
        attach_dev_dataset              : domain + 'device/attached/dataset',
        storageplan_dataset             : domain + 'device/storageplan',
        storageplan_getplan             : domain + 'device/model/list',
        activate_dev_dataset            : domain + 'device/activated/dataset',
        deactivate_dev_dataset          : domain + 'device/deactivated/dataset',
        attach_dev_pie                  : domain + 'device/attached/pie',
        activate_dev_pie                : domain + 'device/activated/pie',
        deactivate_dev_pie              : domain + 'device/deactivated/pie',

        /* billing */
        billing_download                : domain + 'files/{fileName}',
    };
    return {
        domain: domain,
        storageDomain: storageDomain,
        httpCheck: httpCheck,
        errorCodeCheck: errorCodeCheck,
        saveJWT: saveJWT,
        getJWT: getJWT,
        cleanJWT: cleanJWT,
        saveUserInfo: saveUserInfo,
        getUserInfo: getUserInfo,
        cleanUserInfo: cleanUserInfo,
        saveLoginInfo: saveLoginInfo,
        getLoginInfo: getLoginInfo,
        cleanLoginInfo: cleanLoginInfo,
        URLlist: URLlist,
        saveUserPermission: saveUserPermission,
        getUserPermission: getUserPermission,
        cleanUserPermission: cleanUserPermission
    };
})();

export default ServerAPI;