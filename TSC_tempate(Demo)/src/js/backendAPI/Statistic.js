import { hashHistory } from 'react-router';
import 'whatwg-fetch';

import ServerAPI from './server.js';

/* common */
import StorageData from '../common/storageData.js';
import FunctionJS from '../common/functionJS.js';

const StatisticAPI = (() => {
    const attachdev = (obj) => {
        let URL = FunctionJS.APIURL(ServerAPI.URLlist['stat_AttachDevice'], ServerAPI.URLlist['tc_stat_Clip_UploadAvg']);
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': ServerAPI.getJWT(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeslot: obj['interval']
            })
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };

    const allplans = (obj) => {
        let URL = FunctionJS.APIURL(ServerAPI.URLlist['lyric_stat_SPlan_GetPlan'], ServerAPI.URLlist['tc_stat_SPlan_GetPlan']);
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
        let URL = FunctionJS.APIURL(ServerAPI.URLlist['lyric_stat_SPlan_PlanStat'], ServerAPI.URLlist['tc_stat_SPlan_PlanStat']);
        return fetch(URL, {
            method: 'POST',
            headers: {
                'Authorization': ServerAPI.getJWT(),
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                timeslot: obj['timeslot'],
                fetch: obj['fetch']
            })
        })
        .then((response) => {
            return ServerAPI.httpCheck(response);
        });
    };
    return {
        allplans: allplans,
        planlist: planlist
    };
})();

export default StatisticAPI;