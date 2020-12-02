import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import ServerAPI from './server.js';
import AccountAPI from './Account.js';
const CreateAccount = (() => {
   

    const create = (context) => {
        let URL = ServerAPI.URLlist['create'];
        //    console.log('CreateAccount data='+JSON.stringify(context));
    
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ServerAPI.getJWT(),
            },body:JSON.stringify(context)
        })
        .then((response) => {
            return httpCheck(response);
        });
    };

    const setting = (context) => {
        let URL = ServerAPI.URLlist['create'];
        console.log('setting URL='+URL);
            console.log('setting data='+JSON.stringify(context));
        //  console.log('setting Authorization='+ServerAPI.getJWT());
        return fetch(URL, {
    
            method: 'PUT',
            headers: {

                'Content-Type': 'application/json',
                'Authorization': ServerAPI.getJWT(),
            },body:JSON.stringify(context)
        })
        .then((response) => {
            return httpCheck(response);
        });
    };

    const getSetting = (Useruuid) => {
        let URL = ServerAPI.URLlist['getsetting'].replace('{uuid}', Useruuid);
             console.log('getsetting URL='+URL);
        return fetch(URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': ServerAPI.getJWT()
            },
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
            console.log('getsetting response='+JSON.stringify(response));
            return httpCheck(response);
        });
    };

    const putlogo = (logodata,Useruuid) => {
        let URL = ServerAPI.URLlist['putlogo'].replace('{uuid}', Useruuid);
        let formData = new FormData();
         formData.append('logo',logodata);
         console.log('putlogo Content-type formData='+JSON.stringify(formData));
        return fetch(URL, {
            method: 'PUT',
            headers: {
                //  'Content-Type': 'multipart/mixed',//multipart/form-data
                'Authorization': ServerAPI.getJWT()
                
            },body:formData
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
                    console.log('401 logout');
                    //alert(res.message);
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
        create:create,
        putlogo:putlogo,
        getSetting:getSetting,
        setting:setting,
    };
})();

export default CreateAccount;