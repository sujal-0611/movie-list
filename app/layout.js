// app/layout.js
import './globals.css'

export const metadata = {
  title: 'Movie List',
  description: 'A simple movie list application',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="min-h-screen flex flex-col">
          <main className="flex-grow">
            {children}
          </main>
          <footer className="bg-gray-800 text-white text-center p-4">
            © Sujal Sharma. All Rights Reserved
          </footer>
        </div>
      </body>
    </html>
  )
}
