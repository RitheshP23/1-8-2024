import type { Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Navbar } from '@/components/Navbar';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quote Crafters',
  description: 'An app built by students of Bhavans Civil Lines.',
  icons: [
    {
      url: "/logo.jpeg",
      href: "/logo.jpeg"
    }
  ]
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={cn("h-full bg-slate-100", inter.className)}>
          <Navbar />

          <main className='pt-40 pb-20 bg-slate-100'>
            {children}
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
