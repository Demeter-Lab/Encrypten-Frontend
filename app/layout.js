import { Inter } from 'next/font/google'
import './globals.css'
import { Web3ModalProvider } from '../context/Web3Modal';


export const metadata = {
  title: 'Encrypten',
  description: 'Encrypten - Voting with hidden votes until round completes',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        <Web3ModalProvider>{children}</Web3ModalProvider>
      </body>
    </html>
  )
}