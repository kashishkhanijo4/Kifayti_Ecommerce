import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate, useParams } from 'react-router-dom'

import { getProduct } from '../Store/ActionCreators/ProductActionCreators'

import OwlCarousel from 'react-owl-carousel'
import 'owl.carousel/dist/assets/owl.carousel.css'
import 'owl.carousel/dist/assets/owl.theme.default.css'
export default function SingleProduct() {
  let [data, setData] = useState({
    pic1:"",
    pic2:"",
    pic3:"",
    pic4:""
  })
  let [relatedProducts, setRelatedProducts] = useState([])
  let { id } = useParams()
  let [qty, setQty] = useState(1)

  let navigate = useNavigate()
  let dispatch = useDispatch()
  let ProductStateData = useSelector((state) => state.ProductStateData)
  function getAPIData() {
    dispatch(getProduct())
    if (ProductStateData.length) {
      let item = ProductStateData.slice(1).find((x) => x.id === Number(id))
      if (item) {
        setData(item)
        setRelatedProducts(ProductStateData.slice(1).reverse().filter((x) => x.maincategory === item.maincategory && x.subcategory === item.subcategory && x.brand === item.brand))
      }
      else {
        navigate('/shop')
      }
    }
  }
  useEffect(() => {
    getAPIData()
  }, [ProductStateData.length,id])
  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-md-6">
            <div id="carouselExampleIndicators" className="carousel slide">
              <div className="carousel-indicators">
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
              </div>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img src={`/products/${data.pic1}`} height="500px" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={`/products/${data.pic2}`} height="500px" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={`/products/${data.pic3}`} height="500px" className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                  <img src={`/products/${data.pic4}`} height="500px" className="d-block w-100" alt="..." />
                </div>
              </div>
              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
            <div className='d-flex justify-content-between mt-1'>
              <img src={`/products/${data.pic1}`} height="100px" width="24.7%" alt="" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" />
              <img src={`/products/${data.pic2}`} height="100px" width="24.7%" alt="" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2" />
              <img src={`/products/${data.pic3}`} height="100px" width="24.7%" alt="" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3" />
              <img src={`/products/${data.pic4}`} height="100px" width="24.7%" alt="" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4" />
            </div>
          </div>
          <div className="col-md-6">
            <h4 className='bg-primary text-center p-2 text-light'>{data.name}</h4>
            <div className="table-responsive">
              <table className='table table-bordered'>
                <tbody>
                  <tr>
                    <th>Category</th>
                    <td>{data.maincategory} / {data.subcategory}</td>
                  </tr>
                  <tr>
                    <th>Brand</th>
                    <td>{data.brand}</td>
                  </tr>
                  <tr>
                    <th>Color/Size</th>
                    <td>{data.color} / {data.size}</td>
                  </tr>
                  <tr>
                    <th>Price</th>
                    <td><del className='text-danger'>&#8377;{data.baseprice}</del> &#8377;{data.finalprice} <sup>{data.discount}% Off</sup></td>
                  </tr>
                  <tr>
                    <th>Stock</th>
                    <td>{data.stock}</td>
                  </tr>
                  <tr>
                    <th>Description</th>
                    <td>{data.description}</td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <div className='d-flex'>
                        <button className='btn btn-primary' onClick={() => {
                          if (qty > 1)
                            setQty(qty - 1)
                        }}><i className='fa fa-minus'></i></button>
                        <p className='text-center fs-4' style={{ width: "10%" }}>{qty}</p>
                        <button className='btn btn-primary' onClick={() => setQty(qty + 1)}><i className='fa fa-plus'></i></button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td colSpan={2}>
                      <button className='btn btn-primary w-50'><i className='fa fa-shopping-cart'></i> Add to Cart</button>
                      <button className='btn btn-success w-50'><i className='fa fa-heart'></i> Add to Wishlist</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
        {
          relatedProducts.length ?
            <>
              <h5 className='text-center my-3 bg-primary p-2 text-light'>Products You May Also Like</h5>
              <OwlCarousel className='owl-theme' loop margin={10} nav>
                {
                  relatedProducts.map((item, index) => {
                    return <div key={index} className="wow fadeInUp" data-wow-delay="0.1s">
                      <div className="team-item">
                        <div className="position-relative overflow-hidden">
                          <img className="img-fluid" src={`/products/${item.pic1}`} style={{ height: "230px", width: "100%" }} alt="" />
                          <div className="team-overlay position-absolute start-0 top-0 w-100 h-100">
                            <img src={`/products/${item.pic2}`} className='position-absolute start-0 top-0 w-100 h-100' style={{ height: "230px", width: "100%" }} alt="" />
                            <Link className="btn btn-square w-100 position-absolute start-0 bottom-0 w-100 h-100'" to={`/product/${item.id}`}><i className="fa fa-shopping-cart"></i> Add to Cart</Link>
                          </div>
                        </div>
                        <div className="bg-light text-center p-4">
                          <h5 className="fw-bold mb-0" style={{ height: "50px" }}>{item.name}</h5>
                          <small><del className='text-danger'>&#8377;{item.baseprice}</del> &#8377;{item.finalprice} <sup className='text-success'>{item.discount}% Off</sup></small>
                        </div>
                      </div>
                    </div>
                  })
                }
              </OwlCarousel>
            </> : ""
        }
      </div>
    </>
  )
}
