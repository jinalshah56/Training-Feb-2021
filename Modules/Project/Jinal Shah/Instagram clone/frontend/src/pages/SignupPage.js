import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import UserService from '../services/UserServices'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const validEmailRegex = RegExp(
   /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
);
const validateForm = errors => {
   let valid = true;
   Object.values(errors).forEach(val => val.length > 0 && (valid = false));
   return valid;
};

function Signup(props) {

   const [users, setUsers] = useState({
      userID: "",
      userPWD: "",
      userName: "",
      email: "",
      location: "",
      dateOfBirth: "",
      gender: "",
      phoneNO: "",
      errors: {
         userID: "",
         userPWD: "",
         userName: "",
         email: "",
         location: "",
         gender: "",
         phoneNO: "",
         dateOfBirth: ""
      }
   })

   const [toggle, setToggle] = useState(false)
   const [bg, setBg] = useState("")


   const handleChange = (event) => {
      event.preventDefault();
      const { name, value } = event.target;
      let errors = users.errors;

      switch (name) {
         case 'userID':
            if (value.match(/^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/)) {
               errors.userID = "";
            }
            else {
               errors.userID = "only character string allowed";
            }
            break;
         case 'userPWD':
            if (value.length < 4 || value.length > 12) {
               errors.userPWD = 'maximum password length is 12';
            }
            else {
               errors.userPWD = '';
            }
            break;
         case 'userName':
            if (value.match(/^[a-zA-Z]{2,40}( [a-zA-Z]{2,40})+$/)) {
               errors.userName = "";
            }
            else {
               errors.userName = "only character string allowed";
            }
            break;
         case 'email':
            errors.email =
               validEmailRegex.test(value)
                  ? ''
                  : 'Email is not valid!';
            break;
         case 'location':
            if (value.match(/^[A-Za-z]{3,}$/)) {
               errors.location = "";
            }
            else {
               errors.location = "only character string allowed";
            }
            break;
         case 'phoneNO':
            if (value.length < 10 || value.length > 10) {
               errors.phoneNO = 'Phone number should contain only 10 digit';
            }
            else {
               errors.phoneNO = '';
            }
            break;
         case 'dateOfBirth':

            const dateString = value;
            const now = new Date();

            const yearNow = now.getFullYear();
            const dob = new Date(dateString);
            const yearDob = dob.getFullYear();

            let yearAge = yearNow - yearDob;

            if (yearAge < 18) {
               errors.dateOfBirth = 'Minimum age : 18 years, you are not eligible';
            }
            else {
               errors.dateOfBirth = '';
            }

            break;
         default:
            break;
      }

      setUsers({
         ...users,
         [name]: value
      });

      if (users.userID === '' || users.userPWD === "" || users.userName === "" || users.email === "" || users.location === "" || users.dateOfBirth === "" || users.gender === "" || users.phoneNO === "") { }
      else { setToggle(true) }
   }

   const handleSubmit = e => {

      e.preventDefault();
      if (validateForm(users.errors)) {

         UserService.createAccount(users).then(res => {
            console.log(res);
            toast.info('OTP sent successfully', {
               position: "top-right",
               autoClose: 5000,
               hideProgressBar: false,
               closeOnClick: true,
               pauseOnHover: true,
               draggable: true,
               progress: undefined,
            });
         })
      } else {
         console.error('Invalid Form')
      }
   }

   const verify = () => {
      const otp = document.getElementById("otp").value
      console.log(otp)
      UserService.verify(otp).then(res => {
         console.log(res)
         if (res.data === 'You have entered wrong OTP') { window.alert('You entered Wrong otp \nVerify again') }
         else {
            window.alert('Account created successfully!! \nLog In to your account')
            props.history.push('/')
         }
      })
   }

   const onFocus = () => {
      setBg('Must contain only letters, numbers and underscores. This one can not be changed, as it guarantees the existence of your Instagram profile under it.')
   }

   return (
      <>
         <ToastContainer />

         <div className="pb-10">
            <div className="container justify-content-center">
               <div className="header mx-auto justify-content-center">
                  <div className="row justify-content-center">
                     <div className="mx-auto bg-white mt-5 justify-content-center"
                        style={{ border: '1px solid #e6e6e6' }}
                     >

                        <div className=" text-center justify-content-center" style={{ width: '350px', margin: '10px', padding: '40px' }}>
                           <img src="images/baw.png" alt="instagram" className="instagram-logo" style={{ width: "205px" }} />
                           <p className="text-muted font-weight-bold">
                              Sign up to see photos and videos from your friends
                           </p>
                           {/* <div className="fb1">
                              <button type="submit" className="btn btn-primary btn-block">
                                 <a href="https://www.facebook.com/" target="_blank" style={{ color: 'white' }}>
                                    <img src="images/fb2.png" className="fb-logo m-2" />
                                    Log In With Facebook
                                 </a>
                              </button>
                           </div> 
                           <p className="or pt-3">OR</p> */}

                           <form className="pb-2 pt-3" onSubmit={handleSubmit}>

                              <div className="form-group pb-2">
                                 <input type="text" placeholder="User Id" className="form-control  border border-primary" name="userID" onChange={handleChange} onFocus={onFocus} required />
                                 {users.errors.userID.length > 0 &&
                                    <span className="text-danger mt-3">{users.errors.userID}</span>}
                              </div>

                              <div className="form-group pb-2">
                                 <span className="text-muted font-weight-bold" style={{ fontSize: '10px' }}>
                                    {bg}
                                 </span>
                              </div>

                              <div className="form-group pb-2">
                                 <input type="password" placeholder="Password" className="form-control border border-primary" name="userPWD" onChange={handleChange} required />
                                 {users.errors.userPWD.length > 0 &&
                                    <span className="text-danger mt-3">{users.errors.userPWD}</span>}
                              </div>

                              <div className="form-group pb-2">
                                 <input type="text" placeholder="Full Name" className="form-control  border border-primary" name="userName" onChange={handleChange} required />
                                 {users.errors.userName.length > 0 &&
                                    <span className="text-danger mt-3">{users.errors.userName}</span>}
                              </div>

                              <div className="form-group pb-2">
                                 <input type="email" placeholder="Email Id" className="form-control  border border-primary" name="email" onChange={handleChange} required />
                                 {users.errors.email.length > 0 &&
                                    <span className="text-danger mt-3">{users.errors.email}</span>}
                              </div>

                              <div className="form-group pb-2">
                                 <input type="text" placeholder="Location" className="form-control  border border-primary" name="location" onChange={handleChange} required />
                                 {users.errors.location.length > 0 &&
                                    <span className="text-danger mt-3">{users.errors.location}</span>}
                              </div>

                              <div className="form-group pb-2">
                                 <input type="date" className="form-control border border-primary" name="dateOfBirth" onChange={handleChange}
                                    max={new Date().toISOString().split("T")[0]} required />
                                 {users.errors.dateOfBirth.length > 0 &&
                                    <span className="text-danger mt-3 font-weight-bold" style={{ fontSize: '12px' }}>
                                       {users.errors.dateOfBirth}
                                    </span>}
                              </div>

                              <div className="form-group pb-2">
                                 <input type="text" placeholder="Gender" className="form-control  border border-primary" name="gender" onChange={handleChange} required />
                              </div>

                              <div className="form-group pb-2">
                                 <input type="number" placeholder="Phone No" className="form-control  border border-primary" name="phoneNO" onChange={handleChange} required />
                                 {users.errors.phoneNO.length > 0 &&
                                    <span className="text-danger mt-3">{users.errors.phoneNO}</span>}
                              </div>

                              <button type="submit" className="btn btn-primary btn-block" data-toggle="modal" data-target="#exampleModal" disabled={!toggle}
                              >
                                 Sign Up
                              </button>

                           </form>


                           <div className="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
                              <div className="modal-dialog" role="document">
                                 <div className="modal-content">
                                    <div className="modal-header text-center">
                                       <h5 classNames="modal-title font-weight-bold" id="exampleModalLabel">Verify Yourself</h5>
                                       <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                          <span aria-hidden="true">&times;</span>
                                       </button>
                                    </div>
                                    <div className="modal-body">
                                       <form>
                                          <div className="form-group font-weight-bold font-size-large">
                                             <label for="username">Enter OTP you received in Email</label>
                                             <div className="row">
                                                <div className="col-3"></div>
                                                <div className="col-6">
                                                   <input type="text" className="form-control" id="otp" name="otp" />
                                                </div>
                                             </div>
                                          </div>
                                       </form>
                                    </div>
                                    <div className="modal-footer">

                                       <button type="button" className="btn btn-primary h-25" onClick={verify} data-dismiss="modal" style={{ width: '100px' }}>Verify</button>
                                       <button type="submit" className="btn btn-success" style={{ width: '100px' }} onClick={handleSubmit}>
                                          Resend OTP
                                       </button>

                                    </div>
                                 </div>
                              </div>
                           </div>

                           <small>
                              <p className="text-muted">By signing up, you agree to our
                                 <b>
                                    <a href="https://help.instagram.com/581066165581870" target="_blank" className="text-muted text-decoration-none"> Terms,
                                    </a>
                                    <a href="https://help.instagram.com/519522125107875" target="_blank" className="text-muted text-decoration-none"> Data Policy</a>
                                 </b> and<b>
                                    <a href="https://help.instagram.com/1896641480634370?ref=ig" target="_blank" className="text-muted text-decoration-none"> Cookies Policy.</a>
                                 </b>
                              </p>
                           </small>

                           <div className="signup">
                              <p>Have an account?
                                 <Link to="/" className="pl-1 font-weight-bold" style={{ textDecoration: 'none' }}>
                                    Log In
                                 </Link>
                              </p>
                           </div>

                           <div className="apps">
                              <p>Get the app.</p>
                              <p className="icons row">
                                 <a href="https://apps.apple.com/in/app/instagram/id389801252" target="_blank">
                                    <img src="images/appstore.png" alt="appstore" className="app1" />
                                 </a>
                                 <a href="https://play.google.com/store/apps/details?id=com.instagram.android" target="_blank">
                                    <img src="images/googleplay.png" alt="googleplay" className="app1" />
                                 </a>
                              </p>
                           </div>
                        </div>
                     </div>
                  </div>

                  <div className="links col-10 mx-auto mt-5 text-center">
                     <ul>
                        <li><a href="https://about.instagram.com/" target="_blank">ABOUT</a></li>
                        <li><a href="https://about.instagram.com/en_US/blog" target="_blank">BLOG</a></li>
                        <li><a href="https://about.instagram.com/about-us/careers" target="_blank">JOBS</a></li>
                        <li><a href="https://help.instagram.com/" target="_blank">HELP</a></li>
                        <li><a href="https://developers.facebook.com/docs/instagram" target="_blank">API</a></li>
                        <li><a href="https://help.instagram.com/519522125107875" target="_blank">PRIVACY</a></li>
                        <li><a href="https://help.instagram.com/581066165581870" target="_blank">TERMS</a></li>
                        <li><a href="https://www.instagram.com/directory/profiles/" target="_blank">TOP ACCOUNTS</a></li>
                        <li><a href="https://www.instagram.com/directory/hashtags/" target="_blank">HASHTAGS</a></li>
                        <li><a href="https://www.instagram.com/explore/locations/" target="_blank">LOCATIONS</a></li>
                     </ul>
                  </div>
                  <div className="copyright col-10 mx-auto col-lg-10 col-md-6 mb-5 text-center">
                     © 2021 Instagram from Facebook
                  </div>
               </div>
            </div>
         </div>
      </>
   )
}

export default Signup

