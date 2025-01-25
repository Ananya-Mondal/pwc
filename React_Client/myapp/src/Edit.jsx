import Axios  from 'axios';

import {useNavigate} from 'react-router-dom'
import React, { useEffect, useState } from 'react'


function Edit() {
    const navigate=useNavigate();
    
    const[pName,setPName]=useState("");
    const[pPrice,setPPrice]=useState("");
    const[pQOH,setQOH]=useState("");
    const[imgURL,setURL]=useState("");
    const[imgName,setImgName]=useState("");
    

    useEffect(()=>{
        Axios.get("https://localhost:7119/api/products/"+localStorage.getItem('Id'),{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken')
            }
        })
        .then((res)=>{
            
            setURL("https://localhost:7119/images/"+res.data.image_Name);
            setImgName(res.data.image_Name);
            setPName(res.data.name);
            setPPrice(res.data.price);
            setQOH(res.data.qih);
            //https://localhost:7119/images"+{product.Image_Name}
            //console.log(res.data);
            console.log(imgURL);
        },
        (err)=>{
            //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
            console.log(err);
        }
    )
    },[]);

    function MakePost(id) {

        var pdata={"id": id, "name": pName, "qih":pQOH, "price":pPrice, "image_Name":imgName};

        Axios.put("https://localhost:7119/api/products/"+id,pdata,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken')
            }
        })
        .then((res)=>{
            navigate("/Product");
        },
        (err)=>{
            //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
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
                                        <img src={imgURL} width="200" height="200"/>
                                    </div>
                                    <div className="form-group">
                                        <label >Name</label>
                                        <input type="text" className="form-control" id="name" value={pName} name="name" onChange={(e)=>setPName(e.target.value)}  />
                                    </div>
                                    <div className="form-group">
                                        <label >Price</label>
                                        <input type="text" className="form-control" id="price" value={pPrice} name="price" onChange={(e)=>setPPrice(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label >Quantity</label>
                                        <input type="text" className="form-control" id="qoh" value={pQOH} name="qoh" onChange={(e)=>setQOH(e.target.value)} />
                                    </div>
                                    
                                    <div className="form-group">
                                    <button type="button" className="btn btn-success" onClick={()=>MakePost(localStorage.getItem('Id'))}>Save</button>
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

export default Edit
