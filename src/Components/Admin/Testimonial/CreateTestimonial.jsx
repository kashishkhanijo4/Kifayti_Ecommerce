import React, { useEffect, useState } from 'react'
import Sidebar from '../Sidebar'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'


import { addTestimonial, getTestimonial } from "../../../Store/ActionCreators/TestimonialActionCreators"
export default function CreateTestimonial() {
    let [data, setData] = useState({
        name: "",
        profile: "",
        pic: "",
        message: ""
    })
    let navigate = useNavigate()
    let dispatch = useDispatch()
    let TestimonialStateData = useSelector((state) => state.TestimonialStateData)
    function getInputData(e) {
        let { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    function getInputFile(e) {
        let { name, files } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: files[0].name
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        dispatch(addTestimonial({ ...data }))
        navigate("/admin/testimonial")
    }
    function getAPIData() {
        dispatch(getTestimonial())
    }
    useEffect(() => {
        getAPIData()
    }, [TestimonialStateData.length])
    return (
        <>
            <div className="container-fluid my-3">
                <div className="row">
                    <div className="col-md-3">
                        <Sidebar />
                    </div>
                    <div className="col-md-9">
                        <h5 className='bg-primary text-light p-2 text-center'>Testimonial</h5>
                        <form onSubmit={postData}>
                            <div className="mb-3">
                                <label>Name</label>
                                <input type="text" name='name' required minLength={3} maxLength={50} onChange={getInputData} className='form-control' placeholder='Name' />
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label>Profile</label>
                                    <input type="text" name='profile' required onChange={getInputData} className='form-control' placeholder='Profile' />
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label>Pic</label>
                                    <input type="file" name='pic' required onChange={getInputFile} className='form-control' />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label>Message</label>
                                <textarea name="message" rows="5" placeholder='Message...' onChange={getInputData} className='form-control'></textarea>
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
