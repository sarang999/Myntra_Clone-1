import React from 'react'
import firebase from './firebase'
import "../components/Login/login.css";
import "../components/Login/login.css";
// import { Navigation } from "./navigation";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';



class MobilenumberForm extends React.Component {
  
    handleChange = (e) =>{
      const {name, value } = e.target
      this.setState({
          [name]: value
        })
  }
  
  navigateOtp = () => {
    const navigate = useNavigate();
    navigate('/otpverification');
  }
    configureCaptcha = () =>{
      window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('sign-in-button', {
        'size': 'invisible',
        'callback': (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          this.onSignInSubmit();
          //console.log("Recaptca verified")
        },
        defaultCountry: "IN"
      });
     
    }
  onSignInSubmit = (e) => {
    e.preventDefault()
    this.configureCaptcha()
    const phoneNumber = "+91" + this.state.mobile
    console.log(phoneNumber)
    const appVerifier = window.recaptchaVerifier;
    firebase.auth().signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        window.confirmationResult = confirmationResult;
        // console.log("OTP has been sent")
        
        // ...
        
        alert("OTP sent Click on go to otp Page");
        this.navigateOtp();
      })
        // <Link to="/otpverification" />
      .catch((error) => {
            // Error; SMS not sent
            // ...
             // console.log("SMS not sent")
            //  .then(() => { (<Link to="/otpverification"></Link>) }
            //  )
           
        alert("OTP not sent try again error occured");
       
          })
    }
  
  render() {
    return (
      
      <div>
        
            <form onSubmit={this.onSignInSubmit}>
                <div id="sign-in-button"></div>
                <input className="input1" type="text"  value={`+91`}

                />
                <input className='numberform-input' type="number" name="mobile" placeholder="Mobile number"
                    defaultValue=""
            required onChange={this.handleChange} />
        
            <button className='numberform-button' type="submit">Submit</button>
           
        </form>
        <Link to="/otpverification"><button className="mobile-otp-button">Go to otp page</button></Link>
        </div>
        
    )
  }
}
export default MobilenumberForm;
