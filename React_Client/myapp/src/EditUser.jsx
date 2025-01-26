import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from 'axios';

function EditUser() {
    const [Name, setUName] = useState("");
    const [Email, setUEmail] = useState("");
    const [Password, setUPass] = useState("");
    const [Phone, setPhone] = useState("");
    const [Address1, setAddress1] = useState("");
    const [Address2, setAddress2] = useState("");
    const [City, setCity] = useState("");
    const [State, setUState] = useState("");
    const [PostalCode, setPostalCode] = useState("");
    const [Country, setCountry] = useState("");
    const [isAdmin, setisAdmin] = useState(false);
    const [Errors, setErrors] = useState([]);
    const [duplicateEmail, setDulicate] = useState("");

    const navigate = useNavigate();


    useEffect(()=>{
        Axios.get("https://localhost:7119/api/users/"+localStorage.getItem('Id'),{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken')
            }
        })
        .then((res)=>{
            
            setUName(res.data.name);
            setUEmail(res.data.email);
            setUPass(res.data.password);
            setPhone(res.data.phone);
            setAddress1(res.data.address1);
            setAddress2(res.data.address2);
            setCity(res.data.city);
            setUState(res.data.state);
            setPostalCode(res.data.postalCode);
            setCountry(res.data.country);
            setisAdmin(res.data.isAdmin);
           
            //https://localhost:7119/images"+{product.Image_Name}
            //console.log(res.data);
           // console.log(res.data.createdBy);
            //console.log(CreatedBy);
        },
        (err)=>{
            //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
            console.log(err);
        }
    )
    },[]);
    function MakePost(id) {

        //alert('post'+UName + UEmail+UPass);
        var payload={
            "email": Email,
            "name": Name,
            "password": Password,
            "isAdmin": isAdmin,
            "address1": Address1,
            "address2": Address2,
            "city": City,
            "state": State,
            "postalCode": PostalCode,
            "country": Country,
            "phone": Phone
        };

        //console.log(payload);

        Axios.put("https://localhost:7119/api/Users/"+id, payload,{
            headers:{
                'Authorization':'Bearer '+localStorage.getItem('AnanyaToken')           
            }
        })
            .then(
                (res) => {
                    console.log(res.status);
                    if (res.status === 204) {
                        navigate("/Users");

                    }
                },
                (err) => {

                    if(err.status===401)
                    {
                        setDulicate("This is Email is duplicate");
                    }
                    else
                    {
                        setDulicate("");
                        setErrors(err.response.data.errors);
                    }
                
                
                    
                    //console.log(err.response.data.errors);

                    
                    //let jj = Object.entries(Errors);
                    //console.log(jj);


                    //console.log(Errors.City[0]+Errors.Address1[0]);

                }
            )

    }
    return (
        <div>
            <table width='100%' >
                <tr>
                    <td align='Center'>


                    </td>
                </tr>
                <tr>
                    <td align='Center'>
                        <table width="30%">
                            <tr>
                                <td>
                                    <div className="form-group">
                                        {isAdmin?(<input className="form-check-input" type="checkbox" checked  id="IsAdmin"  onChange={(e) => setisAdmin(e.target.checked)}/>):
                                        (<input className="form-check-input" type="checkbox"   id="IsAdmin"  onChange={(e) => setisAdmin(e.target.checked)}/>)}
                                        
                                        <label >Is Admin</label>
                                        
                                       
                                    </div>
                                    <div className="form-group">
                                        <label >Name</label>
                                        <input type="text" className="form-control" id="Name" value={Name} onChange={(e) => setUName(e.target.value)} />
                                        {Errors.Name &&
                                            <span className="btn btn-danger">
                                                {Errors.Name[0]}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Email</label>
                                        <input type="Email" className="form-control" id="Email" value={Email} onChange={(e) => setUEmail(e.target.value)} />
                                        {Errors.Email &&
                                            <span className="btn btn-danger">
                                                {Errors.Email[0]}
                                            </span>
                                        }
                                        {duplicateEmail&&
                                            <span className="btn btn-danger">
                                                {duplicateEmail}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Phone</label>
                                        <input type="text" className="form-control" id="Phone" value={Phone} onChange={(e) => setPhone(e.target.value)} />
                                        {Errors.Phone &&
                                            <span className="btn btn-danger">
                                                {Errors.Phone[0]}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type="Password" className="form-control" id="Password" value={Password} onChange={(e) => setUPass(e.target.value)} />
                                        {Errors.Password &&
                                            <span className="btn btn-danger">
                                                {Errors.Password[0]}
                                            </span>
                                        }

                                    </div>
                                    <div className="form-group">
                                        <label >Address1</label>
                                        <input type="text" className="form-control" id="Address1" value={Address1} onChange={(e) => setAddress1(e.target.value)} />
                                        {Errors.Address1 &&
                                            <span className="btn btn-danger">
                                                {Errors.Address1[0]}
                                            </span>
                                        }

                                    </div>
                                    <div className="form-group">
                                        <label >Address2</label>
                                        <input type="text" className="form-control" id="Address2" value={Address2} onChange={(e) => setAddress2(e.target.value)} />

                                    </div>
                                    <div className="form-group">
                                        <label >City</label>
                                        <input type="text" className="form-control" id="City" value={City} onChange={(e) => setCity(e.target.value)} />
                                        {Errors.City &&
                                            <span className="btn btn-danger">
                                                {Errors.City[0]}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >State</label>
                                        <input type="text" className="form-control" id="State" value={State} onChange={(e) => setUState(e.target.value)} />
                                        {Errors.State &&
                                            <span className="btn btn-danger">
                                                {Errors.State[0]}
                                            </span>
                                        }
                                    </div>
                                    <div className="form-group">
                                        <label >Pin</label>
                                        <input type="text" className="form-control" id="PostalCode" value={PostalCode} onChange={(e) => setPostalCode(e.target.value)} />

                                    </div>
                                    <div className="form-group">
                                        <label >Country</label>
                                        <input type="text" className="form-control" id="Country" value={Country} onChange={(e) => setCountry(e.target.value)} />

                                    </div>
                                    <div className="form-group">
                                        <button type="button" className="btn btn-success" onClick={() => MakePost(localStorage.getItem('Id'))}>Save</button>
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

export default EditUser