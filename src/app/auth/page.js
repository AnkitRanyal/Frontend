"use client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { selectError,selectLoggedInUser } from "@/features/auth/authSlice"
import { checkAuthAsync } from "@/features/auth/authSlice"
import { selectUserChecked } from "@/features/auth/authSlice"
import axios from "axios"

export default function Auth(){
    const router = useRouter()
    const dispatch = useDispatch()
    const usercheck = useSelector(selectUserChecked);
    const userlogin = useSelector(selectLoggedInUser);
    const token = JSON.parse(localStorage.getItem("jwt"))

 
useEffect(()=>{
dispatch(checkAuthAsync({token}))

},[])
setTimeout(()=>{
    if(usercheck == true){
        router.push("/")
     }else{
         router.push("/login")
     }
},3000)
    return(<>
     <center>
        <div style={{backgroundColor:"beige",width:"100%",height:"100vh"}}>
            <div className="loader"></div>
    <h1 className="auth">Checking Authentication</h1>
        </div>
    </center>
    </>)
}