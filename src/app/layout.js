import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'amberl ストレスフリーな美容師ライフ',
  description: '愛知県名古屋市緑区の美容室amberlの求人サイトです。',
}

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}