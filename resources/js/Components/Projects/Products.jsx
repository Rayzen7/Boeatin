import React, { useEffect, useState } from 'react';
import { Inertia } from '@inertiajs/inertia'; 

const Products = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/products');
        const data = await response.json();
        setProducts(data);
        const uniqueCategories = [...new Set(data.map(product => product.kategori))];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  const handleBuyClick = (productId) => {
    Inertia.visit(`/buy/${productId}`);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory ? product.kategori === selectedCategory : true;
    const matchesSearch = product.nama.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="w-full h-auto p-4" id='products'>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <h1 className='text-center font-poppins font-[600] lg:text-[43px] text-[30px] my-8'>Daftar Produk</h1>
      <div className="mb-20 mt-10 lg:mt-16 flex justify-center items-center lg:gap-[100px] gap-3">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border p-2 rounded mr-2 lg:w-[200px] w-[400px] focus:outline-none focus:ring focus:ring-blue-500"
        >
          <option value="">Kategori</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
        <div className="relative lg:w-[450px] w-[800px] flex items-center justify-center">
          <input
            type="text"
            placeholder="Cari produk..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="border p-2 rounded w-full pl-4  focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:w-[1000px] w-auto lg:gap-10 gap-2 mx-auto lg:gap-y-0 gap-y-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="border p-2 rounded shadow">
            <img src={product.img_Url} alt={product.nama} className="w-full h-auto mb-2" />
            <h3 className="font-semibold mb-1 lg:text-[22px] text-[15px]">{product.nama}</h3>
            <p className="font-bold mb-1">
              Rp {parseFloat(product.harga).toLocaleString()}
            </p>
            <button
              onClick={() => handleBuyClick(product.id)}
              className="bg-green-600 hover:bg-green-700 text-white py-2 w-full text-[19px] font-poppins px-4 rounded mt-5"
            >
              Beli
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;