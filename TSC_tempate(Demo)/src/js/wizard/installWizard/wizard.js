import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import {
    Button, Panel, FormControl, FormGroup, InputGroup
} from 'react-bootstrap';

import FontAwesome from 'react-fontawesome';

/* server API */
import ServerAPI from '../../backendAPI/server.js';
import AccountAPI from '../../backendAPI/account.js';

const wizardStepTbl = new Array(
    {stepNumber:0, textIndex: "STEP1"},
    {stepNumber:1, textIndex: "STEP2"},
    {stepNumber:2, textIndex: "STEP3"},
    {stepNumber:3, textIndex: "Complete"},
);

class Wizard extends Component {
    static propTypes = {
        mail: PropTypes.string.isRequired,
        mode: PropTypes.string.isRequired,
        onComplete: PropTypes.func.isRequired
    };

    constructor (props) {
        super (props);

        this.state = {
            step: 0,
            isShowSecurity: false,
            isLoading: false,
            isComplete:false
        };

        this.mail;
    };

    componentWillMount () {  
        this.mail = this.props.mail;        
        this.setState({step :0});
    };

    render () {
        return (
            <div id='wizard' className='wizard-wrapper'>
                <div className='wizard-content'>
                    <div className='wizard-header'>
                        {this.props.mode == "regist" ? "Verify Identity" : "Change Password"}
                    </div>
                    {this.showStepTittle()}
                    {this.showStepContent()}
                    {this.showStepButton()}
                </div>
            </div>
        );
    };

    showStepTittle () {
        let content = [];
        content.push(
            <div className='wizard-stepTitle'>
                <table className='wizard-stepTable'> 
                    <tr>
                        {
                            wizardStepTbl.map((entry)=> (
                                <td className={`step-${entry['stepNumber']} ${(this.state['step'] == entry['stepNumber'])? ' step_LightOn' : ' step_LightOff'}`}
                                    style={this.state['step'] == entry['stepNumber'] ? {'background-color':'#408080'} : {}}>
                                    {entry['textIndex']}
                                </td>
                            ))
                        }
                    </tr>
                </table>
            </div>
        );
        return content;
    };
    showStepContent () {
        let content = [];
        content.push(
            <div className='wizard-stepContent'>
                {
                    (()=>{
                        let content_step = [];
                        switch(this.state['step'])
                        {
                            case 0:
                                content_step.push(
                                    <Panel header={<h3>Sending the PIN code</h3>}>
                                        <span>
                                        <h4>Press next button to send the PIN code to your Email</h4>
                                        </span>
                                        <div className="col-12">
                                            <div className="col-1 col-label">Email :</div>
                                            <div className="col-8">{this.mail}</div>
                                        </div>
                                    </Panel>
                                );
                                break;
                            case 1:
                                content_step.push(
                                    <Panel header={<h3>PIN code verification</h3>}>
                                        <span>
                                        <h4>A temporary PIN Code was sent to the email address, please receive the PIN Code then enter below in 10 minutes</h4>
                                        </span>
                                        <div style={{'padding-top':'20px'}}>
                                            <Button bsStyle="success" onClick={() => {this.SendMail("resend");}}>
                                            Resend Email
                                            </Button>
                                        </div>
                                        <div style={{'padding-top':'80px', 'padding-bottom':'80px'}}>
                                            <div className="col-2 col-label">PIN Code</div>
                                            <div className="col-5">
                                                <FormControl 
                                                    type='text' 
                                                    placeholder="PIN Code"
                                                    ref='pincode'
                                                    style={{'width':'120px'}}
                                                />
                                            </div>
                                        </div>
                                    </Panel>
                                );
                                break;
                            case 2:
                                content_step.push(
                                    <Panel header={<h3>Change Password</h3>}>
                                        <span><h4>
                                        {
                                            this.props.mode == "regist" ? 
                                            "Enter a new password to complete the registration procedure" :
                                            "Enter a new password to complete the procedure"
                                        }
                                        </h4></span>
                                        <div style={{'padding-top':'80px'}}>
                                            <div className="col-3 col-label">Password</div>
                                            <div className="col-5">
                                                <InputGroup>
                                                    <FormControl 
                                                        type={(this.state['isShowSecurity'])? 'text' : 'password'}
                                                        placeholder='Password' 
                                                        ref='security'
                                                        maxLength='32'
                                                    />
                                                    <InputGroup.Addon
                                                        onClick={()=>{this.setState({isShowSecurity : !this.state['isShowSecurity']});}} 
                                                        className='clickable'
                                                    >
                                                        <FontAwesome name={(this.state['isShowSecurity'])? 'eye':'eye-slash'} />
                                                    </InputGroup.Addon>
                                                </InputGroup>
                                            </div>
                                            <div className="col-3 col-notice">(6-32 Characters)</div>
                                        </div>
                                        <div style={{'padding-bottom':'80px'}}>
                                            <div className="col-3 col-label">Confirm Password</div>
                                            <div className="col-5"><span />
                                                <FormControl 
                                                    type={(this.state['isShowSecurity'])? 'text' : 'password'}
                                                    placeholder='Confirm Password'
                                                    ref='confSecurity'
                                                    maxLength='32'
                                                />
                                            </div>
                                        </div>
                                    </Panel>
                                );
                                break;
                            case 3:
                                content_step.push(
                                    <Panel header={<h3>Congratulations</h3>}>
                                        <span>
                                        {
                                            this.props.mode == "regist" ? 
                                            "Your account has been successfully created, Please login to start using" :
                                            "Your password has been changed successfully"
                                        }
                                        </span>
                                    </Panel>
                                );
                                break;
                            default:
                                break;
                        };
                        return content_step;
                    })()
                }
            </div>
        );
        return content;
    };

