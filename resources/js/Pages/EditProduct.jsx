import React, { useState, useEffect } from "react";
import { useForm, Link } from "@inertiajs/react";
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from 'sweetalert2';

const EditProduct = ({ product }) => {
    const { data, setData, put, processing, errors } = useForm({
        nama: product.nama || "",
        deskripsi: product.deskripsi || "",
        harga: product.harga || "",
        link: product.link || "",
        img_Url: product.img_Url || "",
        kategori: product.kategori || "",
    });

    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(product.img_Url || ""); // Preview dari produk yang ada atau kosong
    const [isUploading, setIsUploading] = useState(false);

    // Update preview saat gambar dipilih
    useEffect(() => {
        if (image) {
            const imageURL = URL.createObjectURL(image);
            setImagePreview(imageURL);
        }
    }, [image]);

    const handleInputChange = (e) => {
        setData(e.target.name, e.target.value);
    };

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(selectedImage);
            uploadImage(selectedImage);
        }
    };

    const uploadImage = (selectedImage) => {
        setIsUploading(true);
        const storageRef = ref(storage, `products/${selectedImage.name}`);
        const uploadTask = uploadBytesResumable(storageRef, selectedImage);

        uploadTask.on(
            "state_changed",
            null,
            (error) => {
                console.error("Kesalahan saat mengupload:", error);
                Swal.fire("Gagal mengupload gambar", "Silakan coba lagi", "error");
                setIsUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setData("img_Url", downloadURL);
                setIsUploading(false);
                Swal.fire("Gambar berhasil diupload!", "Gambar telah diperbarui.", "success");
            }
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await put(`/products/${product.id}`, {
                ...data,
            });
            Swal.fire({
                title: 'Sukses!',
                text: 'Produk berhasil diperbarui!',
                icon: 'success',
                confirmButtonText: 'OK'
            }).then(() => {
                window.location.href = '/dashboard';
            });
        } catch (error) {
            console.error("Error updating product:", error);
            Swal.fire("Kesalahan", "Gagal memperbarui produk. Silakan coba lagi.", "error");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg lg:w-full w-[320px] my-16">
                <h2 className="text-2xl font-semibold mb-6 text-center">Edit Produk</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Nama Produk</label>
                        <input
                            type="text"
                            name="nama"
                            value={data.nama}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            value={data.deskripsi}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full h-28"
                            required
                        ></textarea>
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Harga</label>
                        <input
                            type="number"
                            name="harga"
                            value={data.harga}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Link Produk</label>
                        <input
                            type="url"
                            name="link"
                            value={data.link}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Kategori</label>
                        <input
                            type="text"
                            name="kategori"
                            value={data.kategori}
                            onChange={handleInputChange}
                            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Gambar Produk</label>
                        <input
                            type="file"
                            onChange={handleImageChange}
                            className="mt-1 w-full"
                            accept="image/*"
                        />
                        {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="Preview" className="w-full h-auto rounded-lg" />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        disabled={processing || isUploading}
                        className={`w-full p-2 rounded-md font-semibold text-white ${processing || isUploading ? "bg-gray-300" : "bg-blue-600 hover:bg-blue-700"} transition duration-300`}
                    >
                        {isUploading ? "Mengupload..." : "Update Produk"}
                    </button>
                </form>

                <Link href={route('dashboard')}>
                    <button className="w-full mt-4 p-2 rounded-md bg-red-600 text-white font-semibold">Batal</button>
                </Link>
            </div>
        </div>
    );
};

export default EditProduct;
