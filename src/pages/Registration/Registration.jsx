import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { USERS_API } from '../../api'
import { useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa6";
import { FaHeart, FaReadme } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { BiSolidPurchaseTag } from "react-icons/bi";

function Registration() {
    const [registrationType, setRegistrationType] = useState("")
    const navigate = useNavigate();
    const [signup, setSignup] = useState({
        name: "",
        email: "",
        password: "",

    })
    const [login, setLogin] = useState({
        email: "",
        password: ""
    })

    const [validationMessage, setValidationMessage] = useState("")

    const register = async () => {
        if (!validation()) {
            return
        }

        try {
            const res = await axios.post(USERS_API, {
                name: signup.name,
                email: signup.email,
                password: signup.password,
                favorites: [],
                read: []

            })

            const user = res.data
            localStorage.setItem("user", JSON.stringify(user))
            navigate("/home")
        } catch (error) {
            console.log(error)
        }


    }
    const validation = () => {

        if (signup.name.length < 3 || signup.name.length > 10) {
            setValidationMessage("Name should be 3-10 letters")
            return false
        }

        if (!validateEmail(signup.email)) {
            setValidationMessage("Email  is not valid")
            return false
        }

        if (signup.password.length < 3 || signup.password.length > 10) {
            setValidationMessage("Password should be 3-10 letters")
            return false
        }

        return true
    }

    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };


    const loginUser = async () => {
        try {
            const res = await axios.get(USERS_API)
            const users = res.data
            const user = users.find(user => user.email === login.email)
            if (user) {
                if (user.password === login.password && user.email === login.email) {
                    localStorage.setItem("user", JSON.stringify(user))
                    navigate("/home")
                }
                setValidationMessage("Invalid email or password")
            } else {
                setValidationMessage("User not found")
            }
        } catch (error) {

        }
    }


    useEffect(() => {
        setValidationMessage("")
    }, [registrationType])

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='mx-auto max-w-[1200px] px-4'>

                <div className={`${registrationType == "" ? "flex" : "hidden"}  flex-col sm:flex-row gap-10`}>
                    <div className='flex flex-col text-center gap-4'>
                        <FaBook className='mx-auto w-[100px] h-[100px] sm:w-[200px] sm:h-[200px] md:w-[300px] md:h-[300px]' />
                        <p className='text-3xl sm:text-4xl md:text-6xl font-bold '>Booksfiy</p>
                    </div>
                    <div className='flex flex-col gap-3'>
                        <h1 className='text-3xl sm:text-4xl font-bold mb-2'>Explore Your Amazing Books</h1>
                        <div className='flex flex-col gap-2 mb-4'>
                            <div className='flex items-center gap-2'>
                                <IoSearch className='fill-current text-purple-500' /> Explore varieties of books
                            </div>
                            <div className='flex items-center gap-2'>
                                <FaHeart className='fill-current text-red-500' /> Add books to your favorite list
                            </div>
                            <div className='flex items-center gap-2'>
                                <FaReadme className='fill-current text-blue-500' /> Save books to your read list
                            </div>
                            <div className='flex items-center gap-2'>
                                <BiSolidPurchaseTag className='fill-current text-yellow-500' /> Purchase books
                            </div>
                        </div>
                        <div className='h-full flex flex-col justify-end'>
                            <button onClick={() => setRegistrationType("signup")} className='w-full btn btn-accent'>Sign up</button>
                            <div className="divider">or</div>
                            <button onClick={() => setRegistrationType("login")} className='w-full btn btn-primary'>Log in</button>
                        </div>

                    </div>
                </div>





                <div className={`${registrationType == "signup" ? "flex" : "hidden"} flex-col sm:min-w-[400px]`}>
                    <h1 className='text-3xl sm:text-4xl font-bold mb-6'> Sign Up</h1>
                    <p className='text-red-500 mb-2'>{validationMessage}</p>
                    <div className='flex flex-col gap-4'>
                        <input value={signup.name} onChange={(e) => setSignup({ ...signup, name: e.target.value })} type="text" placeholder="Name" className="input input-bordered w-full max-w-xl" />
                        <input value={signup.email} required onChange={(e) => setSignup({ ...signup, email: e.target.value })} type="email" placeholder="Email" className="input input-bordered w-full max-w-xl" />
                        <input value={signup.password} onChange={(e) => setSignup({ ...signup, password: e.target.value })} type="password" placeholder="Password" className="input input-bordered w-full max-w-xl" />

                        <div className='flex flex-col mt-4'>
                            <button onClick={register} type="button" className=" shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-accent hover:opacity-90 transition-all duration-400 ease-in-out  focus:outline-none">
                                Sign Up
                            </button>
                            <div className="divider">or</div>
                            <button onClick={() => setRegistrationType("login")} className='btn btn-primary'>Log in</button>
                        </div>
                    </div>
                </div>


                <div className={`${registrationType == "login" ? "flex" : "hidden"} flex-col sm:min-w-[400px]`}>
                    <h1 className='text-3xl sm:text-4xl font-bold mb-6'>Log In</h1>
                    <p className='text-red-500 mb-2'>{validationMessage}</p>
                    <div className='flex flex-col gap-4'>

                        <input value={login.email} required onChange={(e) => setLogin({ ...login, email: e.target.value })} type="email" placeholder="Email" className="input input-bordered w-full max-w-xl" />
                        <input value={login.password} onChange={(e) => setLogin({ ...login, password: e.target.value })} type="password" placeholder="Password" className="input input-bordered w-full max-w-xl" />

                        <div className='flex flex-col mt-4'>
                            <button onClick={loginUser} type="button" className="w-full shadow-xl py-3 px-6 text-sm text-gray-800 font-semibold rounded-md bg-accent hover:opacity-90 transition-all duration-400 ease-in-out focus:outline-none">
                                Log In
                            </button>
                            <div className="divider">or</div>
                            <button onClick={() => setRegistrationType("signup")} className='btn btn-primary'>Sign up</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Registration