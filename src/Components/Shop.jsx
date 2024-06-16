import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import { Link } from "react-router-dom"

import { getMaincategory } from "../Store/ActionCreators/MaincategoryActionCreators"
import { getSubcategory } from "../Store/ActionCreators/SubcategoryActionCreators"
import { getBrand } from "../Store/ActionCreators/BrandActionCreators"
import { getProduct } from "../Store/ActionCreators/ProductActionCreators"

export default function Shop() {
    let [product, setProduct] = useState([])
    let [maincategory, setMaincategory] = useState([])
    let [subcategory, setSubcategory] = useState([])
    let [brand, setBrand] = useState([])
    let [mc, setMc] = useState("All")
    let [sc, setSc] = useState("All")
    let [br, setBr] = useState("All")
    let [min, setMin] = useState(0)
    let [max, setMax] = useState(1000)
    let [flag, setFlag] = useState(true)
    let [search, setSearch] = useState("")

    let dispatch = useDispatch()
    let ProductStateData = useSelector((state) => state.ProductStateData)
    let MaincategoryStateData = useSelector((state) => state.MaincategoryStateData)
    let SubcategoryStateData = useSelector((state) => state.SubcategoryStateData)
    let BrandStateData = useSelector((state) => state.BrandStateData)

    function categoryFilter(mc, sc, br, min = -1, max = -1) {
        setMc(mc)
        setSc(sc)
        setBr(br)
        let data = []
        if (mc === "All" && sc === "All" && br === "All")
            data = ProductStateData.slice(1).reverse()
        else if (mc !== "All" && sc === "All" && br === "All")
            data = ProductStateData.slice(1).reverse().filter((x) => x.maincategory === mc)
        else if (mc === "All" && sc !== "All" && br === "All")
            data = ProductStateData.slice(1).reverse().filter((x) => x.subcategory === sc)
        else if (mc === "All" && sc === "All" && br !== "All")
            data = ProductStateData.slice(1).reverse().filter((x) => x.brand === br)
        else if (mc !== "All" && sc !== "All" && br === "All")
            data = ProductStateData.slice(1).reverse().filter((x) => x.maincategory === mc && x.subcategory === sc)
        else if (mc !== "All" && sc === "All" && br !== "All")
            data = ProductStateData.slice(1).reverse().filter((x) => x.maincategory === mc && x.brand === br)
        else if (mc === "All" && sc !== "All" && br !== "All")
            data = ProductStateData.slice(1).reverse().filter((x) => x.brand === br && x.subcategory === sc)
        else
            data = ProductStateData.slice(1).reverse().filter((x) => x.maincategory === mc && x.subcategory === sc && x.brand === br)
        if (min === -1 && max === -1)
            setProduct(data)
        else
            setProduct(data.filter((x) => x.finalprice >= min && x.finalprice <= max))
    }
    function getPriceFilter(e) {
        var { name, value } = e.target
        if (name === "min")
            setMin(value)
        else
            setMax(value)
    }
    function applyPriceFilter() {
        categoryFilter(mc, sc, br, min, max)
    }
    function getSortFilter(e) {
        let { value } = e.target
        if (value === "1")
            setProduct(product.sort((x, y) => y.id - x.id))
        else if (value === "2")
            setProduct(product.sort((x, y) => y.finalprice - x.finalprice))
        else
            setProduct(product.sort((x, y) => x.finalprice - y.finalprice))
        flag ? setFlag(false) : setFlag(true)
    }
    function postSearch(e){
        e.preventDefault()
        setProduct(ProductStateData.slice(1).reverse().filter((x)=>x.name.toLowerCase().includes(search) || x.maincategory.toLowerCase() === search || x.subcategory.toLowerCase() === search || x.brand.toLowerCase() === search || x.color.toLowerCase() === search || x.size.toLowerCase() === search  || x.maincategory.toLowerCase().includes(search)))
    }
    function getAPIData() {
        dispatch(getProduct())
        if (ProductStateData.length)
            setProduct(ProductStateData.slice(1).reverse())

        dispatch(getMaincategory())
        if (MaincategoryStateData.length)
            setMaincategory(MaincategoryStateData.slice(1).reverse())

        dispatch(getSubcategory())
        if (SubcategoryStateData.length)
            setSubcategory(SubcategoryStateData.slice(1).reverse())

        dispatch(getBrand())
        if (BrandStateData.length)
            setBrand(BrandStateData.slice(1).reverse())
    }
    useEffect(() => {
        getAPIData()
    }, [ProductStateData.length, MaincategoryStateData.length, SubcategoryStateData.length, BrandStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <div className="list-group">
                            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                Maincategory
                            </a>
                            <button className="list-group-item list-group-item-action" onClick={() => categoryFilter('All', sc, br)}>All</button>
                            {
                                maincategory.map((item, index) => {
                                    return <button key={index} onClick={() => categoryFilter(item.name, sc, br)} className="list-group-item list-group-item-action">{item.name}</button>
                                })
                            }
                        </div>
                        <div className="list-group mt-3">
                            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                Subcategory
                            </a>
                            <button className="list-group-item list-group-item-action" onClick={() => categoryFilter(mc, 'All', br)}>All</button>
                            {
                                subcategory.map((item, index) => {
                                    return <button key={index} onClick={() => categoryFilter(mc, item.name, br)} className="list-group-item list-group-item-action">{item.name}</button>
                                })
                            }
                        </div>

                        <div className="list-group mt-3">
                            <a href="#" className="list-group-item list-group-item-action active" aria-current="true">
                                Brand
                            </a>
                            <button className="list-group-item list-group-item-action" onClick={() => categoryFilter(mc, sc, 'All')}>All</button>
                            {
                                brand.map((item, index) => {
                                    return <button key={index} onClick={() => categoryFilter(mc, sc, item.name)} className="list-group-item list-group-item-action">{item.name}</button>
                                })
                            }
                        </div>
                        <h5 className='bg-primary my-3 text-light p-2'>Price Filter</h5>
                        <div className="row">
                            <div className="col-md-6">
                                <label>Min</label>
                                <input type="number" name="min" onChange={getPriceFilter} placeholder='Min Amount' className='form-control' value={min} />
                            </div>
                            <div className="col-md-6">
                                <label>Max</label>
                                <input type="number" name="max" onChange={getPriceFilter} placeholder='Max Amount' className='form-control' value={max} />
                            </div>
                            <div className="my-3">
                                <button className='btn btn-primary w-100' onClick={applyPriceFilter}>Apply</button>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-9">
                        <div className="row">
                            <div className="col-md-9">
                                <form onSubmit={postSearch}>
                                    <div className="mb-3 btn-group w-100">
                                        <input type="search" name="search" onChange={(e) =>setSearch(e.target.value.toLowerCase())} placeholder='Enter Product Name,Brand,Category,Size,Color to Search' className='form-control' />
                                        <button type="submit" className='btn btn-primary'>Search</button>
                                    </div>
                                </form>
                            </div>
                            <div className="col-md-3 mb-3">
                                <select name="sortFilter" onChange={getSortFilter} className='form-control'>
                                    <option value="1">Latest</option>
                                    <option value="2">Price: H to L</option>
                                    <option value="3">Price: L to H</option>
                                </select>
                            </div>
                        </div>
                        <div className="row">
                            {
                                product.map((item, index) => {
                                    return <div key={index} className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
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
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
