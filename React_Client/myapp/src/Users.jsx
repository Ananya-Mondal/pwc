import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'

function Users() {
    const[products,setProducts]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        Axios.get("https://localhost:7119/api/users",{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken')
            }
        })
        .then((res)=>{
            setProducts(res.data);
            //console.log(res.data);
        },
        (err)=>{
            //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
            //console.log(err);
        }
    )
    },[]);
 function Edit(id) {
    localStorage.setItem('Id',id);
    
    navigate("/EditUser");
    
 }
    function Del(id) {

        Axios.delete("https://localhost:7119/api/users/"+id,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken')
            }
        })
        .then((res)=>{
            setProducts(res.data);
            //console.log(res.data);
            window.location.assign("/Users");
            //navigate("/Product");
            //alert('deleted'+id);
        },
        (err)=>{
            //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
            console.log(err);
        }
    )
        
    }
  return (
    <div>
        <br/>
        <br/>
        
        <center><h3>Users List</h3></center>
        <Link to="/AddUser"><button type="button" className="btn btn-success">Add</button></Link>
      <table width="100%">
        <tr>
            <th>Name</th>
            <th>Email</th>
            <th>IsAdmin</th>
            <th>Phone</th>
            <th></th>
        </tr>
        {products.map((product)=>{
            return(
                <tr key={product.email}>
                    <td>{product.name}</td>
                    <td>{product.email}</td>
                    <td>{product.isAdmin?("ture"):("false")}</td>
                    <td>{product.phone}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={()=>Del(product.email)}>Delete</button>
                        <button type="button" className="btn btn-primary" onClick={()=>Edit(product.email)}>Edit</button>
                    </td>
                </tr>

            )
        })}
       
      </table>
    </div>
  )
}

export default Users
