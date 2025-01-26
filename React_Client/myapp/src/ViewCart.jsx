import Axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

function ViewCart() {
    const [products, setProducts] = useState([]);
    const [GrandTotal, setGrandTotal] = useState(0);





    const navigate = useNavigate();
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        Axios.get("https://localhost:7119/api/Carts/UserProduct/" + user.email, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('AnanyaToken')
            }
        })
            .then((res) => {
                setProducts(res.data);
                var gTotal = 0
                res.data.forEach(pro => {
                    gTotal = gTotal + (pro.p_price * pro.qty);

                });
                setGrandTotal(gTotal);
                //console.log(res.data);
            },
                (err) => {
                    //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
                    //console.log(err);
                }
            );



    }, []);

    function Order() {
        const user = JSON.parse(localStorage.getItem("CurrentUser"));

        var orderData =
        {

            "u_id": user.email,
            "order_Amount": GrandTotal
        };
        Axios.post("https://localhost:7119/api/Orders", orderData, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('AnanyaToken')
            }
        })
            .then((res) => {

                //console.log("MyOrder");
                //console.log(res.data.id);
                putorderdet(res.data.id);
                //console.log("MyOrdergggg");

            },
                (err) => {
                    //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
                    console.log(err);
                }
            )



        navigate("/Profile");
    }

    function putorderdet(ordId) {
        products.forEach(pro => {
            var orderDatails =
            {

                "ord_Id": ordId,
                "p_id": pro.p_id,
                "qty": pro.qty
            };

            Axios.post("https://localhost:7119/api/OrderDetails", orderDatails, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('AnanyaToken')
                }
            })
                .then((res) => {
                    //setOrder(res.data);
                    MakeUpdate(pro.p_id, pro.qty)
                    Del1(pro.id);
                    //console.log(pro.id);

                },
                    (err) => {
                        //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
                        console.log(err);
                    }
                )


        });
    }
    function MakeUpdate(id, qty) {
        var pName = "";
        var pPrice = 0;
        var pQOH = 0;
        var imgName = "";
        var image_data = null;
        var pCatagoty = "";
        var pDesc = "";
        var CreatedBy = "";
        Axios.get("https://localhost:7119/api/products/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('AnanyaToken'),

            }
        })
            .then((res) => {
                pName = res.data.name;
                pPrice = res.data.price;
                pQOH = res.data.qih - qty;
                imgName = res.data.image_Name;
                //image_data=res.data.name;
                pCatagoty = res.data.category;
                pDesc = res.data.description;
                CreatedBy = res.data.createdBy;

                const formData = new FormData();
                formData.append("Id", id);
                formData.append("Name", pName);
                formData.append("price", pPrice);
                formData.append("qih", pQOH);
                formData.append("Image_Name", imgName);
                formData.append("fl", image_data);
                formData.append("Category", pCatagoty);
                formData.append("Description", pDesc);
                formData.append("CreatedBy", CreatedBy);

                //var pdata={"id": id, "name": pName, "qih":pQOH, "price":pPrice, "image_Name":imgName,"description": pDesc,"category": pCatagoty, "createdBy": user.email};

                Axios.put("https://localhost:7119/api/products/" + id, formData, {
                    headers: {
                        'Authorization': 'Bearer ' + localStorage.getItem('AnanyaToken'),
                        'Content-Type': 'multipart/form-data'
                    }
                })
                    .then((res) => {
                        //navigate("/Product");
                        //console.log("update");
                    },
                        (err) => {
                            //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);


                            //setpError(err.response.data.errors);
                            console.log(err);
                        }
                    )

            },
                (err) => {
                    //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);


                    //setpError(err.response.data.errors);
                    console.log(err);
                }
            )



    }
    function Del1(id) {

        Axios.delete("https://localhost:7119/api/Carts/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('AnanyaToken')
            }
        })
            .then((res) => {
                setProducts(res.data);
                //console.log(res.data);
                //window.location.assign("/ViewCart");
                //navigate("/Product");
                //alert('deleted'+id);
            },
                (err) => {
                    //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
                    console.log(err);
                }
            )

    }
    function Del(id) {

        Axios.delete("https://localhost:7119/api/Carts/" + id, {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('AnanyaToken')
            }
        })
            .then((res) => {
                setProducts(res.data);
                //console.log(res.data);
                window.location.assign("/ViewCart");
                //navigate("/Product");
                //alert('deleted'+id);
            },
                (err) => {
                    //console.log(`Bearer ${localStorage.getItem('AnanyaToken')}`);
                    console.log(err);
                }
            )

    }
    return (
        <div>
            <br />
            <br />

            <center><h3>My Cart</h3></center>

            <table width="100%">
                <tr>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Total</th>
                    <th></th>
                </tr>
                {products.map((product) => {

                    return (

                        <tr key={product.id}>
                            <td>{product.p_name}</td>
                            <td>{product.qty}</td>
                            <td>{product.p_price}</td>
                            <td>{product.p_price * product.qty}</td>
                            <td>

                                <button type="button" className="btn btn-danger" onClick={() => Del(product.id)}>Delete</button>

                            </td>
                        </tr>

                    )
                })}
                <tr>
                    <th></th>
                    <th></th>
                    <th>Grand Total : </th>
                    <th>{GrandTotal}</th>
                    <th>
                        {GrandTotal>0?(<button type="button" className="btn btn-success" onClick={() => Order()}>Place My Order</button>)
                        :(<button type="button" className="btn btn-secondary">Place My Order</button>)}
                        </th>
                </tr>
            </table>

        </div>
    )
}

export default ViewCart
