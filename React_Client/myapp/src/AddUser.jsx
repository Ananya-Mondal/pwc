import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

function AddUser() {
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
  function MakePost() {
    //alert('post'+UName + UEmail+UPass);
    var payload = {
      email: Email,
      name: Name,
      password: Password,
      isAdmin: isAdmin,
      address1: Address1,
      address2: Address2,
      city: City,
      state: State,
      postalCode: PostalCode,
      country: Country,
      phone: Phone,
    };

    console.log(payload);

    Axios.post("https://localhost:7119/api/Users/SingUp", payload).then(
      (res) => {
        console.log(res.status);
        if (res.status === 200) {
          navigate("/Users");
        }
      },
      (err) => {
        if (err.status === 401) {
          setDulicate("This is Email is duplicate");
        } else {
          setDulicate("");
          setErrors(err.response.data.errors);
        }

        //console.log(err.response.data.errors);

        //let jj = Object.entries(Errors);
        //console.log(jj);

        //console.log(Errors.City[0]+Errors.Address1[0]);
      }
    );
  }
  return (
    <div>
      <table width="100%">
        <tr>
          <td align="Center"></td>
        </tr>
        <tr>
          <td align="Center">
            <table width="30%">
              <tr>
                <td>
                  <div className="form-group">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id="IsAdmin"
                      onChange={(e) => setisAdmin(e.target.checked)}
                    />
                    <label>Is Admin</label>
                  </div>
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Name"
                      onChange={(e) => setUName(e.target.value)}
                    />
                    {Errors.Name && (
                      <span className="btn btn-danger">{Errors.Name[0]}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="Email"
                      className="form-control"
                      id="Email"
                      onChange={(e) => setUEmail(e.target.value)}
                    />
                    {Errors.Email && (
                      <span className="btn btn-danger">{Errors.Email[0]}</span>
                    )}
                    {duplicateEmail && (
                      <span className="btn btn-danger">{duplicateEmail}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Phone"
                      onChange={(e) => setPhone(e.target.value)}
                    />
                    {Errors.Phone && (
                      <span className="btn btn-danger">{Errors.Phone[0]}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Password</label>
                    <input
                      type="Password"
                      className="form-control"
                      id="Password"
                      onChange={(e) => setUPass(e.target.value)}
                    />
                    {Errors.Password && (
                      <span className="btn btn-danger">
                        {Errors.Password[0]}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Address1</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Address1"
                      onChange={(e) => setAddress1(e.target.value)}
                    />
                    {Errors.Address1 && (
                      <span className="btn btn-danger">
                        {Errors.Address1[0]}
                      </span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Address2</label>
                    <input
                      type="text"
                      className="form-control"
                      id="Address2"
                      onChange={(e) => setAddress2(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>City</label>
                    <input
                      type="text"
                      className="form-control"
                      id="City"
                      onChange={(e) => setCity(e.target.value)}
                    />
                    {Errors.City && (
                      <span className="btn btn-danger">{Errors.City[0]}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>State</label>
                    <select
                      className="form-control"
                      value={State}
                      id="State"
                      onChange={(e) => setUState(e.target.value)}
                    >
                      <option value="">Select State</option>
                      <option value="AP">Andhra Pradesh</option>
                      <option value="AR">Arunachal Pradesh</option>
                      <option value="AS">Assam</option>
                      <option value="BR">Bihar</option>
                      <option value="CT">Chhattisgarh</option>
                      <option value="GA">Gujarat</option>
                      <option value="HR">Haryana</option>
                      <option value="HP">Himachal Pradesh</option>
                      <option value="JK">Jammu and Kashmir</option>
                      <option value="GA">Goa</option>
                      <option value="JH">Jharkhand</option>
                      <option value="KA">Karnataka</option>
                      <option value="KL">Kerala</option>
                      <option value="MP">Madhya Pradesh</option>
                      <option value="MH">Maharashtra</option>
                      <option value="MN">Manipur</option>
                      <option value="ML">Meghalaya</option>
                      <option value="MZ">Mizoram</option>
                      <option value="NL">Nagaland</option>
                      <option value="OR">Odisha</option>
                      <option value="PB">Punjab</option>
                      <option value="RJ">Rajasthan</option>
                      <option value="SK">Sikkim</option>
                      <option value="TN">Tamil Nadu</option>
                      <option value="TG">Telangana</option>
                      <option value="TR">Tripura</option>
                      <option value="UT">Uttarakhand</option>
                      <option value="UP">Uttar Pradesh</option>
                      <option value="WB">West Bengal</option>
                      <option value="AN">Andaman and Nicobar Islands</option>
                      <option value="CH">Chandigarh</option>
                      <option value="DN">Dadra and Nagar Haveli</option>
                      <option value="DD">Daman and Diu</option>
                      <option value="DL">Delhi</option>
                      <option value="LD">Lakshadweep</option>
                      <option value="PY">Puducherry</option>
                    </select>

                    {Errors.State && (
                      <span className="btn btn-danger">{Errors.State[0]}</span>
                    )}
                  </div>
                  <div className="form-group">
                    <label>Pin</label>
                    <input
                      type="text"
                      className="form-control"
                      id="PostalCode"
                      onChange={(e) => setPostalCode(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <select
                      className="form-control"
                      value={Country}
                      id="Country"
                      onChange={(e) => setCountry(e.target.value)}
                    >
                      <option value="">Select Country</option>
                      <option value="IN">India</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <button
                      type="button"
                      className="btn btn-success"
                      onClick={() => MakePost()}
                    >
                      Save
                    </button>
                  </div>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </div>
  );
}

export default AddUser;
