import 'whatwg-fetch';

import ServerAPI from './server.js';

const BillingAPI = (() => {
    const download = (filename) => {
        let URL = ServerAPI.URLlist['billing_download'].replace('{fileName}', filename);
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': ServerAPI.getJWT()
            }
        })
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob);
            let a = document.createElement('a')
            a.download = filename
            a.href = url
            document.body.appendChild(a)
            a.click()
            a.remove()
        })
        .catch(err => {
            console.error(err)
        })
    };

    return {
        download: download
    };
})();

export default BillingAPI;