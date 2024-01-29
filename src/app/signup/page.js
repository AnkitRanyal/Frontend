"use client"

import Link from "next/link";
import '../../../public/style/style.css'
import Nav from "../nav";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import Image from "next/image";
import eyeOpen from '../../../public/eye-open.png'
import eyeClose from '../../../public/eye-close.png'
import { useDispatch } from "react-redux";
import { createUserAsync, selectLoggedInUser } from "@/features/auth/authSlice";
import { useSelector } from "react-redux";
import Footer from "../../../fotter";
export default function Signup() {
  let message = null
  const user = useSelector(selectLoggedInUser)
  user && user.message ? message = user.message : null
  const [status, setstatus] = useState(false)
  const [statuss, setstatuss] = useState(false)
  const dispatch = useDispatch()
  const router = useRouter()
  const [error, seterror] = useState()
  async function dosubmit(e) {
    e.preventDefault()
    const email = e.target.email.value
    const name = e.target.name.value
    const password = e.target.password.value
    const confirmpassword = e.target.confirmpassword.value
    const data = { name, email, password, confirmpassword }
    if (password === confirmpassword) {
      dispatch(createUserAsync({
        email: data.email,
        password: data.password,
        addresses: [],
        role: 'user'
      })
      );

    } else {
      router.push("/signup")
      seterror("confirm password is not matching")
      setTimeout(() => {
        seterror(" ")
      }, 7000)

    }
    setTimeout(() => {
      if (user && user.id) {
        router.push("/login")
      } else {
        router.push("/signup")
        message && seterror(message)
        setTimeout(() => {
          seterror(" ")
        }, 7000)
      }
    }, 1000)

  }

  let showhide;
  let hideshow;
  if (!status == false) {
    showhide = "text"

  } else {
    showhide = "password"

  }

  if (!statuss == false) {
    hideshow = "text"
  } else {
    hideshow = "password"
  }




  return (<>
    <Nav></Nav>
    <div className="signup">
      <form onSubmit={dosubmit}>
        <h1 className="signupheading"> Create New Account </h1><br></br>
        <label className="labell" htmlFor="Email">Name</label><br></br>
        <input type="text" placeholder="Enter your Name" name="name" className="inputbox" required></input><br></br>
        <label className="labell" htmlFor="Email">Email address</label><br></br>
        <input type="text" placeholder="Enter your Email" name="email" className="inputbox" required></input><br></br>

        <label className="labell" htmlFor="email">Password</label><br></br>
        <input type={showhide} placeholder="Enter your password" name="password" className="inputbox" required></input><Image src={status ? eyeOpen : eyeClose} width={30} height={30} onClick={() => setstatus(!status)} className="eye"></Image>
        <label className="labell" htmlFor="confirmemail">Confirm Password</label><br></br>
        <input type={hideshow} placeholder="Confirm your password" name="confirmpassword" className="inputbox" required></input><Image src={statuss == true ? eyeOpen : eyeClose} width={30} height={30} onClick={() => setstatuss(!statuss)} className="eye"></Image><br></br>
        <h6 style={{ color: "red", fontSize: "15px", fontWeight: "600" }} className="screenerror">{error}</h6>
        <button type="submit" className="btn btn-primary submit">sign Up</button><br></br>
        <Link href={"/login"} className="member" ><span style={{ color: "black" }}>Already a member ?</span> Login</Link><br></br>
      </form>
    </div>
    <div className="screenfo"><Footer></Footer></div>
  </>)
}