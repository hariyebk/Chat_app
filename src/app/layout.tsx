import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import {Toaster} from "react-hot-toast"
import AuthProvider from '../context/AuthProvider'
import AuthProtect from './AuthProtect'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Messenger clone',
  description: 'Messenger clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
              <AuthProvider>
                <Toaster />
                <AuthProtect>
                  {children}
                </AuthProtect>
              </AuthProvider>
        </body>
    </html>
  )
}
