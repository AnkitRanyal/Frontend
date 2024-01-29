

'use client'
import Link from 'next/link'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import 'bootstrap/dist/css/bootstrap.min.css'
import '../../../public/style/style.css'
import { useEffect } from 'react';
import backimage from '../../../public/shopping1.png'
import { useState } from 'react';
import Search from '../../../public/search.png'
import Image from 'next/image';
import Searchicon from '../../../public/searchicon.png'
import { useDispatch } from 'react-redux';
import Nav from '../nav';
import { useSelector } from 'react-redux';
import { redirect, useRouter } from 'next/navigation';
import { addpage, fetchProductsByFiltersAsync, selectAllProducts, selectBrands, selectCategories, selectTotalItems } from '@/features/product/productSlice';
import { fetchAllProductAsync, fetchBrandByFiltersAsync, deleteProductBYIdAsync } from '@/features/product/productSlice';
import { selectUserLogin } from '@/features/auth/authSlice';
import { addToCartAsync } from '@/features/cart/cartSlice';
import { addsort } from '@/features/product/productSlice';
import { selectCarouselProducts } from '@/features/product/productSlice';
import { fetchCarouselProductAsync } from '@/features/product/productSlice';
import axios from 'axios';
import { checkAuthAsync } from "@/features/auth/authSlice"
import { toast } from 'react-toastify';
import Footer from '../../../fotter';
const sortOptions = [
  { name: 'Best Rating', sort: 'rating', order: 'desc', current: false },
  { name: 'Price: Low to High', sort: 'discountPrice', order: 'asc', current: false },
  { name: 'Price: High to Low', sort: 'discountPrice', order: 'desc', current: false },
];


