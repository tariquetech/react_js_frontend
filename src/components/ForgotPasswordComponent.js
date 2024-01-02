import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { forgotPwdAPICall } from '../services/AuthService';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoaderComponent from './LoaderComponent';

const ForgotPasswordComponent = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate()



    async function handleForgotForm(e){

        e.preventDefault();
        setLoading(true);
        await forgotPwdAPICall(email).then((response) => {
            console.log(response.data);
            toast.success(response.data, {
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
              });
              setLoading(false);
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
              setLoading(false);
        })

    }


    return (
    <>
{loading && <LoaderComponent />}
 

<div class="login-box">
    <div class="login-logo">
        <a href="#"><b>Forgot Password</b></a>
    </div>
    <div class="login-box-body">
        <p class="login-box-msg">Forgot Password</p>
<form>
    <div class="form-group has-feedback">
    
                <input 
                  class="form-control" 
                  placeholder="Email" 
                  type="text" 
                  value={email}
                  onChange={(e)=> setEmail(e.target.value)}
                  />
                <span class="glyphicon glyphicon-envelope form-control-feedback"></span>
                <span class="field-validation-valid text-danger text-left" data-valmsg-for="Email" data-valmsg-replace="true"></span>
            </div>
            <div class="row">
                <div class="col-xs-6 m-t-xs">
                    <span onClick={()=> navigate('/') } class="text-center text-primary" style={{cursor:'pointer'}}>Back</span>
                </div>
                <div class="col-xs-6 text-right">
                    <button type="button" class="btn btn-primary btn-flat" id="btnForgotPassword" 
                    onClick={ (e) => handleForgotForm(e)}>Get Password</button>
                </div>
            </div>
</form>    </div>
</div>






    </>
  )
}

export default ForgotPasswordComponent;