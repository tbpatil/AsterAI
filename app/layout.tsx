import type { Metadata } from 'next'
import { Inter_Tight } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import ConditionalNavbar from '@/components/ConditionalNavbar'
import './globals.css'

const interTight = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-inter-tight',
})

export const metadata: Metadata = {
  title: 'AsterAI - Revolutionary AI-Powered Document Analysis',
  description: 'Transform how you interact with content using intelligent lens technology. Analyze, summarize, and visualize any document with cutting-edge AI.',
  keywords: 'AI, document analysis, content summarization, lens technology, artificial intelligence, document processing',
  authors: [{ name: 'AsterAI Team' }],
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.png', type: 'image/png' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'AsterAI - Revolutionary AI-Powered Document Analysis',
    description: 'Transform how you interact with content using intelligent lens technology.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="shortcut icon" href="/favicon.png" />
        <link rel="apple-touch-icon" href="/favicon.png" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Prevent scroll restoration on page reload
              if ('scrollRestoration' in history) {
                history.scrollRestoration = 'manual';
              }
              // Scroll to top on page load
              window.addEventListener('load', function() {
                window.scrollTo(0, 0);
              });
            `,
          }}
        />
      </head>
      <body className={`${interTight.className} bg-black text-white antialiased`} suppressHydrationWarning={true}>
        <ConditionalNavbar />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
