import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ThumbnailTV - AI-Powered TV Optimization Suite',
  description: 'Stop losing views on TV screens. Optimize your YouTube thumbnails for Smart TVs where 73% of views happen.',
  keywords: ['youtube', 'thumbnails', 'tv optimization', 'ai', 'content creator', '4k', 'smart tv'],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
