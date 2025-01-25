import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Menu() {

    const [currentUser, setCurrentUser] = useState("");
    const [isAdmin, setAdmin] = useState(false);
    const [showUser, setUser] = useState(false);
    const [name, setName] = useState(false);
    

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("CurrentUser"));
        if (user) {
            
            setName(user.name);
            if(user.isAdmin)
            {
                setAdmin(user.isAdmin);
                setUser(false);
            }
            else
            {
                setUser(true);
                setAdmin(false);
            }
            setCurrentUser(user);

        }
        console.log(currentUser);

    }, []);

    const LogOut = () => {
        localStorage.removeItem("AnanyaToken");
        localStorage.removeItem("CurrentUser");
        setCurrentUser(undefined);
        window.location.assign("/Login");
        
    };
    return (
        <div>

            <table width='100%'>
                <tr>
                    <td>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light">
                            <Link className="navbar-brand" to="/">Navbar</Link>
                            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                                <div className="navbar-nav">
                                    <Link className="nav-item nav-link" to="/">Home</Link>
                                    <Link className="nav-item nav-link" to="/AboutUs">AboutUs</Link>
                                    <Link className="nav-item nav-link" to="/ContactUs">ContactUs</Link>

                                    {isAdmin && <>
                                        <Link className="nav-item nav-link" to="/Product">Products</Link>
                                        <Link className="nav-item nav-link" to="/Product">Users</Link>
                                        <Link className="nav-item nav-link" to="/Profile">{name}</Link>
                                        </>
                                    }
                                    {showUser && <>
                                        <Link className="nav-item nav-link" to="/Product">Users Products(Sale)</Link>
                                        <Link className="nav-item nav-link" to="/Product">Users Products(Buy)</Link>
                                        <Link className="nav-item nav-link" to="/Profile">{name}</Link>
                                        </>
                                    }






                                </div>
                            </div>
                        </nav>
                    </td>
                    <td align='right'>
                        <table>
                            <tr>

                                <td >
                                    {currentUser ? (
                                        <Link className="nav-item nav-link" to="/Login"><button type="button" className="btn btn-primary" onClick={() => LogOut()} >Log Out</button>
                                        </Link>
                                    ) :
                                        (
                                            <Link className="nav-item nav-link" to="/Login"><button type="button" className="btn btn-primary" >Login</button>
                                            </Link>
                                        )}
                                </td>
                            </tr>
                        </table>

                    </td>

                </tr>
            </table>
        </div>
    )
}

export default Menu
