import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { updateBrand, getBrand } from "../../../Store/ActionCreators/BrandActionCreators"
export default function UpdateBrand() {
    let [name,setName] = useState("")
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let { id } = useParams()
    let BrandStateData = useSelector((state) => state.BrandStateData)
    function getInputData(e) {
        setName(e.target.value)
    }
    async function postData(e) {
        e.preventDefault()
        let item = BrandStateData.length && BrandStateData.slice(1).find((x) => x.name === name)
        if (item)
            alert("Brand Name Already Exist")
        else {
            dispatch(updateBrand({ id:id,name: name }))
            navigate("/admin/brand")
        }
    }
    function getAPIData() {
        dispatch(getBrand())
        if(BrandStateData.length){
            let item = BrandStateData.slice(1).find((x)=>x.id===Number(id))
            if(item)
            setName(item.name)
        }
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
                                <input type="text" name='name' value={name} required minLength={3} maxLength={50} onChange={getInputData} className='form-control' placeholder='Name' />
                            </div>
                            <div className="mb-3">
                                <button type='button' className='btn btn-success w-50' onClick={() => window.history.back()}>Back</button>
                                <button type="submit" className='btn btn-primary w-50'>Update</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
