import React, { useState, useEffect } from 'react';
import { Head, Link, usePage, useForm } from '@inertiajs/react';
import Swal from 'sweetalert2';

const BuyProduct = () => {
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [comments, setComments] = useState([]);
  const { id, product: productData } = usePage().props;
  const { data, setData, post } = useForm({
    comment: ''
  });

  useEffect(() => {
    if (productData) {
      setProduct(productData);
      fetchComments(productData.id);
    } else {
      const fetchProduct = async () => {
        try {
          if (!id) {
            throw new Error("Product ID is missing");
          }

          const response = await fetch(`/products/${id}`);
          if (!response.ok) {
            throw new Error("Failed to fetch product");
          }

          const data = await response.json();
          setProduct(data);
          fetchComments(data.id);
        } catch (error) {
          console.error('Error fetching product:', error);
        }
      };

      fetchProduct();
    }
  }, [id, productData]);

  const fetchComments = async (productId) => {
    try {
      const response = await fetch(`/products/${productId}/comments`, {
        method: 'GET',
      });

      if (!response.ok) {
        throw new Error("Failed to fetch comments");
      }
      const data = await response.json();
      setComments(data);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  };

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    post(`/products/${product.id}/comments`, {
      comment: data.comment,
      onSuccess: () => {
        setData('comment', ''); // Reset comment input
        fetchComments(product.id); // Fetch updated comments
        Swal.fire('Success', 'Comment posted successfully!', 'success');
      },
      onError: () => {
        Swal.fire('Error', 'Failed to post comment', 'error');
      }
    });
  };

  const increaseQuantity = () => setQuantity(prevQty => prevQty + 1);
  const decreaseQuantity = () => setQuantity(prevQty => (prevQty > 1 ? prevQty - 1 : 1));

  const handlePurchase = () => {
    const totalPrice = parseFloat(product.harga) * quantity;
    Swal.fire({
      title: `Apakah kamu yakin membeli ${product.nama} dengan jumlah ${quantity}?`,
      text: `Total harga: Rp ${totalPrice.toLocaleString()}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Ya, beli sekarang!',
      cancelButtonText: 'Batal',
      customClass: {
        title: 'text-[26px]',
        confirmButton: 'bg-red-600 text-white hover:bg-red-700',
        cancelButton: 'bg-gray-300 text-black hover:bg-gray-400'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const message = `Saya membeli ${product.nama} sebanyak ${quantity} dengan harga Rp ${totalPrice.toLocaleString()}`;
        const url = `https://wa.me/6281219538787?text=${encodeURIComponent(message)}`;
        window.open(url, '_blank');
      }
    });
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="w-full p-6 bg-gray-100">
      <Head title={`Buy ${product.nama}`} />
      <Link href={route('home')}>
        <div className='flex justify-start items-center gap-3 max-w-7xl mx-auto mt-5 lg:mb-12 mb-10'>
          <i className='bx bx-left-arrow-alt text-red-600 text-[28px] lg:text-[37px] font-[600]'></i>
          <p className='font-poppins font-[600] text-red-600 text-[25px] lg:text-[32px]'>Kembali</p>
        </div>
      </Link>
      <p className='max-w-7xl mx-auto lg:text-[20px] text-[15px] mb-5 font-poppins italic font-[400]'>Home &gt; Beli &gt; {product.nama}</p>
      <div className="max-w-7xl mx-auto bg-white lg:p-8 p-2 rounded-lg shadow-lg">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            <img src={product.img_Url} alt={product.nama} className="w-full h-auto rounded-lg border-2 border-gray-200" />
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h1 className="lg:text-4xl text-[26px] font-semibold mb-4">{product.nama}</h1>
            <p className="lg:text-lg text-[16px] mb-4 text-gray-700">{product.deskripsi}</p>
            <p className="lg:text-3xl text-[22px] font-bold text-red-600 mb-4">
              Rp {parseFloat(product.harga).toLocaleString()}
            </p>
            <div className="flex justify-between items-center mb-6 border-2 border-gray-300 rounded-md overflow-hidden">
              <button
                onClick={decreaseQuantity}
                className="lg:px-12 px-1 lg:w-auto w-[40px] py-2 bg-gray-200 text-lg font-semibold hover:bg-gray-300"
              >
                -
              </button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-auto text-center border-0 outline-none py-1"
              />
              <button
                onClick={increaseQuantity}
                className="lg:px-12 px-1 lg:w-auto w-[40px] py-2 bg-gray-200 text-lg font-semibold hover:bg-gray-300"
              >
                +
              </button>
            </div>
            <button 
              onClick={handlePurchase} 
              className="bg-red-600 hover:bg-red-700 text-white py-3 w-full rounded-lg font-semibold lg:mt-0 mt-12 text-lg mb-4"
            >
              Beli Sekarang
            </button>
            <Link href={product.link} className="text-blue-500 underline">
              <p className='lg:text-start text-center'>Lihat Produk lebih lanjut</p>
            </Link>
          </div>
        </div>

        <div className="lg:mt-8 mt-12 lg:px-0 px-3">
          <h2 className="lg:text-[30px] text-[26px] font-semibold mb-4 text-red-600">Komentar</h2>
          {comments.length === 0 ? (
            <p>Tidak ada komentar untuk produk ini.</p>
          ) : (
            <ul className='lg:mt-12 mt-9'>
              {comments.map((comment) => (
                <li key={comment.id} className="border-b mb-2 pb-2">
                  <p className="font-semibold lg:text-[22px] text-[20px]">Pembeli</p>
                  <p className='lg:text-[18px] text-[14px]'>{comment.comment}</p>
                </li>
              ))}
            </ul>
          )}
        </div>

        <form onSubmit={handleCommentSubmit} className="mt-6 lg:px-0 px-3 pb-5 lg:pb-0">
          <textarea
            value={data.comment}
            onChange={(e) => setData('comment', e.target.value)}
            rows="4"
            placeholder="Tulis komentar..."
            className="w-full p-2 border rounded"
            required
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded mt-2"
          >
            Kirim Komentar
          </button>
        </form>
      </div>
    </div>
  );
};

export default BuyProduct;
