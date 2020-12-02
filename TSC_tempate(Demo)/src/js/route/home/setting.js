import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel,Label, Button,HelpBlock,Panel
} from 'react-bootstrap';
import PageTitile from '../../component/pageTitle.js';
/* component */
import { homepageUpdateFn } from './home.js';
/* common */
// import Lang from '../../common/languages.js';
import FontAwesome from 'react-fontawesome';
import MulitLangFile from '../../common/multiLang.js';
import StorageData from '../../common/storageData.js';
import ServerAPI from '../../backendAPI/server.js';
import CreateAccount from '../../backendAPI/CreateAPI.js';
const Length={name:{min:1,max:98},password:{min:6,max:98}};
 const styleLabel={'text-align':'right','vertical-align': 'middle'};//{ color: "#000",display:'inline-block',width:'30%' };
const stylecontrol={width:'70%','padding-left':'10px','padding-right':'10px' ,'vertical-align': 'middle'};
const stylemail={ color: "#555" ,width:'70%','margin-left':'10px','padding-left':'10px','padding-right':'10px' ,'vertical-align': 'middle',display:' table-cell'};

const timeformat={yearbefore:{format:'YYYY/MM/DD hh:mm:ss',value:0},yearafter:{format:'MM/DD/YYYY hh:mm:ss',value:1}};

class Setting extends Component {
    

    constructor(props, context) {
        super(props, context);
    
        this.handleChange = this.handleChange.bind(this);
        this.addFile=this.addFile.bind(this);
        this.getImageSize=this.getImageSize.bind(this);
         this.showPassword=this.showPassword.bind(this);
         let login=JSON.parse(ServerAPI.getLoginInfo());
        this.state = {
    
          name: '',
          settingEmail: login.mail,
        //   currentPass:'',
        //   newPass:'',
        //   confirmPass:'',
          language:'US',
          format:'',//0:YYYY/MM/DD hh:mm:ss           1:MM/DD/YYYY hh:mm:ss
          file: '',
          imagePreviewUrl: '',
          zone:'',
          isLoading:true
        };
        this.getSettings(login);
      }


      getSettings (login) 
    {
        
        //this.setState({isLoading:true});
        console.log('getSettings ');
        let result=CreateAccount.getSetting(login.uuid);
        // console.log('Welcome uuid='+login.uuid);
        result.then((res) => {
             console.log("getSettings res="+JSON.stringify(res));
            if(res&&res.alias)
            { 
                   
                  this.setState({settingEmail:res.mail,name:res.alias,language:res.language,format:res.timeformat,zone:res.timezone,isLoading:false});
                //    console.log("getSettings state="+JSON.stringify(this.state));
            }
            else
            {
                //alert('Current password invalid!');
                //if(res&&res.message)alert(res.message);
                //else
                alert('get Setting Fail.');
                this.setState({isLoading:false});
            }
        });
    }

      componentWillReceiveProps (nextProps) {
        console.log("Setting componentWillReceiveProps language="+nextProps.language);
          if(this.language!=nextProps.language)
          {
            this.setState({ language: nextProps.language });
          }

        // if (nextProps.params.project != this.env.project)
        // {
        //     this.env.project = nextProps.params.project;
        //     this.dataUpdate();
        // }
     };
     
      getTheState(value) {

        switch(value)
        {
            case 'name':
            const length1 = this.state.name.length;
            if (length1 >= Length.name*2) return 'success';
            else if (length1 >= Length.name) return 'warning';
            else if (length1 > 0) return 'error';
            return null;
            break;
            // case 'createEmail':
            // const length2 = this.state.createEmail.length;
            // if (this.validateEmail(this.state.createEmail)) 
            //     return 'success';
            // else if (length2 > 0) return 'error';
            //     return null;
            // break;
            case 'password':
            const length3 = this.state.password.length;
            if (length3 >= 10) return 'success';
            else if (length3 >= Length.password) return 'warning';
            else if (length3 > 0) return 'error';
            return null;
            break;
            case 'currentPass':
            const length4 = this.state.currentPass.length;
            if (length4 >= 10) return 'success';
            else if (length4 >= Length.password) return 'warning';
            else if (length4 > 0) return 'error';
            return null;
            break;
            case 'newPass':
            const length5 = this.state.newPass.length;
            if (length5 >= 10) return 'success';
            else if (length5 >= Length.password) return 'warning';
            else if (length5 > 0) return 'error';
            break;
            case 'confirmPass':
            const length6 = this.state.confirmPass.length;
            if (length6 >= 10) return 'success';
            else if (length6 >= Length.password) return 'warning';
            else if (length6 > 0) return 'error';
            break;
        }
       
      }
    