export default function Home() {
  const products = useSelector(selectAllProducts);
  const carouselproducts = useSelector(selectCarouselProducts);
  const brands = useSelector(selectBrands);
  const categories = useSelector(selectCategories);
  const totalItems = useSelector(selectTotalItems);
  const userlogin = useSelector(selectUserLogin)
  const router = useRouter()
  const [sort, setSort] = useState({});
  const [carousel, setcarousel] = useState([]);
  const [statuss, setstatuss] = useState(false);
  const [statusss, setstatusss] = useState(false);
  const [filterstatus, setfilterstatus] = useState(false);

  const [stus, setstus] = useState(false);
  let [item, setitem] = useState([])
  let [produc, setproduc] = useState([])
  const [maxpagenolimit, setmaxpagenolimit] = useState(3);
  const [minpagenolimit, setminpagenolimit] = useState(1);
  const [pagenolimit, setpagenolimit] = useState(3);
  const [page, setpage] = useState(1);
  const dispatch = useDispatch();
  const user = JSON.parse(localStorage.getItem("loginuser"))
  const loginstatus = JSON.parse(localStorage.getItem("userlogin"))
  const notify = () => toast.success("Item added to cart", { theme: "dark", autoClose: 2000 });
  const errornotify = () => toast.error("Some Error", { theme: "dark", autoClose: 2000 });


  let data = []
  data.push(products.data)
  const no = Math.ceil(totalItems / 12)
  let pagge = []
  for (let i = 1; i < no + 1; i++) {
    pagge.push(i)
  }


  const categoryfilter = {
    id: 1,
    options: categories,
  }

  const orderfilter = {
    id: 2,
    name: 'Brands',
    value: null,
    options: brands,
  }

  function filterStatus() {
    setfilterstatus(!filterstatus)

  }

  const handleremove = (id) => {
    dispatch(deleteProductBYIdAsync(id))
  }

  async function search(e) {
    e.preventDefault()
    const val = e.target.search.value
    router.push(`/products/${val}`)
  }

  function testchecked(value) {
    const val = Math.round(value)
    if (val == 1) {
      return 1
    }
    if (val == 2) {
      return 2
    }
    if (val == 3) {
      return 3
    }
    if (val == 4) {
      return 4
    }
    if (val == 5) {
      return 5
    }

  }



  const handleFilter = async (e) => {
    e.preventDefault()
    const val = e.target.value;
    categoryfilter.category = val
    const category = categoryfilter.category
    const item = { category }
    dispatch(fetchProductsByFiltersAsync(item))
  }

  const handlebrandFilter = async (e) => {
    e.preventDefault()
    const val = e.target.value;
    orderfilter.order = val
    const brand = orderfilter.order
    const item = { brand }
    dispatch(fetchBrandByFiltersAsync(item))
  }

  const handleSort = async (e, i, option) => {
    const sort = option.sort
    const limit = 12
    const page = i
    const item = { sort }
    const order = option.order
    const resp = await axios.get(`http://localhost:5000/products?sort=${sort}&order=${order}&page=${page}&limit=${limit}`);
    console.log(resp)
    dispatch(addsort(resp))
    dispatch(addpage(resp))
    setstatuss(false)
    setfilterstatus(false)
  };

  const handlePage = async (i) => {
    setpage(i)
    const limit = 12
    const resp = await axios.get(`http://localhost:5000/products?page=${page}&limit=${limit}`);
    dispatch(addpage(resp))
  };


  const handleNext = () => {
    setpage(page + 1)
    if (page > maxpagenolimit) {
      setmaxpagenolimit(maxpagenolimit + pagenolimit)
      setminpagenolimit(minpagenolimit + pagenolimit)
    }

  }
  const handlePrev = () => {
    setpage(page - 1)
    if ((page - 1) % pagenolimit == 0) {
      setmaxpagenolimit(maxpagenolimit - pagenolimit)
      setminpagenolimit(minpagenolimit - pagenolimit)
    }
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


  useEffect(() => {
    dispatch(fetchProductsByFiltersAsync({ sort }));
  }, []);

  useEffect(() => {
    async function getdata() {
      const limit = 12
      setpage(1);
      const resp = await axios.get(`http://localhost:5000/products?page=${page}&limit=${limit}`);
      dispatch(addpage(resp))
    }
    getdata()
    handlePage(page)
  }, [page]);

  async function category(e) {
    const resp = await fetch("http://localhost:5000/categories");
    const res = await fetch("http://localhost:5000/brands");
    const respp = await axios.get("http://localhost:5000/products");
    const da = respp.data.product.slice(0, 20)
    setcarousel(da)
    const dataa = await resp.json()
    const data = await res.json()
    setitem(data)
    setproduc(dataa)

  }

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

  useEffect(() => {
    dispatch(checkAuthAsync())
    dispatch(fetchAllProductAsync())
    dispatch(fetchCarouselProductAsync())
    category()
  }, [])

  produc = produc.map((item, i) => {
    const { value } = item
    return value
  })


  item = item.map((itemm, i) => {
    const { value } = itemm
    return value
  })

  const arr = [1]
  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 1
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };
  const responsivee = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 2
    }
  };


  return (<>
    {userlogin || loginstatus ?
      <main className='page'>
        <Nav></Nav>

        <Image src={backimage}></Image>
        <div >
          <form onSubmit={search} className='screeninputt'>
            <input type='text' placeholder='Search for Products' name='search' className='input '></input><br></br>
            <button type='submit' className='search'><img height="30px" width="30px" className="searchicon" src={Search.src}></img></button>
            <button type='submit' className='search'><img height="30px" width="30px" className="searchiconn" src={Searchicon.src}></img></button>
          </form>
        </div>
        <div >

          {
            arr.map((i) => (
              <div className=' menubrands' key={i} >
                <img src='/download.jpg' className='imgg' ></img>
                <img src='/images.jpg' className='imgg' ></img>
                <img src='/watch-3.png' className='imgg' ></img>
                <img src='/fashion.avif' className='imgg' ></img>
                <img src='/beauty.jpg' className='imgg' ></img>
                <img src='/kitchen.jpg' className='imgg' ></img>
                <img src='/furniture.jpeg' className='imgg' ></img>
                <img src='/flights.webp' className='imgg' ></img>

              </div>
            ))
          }
          <div>



          </div>
          <div className='container-fluid mt-25 slider ' >
            <Carousel responsive={responsive} autoPlay={true} draggable={true} showDots={true} keyBoardControl={true}
              customTransition="all .5" className='screenslider'>
              <img src='/slide1.webp' className='slide' alt='this image is missing'></img>
              <img src='/slide 2.webp' className='slide' alt='this image is missing'></img>
              <img src='/slide 3.webp' className='slide' alt='this image is missing'></img>
              <img src='/slide4.webp' className='slide' alt='this image is missing'></img>
              <img src='/slide5.webp' className='slide' alt='this image is missing'></img>
              <img src='/slide6.webp' className='slide' alt='this image is missing'></img>
              <img src='/slide7.webp' className='slide' alt='this image is missing'></img>

            </Carousel>;
          </div>


          {<div className=' container-fluid carouselproduct'>
            {carousel && carousel ?
              <Carousel responsive={responsivee} draggable={true} autoPlay={true} swipeable={true} autoPlaySpeed={3000} showDots={true} keyBoardControl={true}
                customTransition="all .5" className='container-fluid carouselproduct'>
                {carousel ? carousel.map((item, i) => (
                  <div className='carouselcard' key={i}>
                    <div>
                      <figure>
                        <div> <Link href={`/admin/productdetail/${item.id}`}><img src={`${item.thumbnail}`} alt='this image is missing' className='carouselimg'></img></Link></div>
                      </figure>
                    </div>

                  </div>
                )) : <div>item</div>}</Carousel>
              : null}
          </div>}


          <div className='main'><h2 className='filter' onClick={() => filterStatus()}>Filter Products</h2></div>

          {filterstatus ? <div className='mainvertical' >
            <form onChange={handleFilter}>
              <div className='choosecategory'>
                <h4 onClick={() => setstatusss(!statusss)} >Category</h4>
                {statusss ? <div className='displaycategory'>
                  <input type='checkbox' value={produc[0]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[0]}</h5>
                  <input type='checkbox' value={produc[1]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[1]}</h5>
                  <input type='checkbox' value={produc[2]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[2]}</h5>
                  <input type='checkbox' value={produc[3]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[3]}</h5>
                  <input type='checkbox' value={produc[4]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[4]}</h5>
                  <input type='checkbox' value={produc[5]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[5]}</h5>
                  <input type='checkbox' value={produc[6]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[6]}</h5>
                  <input type='checkbox' value={produc[7]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[7]}</h5>
                  <input type='checkbox' value={produc[8]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[8]}</h5>
                  <input type='checkbox' value={produc[9]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[9]}</h5>
                  <input type='checkbox' value={produc[10]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[10]}</h5>
                  <input type='checkbox' value={produc[11]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[11]}</h5>
                  <input type='checkbox' value={produc[12]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[12]}</h5>
                  <input type='checkbox' value={produc[13]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[13]}</h5>
                  <input type='checkbox' value={produc[14]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[14]}</h5>
                  <input type='checkbox' value={produc[15]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[15]}</h5>
                  <input type='checkbox' value={produc[16]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[16]}</h5>
                  <input type='checkbox' value={produc[17]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[17]}</h5>
                  <input type='checkbox' value={produc[18]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[18]}</h5>
                  <input type='checkbox' value={produc[19]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[19]}</h5>
                  <input type='checkbox' value={produc[20]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstatusss(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{produc[20]}</h5>
                </div> : null}
              </div>
            </form><br></br>
            <form onChange={handlebrandFilter}>
              <div className='choosebrand'>
                <h4 onClick={() => setstus(!stus)}>Brands</h4>
                {stus ? <div className='displaybrand'>
                  <input type='checkbox' value={item[0]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[0]}</h5>
                  <input type='checkbox' value={item[1]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[1]}</h5>
                  <input type='checkbox' value={item[2]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[2]}</h5>
                  <input type='checkbox' value={item[3]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[3]}</h5>
                  <input type='checkbox' value={item[4]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[4]}</h5>
                  <input type='checkbox' value={item[5]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[5]}</h5>
                  <input type='checkbox' value={item[6]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[6]}</h5>
                  <input type='checkbox' value={item[7]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[7]}</h5>
                  <input type='checkbox' value={item[8]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[8]}</h5>
                  <input type='checkbox' value={item[9]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[9]}</h5>
                  <input type='checkbox' value={item[10]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[10]}</h5>
                  <input type='checkbox' value={item[11]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[11]}</h5>
                  <input type='checkbox' value={item[12]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[12]}</h5>
                  <input type='checkbox' value={item[13]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[13]}</h5>
                  <input type='checkbox' value={item[14]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[14]}</h5>
                  <input type='checkbox' value={item[15]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[15]}</h5>
                  <input type='checkbox' value={item[16]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[16]}</h5>
                  <input type='checkbox' value={item[17]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[17]}</h5>
                  <input type='checkbox' value={item[18]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[18]}</h5>
                  <input type='checkbox' value={item[19]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[19]}</h5>
                  <input type='checkbox' value={item[20]} className='categorycheckbox' name='categorycheckbox' onChange={() => { setstus(false), setfilterstatus(false) }}></input><h5 className='catetogytext'>{item[20]}</h5>
                </div> : null}
              </div>
            </form><br></br>
            <div>
            </div>
            <div >

              <div className='sort'>

                <div className='sortname' onClick={() => setstatuss(!statuss)}>Sort
                  {statuss ? <div>
                    {sortOptions.map((option, i) => (
                      <div className='sorting'>
                        <h3 onClick={(e) => handleSort(e, i + 1, option)}>{option.name}</h3>
                      </div>
                    ))}
                  </div> : null}
                </div>
              </div>
            </div>
          </div>
            : null}

          <button className='addnewproduct' onClick={() => router.push("/admin/addproduct")}>Add new product</button>
          <button className='addnewproduct' style={{ marginLeft: "50px" }} onClick={() => router.push("/admin/orders")}>Orders</button>
          <div className='dummyproductsWrapper'>
            {products.data ?
              products.data.product.map((product, i) => (
                <div key={product.id} className='card'>
                  <Link href={`/admin/productdetail/${product.id}`}> <img src={product.thumbnail} className='proimg' alt='img' /></Link>
                  <h4 className='producttitle' style={{ width: "100px" }}>{product.title}</h4><br></br>
                  <h5 className='productprice'>Price :&#8377; {product.price}</h5>
                  <h4 className='producttitle stock'>stock :{product && product.stock > 0 ? <h6 style={{ color: "green", fontSize: "15px", fontWeight: "600" }}>{product.stock}</h6> : <h6 style={{ color: "red", fontSize: "15px", fontWeight: "600" }}>{product.stock}</h6>}</h4><br></br>
                  <div className='star'>
                    {Math.round(product.rating) == testchecked(product.rating) && testchecked(product.rating) == 1 ? <> <span class={`fa fa-star checked`}></span><span class={`fa fa-star unchecked`}></span>
                      <span class={`fa fa-star unchecked`}></span>
                      <span class={`fa fa-star unchecked`}></span>
                      <span class={`fa fa-star unchecked`}></span></> : Math.round(product.rating) == testchecked(product.rating) && testchecked(product.rating) == 2 ? <> <span class={`fa fa-star checked`}></span><span class={`fa fa-star checked`}></span>
                        <span class={`fa fa-star unchecked`}></span>
                        <span class={`fa fa-star unchecked`}></span>
                        <span class={`fa fa-star unchecked`}></span></> : Math.round(product.rating) == testchecked(product.rating) && testchecked(product.rating) == 3 ? <> <span class={`fa fa-star checked`}></span><span class={`fa fa-star checked`}></span>
                          <span class={`fa fa-star checked`}></span>
                          <span class={`fa fa-star unchecked`}></span>
                          <span class={`fa fa-star unchecked`}></span></> : Math.round(product.rating) == testchecked(product.rating) && testchecked(product.rating) == 4 ? <> <span class={`fa fa-star checked`}></span><span class={`fa fa-star checked`}></span>
                            <span class={`fa fa-star checked`}></span>
                            <span class={`fa fa-star checked`}></span>
                            <span class={`fa fa-star unchecked`}></span></> : Math.round(product.rating) == testchecked(product.rating) && testchecked(product.rating) == 5 ? <> <span class={`fa fa-star checked`}></span><span class={`fa fa-star checked`}></span>
                              <span class={`fa fa-star checked`}></span>
                              <span class={`fa fa-star checked`}></span>
                              <span class={`fa fa-star checked`}></span></> : <><span class={`fa fa-star checked`}></span><span class={`fa fa-star checked`}></span>
                      <span class={`fa fa-star checked`}></span>
                      <span class={`fa fa-star checked`}></span>
                      <span class={`fa fa-star checked`}></span></>}
                  </div>
                  <button className='btn btn-info cartbtn odbtn' onClick={() => router.push(`/admin/editproduct/${product.id}`)}>Edit Product</button>
                  <button className='btn btn-info productdeletetbtn odbtnn' onClick={() => handleremove(product.id)}>Delete</button>
                </div>)) : null}
          </div>
          <div className='paginat' style={{ marginBottom: "50px" }}>
            <ul class="pagination pagination-sm justify-content-end screenpagination">
              {page == pagge.length ? false : <li className='lin'><button ><a class="page-link " href='#/' onClick={() => { handleNext() }} disabled={page == pagge[0] ? true : false} >next</a></button></li>}
              {pageDecbtn}
              {renderpagination}
              {pageIncbtn}
              {page == pagge[0] ? false : <li className='linn'><button ><a class="page-link " href='#/' onClick={handlePrev} disabled={page == pagge[pagge.length - 1] ? true : false} >prev</a></button></li>}
            </ul>
          </div>
        </div>
        <div><Footer></Footer></div>
      </main> : redirect("/login")}
  </>)
}



export const getdata = async () => {
  const resp = await fetch('https://dummyjson.com/products');
  const dat = await resp.json();
  return dat.products
}








