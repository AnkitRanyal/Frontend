"use client"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link"
import '../../../public/style/style.css'
import Nav from "../nav"
import Image from "next/image"
import eyeOpen from '../../../public/eye-open.png'
import eyeClose from '../../../public/eye-close.png'
import axios from "axios"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { toast } from "react-toastify"
import { selectPasswordReset, selectError } from "@/features/auth/authSlice"
import Footer from "../../../fotter"
export default function Resetpassword() {
  const data = useSelector((state) => state.address.OTP)
  const [error, seterror] = useState()
  const resetPassword = useSelector(selectPasswordReset)
  const router = useRouter()
  const [status, setstatus] = useState(false)
  const [statuss, setstatuss] = useState(false)
  const [passstatuss, setpassstatuss] = useState(false)
  const [passstatuss2, setpassstatuss2] = useState(false)
  const [pass, setpass] = useState()
  const [passs, setpasss] = useState()
  const [colourr, setcolourr] = useState()
  const [colour, setcolour] = useState()
  const errors = useSelector(selectError)
  const notifyy = () => toast.info("Password is reset", { autoClose: 3000, position: "top-center" })
  console.log(resetPassword)
  async function resetpassword(e) {
    e.preventDefault()
    const newpassword = e.target.newpassword.value
    const email = e.target.Email.value
    const Confirmpassword = e.target.Confirmpassword.value
    const data = { newpassword, Confirmpassword, email }
    const resp = await axios.post("http://localhost:5000/auth/resetpassword", data)
    if (resp.data.accepted) {
      notifyy()
      router.push("/")
      seterror(" ")
    } else {

      seterror("Invalid credentials")
      router.push("/resetpassword")
    }
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


  function handlepass(value) {
    console.log(value.length)
    if (value.length < 8) {
      setpassstatuss(true)
      setpass("weak password")
      setcolour("red")

    } else {
      setpass("Strong password")
      setcolour("green")
    }
  }

  function handlepass2(value) {
    console.log(value.length)
    if (value.length < 8) {
      setpassstatuss2(true)
      setpasss("weak password")
      setcolourr("red")

    } else {
      setpasss("Strong password")
      setcolourr("green")
    }
  }

  return (<>
    <Nav></Nav>
    <div className='resetpage'>
      <h3 className=" resettext" style={{ marginTop: "10px", marginLeft: "290px" }}>Reset password </h3>
      <form onSubmit={resetpassword}>
        <input type="text" placeholder="Enter new Email" name="Email" className="forget" required></input><br></br>
        <h5 style={{ color: "red", marginLeft: "50px", marginBottom: "20px" }}>{error}</h5>
        <input type={showhide} placeholder="Enter new password" name="newpassword" className="forget" onChange={(e) => handlepass(e.target.value)} required></input><Image src={status ? eyeOpen : eyeClose} width={30} height={30} onClick={() => setstatus(!status)} className="eyee"></Image>
        {passstatuss ? <h6 style={{ color: colour }} className="passstatus">{pass}</h6> : null}
        <input type={hideshow} placeholder="Enter Confirmpassword" name="Confirmpassword" className="forget" onChange={(e) => handlepass2(e.target.value)} required></input><Image src={statuss ? eyeOpen : eyeClose} width={30} height={30} onClick={() => setstatuss(!statuss)} className="eyee"></Image>
        {passstatuss2 ? <h6 style={{ color: colourr }} className="passstatus">{passs}</h6> : null}
        <input type="submit" value="submit" className='btn btn-primary reseetbtn ' ></input><br></br>
        <Link className=' homeebtn' href={"/"}>Go to Home</Link>
      </form>
    </div>
    <div className="screenfo"><Footer></Footer></div>
  </>)
}