import React, { useState } from 'react';

const Contact = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const whatsappUrl = `https://wa.me/6281219538787?text=Nama:%20${encodeURIComponent(name)}%0A%0APesan:%20${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setName('');
    setMessage('');
  };

  return (
    <div className="flex flex-col items-center p-4 lg:mt-28 mt-10" id='contact'>
      <h2 className="lg:text-[40px] text-[33px] font-bold mb-4">Kontak Kami</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 lg:w-full w-[300px] max-w-[700px] lg:mt-6 mt-1">
        <input
          type="text"
          placeholder="Nama"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border focus:border-red-600 border-gray-300 p-2 rounded"
          required
        />
        <textarea
          placeholder="Pesan"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="border focus:border-red-600 border-gray-300 p-2 rounded h-[200px]"
          required
        />
        <button
          type="submit"
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
        >
          Kirim
        </button>
      </form>
    </div>
  );
};

export default Contact;
