import React, { useEffect } from 'react'
import { useState } from 'react'
import { getEmployee, saveEmployee , updateEmployee } from '../services/EmployeeService'
import { useNavigate, useParams } from 'react-router-dom'
import { getAllCountry } from '../services/CountryService'
import { getAllState } from '../services/StateService'
import { getAllCity } from '../services/CityService'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutComponent from './LayoutComponent'



const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [mobileNo, setMobileNo] = useState('')
    const [dob, setDob] = useState('')
    const [gender, setGender] = useState('')
    const [address, setAddress] = useState('')
    const [country, setCountry] = useState([])
    const [selectedCountry, setSelectedCountry] = useState(0);
    const [state, setState] = useState([])
    const [selectedState, setSelectedState] = useState(0);
    const [city, setCity] = useState([])
    
    const [selectedCity, setSelectedCity] = useState(0);
    const [otherCity, setOtherCity] = useState('')
    const [isOtherCityChecked, setIsOtherCityChecked] = useState(false);
    
    const allSkills = ['AWS', 'DevOps', 'Full Stack Developer', 'Middleware', 'QA-Automation', 'WebServices'];
    const [selectedSkills, setSelectedSkills] = useState([]);
    
    const navigate = useNavigate()
    
    const { id } = useParams()

    const handleOtherCityChange = () => {
        setIsOtherCityChecked(!isOtherCityChecked);
        setSelectedCity(0); // Reset the selected city when "Other City" is checked
      };

       function saveOrUpdateEmployee(e){
        e.preventDefault()

        const employee = {firstName, lastName, email, mobileNo, dob, gender, address, country:selectedCountry, state:selectedState, city:selectedCity, otherCity, skills:selectedSkills };
        if(employee.skills.length === 0){employee.skills = null;}
        

        if(id){

            updateEmployee(id, employee).then((response) => {
                navigate('/employee')
            }).catch(error => {
                console.error(error);
                allValidation(error);
            })

       }else{

           saveEmployee(employee).then((response) => {
                navigate('/employee')
            }).catch(error => {
                console.log(error);
                allValidation(error);
            })




            
            
        }
     

       
       }

       const allValidation = (error) => {
        if(error.response.data.firstName){
            toast.error(error.response.data.firstName, {autoClose: 2000,hideProgressBar: true,});
        }else if(error.response.data.email){
            toast.error(error.response.data.email, {autoClose: 2000,hideProgressBar: true,});
        }else if(error.response.data.mobileNo){
            toast.error(error.response.data.mobileNo, {autoClose: 2000,hideProgressBar: true,});
        }else if(error.response.data.dob){
            toast.error(error.response.data.dob, {autoClose: 2000,hideProgressBar: true,});
        }else if(error.response.data.gender){
            toast.error(error.response.data.gender, {autoClose: 2000,hideProgressBar: true,});
        }else if(error.response.data.address){
            toast.error(error.response.data.address, {autoClose: 2000,hideProgressBar: true,});
        }else if(error.response.data.country){
            toast.error(error.response.data.country, {autoClose: 2000,hideProgressBar: true,});
        }else if(selectedState == "" || selectedState == 0){
            toast.error("State is mandatory", {autoClose: 2000,hideProgressBar: true,});
        }else if(!isOtherCityChecked && selectedCity == 0){
            toast.error("City is mandatory", {autoClose: 2000,hideProgressBar: true,});
        }else if(isOtherCityChecked && otherCity == ""){

            toast.error("Other City is mandatory", {autoClose: 2000,hideProgressBar: true,});
        }else if(error.response.data.skills){
            toast.error(error.response.data.skills, {autoClose: 2000,hideProgressBar: true,});
        }
        
       }



       const handleCheckboxChange = (skill) => {
        setSelectedSkills((prevSelectedSkills) => {
          if (prevSelectedSkills.includes(skill)) {
            // Skill is already selected, remove it
            return prevSelectedSkills.filter((selectedSkill) => selectedSkill !== skill);
          } else {
            // Skill is not selected, add it
            return [...prevSelectedSkills, skill];
          }
        });
      };



    function pageTitle(){
        if(id) {
            return "Update";
        }else {
            return "Add";
        }
    }

    useEffect(() => {
        getAllCountry().then((response) => {
          setCountry(response.data);
          
        });
      }, []);
      
      useEffect(() => {
        if (selectedCountry) {
          getAllState(selectedCountry).then((response) => {
            setState(response.data);
           if(id){

           }else{
            setCity([]);
            setSelectedCity(0);
           }
            

          });
        }
      }, [selectedCountry]);
      
      useEffect(() => {
        if (selectedState) {
          getAllCity(selectedState).then((response) => {
            setCity(response.data);
          });
        }
      }, [selectedState]);

    useEffect( () => {
    
        if(id){
            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName)
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
                setMobileNo(response.data.mobileNo)
                setDob(response.data.dob)
                setGender(response.data.gender)
                setAddress(response.data.address)
                setSelectedCountry(response.data.country)
                setSelectedState(response.data.state)
                setSelectedCity(response.data.city)
                setSelectedSkills(response.data.skills)
                setOtherCity(response.data.otherCity)
                if(response.data.otherCity){setIsOtherCityChecked(true)}
                
            }).catch(error => {
                console.error(error);
            })
        }else{

                setFirstName("")
                setLastName("")
                setEmail("")
                setMobileNo("")
                setDob("")
                setGender("")
                setAddress("")
                setSelectedCountry("")
                setSelectedState("")
                setSelectedCity("")
                setSelectedSkills("")
                setOtherCity("")
                setIsOtherCityChecked(false)
        }

    }, [id])


  return (
   <>
   
   <LayoutComponent>


   <section className="content-header">
                <h1>
                    Employee <small>{pageTitle()}</small>
                </h1>
                <ol className="breadcrumb m-r-xs">
                    <li><span style={{cursor : 'pointer'}} onClick={()=>{navigate('/employee')}}><i className="fa fa-dashboard"></i> Home</span></li>
                    <li className="">Employee</li>
                    <li className="active">{pageTitle()}</li>
                </ol>
            </section>
            
            <section className="content">
                <div className="box box-info">
                    <div className="box-header with-border">
                        <h3 className="box-title">{pageTitle()} Employee</h3>
                    </div>
            <form>
              
                       <div className="box-body pt_10 pb-0">
                            <div className="col-xs-12">
                                <div className="row">
                                    
                                    
                                    <div className="col-md-4 form-group">
                                        <label className="required-label" htmlFor="FirstName">First Name</label>
                                        <input className="form-control" 
                                        placeholder="First Name" 
                                        type="text" 
                                        name='firstName'
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="FirstName" data-valmsg-replace="true"></span>
                                    </div>


                                    <div className="col-md-4 form-group">
                                        <label className="required-label" htmlFor="LastName">Last Name</label>
                                        <input 
                                        className="form-control" 
                                        placeholder="Last Name" 
                                        type="text"
                                        name='lastName'
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="LastName" data-valmsg-replace="true"></span>
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <label className="required-label" htmlFor="EmailId">Email</label>
                                        <input 
                                        className="form-control" 
                                        placeholder="Email Id" 
                                        type="text"
                                        name='email'
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="EmailId" data-valmsg-replace="true"></span>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4 form-group">
                                        <label className="required-label" htmlFor="MobileNo">Mobile Number</label>
                                        <input 
                                        className="form-control" 
                                        placeholder="Mobile No" 
                                        type="text" 
                                        name='mobileNo'
                                        value={mobileNo}
                                        onChange={(e) => 
                                            {
                                                const numericValue = e.target.value.replace(/\D/g, '');
                                                const limitedValue = numericValue.slice(0, 10);
                                                setMobileNo(limitedValue)
                                           }}
                                        />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="MobileNo" data-valmsg-replace="true"></span>
                                    </div>
                                    <div className="col-md-4 form-group">
                                        <label className="required-label" htmlFor="MobileNo">Date Of Birth</label>
                                        <input 
                                        className="form-control" 
                                        type="date" 
                                        name='dob'
                                        value={dob}
                                        onChange={(e) => setDob(e.target.value)}
                                        />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="MobileNo" data-valmsg-replace="true"></span>
                                    </div>


                                    <div className="col-md-4 form-group mt_25">
                                        <label>Gender : &nbsp;</label>
                                        <input 
                                        type="radio" 
                                        className="cursor-P m-r-sm" 
                                        id="male"
                                        value="male"
                                        checked={gender === 'male'}
                                        onChange={(e)=> setGender(e.target.value)}
                                        />  <label htmlFor="male">Male</label>&nbsp;&nbsp;
                                        <input 
                                        type="radio" 
                                        className="cursor-P" 
                                        id="female"
                                        value="female"
                                        checked={gender === 'female'}
                                        onChange={(e)=> setGender(e.target.value)}
                                        />&nbsp; <label htmlFor="female">Female</label>
                                      
                                    </div>
                                </div>



                                <div className="row">
                                    <div className="col-md-12 form-group">
                                        <label htmlFor="Address">Address</label>
                                        <textarea 
                                        className="form-control" 
                                        cols="20" 
                                        id="Address" 
                                        placeholder="Address" 
                                        rows="3"
                                        name='address'
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        >
                                          
            </textarea>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-3 form-group">
                                        <label>Country</label>
                                        <select 
                                        className="form-control" 
                                        value={selectedCountry}
                                        onChange={(e) => { setSelectedCountry(e.target.value); }}
                                        >
                                          <option value="">--Select Country--</option>
                                          {Array.isArray(country) && country.map(countryObj => (
                                             <option 
                                                 key={countryObj.countryId} 
                                                 value={countryObj.countryId}
                                                 >
                                                  {countryObj.countryName}
                                             </option>
                                          ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 form-group">
                                        <label>State</label>
                                        <select 
                                            className='form-control'
                                            value={selectedState}
                                            onChange={(e) => { setSelectedState(e.target.value); }}>
                                            <option value="0">--Select State--</option>
                                            {Array.isArray(state) && state.map(stateObj => (
                                               <option key={stateObj.stateId} value={stateObj.stateId}>
                                                  {stateObj.stateName}
                                               </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-3 form-group">
                                        <label>City</label>
                                        <select 
                                           className="form-control"
                                           value={selectedCity}
                                           disabled={isOtherCityChecked}
                                           onChange={(e) => { setSelectedCity(e.target.value); }}
                                        
                                        >
                                            <option value="0">--Select City--</option>
                                            {Array.isArray(city) && city.map(cityObj => (
                                               <option key={cityObj.cityId} value={cityObj.cityId}>
                                                   {cityObj.cityName}
                                               </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-md-2 form-group mt_25">
                                        <label className="container1" htmlFor="chkOtherCity">
                                            Other City
                                            <input 
                                                type="checkbox" 
                                                id="chkOtherCity" 
                                                checked={isOtherCityChecked}
                                                onChange={handleOtherCityChange}
                                            />
                                            <span className="checkmark"></span>
                                        </label>
            
                                    </div>
                                    {isOtherCityChecked && (
                                    <div className="col-md-4 form-group" id="divOtherCity">
                                        <label className="required-label" htmlFor="OtherCity">Other City</label>
                                        <input 
                                            className="form-control" 
                                            id="OtherCity" 
                                            type="text"
                                            value={otherCity}
                                            onChange={(e)=> setOtherCity(e.target.value)}
                                            />
                                        <span className="field-validation-valid text-danger" data-valmsg-for="OtherCity" data-valmsg-replace="true"></span>
                                    </div>
                                    )}


                                </div>
                                <div className="row">
                                    <div className="col-md-12 form-group m-t-lg">
                                        <h4>Skiils</h4>
                                        <hr />
                                    </div>
                                    <div className="col-md-12 form-group">
                                    {allSkills.map((skill) => (
                                                <div className="col-sm-3">
                                                  <input 
                                                    type="checkbox" 
                                                    className="chkSkill m-r-sm" 
                                                    id={skill}
                                                    checked={selectedSkills.includes(skill)}
                                                    onChange={() => handleCheckboxChange(skill)}
                                                  />&nbsp;<label className='form-label' htmlFor={skill}>{skill}</label>
                                                </div>
                                    ))}
                                    </div>
                                </div>
                            </div>
            
                        </div>
                        <div className="box-footer text-right">
                            <button 
                              type="button"
                              className="btn btn-success m-r-xs" 
                              onClick={ (e) => saveOrUpdateEmployee(e)}
                            >
                              Save
                            </button>
                            <button onClick={()=>{ navigate('/employee')}} className="btn btn-danger">Cancel</button>
                        </div>
            </form>    </div>
            </section>
            
   

   </LayoutComponent>
            

   </>
  )
}

export default EmployeeComponent