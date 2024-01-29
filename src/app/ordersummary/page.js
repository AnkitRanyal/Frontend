"use client"
import { useSelector } from "react-redux"
import { selectUserLogin } from "@/features/auth/authSlice"
import Nav from "../nav"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import Footer from "../../../fotter"
import { useEffect, useState } from "react"
export default function ordersummary() {
  let currentOrder = JSON.parse(localStorage.getItem("order"))
  const router = useRouter()
  let [order,setorder] = useState(currentOrder)
  const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
  const userlogin = useSelector(selectUserLogin);



  const payment = currentOrder !== null || undefined && currentOrder.length && currentOrder.map((it) => {
    return it.paymentMethod


  })

  const orderid = currentOrder !== null || undefined && currentOrder.length && currentOrder.map((it) => {
    return it.id

  })
  
 
  const orderdetails = { payment, orderid }

  return (<>
    <Nav></Nav>
    {userlogin || loginstatus ? <div>
      <h3 className="ordertext">Order Summary</h3>
      {currentOrder != null ? currentOrder.map((itemm, i) => (
        <div key={i}>

          {itemm.items.map((item, i) => (
            <div key={i}>
              <div className="ordersummary">
                <div className="order">
                  <img src={item.thumbnail} className="orderimg"></img>
                  <div className="orderdetails">
                    <h3>{item.items}</h3>
                    <br></br>
                    <h3>paymentMethod :{itemm.paymentMethod}</h3><br></br>
                    <h3>category : {item.category}</h3><br></br>
                    <h3>quantity : {itemm.totalItems}</h3>
                    <h3>brand : {item.brand}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))
      : null}

      <h3 className="subtotal">Subtotal : &#8377;{currentOrder && currentOrder!=null && currentOrder.length ==1 ? currentOrder.reduce((total, i) => i.totalAmount + total, 0):currentOrder && currentOrder !== null && currentOrder.length > 1 ? currentOrder.reduce((total, i) => i.totalAmount):null}</h3>
      
      {currentOrder && currentOrder !== null && currentOrder.length && currentOrder.length == 1 ? currentOrder[0].paymentMethod === "card" && currentOrder.reduce((total, i) => i.totalAmount + total, 0) ? <Link href={`http://localhost:5000/payment/?amount=${currentOrder.reduce((total, i) => i.totalAmount + total, 0)}`} className="btn btn-success buybtn" >Pay  &#8377;{currentOrder.reduce((total, i) => i.totalAmount + total, 0)}</Link> : <Link href={"/orderplaced"} className="btn btn-success buybtn" >Pay &#8377;{currentOrder !== null && currentOrder.reduce((total, i) => i.totalAmount + total, 0)}</Link> : currentOrder && currentOrder.length > 1 ? currentOrder !== null && currentOrder[0].paymentMethod === "card" && currentOrder.reduce((total, i) => i.totalAmount) ? <Link href={`http://localhost:5000/payment/?amount=${currentOrder.reduce((total, i) => i.totalAmount)}`} className="btn btn-success buybtn" >Pay  &#8377;{currentOrder.reduce((total, i) => i.totalAmount)}</Link> : <Link href={"/orderplaced"} className="btn btn-success buybtn" >Pay &#8377;{currentOrder !== null && currentOrder.reduce((total, i) => i.totalAmount)}</Link> : null}
      {currentOrder !== null ? <div className="screenfo"><Footer></Footer></div> : <div className="summaryfooter"><Footer></Footer></div>}
    </div> : redirect("/login")}
  </>)
}
