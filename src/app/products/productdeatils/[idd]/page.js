"use client"
import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../../../public/style/style.css'
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import Nav from "@/app/nav";
import Image from "next/image";
import { addToBuy } from "@/features/product/productSlice";
import { addToCartAsync } from "@/features/cart/cartSlice";
import { selectLoggedInUser, checkAuthAsync } from "@/features/auth/authSlice"
import { selectProductById, fetchProductByIdAsync } from "@/features/product/productSlice";
import { toast } from 'react-toastify';
import Footer from "../../../../../fotter";

export default function Page(props) {
  const router = useRouter()
  const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
  const userlogin = useSelector(selectLoggedInUser);
  const user = JSON.parse(localStorage.getItem("loginuser"))
  const id = props.params.idd
  const dispatch = useDispatch()
  const product = useSelector(selectProductById)
  const [quantity, setquantity] = useState()
  const [img, setimg] = useState()
  const [status, setstatus] = useState(false)
  const notify = () => toast.success("Item added to cart", { theme: "dark", autoClose: 2000 });
  function handleadd(id) {
    const userid = user.id
    const item = { id, quantity, userid }
    if (id, quantity, userid) {
      dispatch(addToCartAsync(item))
      notify()
    } else {
      const quantity = 1
      const itemm = { id, quantity, userid }
      dispatch(addToCartAsync(itemm))
      notify()
    }

  }
  function changeimg(val) {
    setimg(val)
    setstatus(true)
  }


  useEffect(() => {
    dispatch(checkAuthAsync())
    dispatch(fetchProductByIdAsync(id))
  }, [])




  return (<>

    <Nav></Nav>
    {userlogin || loginstatus ?
      <div>
        {product && product !== null ?
          <div className="productsdetails">
            <h2 className="tittle">Product Details</h2>
            <Image src={img || product.data.thumbnail} width={500} height={500} className="productsimages"></Image>
            <div className="moreimg">
              <Image src={product.data.images[0]} width={130} height={120} onClick={() => changeimg(product.data.images[0])} className="productsimg"></Image>
              <Image src={product.data.images[1]} width={130} height={120} onClick={() => changeimg(product.data.images[1])} className="productsimg" ></Image>
              <Image src={product.data.images[2]} width={130} height={120} onClick={() => changeimg(product.data.images[2])} className="productsimg"></Image>
              <div >

                <Image src={product.data.images[3]} width={130} height={120} onClick={() => changeimg(product.data.images[3])} style={{ border: "1px solid grey", borderRadius: "5px" }} className="productsimg"></Image>{/*previous class  className="productsimgg"* */}
                <Image src={product.data.images[4]} width={130} height={120} onClick={() => changeimg(product.data.images[4])} style={{ border: "1px solid grey", borderRadius: "5px" }} className="productsimg"></Image>
              </div>
            </div>


            <div className="productinfo">
              <h2 >Product name : {product.data.title}</h2>
              <h2 >Price :&#8377; {product.data.price}</h2>
              <h1 style={{ fontSize: "20px", fontWeight: 700, marginTop: "20px" }}>Products Details :</h1><br></br>
              <h5>Description : {product.data.description}</h5><br></br>
              <h5>brand : {product.data.brand}</h5><br></br>

              <h5>Category : {product.data.category}</h5>
              <br></br>
              {product && product.data.stock > 0 ? <h5 style={{ color: "green", fontWeight: "700" }}>Discounted-Price :&#8377; {Math.round(product.data.price - (product.data.price * product.data.discountPercentage / 100), 10)}</h5> : <h5 style={{ color: "red", fontSize: "20px", fontWeight: "600" }}>Out of Stock</h5>}

              <br></br>
            </div>
            <br></br>

            <div className="productslinks">
              {product && product.data.stock > 0 ? <><Link href={""} className="btn btn-primary addtocartbtn " onClick={() => handleadd(product.data.id)}>Add to Cart</Link><br></br></> : null}
              {product.data && product.data.stock > 0 ? <> <Link href={`/checkout/${product.data.id}`} onClick={() => dispatch(addToBuy(product))} className="btn btn-primary productsbtn ">Buy Now</Link></> : null}
            </div>
          </div>
          : null}
        <div className="screenadminproductfooter"><Footer></Footer></div>
      </div> : redirect("/login")}
  </>)
}

