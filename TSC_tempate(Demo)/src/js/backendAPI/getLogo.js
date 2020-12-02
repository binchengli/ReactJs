import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import ServerAPI from './server.js';
import AccountAPI from './Account.js';
const GetLogo = (() => {
   

    const getLogo = (path) => {
         let URL = 'https://dashboard.editsc.com/';
         
         //let mpath='api/files/'+path;
         let mpath='files/'+path;
        if(location.hostname.includes('http://localhost'))
        {
            URL=URL+mpath;
        }else
            URL=ServerAPI.domain.split('#')[0]+mpath;
       
            console.log('getLogo URL='+URL+",domain="+ServerAPI.domain+",hostname"+location.hostname);
        return fetch(URL, {
            method: 'GET',
            headers: {
                'Authorization': ServerAPI.getJWT()
            },
        })
        .then((response) => {
            let blob=httpCheck(response);
          
            return blob;
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
                    
                    return response.blob();
                    break;
                case 401:
                    console.log(`ERROR (401), Unauthorized.`);
                    AccountAPI.logout();
                    break;
                default:
                    return response;
                    break;
            };
        };
    };

    return {
        check: check,
        getLogo:getLogo
    };
})();

export default GetLogo;