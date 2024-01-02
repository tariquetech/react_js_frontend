import React from 'react'
import { NavLink } from 'react-router-dom'

const SideBarComponent = () => {
    const imageUrl = '/assets/user-profile.png';
   


    return (
    <>
       <aside class="main-sidebar">

<section class="sidebar">
    <div class="user-panel">
        <div class="pull-left image">
            <img src={imageUrl} class="img-circle" alt="User" style={{ border: '1px solid #515865' }} />
        </div>
        <div class="pull-left info">
            <p>Admin User</p>
            <p class="font-weight-400">
                <i class="fa fa-user-secret m-r-xs"></i>
                <small style={{ fontWeight: '400' }} >admin</small>
            </p>
        </div>
    </div>

    <ul class="sidebar-menu tree leftsidemenu" id="MenusDashboard" data-widget="tree"  style={{ display: 'block' }}>
        <li>
            <NavLink to="/dashboard" ><i class="fa fa-list"></i> Home </NavLink>
            
        </li>

        <li>
            <NavLink to="/employee" ><i class="fa fa-list"></i> Employee List </NavLink>
        </li>

        <li>
            <NavLink to="/add-employee" ><i class="fa fa-pencil-square-o"></i> Add Employee </NavLink>
        </li>




    </ul>

</section>

</aside>

    </>
  )
}

export default SideBarComponent