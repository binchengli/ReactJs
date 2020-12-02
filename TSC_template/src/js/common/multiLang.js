import { homepageUpdateFn } from '../route/home/home.js';
const langList = { // country name follow to flag
    US: 'Global (English)',
    TW: 'Taiwan (繁體中文)'
};

var language = 'US';

const MulitLangFile = (() => {
    

    const MulitLang={
        TSCManager:{US:"TSC Manager version",TW:"TSC 管理版本"},
        logout:{US:"Logout",TW:"登出"},
        TSC:{US:"TSC",TW:"TSC"},
        manager:{US:"Manager",TW:"管理"},
        hi:{US:"Hi",TW:"嗨"},
        rootAdmin:{US:"RootAdmin",TW:"RootAdmin"},
        demo1:{US:"Demo1",TW:"樣本1"},
        demo2:{US:"Demo2",TW:"樣本2"},
        accountManage:{US:"Account Manage",TW:"帳戶管理"},
        deviceManage:{US:"Device Manage",TW:"裝置管理"},
        salesStatistic:{US:"Sales Statistic",TW:"銷售統計"},
        createAccount:{US:"Create Account",TW:"創建帳戶"},
        setting:{US:"Setting",TW:"設定"},
        aliasName:{US:"Alias Name",TW:"名稱"},
        emailAccount:{US:"Email Account",TW:"電子郵件帳戶"},
        password:{US:"Password",TW:"密碼"},
        admin:{US:"Admin",TW:"管理員"},
        operator:{US:"Operator",TW:"操作員"},
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