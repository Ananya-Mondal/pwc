import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'

function Product() {
    const[products,setProducts]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        Axios.get("https://localhost:7119/api/products",{
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
    
    navigate("/EditProduct");
    
 }
    function Del(id) {

        Axios.delete("https://localhost:7119/api/products/"+id,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken')
            }
        })
        .then((res)=>{
            setProducts(res.data);
            //console.log(res.data);
            window.location.assign("/Product");
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
        
        <center><h3>Product List</h3></center>
        <Link to="/AddProduct"><button type="button" className="btn btn-success">Add</button></Link>
      <table width="100%">
        <tr>
            <th>Name</th>
            <th>QOH</th>
            <th>Price</th>
            <th></th>
        </tr>
        {products.map((product)=>{
            return(
                <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.qih}</td>
                    <td>{product.price}</td>
                    <td>
                        <button type="button" className="btn btn-danger" onClick={()=>Del(product.id)}>Delete</button>
                        <button type="button" className="btn btn-primary" onClick={()=>Edit(product.id)}>Edit</button>
                    </td>
                </tr>

            )
        })}
       
      </table>
    </div>
  )
}

export default Product
