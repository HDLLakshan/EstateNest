'use client';
import { usePathname } from 'next/navigation';
import Logout from '../components/auth/Logout';

export default function Navbar() {
  const pathname = usePathname();

  const hideNavbarRoutes = ['/'];

  const showNavbar = !hideNavbarRoutes.includes(pathname);

  if (!showNavbar) return null;

  return (
    <nav className="bg-white dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="/estatenest1.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            EstateNest
          </span>
        </div>
        <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
          <Logout />
        </div>
      </div>
    </nav>
  );
}
