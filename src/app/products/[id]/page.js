'use client'

import Image from "next/image"
import { addToCartAsync } from "@/features/cart/cartSlice"
import { useEffect, useState } from "react"
import Link from "next/link"
import { useDispatch } from "react-redux"
import axios from "axios"
import '../../../../public/style/style.css'
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { selectUserLogin } from "@/features/auth/authSlice"
import Search from '../../../../public/search.png'
import Searchicon from '../../../../public/searchicon.png'
import Nav from "@/app/nav"
import { useRouter } from "next/navigation"
import Footer from "../../../../fotter"
import { redirect } from "next/navigation"
export default function Searchh(props) {
  const user = JSON.parse(localStorage.getItem("loginuser"))
  const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
  const userlogin = useSelector(selectUserLogin)
  const [data, setdata] = useState([])
  const router = useRouter()
  const value = props.params.id
  const dispatch = useDispatch()
  const notify = () => toast.success("Item added to cart", { theme: "dark", autoClose: 2000 });
  const errornotify = () => toast.error("Some Error", { theme: "dark", autoClose: 2000 });



  function handleadd(id) {
    const userid = user.id
    const quantity = 1
    if (id, userid, quantity) {
      const itemm = { id, quantity, userid }
      dispatch(addToCartAsync(itemm))
      notify()

    } else {
      errornotify()
    }
  }



  async function getdata() {
    const resp = await axios.get(`http://localhost:5000/search?name=${value}`)
    setdata(resp.data)
  }

  async function search(e) {
    e.preventDefault()
    const val = e.target.search.value
    router.push(`/products/${val}`)
  }
  useEffect(() => {
    getdata()
  }, [])

  return (<>
    <Nav></Nav>
    {userlogin || loginstatus ? <div>
      <div >
        <form onSubmit={search} className='screeninpputt'>
          <input type='text' placeholder='Search for Products' name='search' className='input '></input><br></br>
          <button type='submit' className='search'><img height="30px" width="30px" className="searchicon" src={Search.src}></img></button>
          <button type='submit' className='search'><img height="30px" width="30px" className="searchiconn" src={Searchicon.src}></img></button>
        </form>
      </div>
      {data ? <div className="searchproducts">
        {
          data.map((item, i) => (
            <div key={i} className="searchcard">
              <Link href={`/products/productdeatils/${item.id}`}><Image src={item.thumbnail} height={260} width={260} className="searchimg"></Image></Link>
              {item && item.stock > 0 ? <><h4 className='producttitle'>{item.title}</h4><br></br>
                <h5 className='productprice'>Price :&#8377; {item.price}</h5></> : <><h4 className='producttitle'>{item.title}</h4><br></br>
                <h5 className='productprice' style={{ color: "red", fontWeight: "600", marginLeft: "-7px" }}>Out of stock</h5></>}
              <button className='btn btn-info cartbtn cartbutton' onClick={() => { handleadd(item.id) }}>cart</button>
            </div>
          ))
        }
      </div> : redirect("/login")}
      <div className="screenproductidfooter"><Footer></Footer></div>
    </div>
      : null}
  </>)
}