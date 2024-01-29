"use client"
import Nav from "@/app/nav"
import { selectOrders } from "@/features/order/orderSlice"
import { updateOrderAsync, fetchAllOrdersAsync } from "@/features/order/orderSlice"
import { useSelector, useDispatch } from "react-redux"
import { useEffect, useState } from "react"
import { selectorderStatus, selectpaymentStatus, selectTotalOrders } from "@/features/order/orderSlice"
import { deleteOrdersByIdAsync } from "@/features/order/orderSlice"
import 'bootstrap/dist/css/bootstrap.min.css'
import { redirect } from "next/navigation"
import { selectUserLogin } from "@/features/auth/authSlice"

export default function Orders() {
  const userlogin = useSelector(selectUserLogin)
  const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
  const [orderstatus, setorderstatus] = useState()
  const totalOrders = useSelector(selectTotalOrders);
  const [paymentstatus, setpaymentstatus] = useState(false)
  const Orders = useSelector(selectOrders)
  const orderstat = useSelector(selectorderStatus)
  const [pagenolimit, setpagenolimit] = useState(5)
  const [page, setpage] = useState(1);
  const [maxpagenolimit, setmaxpagenolimit] = useState(5)
  const [minpagenolimit, setminpagenolimit] = useState(1)
  const Stat = useSelector(selectpaymentStatus)
  const user = JSON.parse(localStorage.getItem("loginuser"))
  const userId = user.id
  const dispatch = useDispatch()
  const [totaldoc, settotaldoc] = useState()

  async function getdata() {
    const response = await fetch(
      'http://localhost:5000/orders/' + userId
    );
    const dat = await response.json();
    console.log(dat.totaldoc)
    settotaldoc(dat.totaldoc)

  }
  useEffect(() => {
    getdata()
  }, [])


  const no = Math.ceil(totaldoc / 4)
  let pagge = [];
  for (let i = 0; i < no + 1; i++) {
    pagge.push(i)
  }

  async function handleremove(val) {
    dispatch(deleteOrdersByIdAsync(val))
  }


  const handleOrderStatus = (e, item) => {
    const order = { ...item, status: e.target.value };
    dispatch(updateOrderAsync({ order }));
  };

  const handleOrderPaymentStatus = (e, item) => {
    const order = { ...item, paymentStatus: e.target.value, paymentStat: true };
    dispatch(updateOrderAsync({ order }));
    setpaymentstatus(true)
  };


  useEffect(() => {
    const pagination = { page: 1, limit: 4 };
    dispatch(fetchAllOrdersAsync({ pagination }))
  }, []);


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

  const chooseColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-purple-200 text-purple-600';
      case 'dispatched':
        return 'bg-yellow-200 text-yellow-600';
      case 'delivered':
        return 'bg-green-200 text-green-600';
      case 'received':
        return 'bg-green-200 text-green-600';
      case 'cancelled':
        return 'bg-red-200 text-red-600';
      default:
        return 'bg-purple-200 text-purple-600';
    }
  };


  return (<>
    <Nav></Nav>
    {userlogin || loginstatus ? <div className="adminorders">
      <h1 className="odr">Orders</h1>
      {
        Orders !== null && Orders.map((item, i) => (
          <div key={i} className="adminorderdetails">
            <table className="ordertable">
              <thead className="tablehead">
                <th className="orderhead">Order ID</th>
                <th className="orderhead">Order</th>
                <th className="orderhead">Address</th>
                <th className="orderhead">Order Status</th>
                <th className="orderhead">Payment Status</th>
                <th className="orderhead">Order Created</th>
                <th className="orderhead">Order Updated</th>


              </thead>
              <tbody className="bbody">
                <td className="orderbody">{item.id}</td>
                <td className="orderbody">
                  <div>
                    {item.items.map((i) => (<><h3 >{i.items}</h3><br></br></>))}
                    <h3>Qty {item.totalItems}</h3><br></br>
                    <h3>&#8377; {item.totalAmount}</h3>
                  </div>
                </td>
                <td className="orderbodyy"> <div className="orderbodyyy">
                  <h3 className="ddetails">{item.selectedAddress.name}</h3>
                  <h3 className="ddetails">{item.selectedAddress.phone} </h3>
                  <h3 className="ddetails">{item.selectedAddress.Address} </h3>
                  <h3 className="ddetails">{item.selectedAddress.City} </h3>
                  <h3 className="ddetails">{item.selectedAddress.Locality} </h3>
                  <h3 className="ddetails">{item.selectedAddress.State}</h3>
                  <h3 className="ddetails">{item.selectedAddress.Pincode} </h3>
                  <h3 className="ddetails">{item.selectedAddress.LandMark} </h3>
                  <h3 className="ddetails">{item.paymentMethod}</h3>
                  <h3 className="ddetails">{item.selectedAddress.addresstype} </h3>
                </div></td>
                <td className="orderbody">
                  {orderstat ? <span
                    className={`${chooseColor(
                      item.status
                    )} py-2  my-10 px-3 rounded-full text-xs chooseColor`}
                  >
                    {item.status}
                  </span> : <h3 className="chooseColor">{item.status}</h3>}
                  <select onChange={(e) => handleOrderStatus(e, item)} value={item.status}>
                    <option value="pending">Pending</option>
                    <option value="dispatched">Dispatched</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </td>
                <td className="orderbody">
                  <h4 className="chooseColor">{item.paymentStatus}</h4>
                  <select onChange={(e) => handleOrderPaymentStatus(e, item)} value={item.paymentStatus}>
                    <option value="pending">Pending</option>
                    <option value="received">Received</option>
                  </select>
                </td>

                <td className="orderbody">
                  <div >
                    {item.createdAt ? new Date(item.createdAt).toLocaleString() : null}
                  </div>
                </td>

                <td className="orderbody">
                  <div className="">
                    {item.updatedAt ? new Date(item.updatedAt).toLocaleString() : null}
                  </div>
                </td>
              </tbody>
              <button className="btn btn-success deleteorder" onClick={() => handleremove(item.id)}>Delete</button>
            </table>
          </div>))}

      <div className='paginatt' style={{ marginBottom: "50px" }}>
        <ul class="pagination pagination-sm justify-content-end screenpagination">
          {page == pagge.length - 1 ? false : <li><button ><a class="page-link " href='#/' onClick={() => { handleNext() }} disabled={page == pagge[0] ? true : false} >next</a></button></li>}
          {pageDecbtn}
          {renderpagination}
          {pageIncbtn}
          {page == pagge[1] ? false : <li><button ><a class="page-link " href='#/' onClick={handlePrev} disabled={page == pagge[pagge.length - 1] ? true : false} >prev</a></button></li>}
        </ul>
      </div>
    </div>
      : redirect("/login")}
  </>)
}