import { Link } from '@inertiajs/react';

export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-gray-100 pt-6 sm:justify-center sm:pt-0">
            <div>
                <Link href="/">
                <h1 className='font-poppins text-[30px] font-[600] lg:mb-5 mb-0 lg:mt-0 mt-16'>Admin Login</h1>
                </Link>
            </div>

            <div className="mt-6 lg:w-full w-[300px] overflow-hidden bg-white px-6 py-4 shadow-md sm:max-w-md sm:rounded-lg">
                {children}
            </div>
        </div>
    );
}
