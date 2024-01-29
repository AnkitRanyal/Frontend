"use client"
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { useDispatch } from 'react-redux'
import { userlogin, userChecked, } from '@/features/auth/authSlice'
import Nav from '../nav'
import Footer from '../../../fotter'


export default function Forgetpassword() {
    const notify = () => toast.info("OTP sent to your Email", { autoClose: 5000, position: "top-center" })
    const [otp, setotp] = useState(false)
    const router = useRouter()
    const [error, seterror] = useState()
    const dipatch = useDispatch()
    async function forget(e) {
        e.preventDefault()
        setotp(!otp)
        const email = e.target.email.value
        localStorage.setItem('email', JSON.stringify(email))
        const emaill = { email }
        const resp = await axios.post("http://localhost:5000/auth/forgetpassword", emaill)
        if (resp.data.login !== false) {
            setotp(resp.data)
            router.push("/forgetpassword/confirmotp")
            notify()
        } else {
            router.push("/forgetpassword")
            seterror("Email is Invalid")
        }
    }

    useEffect(() => {
        const item = false
        dipatch(userChecked(item))
    }, [])


    return (<>
        <Nav></Nav>
        <div className='forgetpage'>
            <h3 className='text'>Forget password </h3>
            <form onSubmit={(e) => forget(e)}>
                <input type="text" placeholder="Enter your email" name="email" className="forget" required></input><br></br>
                <h5 style={{ color: "red", margin: "0px 50px" }}>{error}</h5>
                <input type="submit" value="submit" className='btn btn-primary forgetbtn' ></input>
            </form>
        </div>
        <div className="screenfo"><Footer></Footer></div>
    </>)
}