      handleChange(change,e) {
        console.log(`handleChange ${change},value=${e.target.value}`);
          switch(change)
          {
              case 'name':
               this.setState({ name: e.target.value });
              break;
              case 'createEmail':
              this.setState({ createEmail: e.target.value });
              break;
              case 'password':
              this.setState({ password: e.target.value });
              break;
              case 'language':
              this.setState({ language: e.target.value });
             
              break; 
              case 'format':
              this.setState({ format: e.target.value });
              break;
              case 'currentPass':
              this.setState({ currentPass: e.target.value });
              break;
              case 'newPass':
              this.setState({ newPass: e.target.value });
              break;
              case 'confirmPass':
              this.setState({ confirmPass: e.target.value });
              break;
              case 'zone':
              this.setState({ zone: e.target.value });
              break;
          }
       
      }

      validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

      addFile(e){
        console.log(`file=${e.target.files[0]},value=${e.target.value}`);
        //e.preventDefault();
        let currentComponent = this;
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
            //Get image size for image.
            this.getImageSize(reader.result, function(imageWidth, imageHeight) {
                //  console.log('getImageSize imageWidth='+imageWidth+',imageHeight='+imageHeight+'\n src='+reader.result);
                 currentComponent.setState({
                file: file,
                imagePreviewUrl: reader.result
                });
            });
          
           
        }
        if(file)reader.readAsDataURL(file)
    }

    getImageSize(imageURL, callback) {      
        // Create image object to ascertain dimensions.
        var image = new Image();
     
        // Get image data when loaded.
        image.onload = function() {      
           // No callback? Show error.
           if (!callback) {
              console.log("Error getting image size: no callback. Image URL: " + imageURL);
     
           // Yes, invoke callback with image size.
           } else {
              callback(this.naturalWidth, this.naturalHeight);
           }
        }
     
        // Load image.
        image.src = imageURL;
     }
    
      render() {
        console.log(`Render setting language=${this.state.language},isLoading=${this.state.isLoading}`);
        return (
        
          <div >
                <Grid  fluid>
                    <Row>
                        <Col md={12}>
                            {/* <PageTitile text={`${'Project'}/${'Layer1'}/${'Layer2'}`} /> */}
                            <PageTitile text={ `${'setting'}`} />
                        </Col>
                    </Row>
                    
                    <Row className=' general-panel'>
                    <div style={{'background-color':'#f5f5f5',padding:'10px','border-top':'1px solid #ddd','border-right':'1px solid #ddd','border-left':'1px solid #ddd'}}><strong style={{'font-weight':'700','height':'16px', 'font-size': '15px',color:'inherit'}}>Setting</strong></div>
                    <Panel>        
                      
                    <Col  md={ 7 } mdOffset={2} >
                    <div className='general-panel-content'>
                    {this.state.isLoading? <span className='accessingTag'><FontAwesome name='spinner' size='lg' pulse />Loading</span>
                        :<form horizontal className='maccountform'  style={{'margin-top':'10px'}}>  
                        <FormGroup
              
                
                            // validationState={this.getTheState('name')}
                        >  
                            {/* <ControlLabel    style={styleLabel} className="col-md-3">{MulitLangFile.MulitLang.aliasName[this.state.language]}</ControlLabel> */}
                            <Col componentClass={ControlLabel} md={3} style={styleLabel}>{MulitLangFile.MulitLang.aliasName[this.state.language]}</Col>
                          
                              
                            <FormControl
                            ref="aliasname"
                            type="text"
                            style={stylecontrol}
                            value={this.state.name}
                            placeholder={MulitLangFile.MulitLang.aliasName[this.state.language]}
                            onChange={this.handleChange.bind(this, 'name')}
                            />
                            {/* <FormControl.Feedback /> */}
                
                        </FormGroup>

                        <FormGroup
                            validationState={this.getTheState('createEmail')}
                        >  
                            {/* <ControlLabel style={styleLabel}>{MulitLangFile.MulitLang.emailAccount[this.state.language]}</ControlLabel> */}
                        <Col componentClass={ControlLabel} md={3}  style={styleLabel}>{MulitLangFile.MulitLang.emailAccount[this.state.language]}</Col>
                             {this.showEmail()}
                            
                
                        </FormGroup>

                            


                             <FormGroup controlId="language_select"   className="form-inline">
                           {/* <ControlLabel style={styleLabel}>Language</ControlLabel> */}
                            <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Language</Col>
                            <FormControl  style={stylecontrol} componentClass="select" placeholder="language"
                            ref="language"
                            style={stylecontrol}
                            value={this.state.language}
                            onChange={this.handleChange.bind(this,'language')}
                            >
                                <option value="" disabled >Language</option>
                                <option value="US">English</option>
                                {/* <option value="TW">繁�?中�?</option> */}
                            </FormControl>
                            </FormGroup>

                            <FormGroup controlId="format_select"   className="form-inline">
                            {/* <ControlLabel style={styleLabel}>Time Format</ControlLabel> */}
							<Col componentClass={ControlLabel} md={3}  style={styleLabel}>Time Format</Col>
                            <FormControl  componentClass="select" placeholder="format"
                            ref="format"
                            style={stylecontrol}
                            value={this.state.format}
                            onChange={this.handleChange.bind(this,'format')}
                            >
                                <option value="" disabled >Time Format</option>
                                <option value={timeformat.yearbefore.value}>{timeformat.yearbefore.format}</option>
                                <option value={timeformat.yearafter.value}>{timeformat.yearafter.format}</option>
                            </FormControl>
                            </FormGroup>

                            
                            <FormGroup controlId="zone_select"   className="form-inline">
                            {/* <ControlLabel style={styleLabel}>Time Zone</ControlLabel> */}
                            <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Time Zone</Col>
                            <FormControl componentClass="select" placeholder="zone" value={this.state.zone}
                             style={stylecontrol}
                                onChange={this.handleChange.bind(this,'zone')}
                                >
                                  <option value="" disabled >Time Zone</option>
                                  <option value='-12'>GMT-12:00</option>
                                  <option value='-11'>GMT-11:00</option>
                                  <option value='-10'>GMT-10:00</option>
                                  <option value='-9'>GMT-09:00</option>
                                 <option value='-8'>GMT-08:00</option>
                                <option value='-7'>GMT-07:00</option>
                                <option value='-6'>GMT-06:00</option>
                                <option value='-5'>GMT-05:00</option>
                                <option value='-4'>GMT-04:00</option>
                                <option value='-3'>GMT-03:00</option>
                                <option value='-2'>GMT-02:00</option>
                                <option value='-1'>GMT-01:00</option>
                                <option value='0'>GMT</option>
                                <option value='+1'>GMT+01:00</option>
                                <option value='+2'>GMT+02:00</option>
                                <option value='+3'>GMT+03:00</option>
                                <option value='+4'>GMT+04:00</option>
                                <option value='+5'>GMT+05:00</option>
                                <option value='+6'>GMT+06:00</option>
                                <option value='+7'>GMT+07:00</option>
                                <option value='+8'>GMT+08:00</option>
                                <option value='+9'>GMT+09:00</option>
                                <option value='+10'>GMT+10:00</option>
                                <option value='+11'>GMT+11:00</option>
                                <option value='+12'>GMT+12:00</option>
                                
                               
                            </FormControl>
                            </FormGroup>
                            {/* <FormGroup controlId="timezone_select" bsSize="large">
                                <TimezonePicker
                                value="Asia/Yerevan"
                                onChange={timezone => console.log('New Timezone Selected:', timezone)}
                                inputProps={{
                                placeholder: 'Select Timezone...',
                                name: 'timezone',
                                }}/>
                            </FormGroup> */}
                           

                            {/* <ImageUpload/> */}
                           
                            
                      
                            {/* {this.showPassword()} */}
                            
                            <FormGroup controlId="image_select" bsSize="large"  className="form-inline">
                            <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Select Logo</Col>
                            <Col componentClass={ControlLabel} style={styleLabel}>
                                <div style={{'text-align':'left'}}>
                                {/* style={{'padding-bottom': '10px'}} */}
                                <ControlLabel htmlFor="fileUpload" >
                                        <h3 >
                                        <Label  bsStyle="success"  style={{'cursor': 'pointer'}} >Browse...</Label>{/* <Label bsStyle="success">Browse...</Label> */}
                                        </h3>
                                        {/* <Label bsStyle="success">Browse...</Label> */}
                                    
                                        <FormControl
                                            ref="upload"
                                            id="fileUpload"
                                            type="file"
                                            accept="image/*"
                                            onChange={this.addFile}
                                            style={{ display: "none" }}
                                        />
                               
                             
                                     </ControlLabel>
                                    
                                {this.showImage()}
                                </div>
                                </Col>
                             </FormGroup>
                             <FormGroup className="form-inline" bsSize='large'>
                                <div className='general-panel-footer'>
                                <Col  mdOffset={8}>
                                    {this.showButton()}
                                </Col>
                                </div> 
                             </FormGroup>
                    </form>
                    }
                    
                    </div>
                    </Col>
                    </Panel> 
                </Row>
               
                <Row>
                    <Col md={ 5 } mdOffset={2}>
                        
                    </Col>
                </Row>
                <Row >      
                    
                        <Col md={3} mdOffset={2}>
                           
                          
                        </Col>
                 
                </Row>             
             
          


              </Grid>
           </div>
            


         
        );
      }

      showEmail(){
        let content = [];
       
            content.push (
                <div style={stylemail}>{this.state.settingEmail}</div>
            
            );
        
        return content;

      }

      showPassword()
      {
        let content = [];
     

            content.push(
                <FormGroup  className="form-inline"
                // validationState={this.getTheState("currentPass")}
                >  
                 {/* <ControlLabel style={styleLabel}>Current Password</ControlLabel> */}
                 <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Current Password</Col>
                    <FormControl
          
                    ref="currentPass"
                    type="password"
                    style={stylecontrol}
                    value={this.state.currentPass}
                    autocomplete="off"
                    placeholder='Current Password'
                    onChange={this.handleChange.bind(this,'currentPass')}
                    />
                {/* <FormControl.Feedback /> */}
    
                 </FormGroup>
            );
            content.push(
                <FormGroup  className="form-inline"
                // validationState={this.getTheState("newPass")}
                >  
                      {/* <ControlLabel style={styleLabel}>New Password</ControlLabel> */}
                      <Col componentClass={ControlLabel} md={3}  style={styleLabel}>New Password</Col>
                    <FormControl
       
                    ref="newPass"
                    type="password"
                    value={this.state.newPass}
                    style={stylecontrol}
                    autocomplete="off"
                    placeholder='New Password'
                    onChange={this.handleChange.bind(this,'newPass')}
                    />
                {/* <FormControl.Feedback /> */}
    
                 </FormGroup>
            );
            content.push(
                <FormGroup className="form-inline"
                // validationState={this.getTheState("confirmPass")}
                >  
                  {/* <ControlLabel style={styleLabel}>Confirm Password</ControlLabel> */}
                  <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Confirm Password</Col>
                    <FormControl
                    ref="confirmPass"
                    type="password"
                    value={this.state.confirmPass}
                    style={stylecontrol}
                    placeholder='Confirm Password'
                    onChange={this.handleChange.bind(this,'confirmPass')}
                    />
                {/* <FormControl.Feedback /> */}
    
                 </FormGroup>
            );
        
        return content;
      }

      showImage()
      {
        let content = [];
        let {imagePreviewUrl} = this.state;
        content.push (<div className="col-notice">(Suggested size: 120*120.)</div>);
        if (imagePreviewUrl) {
            content.push (<div><img circle style={{height:'120px',width:'120px'}} src={imagePreviewUrl}/></div>);
        } else {
            // content.push(<div className="previewText">Please select an Image for Preview</div>);
        }
        return content;
      }

      showButton () {
            let content = [];
            content.push(
                <div>
                    {/* <Button onClick={()=>{this._submitHandler('save');}} bsStyle="success">{Lang.showText(57)}</Button> */}
                    <ControlLabel htmlFor="btnsubmit" >  <h3><Label  bsStyle="success" style={{'cursor': 'pointer'}} >Submit</Label></h3>
                        <Button onClick={()=>{this._submitHandler('submit');}} id='btnsubmit' bsStyle="success" style={{'display':'none'}}>Submit</Button> 
                    </ControlLabel>
                    {/* <Button onClick={()=>{this._redirectHandler('/home/settings/general');}} bsStyle="primary">{Lang.showText(61)}</Button> */}
                </div>
            );
        return content;
    };


    _submitHandler (type) {
        confirm('For Demo Only');
        return;
        switch (type)
        {
            case 'submit':
                if(this._nameValidator())
                {
                    let login=JSON.parse(ServerAPI.getLoginInfo());
                    let data={
                        "uuid": login.uuid,
                        "alias": this.state.name,
                        "mail": this.state.createEmail,
                        // "oldsecurity": this.state.currentPass,
                        // "newsecurity": this.state.newPass,
                        "language": this.state.language,
                        "timeformat": this.state.format,
                        "timezone": this.state.zone
                    };
                    // this.formData.security = ReactDOM.findDOMNode(this.refs[`currentPass`]).value;
                    // this.formData.newsecurity = ReactDOM.findDOMNode(this.refs[`newPass`]).value;
                    let result = CreateAccount.setting(data);
                    result.then((res) => {
                        console.log("Setting res="+JSON.stringify(res));
                        if(res)
                        { 
                            if(res.alias&&res.language)
                            {
                                confirm('Setting Success.');
                                let login=JSON.parse(ServerAPI.getLoginInfo());
                              
                                login.timeformat=res.timeformat;
                                login.timezone=res.timezone;
                                login.alias=res.alias;
                                ServerAPI.saveLoginInfo(JSON.stringify(login));
                                homepageUpdateFn('setting');
                                this._submitlogo(login.uuid);
                               // hashHistory.push('/login');
                            }else
                            {
                                confirm('Setting '+res.result);
                            }
                            
                        }
                        else
                        {
                            //alert('Current password invalid!');
                            if(res&&res.message)alert(res.message);
                            else
                            alert('Setting Fail.');
                        }
                    });
                }
                break;
            default:
                break;
        }
    };

    _submitlogo(uuid)
    {  
        
        if(this.state.imagePreviewUrl.startsWith("data:image/"))
        {
               
                console.log("_submitlogo  uuid="+uuid);

                let blob=this.dataURItoBlob(this.state.imagePreviewUrl);

                console.log('logodata ='+(blob?'size='+blob.size+',type='+blob.type:'undefine'));
                    let result = CreateAccount.putlogo(blob,uuid);
                    result.then((res) => {
                    console.log("Setting logo res="+JSON.stringify(res));
                    if(res&&res.logofilepath)
                    { 
                        if(res.logofilepath&&res.logofilepath.includes('upload'))
                        {
                            confirm('Setting Logo Success.');
                            // this.setState({imagePreviewUrl:res.logofilepath});
                            if(res.logofilepath&&res.logofilepath.includes('upload')){
                                let login=JSON.parse(ServerAPI.getLoginInfo());
                              
                                login.logofilepath=res.logofilepath;
                                ServerAPI.saveLoginInfo(JSON.stringify(login));
                                homepageUpdateFn('logo');
                            }
                           
                            //hashHistory.push('/login');
                        }else
                        {
                            confirm('Setting Logo Fail');
                        }
                        
                    }
                    else
                    {
                        //alert('Current password invalid!');
                        if(res&&res.message)alert(res.message);
                        else
                        alert('Setting logo Fail.');
                    }
                       
                     });
                
                
            
        }
        
    }


    dataURItoBlob(dataURI) {
        // convert base64 to raw binary data held in a string
        // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
        var byteString = atob(dataURI.split(',')[1]);
      
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0]
      
        // write the bytes of the string to an ArrayBuffer
        var ab = new ArrayBuffer(byteString.length);
      
        // create a view into the buffer
        var ia = new Uint8Array(ab);
      
        // set the bytes of the buffer to the correct values
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
      
        // write the ArrayBuffer to a blob, and you're done
        var blob = new Blob([ab], {type: mimeString});
        return blob;
    }  

    _nameValidator () {
        let aliasname = ReactDOM.findDOMNode(this.refs[`aliasname`]).value;
       

            if(!aliasname)
            {
                alert('Please enter Alias Name.');
                return false;
            }
            // let current= ReactDOM.findDOMNode(this.refs[`currentPass`]).value;
            // let newPass= ReactDOM.findDOMNode(this.refs[`newPass`]).value;
            // let confirmPass= ReactDOM.findDOMNode(this.refs[`confirmPass`]).value;
            // if(!current||!newPass||!confirmPass)
            // {
            //     alert('Please enter the password.');
            //     return false;
            // }
            // if(newPass!=confirmPass)
            // {
            //     alert('Password not match.');
            //     return false;
            // }

            // if(Length.password.min > current.length||Length.password.min > newPass.length)
            // {
            //     alert(`Password Minimum : ${Length.password.min} characters.`);
            //     return false;
            // }

            // if(current.length>Length.password.max||newPass.length>Length.password.max)
            // {
            //     alert(`Password Maximum : ${Length.password.max} characters.`);
            //     return false;
            // }
      

            if(Length.name > aliasname.length)
            {
                alert(`Alias Name Minimum : ${Length.name.min} characters.`);
                return false;
            }

            if(aliasname.length>Length.name.max)
            {
                alert(`Alias Name Maximum : ${Length.name.max} characters.`);
                return false;
            }


            if(this.state.zone==''||this.state.format==''||this.state.language=='')
            {
                alert('Please select full parameter.');
                return false;
            }
        
        // if(newPass != conPass)
        // {
        //     alert('New password not match.');
        //     return false;
        // }
      

        // if(3 > aliasname.length)
        // {
        //     alert('Alias Name Minimum : 3 characters.');
        //     return false;
        // }
        
        else
            return true;

    }
};



export default Setting;