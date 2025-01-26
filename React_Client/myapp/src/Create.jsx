import Axios  from 'axios';
import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Create() {
    
    const navigate=useNavigate();
    const[pName,setPName]=useState("");
    const[pPrice,setPPrice]=useState("");
    const[pQOH,setQOH]=useState("");
    const[pDesc,setDesc]=useState("");
    const[pCatagoty,setCatagory]=useState("");
    const[pError,setpError]=useState([]);
    
    const[image_data,setImagedata]=useState(null);

    function MakePost() {

        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        
        const formData=new FormData();
        formData.append("Id",0);
        formData.append("Name",pName);
        formData.append("price",pPrice);
        formData.append("qih",pQOH);
        formData.append("Image_Name","not");
        formData.append("fl",image_data);
        formData.append("Category",pCatagoty);
        formData.append("Description",pDesc);
        formData.append("CreatedBy",user.email);
        
        

        Axios.post("https://localhost:7119/api/products/",formData,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken'),
                'Content-Type':'multipart/form-data'
            }
        })
        .then((res)=>{
            
            //console.log(res.data);
            navigate("/UserProduct");
            //alert('deleted'+id);
        },
        (err)=>{
            //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
            //console.log(err.response.data.errors);
            setpError(err.response.data.errors);
            

        }
    )
        
    }

  return (
    

    <div>
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
                                        <label >Name</label>
                                        <input type="text" className="form-control" id="name" onChange={(e)=>setPName(e.target.value)}  />
                                        {pError.Name &&
                                            <span className="btn btn-danger">
                                                {pError.Name[0]}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Description</label>
                                        <textarea className="form-control"  rows="3" id="Description" onChange={(e)=>setDesc(e.target.value)}></textarea>
                                        
                                        {pError.Description &&
                                            <span className="btn btn-danger">
                                                {pError.Description[0]}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Category</label>
                                        <input type="text" className="form-control" id="Category" onChange={(e)=>setCatagory(e.target.value)}  />
                                        {pError.Category &&
                                            <span className="btn btn-danger">
                                                {pError.Category[0]}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Price</label>
                                        <input type="text" className="form-control" id="price" onChange={(e)=>setPPrice(e.target.value)} />
                                        {pError.price &&
                                            <span className="btn btn-danger">
                                                {pError.price[0]}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Quantity</label>
                                        <input type="text" className="form-control" id="qoh" onChange={(e)=>setQOH(e.target.value)} />
                                        {pError.qih &&
                                            <span className="btn btn-danger">
                                                {pError.qih[0]}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Image of Product</label>
                                        <input type="file" className="form-control" id="prod_image" onChange={(e)=>setImagedata(e.target.files[0])}  />
                                        {pError.fl &&
                                            <span className="btn btn-danger">
                                                {pError.fl[0]}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                    <button type="button" className="btn btn-success" onClick={()=>MakePost()}>Save</button>
                                    </div>
                                   
                                </td>
                            </tr>
                        </table>

                    </td>
                </tr>
            </table>
        </div>
  )
}

export default Create
