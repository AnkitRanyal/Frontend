"use client"
import { useEffect, useState } from 'react'
import '../../../public/style/style.css'
import { redirect, useRouter } from 'next/navigation'
import "bootstrap/dist/css/bootstrap.min.css"
import { useDispatch, useSelector } from 'react-redux'
import { fetchAllOrderByUserIdAsync, updateCartAsync } from '@/features/cart/cartSlice'
import { createOrderAsync } from '@/features/order/orderSlice'
import { selectUserInfo } from '@/features/user/userSlice'
import { selectUserLogin } from '@/features/auth/authSlice'
import Nav from '../nav'
import { updateUserAsync } from '@/features/user/userSlice'
import { fetchLoggedInUserAsync } from '@/features/user/userSlice'
import { selectItems } from '@/features/cart/cartSlice'
import Footer from '../../../fotter'
export default function Checkout() {
  const [paymentMethod, setPaymentMethod] = useState()
  const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
  const userlogin = useSelector(selectUserLogin);
  const userinfo = useSelector(selectUserInfo)
  const [existingaddress, setexistingaddress] = useState(false)
  const [itemm, setitemm] = useState([])
  const [status, setstatus] = useState(false)
  const [item, setitem] = useState("")
  const [product, setproduct] = useState()
  const router = useRouter()
  const user = JSON.parse(localStorage.getItem("loginuser"))
  const userId = user.id
  const dispatch = useDispatch()
  const cartitems = useSelector(selectItems)
  const Items = useSelector(selectItems)
  const data = Items.product

  const displayitems = Items.filter((item) => item.product && item.product.stock > 0)
  const totalAmountt = displayitems && displayitems.reduce((amount, item) => Math.round(item.product.price - (item.product.price * item.product.discountPercentage / 100), 10) * item.quantity + amount, 0);


  useEffect(() => {
    Items.map((item) => (
      setitemm(item)
    ))
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
    const City = item.City.value
    const State = item.State.value
    const LandMark = item.LandMark.value
    const addresstype = item.addresstype.value
    const address = { name, email, Mobile, Pincode, paymentMethod, Locality, Address, City, State, LandMark, addresstype }
    setstatus(true)
    const newUser = { ...userinfo, addresses: [...userinfo.addresses] };
    newUser.addresses.push(address)
    dispatch(updateUserAsync(newUser));
    setitem(address)
  }



  useEffect(() => {
    dispatch(fetchAllOrderByUserIdAsync(user.id))
  }, [])

  async function productdetails(value) {
    displayitems.map((itemm) => {
      const description = itemm.product.description
      const category = itemm.product.category
      const price = itemm.product.price
      const quantity = itemm.quantity
      const thumbnail = itemm.product.thumbnail
      const stock = itemm.product.stock
      const brand = itemm.product.brand
      const title = itemm.product.title
      const paymentMethod = value.paymentMethod
      const id = itemm.product.id
      const obj = { Order: { items: title, price, category, description, quantity, thumbnail, stock, brand, id }, Userdeatils: { user: value, userid: userId }, totalItems: quantity, paymentMethod: paymentMethod, totalAmount: totalAmountt }
      setproduct(obj)
      dispatch(createOrderAsync(obj))
      router.push("/ordersummary")
    })

  }



  function handleRemove(i) {
    const newUser = { ...userinfo, addresses: [...userinfo.addresses] }
    newUser.addresses.splice(i, 1)
    dispatch(updateUserAsync(newUser));
  }


  const handleQuantity = (e, item) => {
    dispatch(updateCartAsync({ id: item.id, quantity: +e.target.value }));
  };


  useEffect(() => {
    dispatch(fetchLoggedInUserAsync(userId))
  }, [])



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
              <label style={{ margin: "150px 40px 0px -120px", width: "250px", height: "0px" }} className='paymentttttype'>Address Type</label>
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
              <h5>Total Items : {displayitems.length}</h5>
              <h2>Subtotal : &#8377;{totalAmountt}</h2>

            </div>
            <input type="reset" value="Choose Existing address" className='btn btn-info existssaddress' onClick={() => setexistingaddress(!existingaddress)} />
          </form>
        </div>
        {existingaddress ? <div className=' existingaddress'>
          <div >
            <h2 className='existingaddresstext'>Addresses</h2><br></br>
            <h6 className='existingaddresstext'>Choose from existing addresses</h6>
          </div>
          <div >

            {userinfo && userinfo.addresses && userinfo.addresses.map((item, i) => (
              <div className='screentable'>
                <table >
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
              </div>
            ))
            }
          </div>
        </div>
          : null}

        {/*cart*/}

        <div className=" cartt">
          <h1 style={{ fontSize: "40px" }}>Order </h1>
          <div >
            {
              displayitems && displayitems != null ? displayitems.map((item, i) => (
                <div key={i} >
                  {item.product ? <div className="checkoutproductdetails">
                    <img src={item.product.thumbnail} width={100} height={100} className="checkoutproductsimage"></img>
                    <div className="checkoutdetails">
                      <h5 style={{ margin: "0px 20px 0px 100px", width: "150px" }}>  {item.product.title} </h5>
                      <select className='checkoutselect'
                        onChange={(e) => handleQuantity(e, item)}
                        value={item.quantity}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                      </select>
                    </div>
                  </div> : null}
                </div>
              ))
                : null}
          </div>
        </div>
        <div className="screenfoo"><Footer></Footer></div>
      </div>
    </div> : redirect("/login")}
  </>)
}