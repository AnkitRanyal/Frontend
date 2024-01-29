"use client"

import Nav from '../nav'
import '../../../public/style/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { loginUserAsync, selectUserLogin } from '@/features/auth/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { selectError, selectLoggedInUser } from '@/features/auth/authSlice'
import eyeOpen from '../../../public/eye-open.png'
import eyeClose from '../../../public/eye-close.png'
import Image from 'next/image'
import { toast } from 'react-toastify'
import Footer from '../../../fotter'


export default function Login() {
  const dispatch = useDispatch()
  const error = useSelector(selectError);
  const user = useSelector(selectLoggedInUser);
  const userlogin = useSelector(selectLoggedInUser);
  const notify = () => toast.success("Logged In", { autoClose: 2000 })


  if (user) {
    const loginuser = JSON.stringify(user)
    localStorage.setItem('loginuser', loginuser)
  }
  const router = useRouter()
  const [status, setstatus] = useState(false)
  async function dosubmit(e) {
    e.preventDefault()
    const email = e.target.email.value
    const password = e.target.password.value
    const loginInfo = { email, password }
    dispatch(loginUserAsync({ email: loginInfo.email, password: loginInfo.password }))
    try {
      const response = await fetch('http://localhost:5000/auth/login', {
        method: 'POST',
        body: JSON.stringify(loginInfo),
        headers: { 'content-type': 'application/json' },
      });
      if (response) {
        const data = await response.json();
        if (data.login == true && data.role == 'user') {
          notify()
          localStorage.setItem("jwt", JSON.stringify(data.token))
          router.push("/auth")
        } else if (data.login == true && data.role == 'admin') {
          router.push("/admin")
          notify()
        }
        else {
          router.push("/login")
        }
      } else {
        router.push("/login")
      }
    } catch (error) {

    }

  }


  let showhide;
  if (!status == false) {
    showhide = "text"
  } else {
    showhide = "password"
  }


  return (<>


    <Nav></Nav>
    <div className="signup">
      <form onSubmit={dosubmit}>
        <h1 className="signupheading"> Login in to your Account </h1><br></br>
        <label className="labell" htmlFor="Email">Email address</label><br></br>
        <input type="text" placeholder="Enter your Email" name="email" className="inputbox" required></input><br></br>
        <Link href={"/forgetpassword"} className="FGTpass"><span>Forget_password</span></Link>
        <label className="labell" htmlFor="FGTpass">Password</label><br></br>
        <input type={showhide} placeholder="Enter your password" name="password" className="inputbox" required></input><Image src={status ? eyeOpen : eyeClose} width={30} height={30} onClick={() => setstatus(!status)} className="eye"></Image><br></br>
        <h5 style={{ color: "red" }}>{error}</h5>
        <button type="submit" className="btn btn-primary submitt">Login</button><br></br>
        <br></br>
        <br></br>
        <br></br>
        <Link href={"/signup"} className="member" ><span style={{ color: "black" }}>Not a member ?</span> Create an Account</Link><br></br>
      </form>

    </div>
    <div className="screenfo"><Footer></Footer></div>
  </>)

}