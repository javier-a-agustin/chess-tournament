import './globals.css'

export const metadata = {
  title: "Diamond Login Page",
  description: "A stylish diamond-shaped login page",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
