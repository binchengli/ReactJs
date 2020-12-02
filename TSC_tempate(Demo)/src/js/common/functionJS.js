import StorageData from './storageData.js';
import ServerAPI from '../backendAPI/server.js';

/* General Tool Function */
const FunctionJS = {
    checkValue: checkValue,
    checkLength: checkLength,
    checkRange: checkRange,
    checkAbsoluteLength: checkAbsoluteLength,
    checksubnetIPwithNetAndBroadcast: checksubnetIPwithNetAndBroadcast,
    getNetworkIP: getNetworkIP,
    getBroadcastIP: getBroadcastIP,
    checkSameSubnet: checkSameSubnet,
    number2Digit:number2Digit,
    calcBound: calcBound,
    padZero: padZero,
    replaceSpecialChar: replaceSpecialChar,
    timeSec2Str: timeSec2Str,
    str2Str: str2Str,
    strUTF8Bytes: strUTF8Bytes,
    getFWInfo: getFWInfo,
    converseTrafficUnit: converseTrafficUnit,
    convertforclip: convertforclip,
    datasetFormat: datasetFormat,
    datasetFormat2: datasetFormat2,
    formatDate: formatDate,
    dateDiffInDays: dateDiffInDays,
    changeModelName: changeModelName,
    numberWithCommas: numberWithCommas,
    converseTimeUnit: converseTimeUnit
};
export default FunctionJS;

