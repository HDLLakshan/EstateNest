import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Navbar from './ui/navbar';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata: Metadata = {
  title: 'EstateNest',
  description: 'Tea Estate',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main>
          <div className="max-w-[77rem] min-h-[calc(100vh-70px)] mx-auto border-solid border-2 border-t-0  border-gray-200 dark:border-gray-600 p-4">
            {children}
          </div>
        </main>
        <ToastContainer />
      </body>
    </html>
  );
}
