import { homepageUpdateFn } from '../route/home/home.js';
const langList = { // country name follow to flag
    US: 'Global (English)',
    TW: 'Taiwan (繁體中文)'
};

var language = 'US';

const MulitLangFile = (() => {
    

    const MulitLang={
        TSCManager:{US:"TSC Manager version",TW:"TSC Manager version"},
        logout:{US:"Logout",TW:"Logout"},
        TSC:{US:"TSC",TW:"TSC"},
        manager:{US:"Manager",TW:"Manager"},
        hi:{US:"Hi",TW:"Hi"},
        rootAdmin:{US:"RootAdmin",TW:"RootAdmin"},
        demo1:{US:"Demo1",TW:"Demo1"},
        demo2:{US:"Demo2",TW:"Demo2"},
        accountManage:{US:"Account Manage",TW:"Account Manage"},
        deviceManage:{US:"Device Manage",TW:"Device Manage"},
        deviceTransfer:{US:"Device Transfer",TW:"Device Transfer"},
        salesStatistic:{US:"Sales Statistic",TW:"Sales Statistic"},
        Registration:{US:"Registration Devices",TW:"Registration Devices"},
        StoragePlan:{US:"Storage Plan",TW:"Storage Plan"},
        ActivateDevice:{US:"Activate Devices",TW:"Activate Devices"},
        DeactivateDevice:{US:"Deactivate Devices",TW:"Deactivate Devices"},
        billing:{US:"Billing",TW:"Billing"},
        createAccount:{US:"Create Account",TW:"Create Account"},
        setting:{US:"Setting",TW:"Setting"},
        changepassword:{US:"Change Password",TW:"Change Password"},
        aliasName:{US:"Alias Name",TW:"Alias Name"},
        emailAccount:{US:"Email Account",TW:"mail Account"},
        password:{US:"Password",TW:"Password"},
        admin:{US:"Admin",TW:"Admin"},
        operator:{US:"Operator",TW:"Operator"},
        administration:{US:"Administration",TW:"Administration"}
    };

    const getLanguage = function () {    
        return language;
    };

    const setLanguage = function (changeLang) {
       
        if(changeLang!=language)
        {
           language=changeLang; 
           homepageUpdateFn('refresh');
        }
         console.log("MulitLang changeLang="+changeLang+",language="+getLanguage());
        return language;
    };

    const getList = function() {
        return langList;
    };

    const showText = function (text,...arg) {
        // arguments 0: index, >=1: str
            if (text)
            {
                if (1 <= arg.length)
                {
                    let strAnchoring = '';
                    for(let i=0; i<arg.length; i++)
                    {
                        strAnchoring = `%${i}`;
                        if(text.match(strAnchoring))
                        {
                            text = text.replace(strAnchoring, arg[i]);
                        };
                    };
                };
            }
            else
            {
                 console.log(`ShowText Error: Undefined String `);
                text = `Undefined`;
            };
        
       
        return text;
    };

  

    return{
        MulitLang:MulitLang,
        getLanguage:getLanguage(),
        setLanguage:setLanguage,
        getList:getList,
        showText: showText
    };
})();

export default MulitLangFile;