import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 text-gray-900">
        {children}
      </body>
    </html>
  )
}