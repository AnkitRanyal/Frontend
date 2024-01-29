'use client'
import Nav from "../nav"
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../public/style/style.css'
import Link from "next/link"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { fetchItemsByUserIdAsync,resetCartAsync } from "@/features/cart/cartSlice"
import {
    deleteItemFromCartAsync,
    selectItems,
    updateCartAsync,
} from "@/features/cart/cartSlice";
import { selectUserLogin } from "@/features/auth/authSlice"
import { redirect, useRouter } from "next/navigation"


export default function Cart() {
    const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
    const userlogi = useSelector(selectUserLogin);
    const router = useRouter()
    const [quantity, setquantity] = useState()
    const dispatch = useDispatch()
    const cartitems = useSelector(selectItems)
    const userID = JSON.parse(localStorage.getItem("loginuser"))

    const handleQuantity = (e, item) => {
        setquantity(+e.target.value)
        dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
    };

    const handleremove = (id) => {
        dispatch(deleteItemFromCartAsync(id))
    }


    useEffect(() => {
        dispatch(fetchItemsByUserIdAsync(userID.id))
    }, [])

    useEffect(() => {
        dispatch(fetchItemsByUserIdAsync(userID.id))
    }, [quantity])


    return (<>
        <div >
            <Nav></Nav><br></br>

            {userlogi || loginstatus ?

                <div className="cart">
                    <h1 style={{ fontSize: "50px", margin: "0px 8px" }} className="screentitle">Cart </h1>
                    <h1 style={{ fontSize: "20px", margin: "0px 20px" }} className="screentitlle">Total Items : {cartitems && cartitems.length} </h1>
                    <hr style={{ width: "90%", height: "3px", background: "grey", margin: "10px 100px" }} ></hr>
                    <div >
                        {cartitems !== null || undefined ?

                            cartitems.length && cartitems.map((item, i) => (
                                item.product &&
                                <div key={i} >
                                    <div className="productdetails">
                                        <img src={item.product.thumbnail} width={200} height={200} className="productsimage"></img>
                                        <div className="details">
                                            <h5>  {item.product.title} </h5>
                                            <h5 style={{ margin: "0px 120px" }}>  {item.product.category}</h5>
                                            <h5 style={{ position: "relative", top: "0px", left: "-50px" }} className="qty">Qty</h5>
                                            <select className="cartselect"
                                                onChange={(e) => handleQuantity(e, item)}
                                                value={item.quantity}>
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                            <div className="detai">
                                                {item.product && item.product.stock > 0 ? <><h5>&#8377; {item.product.price}</h5><br></br></> : <><h5 className="screenstockcart">Out of stock</h5></>}
                                                <button className='btn btn-success screencartremove' onClick={() => handleremove(item.product.id)}>Remove</button>
                                            </div>
                                        </div>
                                    </div>
                                    <hr style={{ width: "90%", height: "3px", background: "grey", margin: "10px 100px" }} ></hr>
                                    {item.product && item.product.stock > 0 ? <div className="total">
                                        <h2>Subtotal</h2>
                                        <h5> &#8377; {Math.round(item.product.price - (item.product.price * item.product.discountPercentage / 100), 10) * item.quantity}</h5>
                                    </div> : null}
                                    {item.product && item.product.stock > 0 ? <> <Link href={`/checkout/${item.product.id}`} className="btn btn-primary checkoutbtn "> Proceed to buy</Link><br></br></> : null}
                                    <Link href={"/"} className="btn btn-primary continueshopping">or Continue shopping</Link><br></br>
                                </div>))
                            : null}
                        <Link href={`/checkout`} className="btn btn-success buyall"> Buy All</Link><br></br>
                    </div>
                </div> : redirect("/login")}
        </div>
    </>)
}
