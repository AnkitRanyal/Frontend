"use client"

import 'bootstrap/dist/css/bootstrap.min.css'
import { useDispatch, useSelector } from "react-redux"
import { selectUserLogin } from "@/features/auth/authSlice"
import '../../../public/style/style.css'
import { redirect, useRouter } from "next/navigation"
import Nav from "../nav"
import { useEffect, useState } from "react"
import { fetchLoggedInUserAsync, selectUserInfo } from "@/features/user/userSlice"
import { updateUserAsync } from "@/features/user/userSlice"
export default function Myprofile() {
    const router = useRouter()
    const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
    const userlogin = useSelector(selectUserLogin);
    const user = JSON.parse(localStorage.getItem("loginuser"))
    const userId = user.id
    const userinfo = useSelector(selectUserInfo)
    const dispatch = useDispatch()
    const [ShowAddAddressForm, setShowAddAddressForm] = useState(false)
    const [index, setindex] = useState()

    function showaddress() {
        setShowAddAddressForm(!ShowAddAddressForm);
    }

    function dosubmit(e) {
        e.preventDefault()
        setindex(index + 1)
        const name = e.target.name.value
        const email = e.target.email.value
        const phone = e.target.phone.value
        const street = e.target.street.value
        const state = e.target.state.value
        const pincode = e.target.pincode.value
        const city = e.target.city.value
        const address = { name, email, phone, street, state, pincode, city }
        const newUser = { ...userinfo, addresses: [...userinfo.addresses] };
        newUser.addresses.push(address)
        dispatch(updateUserAsync(newUser));
        setShowAddAddressForm(false);
    }

    function handleRemove(i) {
        const newUser = { ...userinfo, addresses: [...userinfo.addresses] }
        newUser.addresses.splice(i, 1)
        dispatch(updateUserAsync(newUser));
    }


    useEffect(() => {
        dispatch(fetchLoggedInUserAsync(userId))
    }, [])
s
    return (<>
        <Nav></Nav>
        {userlogin || loginstatus ? <div className="profilepage">
            <div className="myprofile">
                <div className="profiledetails">
                    <h2>My Profile</h2>
                    <h1 className='screenname' style={{ fontSize: "25px" }}>Name : {userinfo && userinfo.addresses[0] ? userinfo.addresses[0].name : null}</h1>
                    <h3>Email Address :  {userinfo && userinfo.email}</h3><br></br>
                    <h3>Role : {userinfo && userinfo.role}</h3>
                    <hr style={{ margin: "150px 0px" }}></hr>
                    <div className="btn btn-success profileaddressbtn" onClick={showaddress}>Add New Address
                        {ShowAddAddressForm ? <div className="addresssdetails">
                            <h4>Personal Information</h4><br></br>
                            <form className="addressform" onSubmit={(e) => dosubmit(e)}>
                                <label htmlFor="profileinputbox">Full name</label><br></br>
                                <input type="text" className="profileinputbox" name="name" ></input><br></br>
                                <label htmlFor="profileinputbox">Email address</label><br></br>
                                <input type="text" className="profileinputbox" name="email"></input><br></br>
                                <label htmlFor="profileinputbox">Phone</label><br></br>
                                <input type="text" className="profileinputbox" name="phone"></input><br></br>
                                <label htmlFor="profileinputbox">Street address</label><br></br>
                                <input type="text" className="profileinputbox" name="street"></input><br></br>
                                <div className="settle">
                                    <label htmlFor="profileinputboxx" style={{ position: "relative" }} className='screenlabel'>City</label><br></br>
                                    <input type="text" className="profileinputboxx" name="city"></input><br></br>
                                    <label htmlFor="profileinputboxx" style={{ position: "relative" }} className='screenlabel'>State / Province</label><br></br>
                                    <input type="text" className="profileinputboxx" name="state"></input><br></br>
                                    <label htmlFor="profileinputboxx" style={{ position: "relative" }} className='screenlabel'>ZIP / Postal code</label><br></br>
                                    <input type="text" className="profileinputboxx" name="pincode"></input><br></br>
                                </div>
                                <hr></hr>
                                <button type="submit" value="Add address" className="btn btn-success addaddress">Add address</button>

                            </form>
                        </div> : null}
                    </div>

                </div>
            </div>
            {ShowAddAddressForm ? null : <div className="addressess">Your Address :
                <h5>{userinfo && userinfo.addresses.map((item, i) => (
                    <div className="addressessdetails">
                        <table>
                            <thead >
                                <th className="dddteails">Name</th>
                                <th className="dddteails">Phone</th>
                                <th className="dddteails">Address</th>
                                <th className="dddteails">City</th>
                                <th className="dddteails">Locality</th>
                                <th className="dddteails">State</th>
                                <th className="dddteails">Pincode</th>
                                <th className="dddteails">LandMark</th>

                            </thead>
                            <tbody>
                                <tr>
                                    <td className="ddetails">{item.name}</td>
                                    <td className="ddetails">{item.Mobile} </td>
                                    <td className="ddetails">{item.Address} </td>
                                    <td className="ddetails">{item.City} </td>
                                    <td className="ddetails">{item.Locality} </td>
                                    <td className="ddetails">{item.State}</td>
                                    <td className="ddetails">{item.Pincode} </td>
                                    <td className="ddetails">{item.LandMark} </td>
                                </tr>
                            </tbody>
                        </table>
                        <button className="btn btn-success remove" onClick={() => handleRemove(i)}>Remove</button>
                    </div>
                ))}</h5>
            </div>}
        </div> : redirect("/login")}
    </>)
}