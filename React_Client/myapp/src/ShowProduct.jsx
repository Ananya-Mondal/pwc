import Axios  from 'axios';

import {useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react'


function ShowProduct() {
    const navigate=useNavigate();
    
    const[pName,setPName]=useState("");
    const[pPrice,setPPrice]=useState("");
    const[pQOH,setQOH]=useState("");
    const[pDesc,setDesc]=useState("");
    const[pCatagoty,setCatagory]=useState("");
    const[pQty,setQty]=useState("");
    const[imgURL,setURL]=useState("");
   

    
    

    useEffect(()=>{
        Axios.get("https://localhost:7119/api/products/"+localStorage.getItem('Id'),{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken')
            }
        })
        .then((res)=>{
            
            setURL("https://localhost:7119/images/"+res.data.image_Name);
            
            setPName(res.data.name);
            setPPrice(res.data.price);
            setQOH(res.data.qih);
            setDesc(res.data.description);
            setCatagory(res.data.category);
            
        },
        (err)=>{
            //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
            //console.log(err);
        }
    )
    },[]);

    function MakePost(id) {
        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        
        var pdata={ "p_id": id, "u_id" : user.email, "qty": pQty,"p_name": pName,"p_price":pPrice};

        

        Axios.post("https://localhost:7119/api/Carts",pdata,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken')
                
            }
        })
        .then((res)=>{
            navigate("/ViewCart");
        },
        (err)=>{
            //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
            
            
            //setpError(err.response.data.errors);
            console.log(err);
        }
    )
        
    }
  return (
    <div>
        <form>
            <table width='100%' >
                <tr>
                    <td align='Center'>
                        <br />
                        <br />
                        
                    </td>
                </tr>
                <tr>
                    <td align='Center'>
                        <table width="30%">
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <img src={imgURL} width="200" height="200"/>
                                    </div>
                                    <div>
                                    <label ><b>Name : </b></label>
                                    <label >{pName}</label>
                                        
                                    </div>
                                    <div className="form-group">
                                        <label ><b>Description : </b></label> <br/>
                                        <label >{pDesc}</label>
                                        
                                    </div>
                                    <div className="form-group">
                                        <label ><b>Category : </b></label>
                                        <label >{pCatagoty}</label>
                                        
                                    </div>
                                    <div className="form-group">
                                        <label ><b>Price : </b></label>
                                        <label >{pPrice}</label>
                                        
                                    </div>
                                    <div className="form-group">
                                        <label ><b>Quantity : </b></label> 
                                        <div className="w-25 p-3" ><input type="number" id="Quantity" className="form-control" size="4" onChange={(e)=>setQty(e.target.value)} /></div>
                                        
                                       
                                    </div>
                                    
                                    
                                    
                                    <div className="form-group">
                                    {(pQty>pQOH)? 
                                    (
                                        <button type="button" className="btn btn-secondary" >Add To Cart</button>
                                    )
                                    :
                                    (
                                    <button type="button" className="btn btn-success" onClick={()=>MakePost(localStorage.getItem('Id'))}>Add To Cart</button>
                                    )
                                           
                                    }
                                    
                                    </div>
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>
            </form>
        </div>
  )
}

export default ShowProduct
