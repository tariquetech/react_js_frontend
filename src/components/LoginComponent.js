import React, { useState } from 'react'
import { loginAPICall, saveLoggedInUser, storeToken } from '../services/AuthService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginComponent = () => {

    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const navigator = useNavigate();

    async function handleLoginForm(e){

        e.preventDefault();

        await loginAPICall(username, password).then((response) => {
            console.log(response.data);

            //const token = 'Basic ' + window.btoa(username + ":" + password);
            const token = 'Bearer ' + response.data.accessToken;
            storeToken(token);

            saveLoggedInUser(username);
            navigator("/employee")

            window.location.reload(false);
        }).catch(error => {
            console.error(error);
            toast.error(error.response.data.message, {autoClose: 2000,hideProgressBar: true,});
        })

    }

  return (
    <div class="login-box">

<div class="login-logo">
       
		<h2> Login Credentials</h2>
		<h5> Email : training@jalaacademy.com </h5>
		<h5> Password : jobprogram </h5>
		
   </div>
   
    
    <div class="login-box-body">
        <p class="login-box-msg">Sign in</p>
<form>

                <div class="form-group has-feedback">
                   
                   
                    <input class="form-control" 
                    name="username" 
                    placeholder="Enter username" 
                    type="text"
                    value={username}
                    onChange={ (e) => setUsername(e.target.value)}
                    />
                    <span class="glyphicon glyphicon-envelope form-control-feedback"></span>                    
                    <span class="field-validation-valid text-danger text-left" data-valmsg-for="UserName" data-valmsg-replace="true"></span>

                </div>
                <div class="form-group has-feedback">
                    <input 
                    class="form-control"
                    name="password" 
                    placeholder="Enter password" 
                    type="password" 
                    value={password}
                    onChange={ (e) => setPassword(e.target.value)}
                    />
                    <span class="glyphicon glyphicon-lock form-control-feedback"></span>
                    <span class="field-validation-valid text-danger text-left" data-valmsg-for="Password" data-valmsg-replace="true"></span>

                </div>
                <div class="row">
                    <div class="col-xs-6 m-t-xs">
                    
                    </div>
                    
                    <div class="col-xs-12">
                        <button type="button" class="btn btn-block btn-success"  onClick={ (e) => handleLoginForm(e)}>Sign In</button>
                    </div>
                    
                </div>
</form>
        <div class="social-auth-links text-center">
            <p>- OR -</p>
            <button onClick={()=> navigator('/forgot') }  class="btn btn-block btn-primary btn-flat text-center">
                Forgot Password
            </button>
           
           
        </div>


    </div>

</div>



  )
}

export default LoginComponent