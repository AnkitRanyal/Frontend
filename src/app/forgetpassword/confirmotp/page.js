"use client"

import axios from "axios"
import { useDispatch, useSelector } from "react-redux"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { userChecked } from "@/features/auth/authSlice"
import { toast } from 'react-toastify'
import Link from "next/link"
import Nav from "@/app/nav"
import Footer from "../../../../fotter"
export default function OTP() {
    const router = useRouter()
    const dipatch = useDispatch()
    const [error, seterror] = useState()
    const notify = () => toast.info("OTP sent to your Email", { autoClose: 5000, position: "top-center" })
    const notifyy = () => toast.info("Verified", { autoClose: 3000, position: "top-center" })
    async function postotp(e) {
        e.preventDefault()
        const email = JSON.parse(localStorage.getItem("email"))
        e.preventDefault()
        const otp = { OTP: e.target.otp.value, email }
        const resp = await axios.post("http://localhost:5000/auth/confirmotp", otp)
        if (resp.data.verified) {
            notifyy()
            seterror(" ")
            router.push("/resetpassword")
        } else {
            seterror("Invalid OTP")
            router.push("/forgetpassword/confirmotp")
        }

    }


    async function resendotp() {
        const email = JSON.parse(localStorage.getItem('email'))
        const emaill = { email }
        const resp = await axios.post("http://localhost:5000/auth/resendotp", emaill)
        if (resp.status == 200) {
            router.push("/forgetpassword/confirmotp")
            notify()
        } else {
            router.push("/forgetpassword")
            seterror("Please Try Again")
        }
    }



    useEffect(() => {
        const item = false
        dipatch(userChecked(item))
    }, [])

    return (<>
        <Nav></Nav>
        <div className='forgetpage'>
            <h3 className="text">Enter OTP here</h3>
            <form onSubmit={postotp}>
                <input type="text" name="otp" placeholder="Enter your OTP" className="forget" required></input><br></br>
                <h5 style={{ color: "red", marginLeft: "50px" }}>{error}</h5>
                <input type="submit" value="submit" className='btn btn-primary forgetbttnn' ></input><br></br>
            </form>
            <input onClick={resendotp} value="Resend OTP" className='btn btn-primary resendotp' ></input>
            <input onClick={() => router.push("/resetpassword")} value="Reset password" className='btn btn-primary resetbtn' ></input><br></br>

        </div>
        <div className="screenfo"><Footer></Footer></div>
    </>)
}