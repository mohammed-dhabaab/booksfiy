import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaBook } from "react-icons/fa";
import { LuLogOut } from "react-icons/lu";
import { MdFavorite } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { FaReadme } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { styles } from '../styles';

function Navbar() {
    const navigate = useNavigate()
    const location = useLocation();
    const { hash, pathname, search } = location;

    const logoutUser = () => {
        localStorage.removeItem("user")
        navigate("/")
    }
    return (
        <div className="navbar bg-base-100">
            <div className="flex-1">
                <Link to={"/home"} className="btn btn-ghost text-xl flex items-center gap-4">
                    <FaBook size={20} />
                    Booksfiy</Link>
            </div>
            <div className="flex-none gap-4">
                <Link title='Home' to={"/home"} className={` cursor-pointer`}>
                    <FaHome size={16} className={`${pathname == "/home" ? "text-gray-50 " : ""} ${styles.transition400} hover:text-gray-50 fill-current `} />
                </Link>
                <Link title='Read' to={"/read"} className={` cursor-pointer`}>
                    <FaReadme size={16} className={`${pathname == "/read" ? "text-blue-500 " : ""} ${styles.transition400} hover:text-blue-500 fill-current `} />
                </Link>
                <Link title='Favorites' to={"/favorites"} className='cursor-pointer'>
                    <MdFavorite size={16} className={`${pathname == "/favorites" ? "text-red-500 " : ""} ${styles.transition400} hover:text-red-500 fill-current `} />
                </Link>
                <div className='flex items-center'>
                    <div className='h-full py-[12px] p-[1px] rounded-full bg-slate-600 mr-1'></div>
                    <div onClick={logoutUser} title='Log Out' className='cursor-pointer flex items-center'>
                        <LuLogOut size={16} className={`${styles.transition400} hover:text-red-600 hover:fill-current`} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default Navbar