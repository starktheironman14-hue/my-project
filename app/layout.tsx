// Root layout component with metadata and global styles
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Voice Transcribe - AI Speech Recognition & Language Translator',
  description: 'Free AI-powered voice transcription and language translator. Convert speech to text in real-time and translate between 13+ languages instantly. Works in Chrome, Edge browsers.',
  keywords: 'voice transcription, speech to text, language translator, AI transcription, real-time translation, speech recognition, voice converter',
  authors: [{ name: 'Voice Transcribe Team' }],
  creator: 'Voice Transcribe',
  publisher: 'Voice Transcribe',
  robots: 'index, follow',
  openGraph: {
    title: 'Voice Transcribe - AI Speech Recognition & Language Translator',
    description: 'Free AI-powered voice transcription and language translator. Convert speech to text in real-time.',
    url: 'https://voice-transcribe.vercel.app',
    siteName: 'Voice Transcribe',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Voice Transcribe - AI Speech Recognition',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Voice Transcribe - AI Speech Recognition & Language Translator',
    description: 'Free AI-powered voice transcription and language translator.',
    images: ['/og-image.png'],
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#8B5CF6',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}