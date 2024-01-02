import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom'
import RegisterComponent from './components/RegisterComponent'
import LoginComponent from './components/LoginComponent'
import { isUserLoggedIn } from './services/AuthService'
import DashboardComponent from './components/DashboardComponent'
import ForgotPasswordComponent from './components/ForgotPasswordComponent'
import ListEmployeeComponent from './components/ListEmployeeComponent'
import EmployeeComponent from './components/EmployeeComponent'
import ResetPasswordComponent from './components/ResetPasswordComponent'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  function AuthenticatedRoute({children}){

    const isAuth = isUserLoggedIn();

    if(isAuth) {
      return children;
    }

    return <Navigate to="/" />

  }

  return (
    <>
     <ToastContainer />

    <BrowserRouter>
          
          <Routes>
              {/* http://localhost:8080 */}
              <Route path='/' element = { <LoginComponent /> }></Route>
              <Route path='/forgot' element = { <ForgotPasswordComponent /> }></Route>
              <Route path='/reset/:token' element = { <ResetPasswordComponent /> }></Route>
           
               {/* http://localhost:8080/dashboard */}
               <Route path='/dashboard' element = { 
              <AuthenticatedRoute>
                <DashboardComponent />
              </AuthenticatedRoute> 
              }></Route>

               {/* http://localhost:8080/employee */}
              <Route path='/employee' element = { 
              <AuthenticatedRoute>
                <ListEmployeeComponent />
              </AuthenticatedRoute> 
              }></Route>
           
              {/* http://localhost:8080/add-employee */}
              <Route path='/add-employee' element = { 
                <AuthenticatedRoute>
                <EmployeeComponent />
                </AuthenticatedRoute>
              }></Route>
                        
              {/* http://localhost:8080/update-employee/1 */}
              <Route path='/update-employee/:id' element = { 
              <AuthenticatedRoute>
              <EmployeeComponent /> 
              </AuthenticatedRoute>
              }></Route>
               {/* http://localhost:8080/register */}
              <Route path='/register' element = { <RegisterComponent />}></Route>

               {/* http://localhost:8080/login */}
               <Route path='/login' element = { <LoginComponent /> }></Route>

          </Routes>

        </BrowserRouter>
    </>
  )
}

export default App
