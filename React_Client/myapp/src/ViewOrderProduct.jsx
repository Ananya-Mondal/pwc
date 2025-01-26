import Axios from 'axios';
import Moment from 'moment';
import React, { useEffect, useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'

function ViewOrderProduct() {
    const[products,setProducts]=useState([]);
    
    useEffect(()=>{
       
        Axios.get("https://localhost:7119/api/products/OrderView/"+localStorage.getItem('Id'),{
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
 
    
  return (
    <div>
        <br/>
        <br/>
        
        <center><h3>Order History</h3></center>
       
      <table width="100%">
        <tr>
            <th>Order Date</th>
            <th>Amount</th>
            <th>Product Name</th>
            <th>Quantity</th>
            <th>Customer Name</th>
            <th>Customer Address</th>
            <th>Email/Phone</th>
            

            <th></th>
        </tr>
        {products.map((product)=>{
            return(
                <tr key={product.order_Date}>
                    <td>{Moment(product.order_Date).format('DD/MM/YYYY') }</td>
                    <td>{product.order_Amount}</td>
                    <td>{product.product_Name}</td>
                    <td>{product.qty}</td>
                    <td>{product.name}</td>
                    <td>{product.address1},{product.address2},{product.city},<br/>
                    {product.state},{product.postalCode},{product.country}
                    </td>
                    <td>{product.email}<br/>
                    {product.phone}</td>
                   

                   
                    
                </tr>

            )
        })}
       
      </table>
    </div>
  )
}

export default ViewOrderProduct
