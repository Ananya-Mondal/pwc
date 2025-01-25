import Axios  from 'axios';
import React from 'react'
import { useState } from 'react'
import {useNavigate} from 'react-router-dom'

function Create() {
    const navigate=useNavigate();
    const[pName,setPName]=useState("");
    const[pPrice,setPPrice]=useState("");
    const[pQOH,setQOH]=useState("");
    const[image_data,setImagedata]=useState(null);

    function MakePost() {

        const formData=new FormData();
        formData.append("Id",0);
        formData.append("Name",pName);
        formData.append("price",pPrice);
        formData.append("qih",pQOH);
        formData.append("Image_Name","not");
        formData.append("fl",image_data);
        

        Axios.post("https://localhost:7119/api/products/",formData,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken'),
                'Content-Type':'multipart/form-data'
            }
        })
        .then((res)=>{
            
            //console.log(res.data);
            navigate("/Product");
            //alert('deleted'+id);
        },
        (err)=>{
            //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
            //console.log(err);
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
                        <br />
                        <br />
                        <br />
                    </td>
                </tr>
                <tr>
                    <td align='Center'>
                        <table>
                            <tr>
                                <td>
                                    <div className="form-group">
                                        <label >Name</label>
                                        <input type="text" className="form-control" id="name" onChange={(e)=>setPName(e.target.value)}  />
                                    </div>
                                    <div className="form-group">
                                        <label >Price</label>
                                        <input type="text" className="form-control" id="price" onChange={(e)=>setPPrice(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label >Quantity</label>
                                        <input type="text" className="form-control" id="qoh" onChange={(e)=>setQOH(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label >Image of Product</label>
                                        <input type="file" className="form-control" id="prod_image" onChange={(e)=>setImagedata(e.target.files[0])}  />
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
