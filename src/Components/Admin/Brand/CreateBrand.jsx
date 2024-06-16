import React, { useEffect, useRef } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { addBrand, getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
export default function CreateBrand() {
    let name = useRef("")
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let BrandStateData = useSelector((state) => state.BrandStateData)
    function getInputData(e) {
        name.current = e.target.value
    }
    async function postData(e) {
        e.preventDefault()
        let item = BrandStateData.length && BrandStateData.slice(1).find((x) => x.name === name.current)
        if (item)
            alert("Brand Name Already Exist")
        else {
            dispatch(addBrand({ name: name.current }))
            navigate("/admin/brand")
        }
    }
    function getAPIData() {
        dispatch(getBrand())
    }
    useEffect(() => {
        getAPIData()
    }, [BrandStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>Brand</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" name='name' required minLength={3} maxLength={50} onChange={getInputData} className='form-control' placeholder='Name' />
                            </div>
                            <div className="mb-3">
                                <button type='button' className='btn btn-success w-50' onClick={() => window.history.back()}>Back</button>
                                <button type="submit" className='btn btn-primary w-50'>Create</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
