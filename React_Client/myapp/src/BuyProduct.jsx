import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'

function BuyProduct() {
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
 function Buy(id) {
    localStorage.setItem('Id',id);
    
    navigate("/ShowProduct");
    
 }
    
  return (
    <div>
        <br/>
        <br/>
        
        <center><h3>Product List</h3></center>
        
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
                        
                        <button type="button" className="btn btn-primary" onClick={()=>Buy(product.id)}>Buy</button>
                    </td>
                </tr>

            )
        })}
       
      </table>
    </div>
  )
}

export default BuyProduct
