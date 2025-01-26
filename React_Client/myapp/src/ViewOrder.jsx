import Axios from 'axios';
import Moment from 'moment';
import React, { useEffect, useState } from 'react'
import {useNavigate,Link} from 'react-router-dom'

function ViewOrder() {
    const[products,setProducts]=useState([]);
    const navigate=useNavigate();
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        Axios.get("https://localhost:7119/api/Orders/UserOrder/"+user.email,{
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
            <th>Order Id</th>
            <th>Order Date</th>
            <th>Amount</th>
            <th></th>
        </tr>
        {products.map((product)=>{
            return(
                <tr key={product.id}>
                    <td>{product.id}</td>
                    <td>{Moment(product.order_Date).format('DD/MM/YYYY') }</td>
                    <td>{product.order_Amount}</td>
                   
                    
                </tr>

            )
        })}
       
      </table>
    </div>
  )
}

export default ViewOrder
