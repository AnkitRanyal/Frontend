import { Inter } from 'next/font/google'
//import './globals.css'
import Link from 'next/link'
const inter = Inter({ subsets: ['latin'] })
import "../../public/style/style.css"
import { Providers } from '../../provider'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify'
export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"/>
      <script src="https://kit.fontawesome.com/bf6f8b9ffa.js" crossorigin="anonymous"></script>
      
      </head>
      <body className={inter.className}>
     <Providers>
      <ToastContainer></ToastContainer>
      {children}</Providers>
        </body>
    </html>
  )
}
