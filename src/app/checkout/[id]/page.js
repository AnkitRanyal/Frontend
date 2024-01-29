"use client"

import { useEffect, useState } from 'react'
import '../../../../public/style/style.css'
import { redirect, useRouter } from 'next/navigation'
import { selectUserInfo, selectUserAddress } from '@/features/user/userSlice'
import { selectUserLogin } from '@/features/auth/authSlice'
import "bootstrap/dist/css/bootstrap.min.css"
import { updateUserAsync } from '@/features/user/userSlice'
import { selectBuyItems } from '@/features/product/productSlice'
import { fetchLoggedInUserAsync } from '@/features/user/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { fetchItemsByIdAsync, selectItems } from '@/features/cart/cartSlice'
import { createOrderAsync } from '@/features/order/orderSlice'
import Nav from '../../nav'
import Footer from '../../../../fotter'

export default function Checkout(props) {
  const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
  const userlogin = useSelector(selectUserLogin);
  const userinfo = useSelector(selectUserInfo)
  const [itemm, setitemm] = useState()
  const [paymentMethod, setPaymentMethod] = useState()
  const [quantityy, setquantityy] = useState()
  const [status, setstatus] = useState(false)
  const [statuss, setstatuss] = useState(false)
  const [item, setitem] = useState("")
  const [product, setproduct] = useState()
  const id = props.params.id
  const router = useRouter()
  const dispatch = useDispatch()
  const dataa = useSelector(selectItems)
  const buyit = useSelector(selectBuyItems)
  const quan = dataa && dataa.quantity
  const [quantityyy, setquantityyy] = useState(quan)
  const buyitems = buyit != null ? buyit.data : JSON.parse(localStorage.getItem("buy"))
  //const doc = dataa != null ? dataa.product : null
  const data = dataa && dataa.product
  const [existingaddress, setexistingaddress] = useState(false)
  const user = JSON.parse(localStorage.getItem("loginuser"))
  const userId = user.id

  const totalAmountt = data != null || undefined ? quantityyy || quan ? Math.round(data.price - (data.price * data.discountPercentage / 100), 10) * (quantityyy || quan) : Math.round(data.price - (data.price * data.discountPercentage / 100), 10) * 1 : buyitems ? quantityy ? quantityy * Math.round(buyitems.price - (buyitems.price * buyitems.discountPercentage / 100), 10) : Math.round(buyitems.price - (buyitems.price * buyitems.discountPercentage / 100), 10) * 1 : null
  useEffect(() => {
    if (id, userId) {
      const item = { userId, id }
      dispatch(fetchItemsByIdAsync(item))
    }
  }, [])

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value);
  };


  async function dosubmit(e) {
    e.preventDefault()
    const item = e.target
    const name = item.Name.value
    const email = item.email.value
    const Mobile = item.Mobile.value
    const Pincode = item.Pincode.value
    const Locality = item.Locality.value
    const Address = item.Address.value
    const paymentMethod = item.payments.value
    const phone = item.phone.value
    const City = item.City.value
    const State = item.State.value
    const LandMark = item.LandMark.value
    const addresstype = item.addresstype.value
    const address = { name, email, Mobile, Pincode, paymentMethod, Locality, phone, Address, City, State, LandMark, addresstype }
    setstatus(true)
    const newUser = { ...userinfo, addresses: [...userinfo.addresses] };
    newUser.addresses.push(address)
    dispatch(updateUserAsync(newUser));
    setitem(address)
  }



  function handleRemove(i) {
    const newUser = { ...userinfo, addresses: [...userinfo.addresses] }
    newUser.addresses.splice(i, 1)
    dispatch(updateUserAsync(newUser));
  }

  useEffect(() => {
    const adddd = JSON.parse(localStorage.getItem("address")) || []
    adddd.map((item) => (
      setitem(item)
    ))
  }, [])


  useEffect(() => {
    dispatch(fetchLoggedInUserAsync(userId))
  }, [])



  async function productdetails(value) {
    if (data) {
      //const data = dataa.product
      const description = data.description
      const category = data.category
      const discountPercentage = data.discountPercentage
      const price = data.price
      const thumbnail = data.thumbnail
      const quantity = quantityyy != undefined ? quantityyy : quan
      const paymentMethod = value.paymentMethod
      const stock = data.stock
      const brand = data.brand
      const title = data.title
      const obj = { Order: { items: title, price, category, description, thumbnail, discountPercentage, quantity, stock, brand, id }, Userdeatils: { user: value, userid: userId }, totalItems: quantity, paymentMethod: paymentMethod, totalAmount: totalAmountt }
      setproduct(obj)
      dispatch(createOrderAsync(obj))
      router.push(`/ordersummary`)
    } else if (buyitems != null) {
      const description = buyitems.description
      const category = buyitems.category
      const paymentMethod = value.paymentMethod
      const discountPercentage = buyitems.discountPercentage
      const price = buyitems.price
      const thumbnail = buyitems.thumbnail
      const quantity = quantityy ? quantityy : 1
      const stock = buyitems.stock
      const brand = buyitems.brand
      const title = buyitems.title
      const obj = { Order: { items: title, price, category, description, thumbnail, discountPercentage, quantity, stock, brand, id }, Userdeatils: { user: value, userid: userId }, totalItems: quantity, paymentMethod: paymentMethod, totalAmount: totalAmountt }
      setproduct(obj)
      dispatch(createOrderAsync(obj))
      router.push(`/ordersummary`)
    }
  }

  const handleQuantity = async (e, item) => {
    if (item !== null) {
      const dataa = { id: item && item.id, quantity: +e.target.value }
      const response = await fetch('http://localhost:5000/cart/' + item.id, {
        method: 'PATCH',
        body: JSON.stringify(dataa),
        headers: { 'content-type': 'application/json' },
      });
      const data = await response.json();
      setitemm(data)
      setstatuss(true)
    }

  };
  return (<>


    <Nav></Nav>
    {userlogin || loginstatus ? <div className='checkout'>
      <div >
        <div className="checkoutinfo">
          <h1 className='chkout'>Checkout</h1>
          <form className='frm' onSubmit={dosubmit}>
            <input type="text" className="forminput" name='Name' placeholder="Name"></input>
            <input type="text" className="forminput" name='email' placeholder="Email"></input><br></br>
            <input type="text" className="forminput" name='Mobile' placeholder="Mobile no"></input>
            <input type="text" className="forminput" name='Pincode' placeholder="Pincode"></input><br></br>
            <input type="text" className="forminput" name='Address' placeholder="Address"></input><br></br>
            <input type="text" className="forminput" name='Locality' placeholder="Locality"></input>
            <input type="text" className="forminput" name='City' placeholder="City/District/Town"></input><br></br>
            <input type="text" className="forminput" name='State' placeholder="State"></input>
            <input type="text" className="forminput" name='LandMark' placeholder="LandMark"></input><br></br>
            <input type="text" className="forminput" name='phone' placeholder="Alternate Mobile no"></input>
            <div className='addresstype'>
              <label style={{ margin: "150px 40px 0px -120px", width: "350px", height: "0px" }} className='paymentttttype'>Address Type</label>
              <div className='sreenaddress'>
                <input type="radio" name='addresstype' className="address" value="Home (All day delivery)"></input><h6 style={{ fontSize: "15px", margin: "210px 10px", position: "relative" }} className='textt'>Home (All day delivery)</h6> <br></br>
                <input type="radio" name='addresstype' className="address addressaz" value="Work (Delivery between 10 AM - 5 PM)" placeholder="Alternate Mobile no"></input><h6 style={{ fontSize: "15px", margin: "210px 10px", position: "relative" }} className='textt texttt'>Work (Delivery between 10 AM - 5 PM)</h6>
              </div>
              <div className="handlepayment">
                <label className='paymentttype'>Payment Type</label>
                <div >
                  <input
                    id="cash"
                    name="payments"
                    onChange={handlePayment}
                    value="cash"
                    type="radio"
                    checked={paymentMethod === 'cash'}
                    className=""
                  />
                  <label
                    htmlFor="cash"
                    className="cash">
                    Cash
                  </label>
                </div>
                <div className="">
                  <input
                    id="card"
                    onChange={handlePayment}
                    name="payments"
                    checked={paymentMethod === 'card'}
                    value="card"
                    type="radio"
                    className=""
                  />
                  <label
                    htmlFor="card"
                    className="cardd">
                    Card
                  </label>
                </div>
              </div>
            </div>
            {status ? <input value="Order Now" onClick={() => productdetails(item)} className='btn btn-success orderbtn'></input> : <><button type='submit' className='btn btn-primary cancel' >Save and Delivery Here</button>
              <input type="reset" value="Reset" className='btn btn-primary reset' />
            </>}
            <div className="checkouttotall">
              <h2>Subtotal</h2>
              <h5>&#8377; {totalAmountt}</h5>
            </div><br></br>
            <input type="reset" value="Choose Existing address" className='btn btn-info existsaddress' onClick={() => setexistingaddress(!existingaddress)} />
          </form>
        </div>

        {existingaddress ? <div className=' existingaddress'>
          <div >
            <h2>Addresses</h2><br></br>
            <h6>Choose from existing addresses</h6><br></br>
            <div>
              <input type='radio' name='addresses' className='addressesinput'></input>
            </div>
          </div>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div >
            {userinfo && userinfo.addresses && userinfo.addresses.map((item, i) => (
              <div>
                <table>
                  <thead className="dddteails">
                    <th className="dddteails">Name</th>
                    <th className="dddteails">Email</th>
                    <th className="dddteails">Phone</th>
                    <th className="dddteails">Payment</th>
                    <th className="dddteails">Locality</th>
                    <th className="dddteails">LandMark</th>
                    <th className="dddteails">Pincode</th>
                    <th className="dddteails">City</th>
                    <th className="dddteails">State</th>
                    <th className="dddteails">Addresstype</th>
                  </thead>
                  <tbody>
                    <tr>
                      <td className="ddetails">{item.name}</td>
                      <td className="ddetails">{item.email}</td>
                      <td className="ddetails">{item.Mobile}</td>
                      <td className="ddetails">{item.paymentMethod}</td>
                      <td className="ddetails">{item.Locality}</td>
                      <td className="ddetails">{item.LandMark}</td>
                      <td className="ddetails">{item.Pincode}</td>
                      <td className="ddetails">{item.City}</td>
                      <td className="ddetails">{item.State}</td>
                      <td className="ddetails">{item.addresstype}</td>
                    </tr>
                  </tbody>
                </table>
                <input type='submit' value="Order" onClick={() => productdetails(item)} className='btn btn-success addressexistingbtn'></input>
                <button className="btn btn-success my-4 checkoutaddressremove" onClick={() => handleRemove(i)}>Remove</button>
              </div>))}
          </div>
        </div> : null}

        {/*order*/}

        {
          data || buyitems ?
            <div className=" cartt">
              <h1 style={{ fontSize: "40px" }}>Order </h1>
              <div >
                <div className="checkoutproductdetails">
                  <img src={data ? data.thumbnail : buyitems.thumbnail} width={100} height={100} className="checkoutproductsimage"></img>
                  <div className="checkoutdetails">
                    <h5 style={{ margin: "0px 20px 0px 100px", width: "150px" }}>  {data ? data.title : buyitems.title} </h5>
                    <select className='checkoutselect'
                      onChange={(e) => { handleQuantity(e, dataa), setquantityy(e.target.value), setquantityyy(e.target.value) }}
                      value={statuss ? itemm && itemm.quantity : dataa && dataa.quantity} >
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                    <div className="checkouttotal">
                      <h2>Subtotal</h2>
                      <h5>&#8377; {data ? totalAmountt : totalAmountt}</h5>
                    </div>
                  </div>
                </div>
              </div>
            </div> : null}
        <div className="screenfoo"><Footer></Footer></div>
      </div>
    </div> : redirect("/login")}
  </>)
}