import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel,Label, Button,HelpBlock,Panel
} from 'react-bootstrap';
import PageTitile from '../../component/pageTitle.js';
/* component */

/* common */
// import Lang from '../../common/languages.js';
import MulitLangFile from '../../common/multiLang.js';
import StorageData from '../../common/storageData.js';
import ServerAPI from '../../backendAPI/server.js';
import CreateAccount from '../../backendAPI/CreateAPI.js';


const Length={name:{min:1,max:98},password:{min:6,max:98}};
 const styleLabel={'text-align':'right','vertical-align': 'middle'};//{ color: "#000",display:'inline-block',width:'30%' };
const stylecontrol={width:'70%','padding-left':'10px','padding-right':'10px' ,'vertical-align': 'middle'};
const timeformat={yearbefore:{format:'YYYY/MM/DD hh:mm:ss',value:0},yearafter:{format:'MM/DD/YYYY hh:mm:ss',value:1}};
class Create extends Component {
    

    constructor(props, context) {
        super(props, context);
    
        this.handleChange = this.handleChange.bind(this);
        this.addFile=this.addFile.bind(this);
        this.getImageSize=this.getImageSize.bind(this);
         this.showPassword=this.showPassword.bind(this);
        this.state = {
          currentLanguage:props.language,
          name: '',
          createEmail:'',
        //   password:'',
          role:'',
          language:'',
          format:'',
          file: '',
          imagePreviewUrl: './img/logo.png',
          zone:''
        };
     
      }

      componentWillReceiveProps (nextProps) {
        console.log("Create componentWillReceiveProps language="+nextProps.language);
          if(this.currentLanguage!=nextProps.language)
          {
            this.setState({ currentLanguage: nextProps.language });
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
            case 'createEmail':
            const length2 = this.state.createEmail.length;
            if (this.validateEmail(this.state.createEmail)) 
                return 'success';
            else if (length2 > 0) return 'error';
                return null;
            break;
            case 'password':
            const length3 = this.state.password.length;
            if (length3 >= 10) return 'success';
            else if (length3 >= Length.password) return 'warning';
            else if (length3 > 0) return 'error';
            return null;
            break;

        }
       
      }
    
