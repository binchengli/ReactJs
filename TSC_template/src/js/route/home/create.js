import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {
    Grid, Row, Col, Form, FormGroup, FormControl, ControlLabel,Label, Button,HelpBlock
} from 'react-bootstrap';
import PageTitile from '../../component/pageTitle.js';
/* component */
import TimezonePicker  from '../../component/TimezonePicker.js';

/* common */
// import Lang from '../../common/languages.js';
import MulitLangFile from '../../common/multiLang.js';
import StorageData from '../../common/storageData.js';
import ImageUpload from '../../component/imageupload.js';
const Length={name:2,password:6};
class Create extends Component {
    
    constructor(props, context) {
        super(props, context);
    
        this.handleChange = this.handleChange.bind(this);
        this.addFile=this.addFile.bind(this);
        this.getImageSize=this.getImageSize.bind(this);
        this.state = {
          currentLanguage:props.language,
          name: '',
          email: '',
          password:'',
          role:'',
          language:'',
          format:'',
          file: '',
          imagePreviewUrl: ''
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
            if (length1 > Length.name*2) return 'success';
            else if (length1 >= Length.name) return 'warning';
            else if (length1 > 0) return 'error';
            return null;
            break;
            case 'email':
            const length2 = this.state.email.length;
            if (this.validateEmail(this.state.email)) 
                return 'success';
            else if (length2 > 0) return 'error';
                return null;
            break;
            case 'password':
            const length3 = this.state.password.length;
            if (length3 > 10) return 'success';
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
              case 'email':
              this.setState({ email: e.target.value });
              break;
              case 'password':
              this.setState({ password: e.target.value });
              break;
              case 'role':
              this.setState({ role: e.target.value });
              break;
              case 'language':
              this.setState({ language: e.target.value });
              console.log("handleChange language="+e.target.value);
              break; 
              case 'format':
              this.setState({ format: e.target.value });
              break;
          }
       
      }

      validateEmail(email) {
        var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }

