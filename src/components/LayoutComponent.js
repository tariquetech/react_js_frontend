import React from 'react'
import FooterComponent from './FooterComponent';
import SideBarComponent from './SiderBarComponent';
import HeaderComponent from './HeaderComponent';

const LayoutComponent = ({ children }) => {
  return (
    <>

<div class="skin-blue sidebar-mini hold-transition">
      <div class="wrapper">
       <HeaderComponent />
       <SideBarComponent />

        <div class="content-wrapper">
            
 

        { children }







        </div>
        <FooterComponent />

    </div>


    <script src="/bundles/bootstrap?v=2Fz3B0iizV2NnnamQFrx-NbYJNTFeBJ2GM05SilbtQU1"></script>

    
    </div>



    </>
  )
}

export default LayoutComponent;