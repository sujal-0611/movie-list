
// app/layout.js
import './globals.css'

export const metadata = {
  title: 'Movie List',
  description: 'A simple movie list application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}



