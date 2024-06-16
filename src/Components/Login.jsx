import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    let [data, setData] = useState({
        username: "",
        password: ""
    })
    let [show, setShow] = useState(false)
    let navigate = useNavigate()
    function getInputData(e) {
        var { name, value } = e.target
        setData((old) => {
            return {
                ...old,
                [name]: value
            }
        })
    }
    async function postData(e) {
        e.preventDefault()
        let response = await fetch("/user", {
            method: "get",
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        let item = response.slice(1).find((x) => x.username === data.username && x.password === data.password)
        if (item) {
            localStorage.setItem("login", true)
            localStorage.setItem("userid", item.id)
            localStorage.setItem("name", item.name)
            localStorage.setItem("username", item.username)
            localStorage.setItem("role", item.role)
            console.log(item);
            if (item.role === "Buyer")
                navigate("/profile")
            else
                navigate("/admin")
        }
        else
            setShow(true)
    }
    return (
        <>
            <div className="container-fluid my-3">
                <div className="w-75 m-auto">
                    <h5 className='text-center bg-primary p-2 text-light'><span className='text-warning fs-3'>Login</span> to Your Account</h5>
                    {
                        show ?
                            <p className='text-danger text-center p-2'>Invalid Username or Password</p>
                            : ""
                    }
                    <form onSubmit={postData}>
                        <div className="mb-3">
                            <label>Username</label>
                            <input type="text" name="username" onChange={getInputData} placeholder='User Name' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <label>Password</label>
                            <input type="password" name="password" onChange={getInputData} placeholder='Password' className='form-control' />
                        </div>
                        <div className="mb-3">
                            <div className="btn-group w-100">
                                <Link to="/signup" className='btn btn-success'>Signup</Link>
                                <button type="submit" className='btn btn-primary'>Login</button>
                            </div>
                            <Link to="#">Forget Password</Link>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
