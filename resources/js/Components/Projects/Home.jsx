import React from 'react'

const Home = () => {
  return (
    <div className="bg-cover bg-center h-screen object-cover font-poppins gap-16 text-white flex justify-center items-center flex-col"
    style={{ backgroundImage: "url('/img/smk.png')" }}>
        <div className="text-center">
            <h1 className="font-[600] lg:text-[50px] text-[22px]">Selamat Datang di Forum Website Boeatin</h1>
            <p className="font-[600] lg:text-[40px] text-[17px] lg:py-0 py-1">Produknya Anak SMK</p>
        </div>
        <a href="#products"><button className="bg-red-600 font-[600] lg:px-11 px-7 py-2 lg:py-4 rounded-lg lg:text-[22px] text-[16px] cursor-pointer duration-300 transition-all outline-none border-none hover:scale-90 hover:opacity-85">Belanja</button></a>
    </div>
  )
}

export default Home