      handleChange(change,e) {
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
              case 'role':
              console.log(`role=${e.target.value}`);
              this.setState({ role: e.target.value });
              break;
              case 'language':
              this.setState({ language: e.target.value });
              console.log("handleChange language="+e.target.value);
              break; 
              case 'format':
              this.setState({ format: e.target.value });
              break;
     
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
                //   console.log('getImageSize imageWidth='+imageWidth+',imageHeight='+imageHeight+'\n src='+reader.result);
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
        console.log(`Create render language=${this.state.currentLanguage}`);
        return (
        
          <div>
                <Grid  fluid>
                
                    <Row>
                        <Col md={12}>
                            {/* <PageTitile text={`${'Project'}/${'Layer1'}/${'Layer2'}`} /> */}
                            <PageTitile text={ `${'create account'}`} />
                        </Col>
                    </Row>
                   
                    <Row  className='general-panel'  >
                    <div style={{'background-color':'#f5f5f5',padding:'10px','border-top':'1px solid #ddd','border-right':'1px solid #ddd','border-left':'1px solid #ddd'}}><strong style={{'font-weight':'700','height':'16px', 'font-size': '15px',color:'inherit'}}>Create Account</strong></div>
                    <Panel >
                    <Col  md={ 7 } mdOffset={2}>
                     <div className='general-panel-content' >
                    <form horizontal className='maccountform' style={{'margin-top':'10px'}}>  
                        <FormGroup
              
                
                            // validationState={this.getTheState('name')}
                        >  
                            {/* <ControlLabel    style={styleLabel} className="col-md-3">{MulitLangFile.MulitLang.aliasName[this.state.currentLanguage]}</ControlLabel> */}
                            <Col componentClass={ControlLabel} md={3} style={styleLabel}>{MulitLangFile.MulitLang.aliasName[this.state.currentLanguage]}</Col>
                          
                              
                                 <FormControl 
                                ref="aliasname"
                                size='2x'
                                style={stylecontrol}
                                type="text"
                                value={this.state.name}
                                placeholder={MulitLangFile.MulitLang.aliasName[this.state.currentLanguage]}
                                onChange={this.handleChange.bind(this, 'name')}
                                />
                      
                                
                        
                            
                            {/* <FormControl.Feedback /> */}
                
                        </FormGroup>

                        <FormGroup
                            // validationState={this.getTheState('createEmail')}
                        >  
                            {/* <ControlLabel style={styleLabel} className="col-md-3">{MulitLangFile.MulitLang.emailAccount[this.state.currentLanguage]}</ControlLabel> */}
                            <Col componentClass={ControlLabel} md={3}  style={styleLabel}>{MulitLangFile.MulitLang.emailAccount[this.state.currentLanguage]}</Col>
                             {this.showEmail()}
                            
                             
                            
                
                        </FormGroup>
                        
                           
                            {/* {this.showPassword()} */}

                         <FormGroup controlId="role_select"  className="form-inline">
                               {/* <ControlLabel style={styleLabel} className="col-md-3">Role</ControlLabel> */}
                               <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Role</Col>
                            <FormControl   style={stylecontrol} componentClass="select" placeholder="Role" 
                            ref="role"
                            value={this.state.role}
                            //  inputRef={this.handleChange.bind(this,'role')}
                            onChange={this.handleChange.bind(this,'role')}
                            >
                                 <option value="" disabled >Role</option>
                                <option value="admin" >{MulitLangFile.MulitLang.admin[this.state.currentLanguage]}</option>
                                {/* <option value="operator">{MulitLangFile.MulitLang.operator[this.state.currentLanguage]}</option> */}
                            </FormControl>
                            </FormGroup>
                            
                            


                            <FormGroup controlId="language_select"   className="form-inline">
                           {/* <ControlLabel style={styleLabel} className="col-md-3">Language</ControlLabel> */}
                           <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Language</Col>
                            <FormControl style={stylecontrol} componentClass="select" placeholder="language"
                            ref="language"
                            //  inputRef={this.handleChange.bind(this,'role')}
                            value={this.state.language}
                            onChange={this.handleChange.bind(this,'language')}
                            >
                                <option value="" disabled >Language</option>
                                <option value="US">English</option>
                                {/* <option value="TW">ÁπÅÈ?‰∏≠Ê?</option> */}
                            </FormControl>
                            </FormGroup>

                            <FormGroup controlId="format_select"   className="form-inline">
                            {/* <ControlLabel style={styleLabel} className="col-md-3">Time Format</ControlLabel> */}
                            <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Time Format</Col>
                            <FormControl style={stylecontrol} componentClass="select" placeholder="format"
                            ref="format"
                            //  inputRef={this.handleChange.bind(this,'role')}
                            value={this.state.format}
                            onChange={this.handleChange.bind(this,'format')}
                            >
                                <option value="" disabled >Time Format</option>
                                <option value={timeformat.yearbefore.value}>{timeformat.yearbefore.format}</option>
                                <option value={timeformat.yearafter.value}>{timeformat.yearafter.format}</option>
                            </FormControl>
                            </FormGroup>

                            
                            <FormGroup controlId="zone_select" className="form-inline">
                            {/* <ControlLabel style={styleLabel} className="col-md-3">Time Zone</ControlLabel> */}
                            <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Time Zone</Col>
                            <FormControl style={stylecontrol} componentClass="select" placeholder="zone" value={this.state.zone}
                            //  inputRef={this.handleChange.bind(this,'role')}
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
                            
                            <FormGroup controlId="image_select" bsSize="large" className="form-inline">
                            
                            <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Select Logo</Col>
                            <Col componentClass={ControlLabel}  style={styleLabel}>
                            {/*  style={{'padding-bottom': '10px'}} */}
                                <div style={{'text-align':'left'}}>
                                <ControlLabel htmlFor="fileUpload" >
                                        <h3>
                                        <Label  bsStyle="success" style={{'cursor': 'pointer'}} >Browse...</Label>{/* <Label bsStyle="success">Browse...</Label> */}
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


                              <FormGroup  bsSize="large">
                                
                                <div className='general-panel-footer'>
                                <Col mdOffset={8}>
                                    {this.showButton()}
                                </Col>
                                </div> 
                             </FormGroup>
                            
                    </form>
                    </div>
                    </Col>
                    </Panel>
                </Row>
               
               
                      
          


              </Grid>
           </div>
            


         
        );
      }

