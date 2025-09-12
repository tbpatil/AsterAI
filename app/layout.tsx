import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AsterAI - Revolutionary AI-Powered Document Analysis',
  description: 'Transform how you interact with content using intelligent lens technology. Analyze, summarize, and visualize any document with cutting-edge AI.',
  keywords: 'AI, document analysis, content summarization, lens technology, artificial intelligence, document processing',
  authors: [{ name: 'AsterAI Team' }],
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
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} bg-black text-white antialiased`} suppressHydrationWarning={true}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