function checkValue(data, type)
{
    let format_address = /^[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}$/;
    let format_mask = /^1*0*$/;
    let format_MAC = /^[0-9a-fA-F]{2}\:[0-9a-fA-F]{2}\:[0-9a-fA-F]{2}\:[0-9a-fA-F]{2}\:[0-9a-fA-F]{2}\:[0-9a-fA-F]{2}$/;
    let format_mail = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
    let format_num = /^[0-9]+$/;
    let format_engNum = /^[0-9a-zA-Z]+$/;
    let format_hostName = /^[a-zA-Z0-9]([a-zA-Z0-9\-\.]{0,62})[a-zA-Z0-9]$/
    let digitData;
    let result = false;
    if('undefined' == typeof data)
    {
        data = '';
    }
    switch (type)
    {
        // common check
        case 'name':
            result = checkLength(data, 1, 32);
            return result;
            break;
        case 'accName':
            result = checkLength(data, 4, 16);
            return result;
            break;
        case 'accPWD':
            result = checkLength(data, 6, 32);
            return result;
            break;
        case 'accPWD2':
            result = checkLength(data, 4, 16);
            return result;
            break;
        case 'description':
            result = checkLength(data, 0, 32);
            return result;
            break;
        case 'vlan':
            result = checkRange(data, 1, 4095);
            return result;
            break;
        case 'mail':
            result = checkLength(data, 0, 254);
            return result;
            break;
        // format check
        case 'formatIP':
        case 'formatGateway':
        case 'formatDNS':
            if(!format_address.test(data))
            {
                return false;
            };
            if('formatIP' != type)
            {
                if(('' == data) || ('0.0.0.0' == data))
                {
                    return true;
                };
            };
            digitData = data.split('.');
            result = ((checkRange(digitData[0], 1, 255))
                        && (checkRange(digitData[1], 0, 255))
                        && (checkRange(digitData[2], 0, 255))
                        && (checkRange(digitData[3], 1, 254)));
            return result;
            break;
        case 'formatMask':
            let bin = '';
            if(!format_address.test(data))
            {
                return false;
            }
            digitData = data.split('.');
            for(let i =0;i<digitData.length;i++)
            {
                bin += number2Digit(digitData[i])
            }
            result = format_mask.test(bin);
            return result;
            break;
        case 'formatMAC':
            result = format_MAC.test(data);
            return result;
            break;
        case 'formatMail':
            result = format_mail.test(data);
            return result;
            break;
        case 'formNumber':
            result = format_num.test(data);
            return result;
            break;
        case 'formatChar':
            result = format_engNum.test(data);
            return result;
            break;
        case 'formatHostName':
            result = format_hostName.test(data);
            return result;
            break;
    };
};
function checkLength (data, min, max)
{
    let result = (min <= data.length) && (max >= data.length);
    return result
};
function checkRange (data, min, max)
{
    let result = (min <= data) && (max >= data);
    return result
};
function checkAbsoluteLength (data, length)
{
    let result = (length == data.length)
    return result
};
function checksubnetIPwithNetAndBroadcast (ip, mask, client)
{
    /* falseIndex mapping:
        0: true, 
        1: ip != client, 
        2:mask matched but client ip is weird, 
        3:mask not match ip or client
    */
    let falseIndex = 0;
    if('255.255.255.255' == mask)
    {
        if (ip != client)
        {
            falseIndex = 1;
        }
        else
        {
            falseIndex = 0;
        }
        return falseIndex;
    };

    let networkIP = getNetworkIP(ip, mask);
    let broadcastIP = getBroadcastIP(ip, mask);
    if(checkSameSubnet(ip, mask, client))
    {
        if((client == getNetworkIP(ip, mask)) || (client == getBroadcastIP(ip, mask))) {falseIndex = 2;};
    }
    else
    {
        falseIndex = 3;
    }
    return falseIndex;
};
function getNetworkIP (ip, mask)
{
    let subnetIP = [];
    let ip_t=ip.split(".");
    let mask_t=mask.split(".");
    for (let i=0; i<4; i++)
    {
        subnetIP[i] = (ip_t[i] & mask_t[i]);
    };
    return subnetIP.join('.');
};
function getBroadcastIP (ip, mask)
{
    let broadcastIP = [];
    let ip_t=ip.split(".");
    let mask_t=mask.split(".");
    for (let i=0; i<4; i++)
    {
        broadcastIP[i] = (ip_t[i] | (255-mask_t[i]));
    };
    return broadcastIP.join('.');
};
function checkSameSubnet(ip, mask, client)
{
    let ip_t = ip.split(".");
    let mask_t = mask.split(".");
    let client_t = client.split(".");
    for(let i=0; i<4; i++)
    {
        if((parseInt(ip_t[i]) & parseInt(mask_t[i])) != (parseInt(client_t[i]) & parseInt(mask_t[i]))) return false;
    }
    return true;
};
function number2Digit (data) {
    return data > 9 ? "" + data: "0" + data;
};
function calcBound(num, type)
{
    let base = Math.pow(10, Math.floor(Math.log10(num)));
    let bound = 0;
    if('upper' == type)
    {
        bound = (Math.ceil(num/base))*base;
    }
    else
    {
        bound = (Math.floor(num/base))*base;
    }
    return bound;
};
function padZero(num, digit)
{
    let str_num = num.toString();
    let result = '';
    if (str_num.length < digit)
    {
        for(let i=0;i<digit- str_num.length;i++)
        {
            result+='0';
        }
        result += str_num;
    }
    else
    {
        result = str_num;
    }
    return result;
};
function replaceSpecialChar(val)
{
    val=val.replace(/\\/g,'\\\\');
    val=val.replace(/\*/g,'\\\*');
    val=val.replace(/\+/g,'\\\+');
    val=val.replace(/\[/g,'\\\[');
    val=val.replace(/\]/g,'\\\]');
    val=val.replace(/\(/g,'\\\(');
    val=val.replace(/\)/g,'\\\)');
    val=val.replace(/\?/g,'\\\?');
    val=val.replace(/\./g,'\\\.');
    val=val.replace(/\|/g,'\\\|');
    val=val.replace(/\$/g,'\\\$');
    val=val.replace(/\^/g,'\\\^');
    val=val.replace(/\{/g,'\\\{');
    val=val.replace(/\}/g,'\\\}');
    val=val.replace(/\//g,'\\\/');
    val=val.replace(/\'/g,'\\\'');
    val=val.replace(/\"/g,'\\\"');
    return val;
};
function timeSec2Str(timeSec)
{
    let time = {
        'day': 0,
        'hour': 0,
        'min': 0,
        'sec': 0
    };
    let num = parseInt(timeSec);
    let str = '';
    time.sec = num;
    if(60 <= num)
    {
        time.sec = num%60;
        time.min = Math.floor(num/60);
        num = time.min;
        if(60 <= num)
        {
            time.min = num%60;
            time.hour = Math.floor(num/60);
            num = time.hour;
            if(24 <= num)
            {
                time.hour = num%24;
                time.day = Math.floor(num/24);
                str += `${time.day}d `;
            }
            str += `${time.hour}h `;
        }
        str += `${time.min}m `;
    }
    str += `${time.sec}s`;
        
    return str;
};
function str2Str(str)
{
    let result;
    if(1 < str.length)
    {
        result = str.slice(0,1).toUpperCase() + str.slice(1);
    }
    else
    {
        result = str.slice(0,1).toUpperCase();
    };
    return result;
};
function binStr2uint8Array(abuffer, length) 
{ // abuffer is array buffer made by readAsArrayBuffer 
    let result = [];
    let dataView = new DataView(abuffer);
    dataView.setUint8(0, abuffer);
    for(let i=0;i<length;i++)
    {
        result[i] = String.fromCharCode(dataView.getUint8(i));
    }
    return result;
};
function strUTF8Bytes(str)
{
    let bytes = 0, char;
    for(let i=0;i<str.length;i++)
    {
        char = str.charCodeAt(i);
        bytes += (char>>16)? 4 : (char>>11)? 3 : (char>>7)? 2 : 1;
    }
    return bytes;
};
function getFWInfo(abuffer)
{
    let firmwareInfo = {};
    const fwStructureTbl = new Array(
        {desc:'start',          bytes: 4},
        {desc:'type',           bytes: 4},
        {desc:'pad1',           bytes:17},
        {desc:'code_version',   bytes:17},
        {desc:'hw_id',          bytes: 4},
        {desc:'version',        bytes:16},
        {desc:'comp_file_len',  bytes: 4},
        {desc:'comp_file_sum',  bytes: 4},
        {desc:'md5',            bytes:16},
        {desc:'model_name',     bytes:16},
        {desc:'pad',            bytes:18},
        {desc:'header_sum',     bytes: 4},
        {desc:'magic_key',      bytes: 4}
    );
    /* count total bytes */
    let headerLength = 0;
    fwStructureTbl.map((entry)=>{
        headerLength += parseInt(entry.bytes);
    });
    /* get header in unit8 array */
    let uint8Array = [];
    let dataView = new DataView(abuffer);
    dataView.setUint8(0, abuffer);
    for(let i=0;i<headerLength;i++)
    {
        uint8Array[i] = dataView.getUint8(i);
    }
    /* read header */
    let offset = 0;
    fwStructureTbl.map((entry)=>{
        let str = '';
        switch(entry['desc'])
        {
            case 'code_version':
            case 'version':
            case 'model_name':
                for(let i=offset;i<offset+entry['bytes'];i++)
                {
                    if(0 != uint8Array[i])
                    {
                        str += String.fromCharCode(uint8Array[i]);
                    };
                };
                break;
            case 'hw_id':
                for(let i=offset;i<offset+entry['bytes'];i++)
                {
                    str += padZero(uint8Array[i].toString(16),2);
                };
                break;
        }
        firmwareInfo[entry['desc']] = str;
        offset += parseInt(entry['bytes']);
    });
    
    return firmwareInfo;
};
function converseTrafficUnit(bytes)
{ // base on KB
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    if(i == 4)
        i = 3;
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}
function convertforclip(bytes)
{ // base on KB
    if (bytes == 0)
        return '0 Byte';
    return (bytes / Math.pow(1024, 3)).toFixed(2) + ' ' + 'GB';
}
function datasetFormat(data, timeslot)
{
    let newlist = [];
    let copylist = [];

    // model = {list:[], model:"C1"}
    data.map((model) => {
        // keys = "list"
        var keys = Object.keys(model.list[0]);

        // if data is not enough
        if (model.list.length < timeslot)
        {
            newlist = [];
            copylist =[];

            model.list.map((entry) => {
                var unit = {[keys[0]]: Date, [keys[1]]: ''};
                unit[keys[0]] = new Date(entry[keys[0]].replace("16:00", "00:00"));
                unit[keys[1]] = entry[keys[1]];
                copylist.push(unit);
            });

            for(let i = 0; i < timeslot; i++)
            {
                var supply = new Date();
                var temp  = supply.getDate() - i-1;
                supply.setDate(temp);

                var unit = {[keys[0]]: supply.toISOString().replace('.', '+'), [keys[1]]: '0'};
                for(let j=0; j<copylist.length; j++)
                {
                    if(this.formatDate(supply) == this.formatDate(copylist[j][keys[0]]))
                    {
                        unit[keys[0]] = copylist[j][keys[0]].toISOString().replace('.', '+');
                        unit[keys[1]] = copylist[j][keys[1]];
                        break;
                    }
                }
                newlist.push(unit);
            }

            newlist.reverse();
            model.list = newlist;
        }
    });
};
function datasetFormat2(data, timeslot)
{
        // console.log(current.toISOString().split('T')[0]);
        let newlist = [];
        let copylist = [];

        data.map((model) => {
            var keys = Object.keys(model.list[0]);
            // if data is not enough
            if(model.list.length < timeslot)
            {
                console.log(model.name);
                newlist = [];
                copylist =[];
                model.list.map((entry) => {
                    var unit = {[keys[0]]: Date, [keys[1]]: ''};
                    unit[keys[0]] = new Date(entry[keys[0]]);
                    unit[keys[1]] = entry[keys[1]];
                    copylist.push(unit);
                });
                // console.log(copylist);
                for(let i=0; i<timeslot; i++)
                {
                    var supply = new Date();
                    var temp  = supply.getDate() - i;
                    supply.setDate(temp);

                    // console.log(this.formatDate(supply));
                    let value = Math.round((Math.random() * 300))*11 + 500;
                    var unit = {[keys[0]]: supply.toISOString().replace('.', '+'), [keys[1]]: value};
                    for(let j=0; j<copylist.length; j++)
                    {
                        if(this.formatDate(supply) == this.formatDate(copylist[j][keys[0]]))
                        {
                            unit[keys[0]] = copylist[j][keys[0]].toISOString().replace('.', '+');
                            unit[keys[1]] = copylist[j][keys[1]];
                            break;
                        }
                    }
                    newlist.push(unit);
                }
                // newlist = [...new Set(newlist)];
                // console.log(copylist);
                newlist.reverse();
                console.log(newlist);
                model.list = newlist;
            }
        });
};

function formatDate(date) {
    var
        month = '' + (date.getMonth() + 1),
        day = '' + date.getDate(),
        year = date.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
// a and b are javascript Date objects
function dateDiffInDays(a, b) {
    const _MS_PER_DAY = 1000 * 60 * 60 * 24;
    // Discard the time and time-zone information.
    const utc1 = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
    const utc2 = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());

    return Math.floor((utc2 - utc1) / _MS_PER_DAY);
}
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function changeModelName(source)
{
    switch(source)
    {
        case '0':
            return 'GOP';
        case '1':
            return 'GLP';
        case '2':
            return 'Security Box';
        case '3':
            return 'GAP';
        case '4':
            return 'GBP';
        case '5':
            return 'GCP';
        case '6':
            return 'GDP';
        default:
            return source;
    }
};
function converseTimeUnit(second)
{ // base on KB
    var sizes = ['Seconds ago', 'Minutes ago', 'Hours ago'];
    if (second == 0) return 'Now';
    var i = parseInt(Math.floor(Math.log(second) / Math.log(60)));
    return Math.round(second / Math.pow(60, i), 2) + ' ' + sizes[i];
}