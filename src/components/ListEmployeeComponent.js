import React, { useEffect, useState } from 'react'
import { deleteEmployee, getAllEmployee} from '../services/EmployeeService'
import { useNavigate } from 'react-router-dom'
import LayoutComponent from './LayoutComponent'

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import LoaderComponent from './LoaderComponent'
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ListEmployeeComponent = () => {
    const [allEmployees, setAllEmployees] = useState([])
    const [employees, setEmployees] = useState([])
    const [searchQuery, setSearchQuery] = useState([])
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const [loading, setLoading] = useState(true);


    const navigate = useNavigate()




    useEffect(() => {

        listEmployee();

    }, [])

    useEffect(() => {
        searchData(searchQuery);
    }, [searchQuery])
    
    function listEmployee(){
        getAllEmployee().then((response) => {
            setLoading(true);
            setEmployees(response.data);
            setAllEmployees(response.data);
            setLoading(false);
        }).catch(error => {
            console.error(error);
        })
    }

    const searchData = (searchQuery) => {
      
        let filterData;

        if (searchQuery) {
          filterData = allEmployees.filter(emp =>
            emp.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            emp.mobileNo.toLowerCase().includes(searchQuery.toLowerCase())
          );
          console.log(searchQuery);
          console.log(filterData);
          setEmployees(filterData);
        } else {
          setEmployees(allEmployees);
        }

    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
      };
    
      const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
      };

    function addNewEmployeee(){
        navigate('/add-employee')

    }

    function updateEmployee(id){
        navigate(`/update-employee/${id}`)
    }
    
    function removeEmployee(id){

      confirmAlert({
        title: 'Confirm to Delete',
        message: 'Are you sure to delete this records.',
        buttons: [
          {
            label: 'Yes',
            onClick: () => deleteRecord(id)
          },
          {
            label: 'No'
          }
        ]
      });


       
    }

    const deleteRecord = (id) =>{
      deleteEmployee(id).then((response) => {
        toast.success(response.data, {
          autoClose: 2000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        listEmployee();
    }).catch(error => {
        console.error(error)
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

  return (
    <>
<LayoutComponent>

{loading ? (<LoaderComponent></LoaderComponent>): (<><section class="content-header">
    <h1>
        Employee <small>List</small>
    </h1>
    <ol class="breadcrumb m-r-xs">
        <li><span style={{cursor : 'pointer'}} onClick={()=>{navigate('/employee')}}><i className="fa fa-dashboard"></i> Home</span></li>
        <li class="">Employee</li>
        <li class="active">List</li>
    </ol>

</section>



<section class="content">
    <div class="box box-info">
        <div class="box-header with-border">
            <h3 class="box-title">Employees Data</h3>

            <div class="pull-right box-tools">
                <button  onClick={addNewEmployeee} class="btn btn-info btn-sm" style={{ color: '#fff' }}>Add Employee</button>
            </div>

        </div>
            <div class="box-body box-body-list">
                <div class="col-xs-12">
                    <div class="row">
                        <div class="col-md-4 form-group">
                            <label htmlFor="Name">Search</label>
                            <input 
                              class="form-control"
                              placeholder="Search by Employee Name or Mobile No"
                              type="text" 
                              value={searchQuery}
                              onChange={(e)=> setSearchQuery(e.target.value)} 
                            />
                        </div>                                                
                    </div>                    
                </div>

                <div class="col-xs-12 padding-zero m-t-md">
                  {/* Data Table */}
                  <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell
                  align="right"
                  style={{ minWidth: 70, fontSize:18}}
                >
                   ID
                </TableCell>
                <TableCell

                  align="right"
                  style={{ minWidth: 70, fontSize:18 }}
                >
                   First Name
                </TableCell>
                <TableCell

                  align="right"
                  style={{ minWidth: 70, fontSize:18 }}
                >
                   Last Name
                </TableCell>
                <TableCell

                  align="right"
                  style={{ minWidth: 70, fontSize:18 }}
                >
                   Email
                </TableCell>
                <TableCell

                  align="right"
                  style={{ minWidth: 70, fontSize:18 }}
                >
                   Mobile No
                </TableCell>
                <TableCell

                  align="right"
                  style={{ minWidth: 70, fontSize:18 }}
                >
                   Date Of Birth
                </TableCell>
                <TableCell

                  align="right"
                  style={{ minWidth: 70, fontSize:18 }}
                >
                   Gender
                </TableCell>
                <TableCell

                  align="center"
                  style={{ minWidth: 70, fontSize:18 }}
                >
                   Action
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
{employees.length != 0 && Array.isArray(employees) ? (
  employees
    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
    .map((row, index) => (
      <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
        <TableCell key={index} align="right">
          {row.id}
        </TableCell>
        <TableCell key={index} align="right">
          {row.firstName}
        </TableCell>
        <TableCell key={index} align="right">
          {row.lastName}
        </TableCell>
        <TableCell key={index} align="right">
          {row.email}
        </TableCell>
        <TableCell key={index} align="right">
          {row.mobileNo}
        </TableCell>
        <TableCell key={index} align="right">
          {row.dob}
        </TableCell>
        <TableCell key={index} align="right">
          {row.gender}
        </TableCell>
        <TableCell key={index} align="center">
        <div>

        <span onClick={() => updateEmployee(row.id)}><EditIcon style={{color:'green', fontSize: '24px', cursor: 'pointer', marginRight:'5px'}} /></span>
        <span onClick={() => removeEmployee(row.id)}><DeleteIcon style={{color:'red', fontSize: '24px', cursor: 'pointer'}} /></span>
        


        </div>
        </TableCell>
        
      </TableRow>
    ))
) : (
  <TableRow>
  <TableCell colSpan={8}>
    <div style={{ textAlign: 'center', color: 'red', fontSize: '15px' }}>No data available.</div>
  </TableCell>
</TableRow>
)}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={employees.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
                  {/* Data Table */}
                </div>
            </div>
        
    </div>
</section></>)}


</LayoutComponent>
    </>
  )
}

export default ListEmployeeComponent