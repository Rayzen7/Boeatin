import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

export default function Dashboard() {
    const { post, delete: deleteInertia } = useForm(); 
    const [products, setProducts] = useState([]);
    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch('/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchComments = async () => {
            try {
                const allComments = await Promise.all(products.map(async (product) => {
                    const response = await fetch(`/products/${product.id}/comments`);
                    return await response.json();
                }));

                const mergedComments = allComments.flat();
                setComments(mergedComments);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        if (products.length > 0) {
            fetchComments();
        }
    }, [products]);

    const handleLogout = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    const handleDeleteProduct = (productId) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Produk ini akan dihapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteInertia(`/products/${productId}`, {
                    onSuccess: () => {
                        setProducts(products.filter(product => product.id !== productId));
                        Swal.fire({
                            title: 'Dihapus!',
                            text: 'Produk telah berhasil dihapus.',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Kesalahan!',
                            text: 'Gagal menghapus produk. Silakan coba lagi.',
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        });
                    }
                });
            }
        });
    };

    const handleDeleteComment = (commentId) => {
        Swal.fire({
            title: 'Apakah Anda yakin?',
            text: "Komentar ini akan dihapus secara permanen!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ya, hapus!',
            cancelButtonText: 'Batal'
        }).then((result) => {
            if (result.isConfirmed) {
                deleteInertia(`/comments/${commentId}`, {
                    onSuccess: () => {
                        setComments(comments.filter(comment => comment.id !== commentId));
                        Swal.fire({
                            title: 'Dihapus!',
                            text: 'Komentar telah berhasil dihapus.',
                            icon: 'success',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        });
                    },
                    onError: () => {
                        Swal.fire({
                            title: 'Kesalahan!',
                            text: 'Gagal menghapus komentar. Silakan coba lagi.',
                            icon: 'error',
                            confirmButtonColor: '#3085d6',
                            confirmButtonText: 'OK'
                        });
                    }
                });
            }
        });
    };

    return (
        <AuthenticatedLayout
            header={
                <div className='flex justify-between items-center lg:px-0 px-3'>
                    <h2 className="lg:text-[30px] text-[24px] font-poppins font-[600] leading-tight text-gray-800">Admin</h2>
                    <div className='flex justify-center items-center lg:gap-8 font-poppins gap-4'>
                        <Link href={route('add')}>
                            <button className='bg-green-600 lg:text-[18px] text-[12px] lg:px-7 px-4 lg:py-3 py-2 rounded-lg text-white font-[600] cursor-pointer hover:bg-green-700'>
                                Tambah
                            </button>
                        </Link>
                        <Link href={route('profile.destroy')}>
                            <button
                                className='bg-red-600 lg:px-7 lg:text-[18px] text-[12px] px-4 lg:py-3 py-2 rounded-lg text-white font-[600] cursor-pointer hover:bg-red-700'
                                onClick={handleLogout}>
                                Keluar
                            </button>
                        </Link>
                    </div>
                </div>
            }>
            <Head title="Dashboard" />
            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
                        <div className="py-6 px-9 text-gray-900">
                            <h3 className="font-poppins font-[600] lg:text-[40px] text-[30px] my-4 text-center">Daftar Produk</h3>
                            <div className="grid grid-cols-1 sm:grid-cols-2 mt-12 lg:grid-cols-3 gap-4">
                                {products.map(product => (
                                    <div key={product.id} className="border rounded-lg p-4 shadow-md">
                                        <img src={product.img_Url} alt={product.nama} className="w-full h-auto mb-2" />
                                        <h4 className="text-md font-bold">{product.nama}</h4>
                                        <p className="text-gray-700">
                                            Harga: Rp {parseFloat(product.harga).toLocaleString()}
                                        </p>
                                        <div className="flex justify-start items-center gap-4 mt-4">
                                            <Link href={route('edit', product.id)}>
                                                <button className='bg-blue-600 px-8 py-2 rounded-lg text-white font-[600] hover:bg-blue-700'>
                                                    Edit
                                                </button>
                                            </Link>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                className='bg-red-600 px-8 py-2 rounded-lg text-white font-[600] hover:bg-red-700'>
                                                Hapus
                                            </button>
                                        </div>
                                        <h5 className="font-semibold mt-4">Komentar:</h5>
                                        <div className="mt-2">
                                            {comments.filter(comment => comment.product_id === product.id).map(comment => (
                                                <div key={comment.id} className="flex justify-between items-center border-b py-2">
                                                    <p>{comment.comment}</p>
                                                    <button
                                                        onClick={() => handleDeleteComment(comment.id)}
                                                        className='bg-red-600 px-4 py-2 text-[14px] rounded-lg text-white font-[600] hover:bg-red-700'>
                                                        Hapus
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