    componentDidUpdate () {
        /*if (this.props.mode == "changepwd" && this.state['step'] == wizardStepTbl.length - 1 &&
            this.state.isComplete == true)
        {
            window.onclick = function(event) {
                this.setState({isComplete: false}); 
                alert("Please login again");
                AccountAPI.logout();       
            }
        }*/
    };

    SendMail (mode) {
        let result;

        if (mode == "send")
            document.body.style.cursor = 'progress';

        result = AccountAPI.forget({mail:this.mail}); 
        result.then((source) => {
            if (ServerAPI.errorCodeCheck(source)) 
            { 
                document.body.style.cursor = 'default';

                if (source != "ok")
                    alert("Sending PIN code is failed.");
                else
                {
                    if (mode == "resend")
                    {
                        alert("Sending PIN code is OK");  
                    }
                    else
                    {
                        this.setState({step: parseInt(this.state['step']) + 1});                      
                    }
                }
            }          
        });   
    }

    showStepButton () {
        let content = [];
        content.push(
            <div className='wizard-buttonGroup'>
                <div style={{'float':'right'}}>
                    {
                        (wizardStepTbl.length-1 != this.state['step'] && this.props.mode == "regist")?
                        <Button bsStyle="success" onClick={()=>{this._stepHandler('cancel');}}>Cancel</Button>:[]
                    }
                    {
                        (this.state['step'] == 0) ?
                        (<Button bsStyle="success" onClick={()=>{this._stepHandler('next');}}>Send Email</Button>) : 
                        (this.state['step'] == 1) ?
                        (<Button bsStyle="success" onClick={()=>{this._stepHandler('next');}}>Validate</Button>) : 
                        (this.state['step'] == 2) ?
                        (<Button bsStyle="success" onClick={()=>{this._stepHandler('next');}}>Complete</Button>) : 
                        (<Button bsStyle="success" onClick={()=>{this._stepHandler('apply');}}>&nbsp;&nbsp;OK&nbsp;&nbsp;</Button>)
                    }
                </div>
            </div>
        );
        return content;
    }

    _stepHandler (type) {
        let result;

        switch(type)
        {
            case 'cancel':
                this.props.onComplete();
                break;
            case 'next':
                if (wizardStepTbl.length - 1 != this.state['step']) 
                {
                    this.setState({step: parseInt(this.state['step']) + 1});
                    return ;

                    if (this.state['step'] == 0)
                    {
                        this.SendMail("send");
                    }
                    else if (this.state['step'] == 1)
                    {
                        if (!this.checkPincode())
                            return false;

                        let pincode = ReactDOM.findDOMNode(this.refs[`pincode`]).value;

                        document.body.style.cursor = 'progress';

                        result = AccountAPI.verify({mail:this.mail, pincode:pincode});
                        result.then((source) => {
                            if (ServerAPI.errorCodeCheck(source)) 
                            { 
                                if (source.status == "ok")
                                    this.setState({step: parseInt(this.state['step']) + 1});
                                else
                                    alert("Verifyed is failed.");
                            }    

                            document.body.style.cursor = 'default';      
                        });
                    }
                    else
                    {
                        if (!this.checkPassword())
                            return false;

                        let pwd = ReactDOM.findDOMNode(this.refs[`security`]).value;

                        document.body.style.cursor = 'progress';

                        result = AccountAPI.reset({mail:this.mail, newpwd:pwd});
                        result.then((source) => {
                            if (ServerAPI.errorCodeCheck(source)) 
                            { 
                                if (source.status == "ok")      
                                {
                                    this.setState({isComplete: true});                   
                                    this.setState({step: parseInt(this.state['step']) + 1});
                                    setTimeout(function(){AccountAPI.logout();}, 3000);   
                                }
                                else
                                    alert("Changing password is failed.");
                            }     

                            document.body.style.cursor = 'default';     
                        });
                    }
                };
                break;
            case 'apply':
                alert("For demo only");
                //this.props.onComplete();
                //if (this.props.mode == "changepwd")
                    //this._logoutHandler();

                break;
        };
    };

    _logoutHandler () {
         AccountAPI.logout();
    };

    checkPincode () {
        let pincode = ReactDOM.findDOMNode(this.refs[`pincode`]).value;
        if (pincode == "")
        {
            alert("PIN code can't be empty");
            return false;
        }

        return true;
    }

    checkPassword () {
        let result;
        let pwd = ReactDOM.findDOMNode(this.refs[`security`]).value;
        let retype = ReactDOM.findDOMNode(this.refs[`confSecurity`]).value;
        if (pwd == "" || retype == "")
        {
            alert("Password can't be empty");
            return false;
        }

        if (pwd != retype)
        {
            alert("Password is not matched.");
            return false;
        }

        if (pwd.length < 6 || pwd.length > 32)
        {
            alert("The length of password must be 6 to 32 charactor.");
            return false;
        }

        return true;
    }
};

export default Wizard;