import React, { useState } from "react";
import { Head, useForm, Link } from "@inertiajs/react";
import { storage } from "./firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Swal from "sweetalert2";

const AddProduct = () => {
    const { data, setData, post, processing, errors } = useForm({
        nama: "",
        deskripsi: "",
        harga: "",
        link: "",
        img_Url: "",
        kategori: "",
    });

    const [image, setImage] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

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
                Swal.fire({
                    icon: 'error',
                    title: 'Gagal Mengupload',
                    text: 'Gagal mengupload gambar. Silakan coba lagi.',
                });
                setIsUploading(false);
            },
            async () => {
                const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                setData("img_Url", downloadURL);
                setIsUploading(false);
            }
        );
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        post("/products", { ...data });

        Swal.fire({
            icon: 'success',
            title: 'Berhasil!',
            text: 'Produk berhasil ditambahkan!',
        });

        setData({
            nama: "",
            deskripsi: "",
            harga: "",
            link: "",
            img_Url: "",
            kategori: "",
        });
        setImage(null);
    };

    return (
        <div className="flex bg-gray-100 my-20">
            <Head title="AddProduct" />
            <div className="flex lg:flex-row flex-col justify-center items-center h-screen w-full lg:gap-0 gap-8 ">
                <div className="flex justify-center items-center lg:w-1/3 w-[250px] lg:mr-4 mr-0 lg:mt-0 mt-[90%] bg-white rounded-lg p-4">
                    {image ? (
                        <img
                            src={URL.createObjectURL(image)}
                            alt="Preview"
                            className="w-full h-auto rounded-lg shadow-lg"
                        />
                    ) : (
                        <div className="text-center text-gray-400">No image here</div>
                    )}
                </div>
                <form
                    onSubmit={handleSubmit}
                    className="bg-white p-8 rounded-lg shadow-lg lg:w-full w-[320px] max-w-md"
                >
                    <h2 className="text-2xl font-semibold mb-6 text-center">Tambah Produk</h2>
                    <input
                        type="text"
                        name="nama"
                        placeholder="Nama Produk"
                        value={data.nama}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <textarea
                        name="deskripsi"
                        placeholder="Deskripsi"
                        value={data.deskripsi}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full h-24 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                    <input
                        type="number"
                        name="harga"
                        placeholder="Harga"
                        value={data.harga}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="url"
                        name="link"
                        placeholder="Link Produk"
                        value={data.link}
                        onChange={handleInputChange}
                        required    
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        name="kategori"
                        placeholder="Kategori"
                        value={data.kategori}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                        type="text"
                        placeholder="Link Gambar (otomatis terbuat)"
                        value={data.img_Url}
                        readOnly
                        className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none"
                    />
                    <input
                        type="file"
                        onChange={handleImageChange}
                        accept="image/*"
                        className="mb-4 w-full"
                        required
                    />
                    <button
                        type="submit"
                        disabled={processing || isUploading}
                        className={`w-full p-2 rounded-md font-semibold ${
                            processing || isUploading
                                ? "bg-gray-300 cursor-not-allowed"
                                : "bg-blue-600 hover:bg-blue-700"
                        } text-white transition duration-300`}
                    >
                        {isUploading
                            ? "Menambahkan gambar..."
                            : processing
                            ? "Menambahkan..."
                            : "Tambah Produk"}
                    </button>
                    <Link href={route("dashboard")}>
                        <button className="w-full p-2 mt-4 rounded-md font-semibold bg-red-600 hover:bg-red-700 text-white">
                            Keluar
                        </button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default AddProduct;
