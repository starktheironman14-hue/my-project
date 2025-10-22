// Landing page with CTA and demo audio player
'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [audioError, setAudioError] = useState(false)

  const handlePlayDemo = async () => {
    try {
      setAudioError(false)
      
      // Create a simple demo using Web Audio API
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)()
      
      if (isPlaying) {
        setIsPlaying(false)
        return
      }
      
      // Create a simple melody for demo
      const playTone = (frequency: number, startTime: number, duration: number) => {
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        
        oscillator.frequency.setValueAtTime(frequency, startTime)
        oscillator.type = 'sine'
        
        gainNode.gain.setValueAtTime(0, startTime)
        gainNode.gain.linearRampToValueAtTime(0.2, startTime + 0.01)
        gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + duration)
        
        oscillator.start(startTime)
        oscillator.stop(startTime + duration)
      }
      
      // Play a simple melody
      const now = audioContext.currentTime
      playTone(523, now, 0.3)      // C5
      playTone(659, now + 0.3, 0.3) // E5
      playTone(784, now + 0.6, 0.3) // G5
      playTone(1047, now + 0.9, 0.5) // C6
      
      setIsPlaying(true)
      setTimeout(() => setIsPlaying(false), 1500)
      
    } catch (error) {
      console.error('Audio playback failed:', error)
      setAudioError(true)
      setIsPlaying(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-2xl mx-auto text-center">
        <h1 className="text-5xl font-bold text-gray-900 mb-6">
          Voice Transcribe
        </h1>
        <p className="text-xl text-gray-600 mb-4">
          Transform your audio into accurate text with AI-powered transcription
        </p>
        
        {/* Sample Transcription Preview */}
        <div className="bg-gray-50 border-l-4 border-blue-500 p-4 mb-8 text-left max-w-lg mx-auto">
          <p className="text-sm text-gray-500 mb-1">Sample Output:</p>
          <p className="text-gray-700 italic">
            "Hello, this is a sample transcription of spoken audio. 
            The AI converts speech to text with high accuracy..."
          </p>
        </div>
        
        <div className="space-y-6">
          {/* Demo Audio Section */}
          <div className="bg-white p-6 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Try Demo Audio</h3>
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={handlePlayDemo}
                disabled={audioError}
                className={`${
                  audioError 
                    ? 'bg-gray-400 cursor-not-allowed' 
                    : 'bg-blue-600 hover:bg-blue-700'
                } text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center space-x-2`}
              >
                <span>{isPlaying ? '⏸️ Stop' : '▶️ Play'} Demo</span>
              </button>
              
              {audioError && (
                <span className="text-red-500 text-sm">Audio not available</span>
              )}
            </div>
            
            <p className="text-sm text-gray-500 mt-2">
              Demo: Simple audio tone sequence
            </p>
          </div>
          
          {/* Main CTA */}
<div className="space-y-4">
  <Link href="/transcribe">
    <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg">
      🎤 Start Transcribing
    </button>
  </Link>
  
  <Link href="/translate">
    <button className="bg-purple-600 hover:bg-purple-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors shadow-lg">
      🌍 Language Translator
    </button>
  </Link>
</div>

          
          {/* Features Preview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl mb-2">🎯</div>
              <h4 className="font-semibold">Accurate</h4>
              <p className="text-sm text-gray-600">AI-powered transcription</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl mb-2">⚡</div>
              <h4 className="font-semibold">Fast</h4>
              <p className="text-sm text-gray-600">Real-time processing</p>
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <div className="text-2xl mb-2">🔒</div>
              <h4 className="font-semibold">Secure</h4>
              <p className="text-sm text-gray-600">Privacy protected</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}