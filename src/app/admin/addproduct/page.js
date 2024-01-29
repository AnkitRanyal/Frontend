"use client"
import Nav from '@/app/nav'
import '../../../.././public/style/style.css'
import { redirect } from 'next/navigation'
import { createProductAsync } from '@/features/product/productSlice'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from "react-redux"
import { selectUserLogin } from "@/features/auth/authSlice"
import { toast } from 'react-toastify'

export default function Productform() {
    const notify = () => toast.success("Product added ", { theme: "dark", autoClose: 2000 });
    const dispatch = useDispatch()
    const [brand, setbrand] = useState()
    const [category, setcategory] = useState()
    const [description, setdescription] = useState()
    const [discountPercentage, setdiscountPercentage] = useState()
    const [image1, setimage1] = useState()
    const [image2, setimage2] = useState()
    const [image3, setimage3] = useState()
    const [image4, setimage4] = useState()
    const [price, setprice] = useState()
    const [stock, setstock] = useState()
    const [rating, setrating] = useState()
    const [title, settitle] = useState()
    const [thumbnail, setthumbnail] = useState()
    const userlogin = useSelector(selectUserLogin)
    const loginstatus = JSON.parse(localStorage.getItem("userlogin"))


    async function dosubmit(e) {
        e.preventDefault()
        const images = [image1, image2, image3, image4]
        const product = { title, description, discountPercentage, price, stock, rating, category, brand, images, thumbnail }
        dispatch(createProductAsync(product))
        notify()
    }


    return (<>
        <Nav></Nav>
        {userlogin || loginstatus ? <div className='addproduct'>
            <h2>Add Product</h2><br></br>
            <div className='addproductdetails'>
                <form onSubmit={dosubmit}>
                    <label htmlFor='addproductinput' className='addproductlabel'>Product name</label><br></br>
                    <input type='text' className='addproductinput' value={title} name='name' onChange={(e) => settitle(e.target.value)}></input><br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Description</label><br></br>
                    <input type='text' className='addproductinput' name='description' value={description} onChange={(e) => setdescription(e.target.value)}></input><br></br>
                    <br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Brand</label><br></br>
                    <br></br>
                    <input type='text' className='addproductinput' name='brand' value={brand} onChange={(e) => setbrand(e.target.value)}></input><br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Color</label><br></br>
                    <input type='checkbox' className='addproductinputs' value={'white'}></input>White
                    <input type='checkbox' className='addproductinputs' value='gray'></input>Gray
                    <input type='checkbox' className='addproductinputs' value='black'></input>Black<br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Sizes</label><br></br>

                    <input type='checkbox' className='addproductinputs' value='XXS'></input>XXS
                    <input type='checkbox' className='addproductinputs' value='XS'></input>XS
                    <input type='checkbox' className='addproductinputs' value='S'></input>S
                    <input type='checkbox' className='addproductinputs' value='M'></input>M
                    <input type='checkbox' className='addproductinputs' value='L'></input>L
                    <input type='checkbox' className='addproductinputs' value='XL'></input>XL
                    <input type='checkbox' className='addproductinputs' value='XL2'></input>2XL
                    <input type='checkbox' className='addproductinputs' value='XL3'></input>3XL    <br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Category</label><br></br>
                    <input type='text' className='addproductinput' name='category' value={category} onChange={(e) => setcategory(e.target.value)}></input><br></br>
                    <br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Price</label><br></br>
                    <input type='text' className='addproductinput' name='price' value={price} onChange={(e) => setprice(e.target.value)}></input><br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Discount Percentage</label><br></br>
                    <input type='text' className='addproductinput' name='discountpercentage' value={discountPercentage} onChange={(e) => setdiscountPercentage(e.target.value)}></input><br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Stock</label><br></br>
                    <input type='text' className='addproductinput' name='stock' value={stock} onChange={(e) => setstock(e.target.value)}></input><br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Rating</label><br></br>
                    <input type='text' className='addproductinput' name='rating' value={rating} onChange={(e) => setrating(e.target.value)}></input><br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Thumbnail</label><br></br>
                    <input type='text' className='addproductinput' name='thumbnail' value={thumbnail} onChange={(e) => setthumbnail(e.target.value)}></input><br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Images 1</label><br></br>
                    <input type='text' className='addproductinput' name='image1' value={image1} onChange={(e) => setimage1(e.target.value)}></input><br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Image 2</label><br></br>
                    <input type='text' className='addproductinput' name='image2' value={image2} onChange={(e) => setimage2(e.target.value)}></input><br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Image 3</label><br></br>
                    <input type='text' className='addproductinput' name='image3' value={image3} onChange={(e) => setimage3(e.target.value)}></input><br></br>
                    <br></br>
                    <label htmlFor='addproductinput' className='addproductlabel'>Image 4</label><br></br>
                    <input type='text' className='addproductinput' name='image3' value={image4} onChange={(e) => setimage4(e.target.value)}></input><br></br>
                    <br></br>
                    <br></br>
                    <input type='submit' className='btn btn-success addproductbtn' value="Save Product"></input><br></br>
                    <br></br>
                    <input type='reset' className='btn btn-success addproductbtn' value="Reset"></input>
                </form>
            </div>

        </div> : redirect("/login")}

    </>)
}