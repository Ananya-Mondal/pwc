
import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'

import { Link } from 'react-router-dom'

function Login() {

    const [Email, setLMail] = useState("");
    const [Password, setLPass] = useState("");
    const [Errors, setError] = useState("");

    const navigate = useNavigate();



    function MakePost() {


        const formData = new FormData();
        formData.append("Email", Email);
        formData.append("Password", Password);


        //var pdata={"email": LMail, "name": 'hh', "password":LPass}


        Axios.post("https://localhost:7119/api/Users/Login", formData)
            .then(
                (res) => {

                    if (res.status === 200) {


                        localStorage.setItem("AnanyaToken", res.data.token);
                        localStorage.setItem("CurrentUser",JSON.stringify(res.data.userdesc));
                        //console.log(localStorage.getItem("CurrentUser"));
                        //navigate("/");
                        window.location.assign("/Profile");
                    }
                },
                (err) => {
                    setError(err);
                    console.log(err);
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
                                        <label >Email</label>
                                        <input type="Email" className="form-control" id="Email" onChange={(e) => setLMail(e.target.value)} />
                                    </div>
                                    <div className="form-group">
                                        <label >Password</label>
                                        <input type="Password" className="form-control" id="Password" onChange={(e) => setLPass(e.target.value)} />
                                    </div>
                                        {Errors &&
                                            <div className="form-group">
                                            <span className="btn btn-danger">
                                                Invalide Eamil or Password
                                            </span>
                                            </div>
                                        }
                                    <div className="form-group">
                                        <button type="button" className="btn btn-success" onClick={() => MakePost()}>Log In</button>
                                    </div>
                                    <div className="form-group">
                                        <Link to="/SignUp">Sign Up</Link>
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

export default Login
