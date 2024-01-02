import React from 'react'
import { NavLink } from 'react-router-dom'
import { isUserLoggedIn, logout } from '../services/AuthService'
import { useNavigate } from 'react-router-dom'


const HeaderComponent = () => {

  const isAuth = isUserLoggedIn();

    const navigator = useNavigate();

    function handleLogout(){
        logout();
        navigator('/login')
    }

  return (
    <>
         <header class="main-header">
    
    <a href="javascript:void(0);" class="logo">

        <span class="logo-mini"><b>My jala Task</b></span>
        <span class="logo-lg font_20"><b>My jala Task</b></span>
    </a>
    <nav class="navbar navbar-static-top">
        <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
            <span class="sr-only">Toggle navigation</span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
        </a>
        
        <div class="navbar-custom-menu">
            <ul class="nav navbar-nav">
                <li class="dropdown user user-menu">
                    <button onClick={handleLogout} style={{background: '#3c8dbc',color: 'white',border: '0px'}} class="dropdown-toggle p-22">
                        <i class="fa fa-sign-out"></i>
                        <span class="hidden_xs" >Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    </nav>
</header>
    </>
  )
}

export default HeaderComponent