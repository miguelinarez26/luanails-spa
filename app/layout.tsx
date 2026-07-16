import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'LuaNails Spa',
  description: 'Spa de uñas',
}

import { WhatsAppWidget } from '../src/components/WhatsAppWidget'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body>
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  )
}
