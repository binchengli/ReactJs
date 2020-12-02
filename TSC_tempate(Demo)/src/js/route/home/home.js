import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Link, hashHistory } from 'react-router';
import {
    Navbar, Nav, NavItem, NavDropdown, MenuItem, Panel, Image, DropdownButton, FormControl
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import AccountAPI from '../../backendAPI/Account.js';
import InstallWizard from '../../wizard/installWizard/wizard.js';
/* common */
// import Lang from '../../common/languages.js';

import StorageData from '../../common/storageData.js';
import MulitLangFile from '../../common/multiLang.js';
//import LanguageFile from '../../common/languages.js';
import ServerAPI from '../../backendAPI/server.js';
import GetAccounts from '../../backendAPI/getAccount.js';
import GetLogo from '../../backendAPI/getLogo.js';
const btmstyle = {
    // position: 'fixed',
    // bottom: '0px',
    height: '40px'
};

const defaultLogo='./img/logo.png';

export function homepageUpdateFn (actionType) {
    let homeThis = StorageData.get('homeThis');
    console.log("homepageUpdateFn "+actionType);
    if (!homeThis) return false;
    switch (actionType)
    {
        case 'scrollTop':
            if(ReactDOM.findDOMNode(homeThis.refs['content']))
            {
                ReactDOM.findDOMNode(homeThis.refs['content']).scrollTop = 0;
            };
            break;
        case 'refresh':
             homeThis.forceUpdate();
            break;
        case 'setting':
            let logindata=JSON.parse(ServerAPI.getLoginInfo());
            console.log('homepageUpdateFn setting');
            homeThis.login=logindata;
            homeThis.parent.alias=logindata.alias;
            homeThis.setState({logopath:logindata.logofilepath,aliasname:logindata.alias});
        break;
        case 'logo':
            let loginlogo=JSON.parse(ServerAPI.getLoginInfo());
             homeThis.doLogoFetch(loginlogo.logofilepath,'self');
        break;
    };
};
export function changeActiveFn (proj, activeLayer1, activeLayer2) {
    let homeThis = StorageData.get('homeThis');
    if (!homeThis) return false;
    if (activeLayer1)
    {
        if (activeLayer2)
        {
            homeThis._changeActiveHandler(proj, activeLayer1, activeLayer2);
        }
        else
        {
            homeThis._changeActiveHandler(proj, activeLayer1);
        };
    };
};



var menuTable = {
    //type 0:top 1:bottom
    Project: {
        account: {
            text: 8,
            textKey:MulitLangFile.MulitLang.accountManage,
            icon: 'user',
            path: '/home/account',
            type:0
        },
        device: {
            text: 9,
            textKey:MulitLangFile.MulitLang.deviceManage,
            icon: 'tasks',
            path: '/home/device',
            type:0,
            sub_menu:{
                TRANSFER: {
                    textKey: MulitLangFile.MulitLang.deviceTransfer,
                    path: '/home/device/devicetransfer'
                }
                
            }
        },
        statistic: {
            text: 10,
            textKey:MulitLangFile.MulitLang.salesStatistic,
            icon: 'line-chart',
            path: '/home/statistic',
            type:0,
            sub_menu: {
                REGISTRATION:{
                    textKey: MulitLangFile.MulitLang.Registration,
                    path: '/home/statistic/registrationdevices'
                },
                STORAGEPLAN:{
                    textKey: MulitLangFile.MulitLang.StoragePlan,
                    path: '/home/statistic/storageplan'
                },
                ACTIVATEDEVICE:{
                    textKey: MulitLangFile.MulitLang.ActivateDevice,
                    path: '/home/statistic/activateddevices'
                },
                DEACTIVATEDEVICE:{
                    textKey: MulitLangFile.MulitLang.DeactivateDevice,
                    path: '/home/statistic/deactivateddevices'
                }
            }
            
        }, 
        billing: {
            text: 13,
            textKey:MulitLangFile.MulitLang.billing,
            icon: 'dollar',
            path: '/home/billing',
            type:0
        },
        administration:{
            textKey:MulitLangFile.MulitLang.administration,
            icon: 'cog',
            type:1,
            setting:true,
            sub_menu: {
                create: {
                    textKey:MulitLangFile.MulitLang.createAccount,
                    path: '/home/create',
                },
                setting: {
                    textKey:MulitLangFile.MulitLang.setting,
                    path: '/home/setting',
                },
                changepassword: {
                    textKey:MulitLangFile.MulitLang.changepassword,
                    path: '/home/change',
                },
            }
        },
        
        logout: {
            text: 1,
            textKey:MulitLangFile.MulitLang.logout,
            icon: 'sign-out',
            path: '/login',
            type:1
        },
    }
};
class Home extends Component {
    constructor (props) {
        super(props);
        this.login=JSON.parse(ServerAPI.getLoginInfo());
        this.parent={uuid:this.login.uuid,
            alias:this.login.alias,
            userid:this.login.mail,
            path:this.login.logofilepath,
            role:this.login.role
        };
     
        this.state = {
            activeProj: 'Project',
            activeLayer1: 'Layer1',
            activeLayer2: 'Layer2',
            loadacuuount:'true',
            accountuuid:(this.login.uuid),
            // logopath:(this.login.logofilepath&&this.login.logofilepath.includes('upload'))?'api/files/'+this.login.logofilepath:'./img/logo.png',
            logopath:(this.login.logofilepath)?this.login.logofilepath:defaultLogo,//old menu use
            imagesrc:defaultLogo,
            aliasname:(this.login.alias),
            displayInstallWizard: false,
            person:parent,
            parentlogo:defaultLogo
        };
        this.accountInfo = {
            userName: ''
        };
        this.env = {
            menuTable: {},
            menuExpandTable: {
                Project: {}
            },
            minibar: false,
            language:'',
            currentPath: '',
            nextPath: '',
            accountList:'',
            SITESHOWLIMIT: 10
        };
        this.env['language'] = MulitLangFile.getLanguage;
//         if(!AccountAPI.check())
//         {
//             AccountAPI.logout();
//         }
//         else
//         {
            this.initHome();
//         };

        // this.env['accountList'] = {
        //     "adminlist": [
        //         {
        //             "alias": "Galaxy",
        //             "uuid": "Galaxy@gmail.com"
        //         },
                // {
                //     "alias": "Admin2",
                //     "uuid": "7b40b182-e384-45ed-8289-6220b9ee6247"
                // },
                // {
                //     "alias": "Admin3",
                //     "uuid": "d7b3d8ab-5bd4-477f-904b-869dbcb11e70"
                // }
        //     ],
        //     "alias": "Admin"
        // }
        this.queryaccount=this.queryaccount.bind(this);
        this.doLogoFetch=this.doLogoFetch.bind(this);
    };

    queryaccount(entry) {
        // let mail=e.target.value;
        console.log('queryaccount value='+JSON.stringify(e.target.value)+",path="+menuTable.Project.account.path);
           this.env.nextPath = menuTable.Project.account.path;
           //this.env.menuExpandTable[Object.keys(menuTable)[0]][Object.keys(menuTable.Project)[0]]=true;
           this._changeActiveHandler(Object.keys(menuTable)[0],Object.keys(menuTable.Project)[0]);
           console.log('queryaccount menuExpandTable='+JSON.stringify(this.env.menuExpandTable));
           this.setState({accountuuid:e.target.value.uuid,
                            aliasname:e.target.value.alias,
                            person:entry});
           //location.hash = menuTable.Project.account.path;
           hashHistory.push(menuTable.Project.account.path);
           this.doLogoFetch(entry.path,'old');
    }

    queryaccountnew(entry,type){
        console.log('queryaccountnew value='+JSON.stringify(entry)+",path="+menuTable.Project.account.path);
        this.env.nextPath = menuTable.Project.account.path;
        //this.env.menuExpandTable[Object.keys(menuTable)[0]][Object.keys(menuTable.Project)[0]]=true;
        this._changeActiveHandler(Object.keys(menuTable)[0],Object.keys(menuTable.Project)[0]);
        console.log('queryaccount menuExpandTable='+JSON.stringify(this.env.menuExpandTable));
        this.setState({accountuuid:entry.uuid,
                         aliasname:entry.alias,
                         person:entry});
        //location.hash = menuTable.Project.account.path;
        hashHistory.push(menuTable.Project.account.path);
        this.doLogoFetch(entry.path,type);
    }

    componentWillMount () {
        console.log('home componentWillMount');
        this.doFetch();
       
        this.env['menuTable'] = menuTable;
        // Object.keys(this.env.menuTable).map((proj) => {
        //     Object.keys(this.env.menuTable[proj]).map((entry) => {
        //         if (this.env.menuTable[proj][entry].sub_menu)
        //         {
        //             this.env.menuExpandTable[proj][entry] = ((proj == 'Project') && (entry == 'Layer1'))? true: false;
        //         }
        //     });
        // });

        Object.keys(this.env.menuTable).map((proj) => {
            Object.keys(this.env.menuTable[proj]).map((entry) => {
      
               // console.log("componentWillMount entry="+entry+","+(((proj == 'Project') && (entry == 'Layer1'))? true: false));
                this.env.menuExpandTable[proj][entry] = ((proj == 'Project') && (entry == 'Layer1'))? true: false;
                
            });
        });
      
    };
    componentDidMount () {
        StorageData.set('homeThis', this);
    };
    componentWillReceiveProps (nextProps) {
        console.log('home, componentWillReceiveProps nextPath='+this.env.nextPath);
        if (nextProps.children != this.props.children)
        {
            if (this.env.currentPath != this.env.nextPath)
            {
                this.env.currentPath = this.env.nextPath;
                this.dataUpdate();
            }
        }
    };
    render () {
        console.log("render Home"+JSON.stringify(MulitLangFile.MulitLang.TSCManager)+ ",language="+this.env['language']+((this.env.nextPath == menuTable.Project.account.path)?+',uuid='+this.state.accountuuid:''));
        return (
            <div 
                className={
                    classNames({
                        'home-wrapper': true, 
                        'minibar': this.env.minibar
                    })
                }
            >
                
                <div className='home-content' ref='content'>
                    <div className="home-leftside-bg" >
                        <div className='home-leftside' >
                            {/* {this.showLeftContent()} */}
                            {this.showLeftNewContent()}
                            {this.showMenu(0,true)}
                    {/* {(this.env['minibar'])?<div style={{'height':'calc(100vh - 672px)'}}></div>:
                    <div style={{'height':'calc(100vh - 1008px)'}}></div>}                */}
                    {this.showMenu(1,true)}
                        </div>
                    </div>
                    <div className='home-rightside'>
                        {
                            (this.props.children)?
                                React.cloneElement(this.props.children,  {language: this.env['language'],accountuuid:(this.env.nextPath == menuTable.Project.account.path )?this.state.accountuuid:''}) : this.props.children
                        }
                    </div>
                </div>
                <Navbar fluid className='home-topbar'>
                     {this.state.displayInstallWizard ? this.showInstallWizardWindow() : []} 
                    <div className='home-topbar-bar'  onClick={() => {this._toogleHandler()}} >
                        <FontAwesome name='bars' fixedWidth />
                    </div>
                    <div className='home-topbar-title'  style={{'vertical-align': 'middle'}}>
                        {this.showTitle()}
                    </div>
                   
                    {/* <Nav className='home-topbar-tools'>
                        {this.showTopbarLanguages()}
                        {this.showTopbarUser()}
                    </Nav> */}
                </Navbar>
                <div className="home-bottombar">
        
                    <div>{MulitLangFile.MulitLang.TSCManager[this.env['language'] ]}: {process.env['VERSION']}</div>
                    <div>{process.env['COPYRIGHT']}</div>
                </div>
            </div>
        );
    };
    componentDidUpdate () {
        console.log('home, componentDidUpdate');
        StorageData.set('homeThis', this);
    };

    dataUpdate () {
        console.log('dataUpdate =', this.state.activeProj, 'layer1= ', this.state.activeLayer1, 'layer2= ', this.state.activeLayer2);
    };

    showInstallWizardWindow () {
        let content = [];
        content.push(
            <div 
                className={
                    classNames({
                        'block-window': true,
                        'expand': true//this.state['displayInstallWizard']
                    })
                }
            >
                <InstallWizard 
                    mail={this.state.mail}
                    mode="changepwd"
                    onComplete={e => {this.setState({displayInstallWizard: false});}}
                />
            </div>
        );
        return content;
    };

    showTitle()
    {
        try
        {
            if(this.env.currentPath&&menuTable&&this.env.currentPath.length>1)
        {
            let strPath = this.env.currentPath.substring(1,this.env.currentPath.length).split('/');
            let strPathLenght = strPath.length;
            // console.log("showTitle strPathLenght"+strPathLenght+",strPath="+strPath);
            let content = [];
            if(strPathLenght==2)
            {
                //  console.log("showTitle ="+JSON.stringify(menuTable['Project'][strPath[1]]));
                content.push(
               
                    // <div >
                    <strong>{MulitLangFile.MulitLang[menuTable['Project'][strPath[1]].textKey[this.env['language'] ]]}</strong>
                    // </div> 
                 
                )
            }
            return content;
        }
        }catch(e){console.log('showTitle error '+e.message);}
        
        
    }

    showTopbarAlerts () {
        let content = [];
        // TODO: topbar alert
        content.push(
            <NavDropdown noCaret className='home-topbar-tools-alerts' 
                title={
                    <div>
                        {
                            (this.alertData.unread_count)?
                            <div className='home-topbar-alerts-count'>{this.alertData.unread_count}</div>
                            :[]
                        }
                        <FontAwesome name='envelope-o' fixedWidth />
                    </div>
                }
            >
                {this.showAlerts()}
                <MenuItem divider />
                <MenuItem className='text-center'>
                    <strong>See All Alerts</strong>
                </MenuItem>
            </NavDropdown>
        );
        return content;
    };
    showTopbarLanguages () {
        let content = [];
        //let data = Lang.getList();
        let data = MulitLangFile.getList();
        content.push(
            <NavDropdown 
                noCaret 
                className='home-topbar-tools-languages'
                title={<FontAwesome name='globe' fixedWidth />}
            >
                {
                    Object.keys(data).map((entry) => (
                        <MenuItem onClick={() => {this._languageHandler(entry)}} >
                            <Image src={`./flag/${entry}.png`} />
                            &nbsp;{data[entry]}
                        </MenuItem>
                    ))
                }
            </NavDropdown>
        );
        return content;
    };
    showTopbarUser () {
        let content = [];
        content.push(
            <NavDropdown 
                noCaret 
                className='home-topbar-tools-user' 
                title={
                    <FontAwesome name='ellipsis-v' fixedWidth />
                }
            >
                <MenuItem onClick={() => {this._logoutHandler();}}>
                    <span>{MulitLangFile.MulitLang.logout[this.env['language'] ]}</span>
                </MenuItem>
            </NavDropdown>
        )
        return content;
    };
    showLeftContent () {
        
        let content = [];
        console.log("is show logo path="+this.login.logofilepath+',show path='+(this.state.logopath));
        content.push(
            <div>
                <div className='home-leftside-info clearfix'>
                    <div className='home-leftside-info-logo'>
                        {
                            (this.env['minibar'])?
                            (
                                <div className='profile_pic'>
                                    <Image className='img-rect profile_img' src={this.state.logopath}
                                    onError={(e)=>{e.target.onError = null; e.target.src="./img/logo.png"}}/>
                                </div>
                            ): []
                        }
                        <span>{`${MulitLangFile.MulitLang.TSC[this.env['language'] ]} ${MulitLangFile.MulitLang.manager[this.env['language'] ]}`}</span>
                    </div>
                    <div className="clearfix"></div>
                    <div className='home-leftside-info-profile'>
                        <div className='profile_pic'>
                            <Image className='img-rect profile_img' src={this.state.logopath} 
                            onError={(e)=>{e.target.onError = null; e.target.src="./img/logo.png"}} />
                        </div>
                        <div className='profile_info'>
                            <span>{MulitLangFile.MulitLang.hi[this.env['language'] ]}</span>
                            <h2>{this.login.alias}</h2>
                        </div>
                    </div>
                   
                </div>
                {this.showMenu(0,false)}
                {(this.env['minibar'])?<div style={{'height':'calc(100vh - 672px)'}}></div>:
                <div style={{'height':'calc(100vh - 548px)'}}></div>}   
                {this.showMenu(1,false)}
            </div>
        );
    
        return content;
    };


    showLeftNewContent ()
    {
        
            // console.log("showLeftNewContent show logo path="+this.login.logofilepath+',show path='+(this.state.logopath));//no use
             let content_info = [];
            let infoImg = '', infoLayer = '', infoName = '';
            if (this.env['ctrlUuid'] == this.env['siteUuid']) 
            {
                infoLayer = 'text75';
                infoImg ='';// ('' == this.controllerInfo.image)? '' : `${ServerAPI.storageDomain}${this.controllerInfo.image}?${Date.now()}`;
                infoName ='infoName';// (16 <= this.controllerInfo.name.length)? `${this.controllerInfo.name.slice(0,12)} ...`:`${this.controllerInfo.name}`;
            }
            else
            {
                infoLayer = 'text114';
            
            }
            content_info.push(
                <div className='home-leftside-info' style={{'background-color':(this.state.accountuuid==this.login.uuid)?'#408080':'#930000'}}>
                    <div style={{width:'100%','text-align':'center',color:'#fff','padding-top':'15px',display:(this.env.minibar)?'none':'block'}} > 
 
                        <span style={{width:'100%','text-align':'center'}}><b style={{'font-size': '24px'}}>{`${MulitLangFile.MulitLang.TSC[this.env['language'] ]} ${MulitLangFile.MulitLang.manager[this.env['language'] ]}`}</b></span>
                    </div>
                    <div className='home-leftside-info-img'>
                        {/* {
                            ('' == infoImg)?
                            <FontAwesome name='user-circle-o' fixedWidth/> : <Image src={infoImg} circle />
                        } */}
                        <Image src={this.state.imagesrc} circle  onError={(e)=>{console.log("Image onError");e.target.onError = null; e.target.src="./img/logo.png"}}/>
                    </div>
                   
                    <div className='home-leftside-info-text'>
                        <p style={{'text-transform':'capitalize'}}> {(this.state.person.role&&this.state.person.role.toLowerCase()=='rootadmin')?'Root Admin':this.state.person.role}</p>
                       
                        <div className='layer-selector'>
                            
                            <DropdownButton 
                                title={(this.env.minibar)?[]:<span>{this.state.aliasname}</span>}
                            >
                               
                                <MenuItem onClick={()=>{
                                     let homeThis = StorageData.get('homeThis');
                                    this.queryaccountnew(homeThis.parent,'self');
                                    }}>
                                    <img src={this.state.parentlogo}  onError={(e)=>{e.target.onError = null; e.target.src="./img/logo.png"}}/>
                                    {this.login.alias}
                                </MenuItem>
                                <MenuItem divider />
                                {
                                    (()=>{
                                        let content_siteOptions = [];
                                        if (this.env['accountList']) {
                                            console.log(' show accountList data '+((!this.env['accountList'].data)?'0':this.env['accountList'].data.length));
                                            this.env['accountList'].data.map((entry) => {
                                                (this.login.uuid!=entry.uuid&&entry.role.toLowerCase!='operator')?content_siteOptions.push(
                                                    <MenuItem   onClick={()=>{this.queryaccountnew(entry,'other');}}><FontAwesome name='user'  fixedWidth className='icons' />{entry.alias}</MenuItem>
                                                ):[];
                                            })
                                        }
                                        else
                                        {
                                            console.log('accountList data length greater than '+this.env.SITESHOWLIMIT+",length="+((!this.env['accountList'].data)?'0':this.env['accountList'].data.length));
                                            if(this.env['accountList']&&this.env['accountList'].data)
                                            {
                                               for(let i=0; i<Math.min(this.env.SITESHOWLIMIT, this.env['accountList'].data.length); i++)
                                                {
                                                    (this.login.uuid!=this.env['accountList'].data[i].uuid)&&this.env['accountList'].data[i].role.toLowerCase!='operator'?content_siteOptions.push(
                                                        <MenuItem onClick={()=>{this.queryaccountnew(this.env['accountList'].data[i],'other');}}><FontAwesome name='sitemap' rotate={270} fixedWidth className='icons' />{this.env['accountList'].data[i].alias}</MenuItem>
                                                    ):[];
                                                }; 
                                            }
                                            //no use
                                            {/* content_siteOptions.push(
                                                <MenuItem onClick={()=>{this._navHandler('siteList');}}><FontAwesome name='' rotate={270} fixedWidth className='icons' />{`... text872`}</MenuItem>
                                            ); */}
                                        }
                                        return content_siteOptions;
                                    })()
                                }
                               
                                {/* {
                                    (()=>{
                                        let content_siteAdder = [];
                                        if (this.env.userInfo&&3 != this.env.userInfo['role']) {
                                            content_siteAdder.push(
                                                <MenuItem divider />
                                            );
                                            content_siteAdder.push(
                                                <MenuItem onClick={()=>{this._navHandler('addsite');}}><FontAwesome name='plus' fixedWidth className='icons' />{Lang.showText(180)}</MenuItem>
                                            );
                                        };
                                        return content_siteAdder;
                                    })()
                                } */}
                            </DropdownButton>
                      
                        </div>
                    </div>
                    
                </div>
            );
          
        return content_info;
    }
    


    showMenu (type,isnew) {
        let content = [];
        let data = menuTable;
        // console.log('type='+type+',loadacuuount='+this.state.loadacuuount+',minibar'+this.env['minibar']+',accountList='+(JSON.stringify(this.env['accountList'])));
        content.push(
            <div className='clearfix menu-content'>
            {
                Object.keys(data).map((project) => {
                    let content_menu = [];
                   

                    {/* if(type==0)content_menu.push(
                        <div className='menu-category'>{project}</div>
                    ); */}
        
                     if(type==0&&!this.env['minibar']&&!isnew){
                     
                        content_menu.push(this.state.loadacuuount?
                        <div className='menu-category'>
                        <FormControl  
                        componentClass='select' 
                        onChange={this.queryaccount.bind(this)} 
                        ref='queryaccount'
                        value={this.state.accountuuid}
                        style={{'background-color':'#69839c',color:'white'}}
                        >
                            {
                                (this.env['accountList'].data)?this.env['accountList'].data.map((entry) => (
                                    (entry.role!='operator')?<option value={entry} style={{'background-color':'#69839c',color:'white'}}>{entry['alias']}</option>:[]
                                )):[]
                            }
                        </FormControl>
                            </div>:[]
                        
                        );
                     }
                    content_menu.push(
                        Object.keys(data[project]).map((layer1) => {
                            {/* console.log("layer1="+layer1+",textKey="+JSON.stringify(data[project][layer1].textKey)); */}
                            return (
                                ((data[project][layer1].path=='/home/administration')&&data[project][layer1].type==type&&(this.login.uuid!=this.state.accountuuid))?[]
                              
                                :(!data[project][layer1].sub_menu&&data[project][layer1].type==type)?
                                (
                                    <Panel 
                                        onClick={() => {this._changeActiveHandler(project, layer1)}} 
                                        className={classNames({
                                            'cssController':(this.state.accountuuid==this.login.uuid)?true:false,
                                            'cssSite':(this.state.accountuuid==this.login.uuid)?false:true,
                                            'menu-content-layer-1': true, 
                                            'active': ((project == this.state.activeProj) && (layer1 == this.state.activeLayer1))? true:false
                                        })} 
                                        header={
                                            <Link 
                                                onClick={(e) => {
                                                    if(data[project][layer1].path=='/login')
                                                    {
                                                        this.setState({displayInstallWizard:false});
                                                        this._logoutHandler();
                                                    }
                                                    else
                                                    {
                                                        if(this.state.displayInstallWizard){
                                                            this.setState({displayInstallWizard:false});
                                                         }
                                                        this.env.nextPath = data[project][layer1].path;
                                                         this._changeActiveHandler(project, layer1);
                                                    }
                                                      
                                                    console.log("nextPath="+ data[project][layer1].path);
                                                }}
                                              
                                                to={`${data[project][layer1].path}`}>
                                                <div>
                                                    <FontAwesome name={data[project][layer1].icon} className='icon' rotate={('sitemap' == data[project][layer1].icon)? 270:0} fixedWidth/>
                                                
                                                    <span className='title-wrapper'><span className='title'>&nbsp;{data[project][layer1].textKey[this.env['language'] ]}</span></span>
                                                </div>
                                            </Link>
                                        }
                                    />
                                ):(data[project][layer1].sub_menu&&data[project][layer1].type==type&&data[project][layer1].sub_menu.setting&&this.login.uuid!=this.state.accountuuid)?[]
                                :(data[project][layer1].sub_menu&&data[project][layer1].type==type)?
                                (
                                    <Panel collapsible 
                                        onClick={() => {
                                            this._changeActiveHandler(project, layer1);}
                                            } 
                                        expanded={this.env.menuExpandTable[project][layer1]} 
                                        className={classNames({
                                            'menu-content-layer-1': true, 
                                            'active': ((project == this.state.activeProj) && (layer1 == this.state.activeLayer1))? true:false
                                        })} 
                                        header={
                                            <Link
                                            onClick={(e) => {
                                                   
                                                if(this.state.displayInstallWizard){
                                                  this.setState({displayInstallWizard:false});
                                                }
                                                if(data[project][layer1].path){
                                                     this.env.nextPath = data[project][layer1].path;
                                                     hashHistory.push(data[project][layer1].path);    
                                                    console.log("nextPath submenu="+ data[project][layer1].path);
                                                }
                                                
                                                }}
                                            >
                                                <div>
                                                    <FontAwesome name={data[project][layer1].icon} className='icon' fixedWidth/>
                                                
                                                    <span className='title-wrapper'><span className='title'>&nbsp;{data[project][layer1].textKey[this.env['language'] ]}</span></span>
                                                    <FontAwesome name={(this.env.menuExpandTable[project][layer1])? 'chevron-down':'chevron-left'} className='expand-btn' fixedWidth/>
                                                </div>
                                            </Link>
                                        }
                                    >
                                        {
                                            Object.keys(data[project][layer1].sub_menu).map((layer2) => {
                                                return (
                                                    (data[project][layer1].sub_menu[layer2].path=='/home/create'&&(this.login.uuid!=this.state.accountuuid))?[]:
                                                    (data[project][layer1].sub_menu[layer2].path=='/home/create'&&(this.login.role!='root'&&this.login.role!='rootadmin'))?[]:
                                                    (data[project][layer1].sub_menu[layer2].path=='/home/setting'&&this.login.uuid!=this.state.accountuuid)?[]:
                                                    (data[project][layer1].sub_menu[layer2].path=='/home/change'&&this.login.uuid!=this.state.accountuuid)?[]
                                                    :<Link 
                                                        onClick={(e) => {
                                                            // stop event bubbling
                                                            if (e.stopPropagation) {    // standard
                                                                e.stopPropagation();
                                                            } else {    // IE6-8
                                                                e.cancelBubble = true;
                                                            }
                                                             if(data[project][layer1].sub_menu[layer2].path=='/home/change')
                                                                {
                                                                    this.setState({displayInstallWizard:true});
                                                                }else{
                                                                    if(this.state.displayInstallWizard){
                                                                        this.setState({displayInstallWizard:false});
                                                                    }
                                                                }
                                                            
                                                            this.env.nextPath = data[project][layer1].sub_menu[layer2].path;
                                                            this._changeActiveHandler(project, layer1, layer2);
                                                            }}
                                                        to={`${data[project][layer1].sub_menu[layer2].path}`}
                                                    >
                                                        <div 
                                                            className={classNames({
                                                                'menu-content-layer-2': true, 
                                                                'active': ((project == this.state.activeProj) && (layer2 == this.state.activeLayer2))? true:false
                                                            })} 
                                                        >
                                                    
                                                            <span className='title' style={{'font-size':'14px',width:'100%'}}>&nbsp;{data[project][layer1].sub_menu[layer2].textKey[this.env['language'] ]}</span>
                                                        </div>
                                                    </Link>
                                                );
                                            })
                                        }
                                    </Panel>
                                )
                                : []
                            );
                        })// Layer1
                    );// content_menu.push
                    
                    return content_menu;
                })// Projects
            }
            </div>
        );// content.push
        return content;
    };

    initHome () {
        // this.env.currentPath = '/home/template/lyric';
        // this.env.nextPath = '/home/template/lyric';
        // hashHistory.push('/home/template/lyric');
         this.env.currentPath = '/home/account';
         this.env.nextPath = '/home/account';
         hashHistory.push('/home/account');
        //  this.env.currentPath = '/home/welcome';
        //  this.env.nextPath = '/home/welcome';
         
        //  hashHistory.push('/home/welcome');
         console.log('initHome');
         
    };


    doFetch () 
    {
        
        this.setState({accountuuid:this.login.uuid},function(){
            console.log('GetAccounts accountuuid='+this.state.accountuuid+",login.uuid="+this.login.uuid);
        });
        this.doLogoFetch (this.state.logopath,'self') ;
        console.log('Home login='+JSON.stringify(this.login));
        
        var result = GetAccounts.getAccountList(this.login.uuid);
        // console.log('Welcome uuid='+login.uuid);

        result.then((res) => {
            let homeThis = StorageData.get('homeThis');
            if (ServerAPI.errorCodeCheck(res)) 
            {
                
                // ServerAPI.saveUserInfo(res);
               if(!res.data){
                   if(res.message){
                    alert(res.message);
                   }
                //    else
                //         alert('get child fail');
               }else
               {
                    res.data.unshift(homeThis.parent);
                    this.env['accountList']=res;
                      console.log('GetAccountManagers res='+JSON.stringify(this.env['accountList']));
                
                // console.log('GetAccounts res='+JSON.stringify(this.env['accountList'].adminlist[0]));
                // hashHistory.push('/home/realtime/devices/lyric');
               }
               
                 this.setState({loadacuuount:'false',person:homeThis.parent});
    
            }

        });
    }


    doLogoFetch (path,type) 
    {
        
        console.log('doLogoFetch path='+path);
        if(!path||path==''||path==defaultLogo||!path.includes('upload'))
        {
            this.setState({imagesrc:defaultLogo});
            return
        }
        if(path.includes('upload')){
            var result = GetLogo.getLogo(path);
            
            result.then((res) => {
                console.log('GetLogo res='+(res?'size='+res.size+',type='+res.type:'undefine'));
                if (ServerAPI.errorCodeCheck(res)) 
                {
                    this.blobtoDataURL(res, function (dataURL){
                        let homeThis = StorageData.get('homeThis');
                        switch(type){
                            case 'self':
                                homeThis.setState({imagesrc:dataURL,
                                    parentlogo:dataURL  });
                            break
                            default:
                            // if(this.state.uuid==)
                             homeThis.setState({imagesrc:dataURL});
                            break
                        }
                       
      
                    });
                    // ServerAPI.saveUserInfo(res);
                  
                   
                  
                }
    
            });
        }
     
        
    }

    blobtoDataURL(blob, callback) {
        var fr = new FileReader();
        fr.onload = function(e) {
            callback(e.target.result);
        };
        fr.readAsDataURL(blob);
    }

    _toogleHandler () {
        this.env['minibar'] = !this.env['minibar'];
        if (this.env['minibar'])
        {
            // if minibar is on, expand menu is now allowed.
            Object.keys(this.env.menuExpandTable).map((proj) => {
                Object.keys(this.env.menuExpandTable[proj]).map((entry) => {
                    this.env.menuExpandTable[proj][entry] = false;
                });
            });
        }
        this.forceUpdate();
    };
    _languageHandler (language) {
        //Lang.setLanguage(language);
        MulitLangFile.setLanguage(language);
        this.env['language'] = language;
    };
    _settingsHandler () {
        this.env.nextPath = '/home/settings/general';
        hashHistory.push('/home/settings/general');
    };
    _logoutHandler () {
        //hashHistory.push('/login');
    
         AccountAPI.logout();
    };

    _changeActiveHandler (nextProj, nextActiveLayer1, nextActiveLayer2) {
        let activeProj = '', activeLayer1 = '', activeLayer2 = '';
        activeProj = nextProj;
        if (nextActiveLayer1) 
        {
            activeLayer1 = nextActiveLayer1;
            if (nextActiveLayer2)
            {
                activeLayer2 = nextActiveLayer2;
                if (this.env['minibar'])
                {
                    // if minibar is on, expand menu is now allowed.
                    Object.keys(this.env.menuExpandTable).map((proj) => {
                        Object.keys(this.env.menuExpandTable[proj]).map((entry) => {
                            this.env.menuExpandTable[proj][entry] = false;
                        });
                    });
                }
            }
            else
            {
                Object.keys(this.env.menuExpandTable).map((proj) => {
                    Object.keys(this.env.menuExpandTable[proj]).map((entry) => {
                        if ((nextProj == proj) && (nextActiveLayer1 == entry))
                        {
                            this.env.menuExpandTable[proj][entry] = !this.env.menuExpandTable[proj][entry];
                        }
                        else
                        {
                            this.env.menuExpandTable[proj][entry] = false;
                        }
                    });
                });
            };
        };
        this.setState({
            activeProj: activeProj,
            activeLayer1: activeLayer1,
            activeLayer2: activeLayer2
        });
    };

    
};

export default Home;