import React, { useState } from 'react'
import { Link } from '@inertiajs/react'
import '../../../css/style.css'

const Navbar = () => {
  const [open, setOpen] = useState(true);

  const toggleMenu = () => {
    setOpen(!open);
  }

  const ulSetting = 'flex lg:flex-row flex-col lg:bg-transparent bg-[rgba(0,0,0,0.3)] justify-center lg:items-center gap-16 lg:h-[11vh] text-[18px] cursor-pointer lg:relative absolute right-0 top-[-70%] lg:w-auto w-[200px] h-[110vh] items-start lg:pl-0 pl-16 lg:pb-0 pb-64 transition-opacity duration-300'

  return (
    <div className="font-poppins fixed z-50 h-[11vh] w-full flex justify-center items-center"
    style={{backgroundColor:"rgba(0,0,0,0.3)"}}>
        <div className="text-white w-full justify-between relative flex items-center lg:px-10 px-8">
            <h1 className="font-[600] lg:text-[32px] text-[28px]">Rayzen7</h1>
            <div className={`${ulSetting} ${open ? 'animate-moveLeft opacity-100' : 'animate-moveRight opacity-0 invisible'} ${open ? 'visible' : 'invisible'} `}>
                <a href="#"><p className="hover:scale-90 duration-300 transition-all hover:opacity-75">Home</p></a>
                <a href="#products"><p className="hover:scale-90 duration-300 transition-all hover:opacity-75">Products</p></a>
                <a href="#contact"><p className="hover:scale-90 duration-300 transition-all hover:opacity-75">Contact</p></a>
            </div>
            <Link href={route('login')}>
                <button className={`bg-red-600 lg:px-8 px-5 cursor-pointer py-2 lg:py-3 rounded-xl font-[600] lg:text-[17px] text-[14px] duration-300 transition-all hover:scale-90 hover:opacity-75
                lg:relative absolute top-[1000%] ${open ? 'animate-moveLeft opacity-100' : 'animate-moveRight opacity-0 invisible'} `}>
                  Admin
                </button>
            </Link>
            <i className='bx bx-list-ul text-[35px] cursor-pointer list relative z-[90px]'
            onClick={toggleMenu}></i>
        </div>
    </div>
  )
}

export default Navbar;
