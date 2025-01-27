import Axios from "axios";

import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";

function UserProductEdit() {
  const navigate = useNavigate();

  const [pName, setPName] = useState("");
  const [pPrice, setPPrice] = useState("");
  const [pQOH, setQOH] = useState("");
  const [pDesc, setDesc] = useState("");
  const [pCatagoty, setCatagory] = useState("");
  const [pError, setpError] = useState([]);

  const [imgURL, setURL] = useState("");
  const [imgName, setImgName] = useState("");

  const [image_data, setImagedata] = useState(null);

  useEffect(() => {
    Axios.get(
      "https://localhost:7119/api/products/" + localStorage.getItem("Id"),
      {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("AnanyaToken"),
        },
      }
    ).then(
      (res) => {
        setURL("https://localhost:7119/images/" + res.data.image_Name);
        setImgName(res.data.image_Name);
        setPName(res.data.name);
        setPPrice(res.data.price);
        setQOH(res.data.qih);
        setDesc(res.data.description);
        setCatagory(res.data.category);
        //https://localhost:7119/images"+{product.Image_Name}
        //console.log(res.data);
        console.log(imgURL);
      },
      (err) => {
        //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
        console.log(err);
      }
    );
  }, []);

  function MakePost(id) {
    const user = JSON.parse(localStorage.getItem("CurrentUser"));

    const formData = new FormData();
    formData.append("Id", id);
    formData.append("Name", pName);
    formData.append("price", pPrice);
    formData.append("qih", pQOH);
    formData.append("Image_Name", imgName);
    formData.append("fl", image_data);
    formData.append("Category", pCatagoty);
    formData.append("Description", pDesc);
    formData.append("CreatedBy", user.email);

    //var pdata={"id": id, "name": pName, "qih":pQOH, "price":pPrice, "image_Name":imgName,"description": pDesc,"category": pCatagoty, "createdBy": user.email};

    Axios.put("https://localhost:7119/api/products/" + id, formData, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("AnanyaToken"),
        "Content-Type": "multipart/form-data",
      },
    }).then(
      (res) => {
        navigate("/UserProduct");
      },
      (err) => {
        //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);

        setpError(err.response.data.errors);
        console.log(err);
      }
    );
  }
  return (
    <div>
      <form>
        <table width="100%">
          <tr>
            <td align="Center">
              <br />
              <br />
            </td>
          </tr>
          <tr>
            <td align="Center">
              <table width="30%">
                <tr>
                  <td>
                    <div className="form-group">
                      <img src={imgURL} width="200" height="200" />
                    </div>
                    <div>
                      <label>Name</label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={pName}
                        onChange={(e) => setPName(e.target.value)}
                      />
                      {pError.Name && (
                        <span className="btn btn-danger">{pError.Name[0]}</span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Description</label>
                      <textarea
                        className="form-control"
                        rows="3"
                        id="Description"
                        value={pDesc}
                        onChange={(e) => setDesc(e.target.value)}
                      ></textarea>

                      {pError.Description && (
                        <span className="btn btn-danger">
                          {pError.Description[0]}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select
                        className="form-control"
                        value={pCatagoty}
                        id="Category"
                        onChange={(e) => setCatagory(e.target.value)}
                      >
                        <option value="">Select Country</option>
                        <option value="EP">Electronic products</option>
                        <option value="CJ">Coats and jackets</option>
                        <option value="RJ">Rings and jewelry</option>
                        <option value="MP">Mobile phones</option>
                      </select>
                      
                      {pError.Category && (
                        <span className="btn btn-danger">
                          {pError.Category[0]}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Price</label>
                      <input
                        type="text"
                        className="form-control"
                        id="price"
                        value={pPrice}
                        onChange={(e) => setPPrice(e.target.value)}
                      />
                      {pPrice <= 0 && (
                        <span className="btn btn-danger">
                          Product price can not be {pPrice}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Quantity</label>
                      <input
                        type="text"
                        className="form-control"
                        id="qoh"
                        value={pQOH}
                        onChange={(e) => setQOH(e.target.value)}
                      />
                      {pQOH <= 0 && (
                        <span className="btn btn-danger">
                          Product quantity can not be {pQOH}
                        </span>
                      )}
                    </div>
                    <div className="form-group">
                      <label>Image of Product</label>
                      <input
                        type="file"
                        className="form-control"
                        id="prod_image"
                        onChange={(e) => setImagedata(e.target.files[0])}
                      />
                      {pError.fl && (
                        <span className="btn btn-danger">{pError.fl[0]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <button
                        type="button"
                        className="btn btn-success"
                        onClick={() => MakePost(localStorage.getItem("Id"))}
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
      </form>
    </div>
  );
}

export default UserProductEdit;
