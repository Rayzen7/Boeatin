import React from 'react';
import { Head } from '@inertiajs/react';
import Navbar from '@/Components/Projects/Navbar';
import Home from '@/Components/Projects/Home';
import Products from '@/Components/Projects/Products';
import Contact from '@/Components/Projects/Contact';
import Footer from './Footer';

const Index = () => {
  return (
    <div>
        <Head title="Boeatin"/>
        <Navbar/>
        <Home/>
        <Products/>
        <Contact/>
        <Footer/>
    </div>
  )
}

export default Index