"use client"
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../public/style/style.css'
import Nav from "../nav";
import {
  deleteOrdersByIdAsync,
  fetchAllOrdersAsync,
  selectOrders,
  selectTotalOrders,
  updateOrderAsync,
} from '../../features/order/orderSlice';
import { selectUserLogin } from "@/features/auth/authSlice";
import { useDispatch } from "react-redux";
import { redirect, useRouter } from "next/navigation";

export default function Myorders() {
  const router = useRouter()
  const [page, setpage] = useState(1);
  const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
  const userlogin = useSelector(selectUserLogin);
  const dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("loginuser"))
  let [paggge, setpaggge] = useState(1)
  const [pagenolimit, setpagenolimit] = useState(3)
  const [maxpagenolimit, setmaxpagenolimit] = useState(3)
  const [minpagenolimit, setminpagenolimit] = useState(1)
  const userId = user.id
  const orders = useSelector(selectOrders)
  const totalOrders = useSelector(selectTotalOrders)
  const [data, setdata] = useState([])
  const [totaldoc, settotaldoc] = useState()
  async function getdata() {
    const response = await fetch(
      'http://localhost:5000/orders/' + userId
    );
    const dat = await response.json();
    setdata(dat.order)
    settotaldoc(dat.totaldoc)

  }
  useEffect(() => {
    getdata()
  }, [])


  useEffect(() => {
    const pagination = { page: page, limit: 4 };
    dispatch(fetchAllOrdersAsync({ pagination }))
  }, []);


  const no = Math.ceil(totaldoc / 4)
  let pagge = [];
  for (let i = 0; i < no + 1; i++) {
    pagge.push(i)
  }

  function handlePage(i) {
    setpage(i)
    const pagination = { page: page, limit: 4 };
    dispatch(fetchAllOrdersAsync({ pagination }))
  }



  const handleNext = () => {
    setpage(page + 1)
    if (page > maxpagenolimit) {
      setmaxpagenolimit(maxpagenolimit + pagenolimit)
      setminpagenolimit(minpagenolimit + pagenolimit)
    }
    const pagination = { page: page, limit: 4 };
    dispatch(fetchAllOrdersAsync({ pagination }))
  }
  const handlePrev = () => {
    setpage(page - 1)
    if ((page - 1) % pagenolimit == 0) {
      setmaxpagenolimit(maxpagenolimit - pagenolimit)
      setminpagenolimit(minpagenolimit - pagenolimit)
    }
    const pagination = { page: page, limit: 4 };
    dispatch(fetchAllOrdersAsync({ pagination }))
  }

  let pageIncbtn = null;
  if (pagge.length > maxpagenolimit) {
    pageIncbtn = <li onClick={() => handleNext()} class="page-item active"><a className='page-link' href="#/">&hellip;</a></li>
  }

  let pageDecbtn = null;
  if (minpagenolimit > 1) {
    pageDecbtn = <li onClick={() => handlePrev()} class="page-item active"><a className='page-link' href="#/">&hellip;</a></li>
  }


  const renderpagination = pagge.map((i) => {
    if (i < maxpagenolimit + 1 && i >= minpagenolimit) {

      return (<li class="page-item active"><a class="page-link " style={{ height: "40px", width: "60px", border: "1px solid blue", height: "31px" }} href="#/" onClick={(e) => handlePage(i)}>{i}</a></li>)
    }
    else {
      return null
    }

  })

  async function handleremove(val) {
    dispatch(deleteOrdersByIdAsync(val))
  }

  return (<>
    <Nav></Nav>

    {userlogin || loginstatus ? <div>
      {orders && orders !== null ? orders.map((item, i) => (
        <div key={i}>
          <div className="myorderpage">
            <div className="myordersersr myorderrrs">
              <div className="myorderrrsdetails">{/**profiledetails  */}
                <h2 style={{ marginLeft: "30px" }}>My Orders</h2>
                <h1 className="myorderrrsdetailsh1 h1text" style={{ fontSize: "20px", fontWeight: "700" }}>Order ID : {item.id}</h1>
                <img
                  className="w-6 h-6 rounded-full"
                  src={item.items.map((i) => (<><img src={i.thumbnail}></img><br></br></>))}
                  alt={item.items.map((i) => (<><h3>Product name:  {item.items.items}</h3><br></br></>))} />
                <h3>{item.items.map((i) => (<><h3 style={{ position: "absolute", top: "-0px" }} className="screenordername">Product name:  {i.items}</h3><br></br></>))}</h3><br></br>

                <h3>Quantity : {item.totalItems}</h3>
                <h3>Price :  &#8377;{item.totalAmount}</h3>
                <h3>Orderstatus : {item.status}</h3>
                <hr style={{ margin: "150px 0px", width: "1200px" }}></hr>
                <div className="orderaddress">
                  <div className="addressessdetails">
                    <table className="adddetails">
                      <thead >
                        <th className="dddteailsz">Name</th>
                        <th className="dddteailsz">Phone</th>
                        <th className="dddteailsz">Address</th>
                        <th className="dddteailsz">City</th>
                        <th className="dddteailsz">Locality</th>
                        <th className="dddteailsz">State</th>
                        <th className="dddteailsz">Pincode</th>
                        <th className="dddteailsz">LandMark</th>
                        <th className="dddteailsz">paymentMethod</th>
                        <th className="dddteailsz">addresstype</th>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="ddetailsz">{item.selectedAddress.name}</td>
                          <td className="ddetailsz">{item.selectedAddress.Mobile} </td>
                          <td className="ddetailsz">{item.selectedAddress.Address} </td>
                          <td className="ddetailsz">{item.selectedAddress.City} </td>
                          <td className="ddetailsz">{item.selectedAddress.Locality} </td>
                          <td className="ddetailsz">{item.selectedAddress.State}</td>
                          <td className="ddetailsz">{item.selectedAddress.Pincode} </td>
                          <td className="ddetailsz">{item.selectedAddress.LandMark} </td>
                          <td className="ddetailsz">{item.paymentMethod}</td>
                          <td className="ddetailsz">{item.selectedAddress.addresstype} </td>
                          <div>
                          </div>
                        </tr>
                      </tbody>
                    </table>
                    <button className="btn btn-success removee" onClick={() => handleremove(item)}>Cancel Order</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

      ))
        : null}
      <div className='paginatt' style={{ marginBottom: "50px" }}>
        <ul class="pagination pagination-sm justify-content-end screenpagination">
          {page == pagge.length - 1 ? false : <li className='lin'><button ><a class="page-link " href='#/' onClick={() => { handleNext() }} disabled={page == pagge[0] ? true : false} >next</a></button></li>}
          {pageDecbtn}
          {renderpagination}
          {pageIncbtn}
          {page == pagge[1] ? false : <li><button ><a class="page-link " href='#/' onClick={handlePrev} disabled={page == pagge[pagge.length - 1] ? true : false} >prev</a></button></li>}

        </ul>
      </div>

    </div> : redirect("/login")}


  </>)
}