      addFile(e){
        console.log('file='+e.target.files[0]);
        //e.preventDefault();
        let currentComponent = this;
        let reader = new FileReader();
        let file = e.target.files[0];
    
        reader.onloadend = () => {
            //Get image size for image.
            this.getImageSize(reader.result, function(imageWidth, imageHeight) {
                 console.log('getImageSize imageWidth='+imageWidth+',imageHeight='+imageHeight);
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
        console.log("Create render language="+this.state.currentLanguage);
        
        return (
        
          <div className='general-panel'>
                <Grid  >
                    <Row>
                    <Col  md={ 5 } mdOffset={2}>
                    <form horizontal>  
                        <FormGroup
                            bsSize="large"
                            validationState={this.getTheState('name')}
                        >  
                            <FormControl
                            ref="aliasname"
                            type="text"
                            value={this.state.name}
                            placeholder={MulitLangFile.MulitLang.aliasName[this.state.currentLanguage]}
                            onChange={this.handleChange.bind(this, 'name')}
                            />
                            <FormControl.Feedback />
                
                        </FormGroup>
                        <FormGroup
                            bsSize="large"
                            validationState={this.getTheState('email')}
                        >  
                            <FormControl
                            ref="email"
                            type="text"
                            value={this.state.email}
                            placeholder={MulitLangFile.MulitLang.emailAccount[this.state.currentLanguage]}
                            onChange={this.handleChange.bind(this,'email')}
                            />
                            <FormControl.Feedback />
                
                        </FormGroup>
                        <FormGroup
                            bsSize="large"
                            validationState={this.getTheState("password")}
                        >  
                            <FormControl
                            ref="password"
                            type="password"
                            value={this.state.password}
                            placeholder={MulitLangFile.MulitLang.password[this.state.currentLanguage]}
                            onChange={this.handleChange.bind(this,'password')}
                            />
                            <FormControl.Feedback />
                
                        </FormGroup>


                            <FormGroup controlId="role_select"  bsSize="large">
                            <FormControl componentClass="select" placeholder="Role" 
                            ref="role"
                            //  inputRef={this.handleChange.bind(this,'role')}
                            onChange={this.handleChange.bind(this,'role')}
                            >
     
                                <option value="admin">{MulitLangFile.MulitLang.admin[this.state.currentLanguage]}</option>
                                <option value="operator">{MulitLangFile.MulitLang.operator[this.state.currentLanguage]}</option>
                            </FormControl>
                            </FormGroup>


                            <FormGroup controlId="language_select"  bsSize="large">
                            <FormControl componentClass="select" placeholder="language"
                            ref="language"
                            //  inputRef={this.handleChange.bind(this,'role')}
                            onChange={this.handleChange.bind(this,'language')}
                            >
                                <option value="US">English</option>
                                <option value="TW">繁體中文</option>
                            </FormControl>
                            </FormGroup>

                            <FormGroup controlId="format_select"  bsSize="large">
                            <FormControl componentClass="select" placeholder="format"
                            ref="format"
                            //  inputRef={this.handleChange.bind(this,'role')}
                            onChange={this.handleChange.bind(this,'format')}
                            >
                                <option value="YYYY/MM/DD hh:mm:ss">YYYY/MM/DD hh:mm:ss</option>
                                <option value="TMM/DD/YYYY hh:mm:ss">MM/DD/YYYY hh:mm:ss</option>
                            </FormControl>
                            </FormGroup>

                            
                            {/* <FormGroup controlId="zone_select"  bsSize="large">
                            <FormControl componentClass="select" placeholder="zone"
                            //  inputRef={this.handleChange.bind(this,'role')}
                            onChange={this.handleChange.bind(this,'zone')}
                            >
                                <option value='1'>+1</option>
                                <option value='2'>+2</option>
                                <option value='3'>+3</option>
                                <option value='4'>+4</option>
                                <option value='5'>+5</option>
                                <option value='6'>+6</option>
                                <option value='7'>+7</option>
                                <option value='8'>+8</option>
                                <option value='9'>+9</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                                <option value='10'>+10</option>
                            </FormControl>
                            </FormGroup> */}
                            <FormGroup controlId="timezone_select" bsSize="large">
                                {/* <TimezonePicker
                                value="Asia/Yerevan"
                                onChange={timezone => console.log('New Timezone Selected:', timezone)}
                                inputProps={{
                                placeholder: 'Select Timezone...',
                                name: 'timezone',
                                }}/> */}
                            </FormGroup>
                           

                            {/* <ImageUpload/> */}
                           
                            <FormGroup controlId="image_select" bsSize="large">
                            <div>
                                <ControlLabel htmlFor="fileUpload" >
                                    <h3>
                                    <Label bsStyle="success">Browse...</Label>
                                    </h3>
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
                             </FormGroup>
                            
                    </form>
                    
                    </Col>
                </Row>
               
                <Row>
                    <Col md={ 5 } mdOffset={2}>
                        
                    </Col>
                </Row>
                <Row >      
                    
                        <Col md={3} mdOffset={2}>
                           
                          
                        </Col>
                 
                </Row>             

                <Row >      
                    <div className='general-panel-footer'>
                        <Col md={3} mdOffset={3}>
                            {this.showButton()}
                        </Col>
                    </div>     
                </Row>                
          


              </Grid>
           </div>
            


         
        );
      }

      showImage()
      {
        let content = [];
        let {imagePreviewUrl} = this.state;
        if (imagePreviewUrl) {
            content.push (<img src={imagePreviewUrl} />);
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
                <Button onClick={()=>{this._submitHandler('submit');}} bsStyle="success">Submit</Button>
                {/* <Button onClick={()=>{this._redirectHandler('/home/settings/general');}} bsStyle="primary">{Lang.showText(61)}</Button> */}
            </div>
        );
        return content;
    };


    _submitHandler (type) {
        switch (type)
        {
            case 'submit':
                if(this._nameValidator())
                {
                    this.formData.security = ReactDOM.findDOMNode(this.refs[`currentPass`]).value;
                    this.formData.newsecurity = ReactDOM.findDOMNode(this.refs[`newPass`]).value;
                    let result = SettingsAPI.newpassword(this.formData);
                    result.then((res) => {
                        if(res)
                        {
                            confirm('Success, Please login with new password.');
                            hashHistory.push('/login');
                        }
                        else
                        {
                            alert('Current password invalid!');
                        }
                    });
                }
                break;
            default:
                break;
        }
    };

    _nameValidator () {
        let aliasname = ReactDOM.findDOMNode(this.refs[`aliasname`]).value;
        let email = ReactDOM.findDOMNode(this.refs[`email`]).value;
        let password = ReactDOM.findDOMNode(this.refs[`password`]).value;

        if(!aliasname)
        {
            alert('Please enter Alias Name.');
            return false;
        }

        if(!email)
        {
            alert('Please enter E-mail address.');
            return false;
        }

        if(!password)
        {
            alert('Please enter the password.');
            return false;
        }
        // if(newPass != conPass)
        // {
        //     alert('New password not match.');
        //     return false;
        // }
        if(!this.validateEmail(email).bind)
        {
            alert('E-Mail format Error.');
            return false;
        }

        if(3 > aliasname.length)
        {
            alert('Alias Name Minimum : 3 characters.');
            return false;
        }
        if(6 > password.length)
        {
            alert('Password Minimum : 6 characters.');
            return false;
        }
        else
            return true;

    }
};



export default Create;