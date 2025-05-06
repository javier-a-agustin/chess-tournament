import './globals.css'

export const metadata = {
  title: "Chess Tournament",
  description: "A full-stack chess tournament management application built Django + NextJS and docker.",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
