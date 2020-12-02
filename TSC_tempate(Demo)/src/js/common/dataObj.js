import * as ConstDef from './constDef.js';
import FunctionJS from './functionJS.js';
import Lang from './languages.js';

const DataObj = {
    dateTimeObj: dateTimeObj,
    CountrytoA3: CountrytoA3
};
export default DataObj;

function dateTimeObj (date)
{
    // 2018-12-10T01:29:30-06:00
    const re_serverDate = /^(\d+)\-(\d+)\-(\d+)T(\d+):(\d+):(\d+)([+-])(\d+):(\d+)$/i;
    let result = re_serverDate.exec(date);
    this.year = `${result[1]}`;
    this.month = `${result[2]}`;
    this.day = `${result[3]}`;
    this.hour = `${result[4]}`;
    this.minute = `${result[5]}`;
    this.second = `${result[6]}`;
    
    let sign = ('+' == result[7])? 1 : -1;
    let hours = parseInt(result[8]);
    let mins = parseInt(result[9]);
//     this.timeOffsetSec = sign * ((hours*60*60) + (mins*60));

    this.dateDesc = `${result[1]}-${result[2]}-${result[3]}`;
    this.timeDesc = `${result[4]}:${result[5]}:${result[6]}`;
    this.datetimeDesc = `${this.dateDesc} ${this.timeDesc}`;
    this.epochTime = Date.parse(this.dateDesc)/1000;
};

function CountrytoA3 (country)
{
    for(let i=0; i<ConstDef.countryOptions.length; i++)
    {
        if(country == Lang.showText(ConstDef.countryOptions[i].textIndex))
            return ConstDef.countryOptions[i].A3;
    }
}
