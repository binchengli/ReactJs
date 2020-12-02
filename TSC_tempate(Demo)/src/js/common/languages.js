/* backdoor function */
// import { entrypageUpdateFn } from '../route/entry/entry.js';
// import { org_homepageUpdateFn } from '../route/home_organization/home.js';
import { homepageUpdateFn } from '../route/home/home.js';

// const langList = { // country name follow to flag
//     US: 'Global (English)',
//     CZ: 'Czech (čeština)',
//     DE: 'Germany (Deutsch)',
//     ES: 'Spain (Español)',
//     FR: 'France (Français)',
//     IT: 'Italy (Italiano)',
//     NL: 'Nederland (Nederlands)',
//     PL: 'Poland (Polski)',
//     PT: 'Portugal (Português)',
//     RO: 'Romania (Romana)',
//     RU: 'Russian (Россия)',
//     SK: 'Slovakia (Slovenský)',
//     TR: 'Turkey (Türkçe)',
//     CN: 'China (簡體中文)',
//     TW: 'Taiwan (繁體中文)'
// };

const langList = { // country name follow to flag
    US: 'Global (English)',
    TW: 'Taiwan (繁體中文)'
};

// const langList = { // country name follow to flag
//     US: 'Global (English)',
//     TW: 'Taiwan (繁體中文)'
// };

function loadJSON (language, callback) {
    console.log('loadJSON language='+language);
    let obj = new XMLHttpRequest();
    obj.overrideMimeType('application/json');
    obj.open('GET', `./file/${language}.js`, true);
    obj.onreadystatechange = function () {
        if ((4 == obj.readyState) 
            && ('200' == obj.status)
        )
        {
            //console.log('loadJSON responseText='+obj.responseText);
            callback(JSON.parse(obj.responseText));
        }
    };
    obj.send(null);  
};

var language = 'US';
var LANG = [];

const LanguageFile = (() => {
    const loadFile = function (changeLang, isNeedRefresh) {
        if((0 == LANG.length) || (language != changeLang))
        {
            
            loadJSON(changeLang , function(response) {
                // if get success, update language and LANG
                language = changeLang;
                LANG = response.LANG;
                if (isNeedRefresh) {
//                     entrypageUpdateFn('refresh');
//                     org_homepageUpdateFn('refresh');
                    homepageUpdateFn('refresh');
                }
            });
        }
        else
        {
            if (isNeedRefresh) {
//                 entrypageUpdateFn('refresh');
//                 org_homepageUpdateFn('refresh');
                homepageUpdateFn('refresh');
            };
        };
    };
    const initLanguage = function () {
        loadFile(language, true);
        return language;
    };
    const reloadLanguage = function () {
        loadFile(language, true);
        return language;
    };
    const setLanguage = function (changeLang) {
        loadFile(changeLang, true);
        return language;
    };
    const getLanguage = function () {
        return language;
    };
    const getList = function() {
        return langList;
    };
    const showText = function (index) {
        // arguments 0: index, >=1: str
        let text = LANG[index];
        if (0 < LANG.length)
        {
            if (text)
            {
                if (1 < arguments.length)
                {
                    let strAnchoring = '';
                    for(let i=1; i<arguments.length; i++)
                    {
                        strAnchoring = `%${i}`;
                        if(text.match(strAnchoring))
                        {
                            text = text.replace(strAnchoring, arguments[i]);
                        };
                    };
                };
            }
            else
            {
//                 console.log(`ShowText Error: Undefined String(${index}) of ${language}`);
                text = `Undefined(${index})`;
            };
        }
        else
        {
            text = `Undefined(${index})`;
        };
        return text;
    };

    return {
        initLanguage: initLanguage,
        reloadLanguage: reloadLanguage,
        setLanguage: setLanguage,
        getLanguage: getLanguage,
        getList: getList,
        showText: showText
    };
})();

export default LanguageFile;