      showEmail(){
        let content = [];

            content.push (
               
                    <FormControl 
                    ref="email"
                    type="text"
                    style={stylecontrol}
                    value={this.state.createEmail}
                    placeholder={MulitLangFile.MulitLang.emailAccount[this.state.currentLanguage]}
                    onChange={this.handleChange.bind(this,'createEmail')}
                    >
                    </FormControl>
             
              );
                // content.push(<div style={{display:'table-row',height:'100%',position:'relative'}}><FormControl.Feedback style={{height:'100%','line-height':'200%'}}/></div>);
         
        return content;

      }

      showPassword()
      {
        let content = [];

            content.push (
                <FormGroup
        
                className="form-inline"
                // validationState={this.getTheState("password")}
                >  
                     {/* <ControlLabel style={styleLabel} className="col-md-3">Password</ControlLabel> */}
                     <Col componentClass={ControlLabel} md={3}  style={styleLabel}>Password</Col>
                    <FormControl
                    style={stylecontrol}
                    ref="password"
                    type="password"
                    value={this.state.password}
                    autocomplete="off"
                    placeholder={MulitLangFile.MulitLang.password[this.state.currentLanguage]}
                    onChange={this.handleChange.bind(this,'password')}
                    />
                <FormControl.Feedback />
    
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
            content.push(<div className="previewText">Please select an Image for Preview</div>);
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
                        // "security": this.state.password,
                        "role": this.state.role,
                        "language": this.state.language,
                        "timeformat": this.state.format,
                        "timezone": this.state.zone
                    };
                    // this.formData.security = ReactDOM.findDOMNode(this.refs[`currentPass`]).value;
                    // this.formData.newsecurity = ReactDOM.findDOMNode(this.refs[`newPass`]).value;
                    let result = CreateAccount.create(data);
                    result.then((res) => {
                        console.log("create res="+JSON.stringify(res));
                        if(res&&res.status)
                        { 
                            if(res.status=='ok'||res.status=='success')
                            {
                                console.log("Create Success.");
                                 confirm('Create Success.');
                                 confirm('Default Passwird is 12345678.');
                               // hashHistory.push('/login');
                               this._submitlogo(login.uuid);
                            }else
                            {
                                confirm('Create '+res.result);
                            }
                            
                        }
                        else
                        {
                            //alert('Current password invalid!');
                            if(res&&res.message)alert(res.message);
                            else
                            alert('Create Fail.');
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
                    console.log("create logo res="+JSON.stringify(res));
                    if(res&&res.logofilepath)
                    { 
                        if(res.logofilepath&&res.logofilepath.includes('upload'))
                        {
                            console.log('Create Logo Success.');
                            //confirm('Create Logo Success.');
                            //hashHistory.push('/login');
                        }else
                        {
                            confirm('Create Logo Fail');
                        }
                        
                    }
                    else
                    {
                        //alert('Current password invalid!');
                        if(res&&res.message)alert(res.message);
                        else
                        alert('Create Logo Fail.');
                    }
                     });
               
            
        }else{
            confirm('Create Success.');
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

       
 
            // let email = ReactDOM.findDOMNode(this.refs[`email`]).value;
            // let password = ReactDOM.findDOMNode(this.refs[`password`]).value;

                
            if(!this.state.createEmail)
            {
                alert('Please enter E-mail address.');
                return false;
            }

            // if(!this.state.password)
            // {
            //     alert('Please enter the password.');
            //     return false;
            // }

            if(this.state.role==''||this.state.zone==''||this.state.format==''||this.state.language=='')
            {
                alert('Please select full parameter.');
                return false;
            }

            if(!this.validateEmail(this.state.createEmail))
            {
                alert('E-Mail format Error.');
                return false;
            }

            // if(Length.password.min > this.state.password.length)
            // {
            //     alert(`Password Minimum : ${Length.password.min} characters.`);
            //     return false;
            // }

            // if(this.state.password.length>Length.password.max)
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
        
        else
            return true;

    }
};



export default Create;