import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { resetPwdAPICall } from '../services/AuthService';


const ResetPasswordComponent = () => {

    const [password, setPassword] = useState("");
    const [cpassword, setCPassword] = useState("");

    const navigate = useNavigate()

    const { token } = useParams()

async function resetPassword(e){

    e.preventDefault();

    if(password == ""){
        toast.error('Enter Password', {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return false;
    }
    if(cpassword == ""){
        toast.error('Enter Confirm Password', {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          return false;
    }

    if(password != cpassword){
        toast.error('password is not matched with your confirm password', {
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          
    }else{

        await resetPwdAPICall(token,password).then((response) => {
            console.log(response.data);
            toast.success(response.data, {
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

               navigate("/");

            // window.location.reload(false);
        }).catch(error => {
            console.error(error);
            toast.error(error.response.data.message, {
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });

        })


        
    }



        
    }


    return (
    <>

<div class="login-box">
    <div class="login-logo">
        <a href="#"><b>Reset Password</b></a>
    </div>
    <div class="login-box-body">
        <p class="login-box-msg">Reset Password</p>
<form>
    
                <input name="token" type="hidden" value="this is token"/>
                <div class="form-group has-feedback">
                <input 
                class="form-control" 
                id="password"
                placeholder="Enter New Password" 
                type="text"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />

               <input 
                class="form-control" 
                style={{marginTop:'20px'}}
                id="cpassword"
                placeholder="Enter Confirm Password" 
                type="text"
                value={cpassword}
                onChange={(e)=>setCPassword(e.target.value)}
                />

                

                

            </div>
            <div class="row">
                <div class="col-xs-6 m-t-xs">
                    <span onClick={()=> navigate('/') } class="text-center text-primary" style={{cursor:'pointer'}}>Back</span>
                </div>
                <div class="col-xs-6 text-right">
                    <button type="button" onClick={(e)=>{resetPassword(e)}} class="btn btn-primary btn-flat" id="btnForgotPassword">Submit</button>
                </div>
            </div>
</form>    </div>
</div>



    </>
  )
}

export default ResetPasswordComponent;