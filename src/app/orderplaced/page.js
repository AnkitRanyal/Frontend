
"use client"

import { useSelector } from "react-redux"
import Link from "next/link"
import "bootstrap/dist/css/bootstrap.min.css"
import Nav from "../nav"
import { redirect, useRouter } from "next/navigation"
import { selectUserLogin } from "@/features/auth/authSlice"
import { resetOrder, selectCurrentOrder } from "@/features/order/orderSlice"
import { updateOrderAsync } from "@/features/order/orderSlice"
import { useEffect, useState } from "react"
import Image from "next/image"
import Ordersuccess from '../../../public/ordersucess.png'
import { useDispatch } from "react-redux"
import axios from "axios"
import { removeBuy } from "@/features/product/productSlice"
import Footer from "../../../fotter"
export default function Orderplacement() {
    const router = useRouter()
    const [currentOrder, setcurrentOrder] = useState()
    const dispatch = useDispatch()
    const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
    const userlogin = useSelector(selectUserLogin);
    async function getorder() {
        const resp = await axios("http://localhost:5000/orders/current")
        setcurrentOrder(resp.data.order)
    }
    const order = { ...currentOrder, paymentStatus: 'received' }
    useEffect(() => {
        getorder()
        dispatch(removeBuy())
        dispatch(resetOrder())
    }, [])
    setTimeout(() => {
        if (currentOrder && currentOrder.paymentMethod === 'card') {
            dispatch(updateOrderAsync({ order }))
        }
    }, 1000)

    return (<>
        <Nav></Nav>
        {userlogin || loginstatus ? <div >
            <div className="orderplaced">
                <Image src={Ordersuccess} width={150} height={150} className="odrsucess"></Image>
                <h3 className='txt' style={{ color: "green" }}>Order  successfully Placed</h3><br></br>
                <h3 className='txt' style={{ color: "green" }}>Order  Details sent to {currentOrder && currentOrder.selectedAddress.email}</h3>
                <h3 className="txt" style={{ color: "green" }}>Order Number</h3>
                <h3 className="txt" style={{ color: "green", padding: "7px" }}>{currentOrder && currentOrder.id}</h3>
            </div>
            <Link className="btn btn-primary or" href={"/"}>Go to Home</Link>
            <div className="screenfo"><Footer></Footer></div>

        </div>
            : redirect("/login")}
    </>)
}

