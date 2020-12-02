import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import { Link, hashHistory } from 'react-router';
import {
    Navbar, Nav, NavItem, NavDropdown, MenuItem, Panel, Image, DropdownButton
} from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';

/* common */
// import Lang from '../../common/languages.js';

import StorageData from '../../common/storageData.js';
import MulitLangFile from '../../common/multiLang.js';
//import LanguageFile from '../../common/languages.js';

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
    // Project: {
    //     Layer1: {
    //         text: 6,
    //         icon: 'fighter-jet',
    //         sub_menu: {
    //             Layer2: {
    //                 text: 7,
    //                 path: '/home/template/lyric'
    //             }
    //         }
    //     }
    // }

    //type 0:top 1:bottom
    Project: {
        account: {
            text: 8,
            textKey:MulitLangFile.MulitLang.accountManage,
            icon: 'fighter-jet',
            path: '/home/account',
            type:0
        },
        device: {
            text: 9,
            textKey:MulitLangFile.MulitLang.deviceManage,
            icon: 'fighter-jet',
            path: '/home/device',
            type:0
        },
        statistic: {
            text: 10,
            textKey:MulitLangFile.MulitLang.salesStatistic,
            icon: 'fighter-jet',
            path: '/home/statistic',
            type:0
        },
        create: {
            text: 11,
            textKey:MulitLangFile.MulitLang.createAccount,
            icon: 'fighter-jet',
            path: '/home/create',
            type:1
        },
        setting: {
            text: 12,
            textKey:MulitLangFile.MulitLang.setting,
            icon: 'fighter-jet',
            path: '/home/setting',
            type:1
        },
        logout: {
            text: 1,
            textKey:MulitLangFile.MulitLang.logout,
            icon: 'fighter-jet',
            path: '/login',
            type:1
        },
    }
};
class Home extends Component {
    constructor (props) {
        super(props);
        this.state = {
            activeProj: 'Project',
            activeLayer1: 'Layer1',
            activeLayer2: 'Layer2'
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
            nextPath: ''
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
    };
    componentWillMount () {
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
        console.log("render TSCManager"+JSON.stringify(MulitLangFile.MulitLang.TSCManager)+ ",language="+this.env['language'] );
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
                    <div className="home-leftside-bg">
                        <div className='home-leftside'>
                            {this.showLeftContent()}
                        </div>
                    </div>
                    <div className='home-rightside'>
                        {
                            (this.props.children)?
                                React.cloneElement(this.props.children,  {language: this.env['language']}) : this.props.children
                        }
                    </div>
                </div>
                <Navbar fluid className='home-topbar'>
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
        const btmstyle = {
            // position: 'fixed',
            // bottom: '0px',
            height: '40px'
        };
        let content = [];
        content.push(
            <div>
                <div className='home-leftside-info clearfix'>
                    <div className='home-leftside-info-logo'>
                        {
                            (this.env['minibar'])?
                            (
                                <div className='profile_pic'>
                                    <Image className='img-rect profile_img' src='./img/profile.png' />
                                </div>
                            ): []
                        }
                        <span>{`${MulitLangFile.MulitLang.TSC[this.env['language'] ]} ${MulitLangFile.MulitLang.manager[this.env['language'] ]}`}</span>
                    </div>
                    <div className="clearfix"></div>
                    <div className='home-leftside-info-profile'>
                        <div className='profile_pic'>
                            <Image className='img-rect profile_img' src='./img/profile.png' />
                        </div>
                        <div className='profile_info'>
                            <span>{MulitLangFile.MulitLang.hi[this.env['language'] ]}</span>
                            <h2>{MulitLangFile.MulitLang.rootAdmin[this.env['language'] ]}</h2>
                        </div>
                    </div>
                   
                </div>
                {this.showMenu(0)}
                <div style={btmstyle}></div>
                
                {this.showMenu(1)}
                   
              
                
                
            </div>
        );
    
        return content;
    };
    showMenu (type) {
        let content = [];
        let data = menuTable;
        content.push(
            <div className='clearfix menu-content'>
            {
                Object.keys(data).map((project) => {
                    let content_menu = [];
                   

                    if(type==0)content_menu.push(
                        <div className='menu-category'>{project}</div>
                    );
                    content_menu.push(
                        Object.keys(data[project]).map((layer1) => {
                            {/* console.log("layer1="+layer1+",textKey="+JSON.stringify(data[project][layer1].textKey)); */}
                            return (
                                (data[project][layer1].path&&data[project][layer1].type==type)?
                                (
                                    <Panel 
                                        onClick={() => {this._changeActiveHandler(project, layer1)}} 
                                        className={classNames({
                                            'menu-content-layer-1': true, 
                                            'active': ((project == this.state.activeProj) && (layer1 == this.state.activeLayer1))? true:false
                                        })} 
                                        header={
                                            <Link 
                                                onClick={(e) => {
                                                    if(data[project][layer1].path=='/login')
                                                    {
                                                        this._logoutHandler();
                                                    }else
                                                    {
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
                                ): (data[project][layer1].sub_menu&&data[project][layer1].type==type)?
                                (
                                    <Panel collapsible 
                                        onClick={() => {this._changeActiveHandler(project, layer1);}} 
                                        expanded={this.env.menuExpandTable[project][layer1]} 
                                        className={classNames({
                                            'menu-content-layer-1': true, 
                                            'active': ((project == this.state.activeProj) && (layer1 == this.state.activeLayer1))? true:false
                                        })} 
                                        header={
                                            <a>
                                                <div>
                                                    <FontAwesome name={data[project][layer1].icon} className='icon' fixedWidth/>
                                                
                                                    <span className='title-wrapper'><span className='title'>&nbsp;{data[project][layer1].textKey[this.env['language'] ]}</span></span>
                                                    <FontAwesome name={(this.env.menuExpandTable[project][layer1])? 'chevron-down':'chevron-left'} className='expand-btn' fixedWidth/>
                                                </div>
                                            </a>
                                        }
                                    >
                                        {
                                            Object.keys(data[project][layer1].sub_menu).map((layer2) => {
                                                return (
                                                    <Link 
                                                        onClick={(e) => {
                                                            // stop event bubbling
                                                            if (e.stopPropagation) {    // standard
                                                                e.stopPropagation();
                                                            } else {    // IE6-8
                                                                e.cancelBubble = true;
                                                            }
                                                            this.env.nextPath = data[project][layer1].sub_menu[layer2].path;
                                                            this._changeActiveHandler(project, layer1, layer2);}}
                                                        to={`${data[project][layer1].sub_menu[layer2].path}`}
                                                    >
                                                        <div
                                                            className={classNames({
                                                                'menu-content-layer-2': true, 
                                                                'active': ((project == this.state.activeProj) && (layer2 == this.state.activeLayer2))? true:false
                                                            })}
                                                        >
                                                    
                                                            <span className='title'>&nbsp;{data[project][layer1].sub_menu[layer2].textKey[this.env['language'] ]}</span>
                                                        </div>
                                                    </Link>
                                                );
                                            })
                                        }
                                    </Panel>
                                ): []
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
        //  this.env.currentPath = '/home/account';
        //  this.env.nextPath = '/home/account';
        //  hashHistory.push('/home/account');
         this.env.currentPath = '/home/welecom';
         this.env.nextPath = '/home/welecom';
         hashHistory.push('/home/welecom');
    };
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
        hashHistory.push('/login');
//         AccountAPI.logout();
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