
"use client"
import '../../public/style/style.css'
import Link from 'next/link'
import 'bootstrap/dist/css/bootstrap.min.css'
import Search from '../../public/search.png'
import Searchicon from '../../public/searchicon.png'
import './globals.css'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { selectItems } from '@/features/cart/cartSlice'
import { fetchItemsByUserIdAsync } from '@/features/cart/cartSlice'
import { signOutAsync } from '@/features/auth/authSlice'
import { useEffect, useState } from 'react'

export default function Nav() {
  const user = JSON.parse(localStorage.getItem("loginuser"))
  const router = useRouter()
  const cart = useSelector(selectItems)
  const dispatch = useDispatch()
  const [status, setstatus] = useState(false)
  async function search(e) {
    e.preventDefault()
    const val = e.target.search.value
    router.push(`/products/${val}`)
  }
  function SignOut() {
    dispatch(signOutAsync())
  }
  useEffect(() => {
    dispatch(fetchItemsByUserIdAsync(user.id))
  }, [])
  return (<>
    <nav>
      <div className='container-fluid navbarr'>
        <div>
          <img src='/images.png' height={50} width={100}></img>
        </div>
        <div >
          <form onSubmit={search} className='screeninput'>
            <input type='text' placeholder='Search for Products' name='search' className='input '></input><br></br>
            <button type='submit' className='search'><img height="30px" width="30px" className="searchicon" src={Search.src}></img></button>
            <button type='submit' className='search'><img height="30px" width="30px" className="searchiconn" src={Searchicon.src}></img></button>
          </form>
        </div>
        <ul className='menus'>
          <li><Link href={"/"} className='links'>Home</Link></li>

          <li><Link href={"/signup"} className='links'>signin</Link></li>
          <li><Link href={"/cart"} className='links'>Cart<span class="badge bg-danger baddge">{cart != null ? cart.length : 0} </span></Link></li>
        </ul>
        <div className='profile' onClick={() => setstatus(!status)}>

          {status ? <div className='profiledropdown'><h4 onClick={() => router.push("/myprofile")}>My Profile</h4>
            <h4 onClick={() => router.push("/myorders")}>My Orders</h4>
            <h4 onClick={() => SignOut()}>Sign out</h4>
            <h4 onClick={() => router.push("/login")}>Admin</h4>
          </div> : null}

        </div>
      </div>
    </nav>
  </>)
}