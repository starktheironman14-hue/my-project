'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'

export default function TranscribePage() {
  const [isRecording, setIsRecording] = useState(false)
  const [transcription, setTranscription] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [speechSupported, setSpeechSupported] = useState(true)
  const recognitionRef = useRef<any>(null)

  const startSpeechRecognition = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setSpeechSupported(false)
      alert('Speech recognition is not supported in this browser. Please use Chrome or Edge.')
      return
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    
    recognition.continuous = true
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onstart = () => {
      setIsListening(true)
      setIsRecording(true)
    }

    recognition.onresult = (event: any) => {
      let finalTranscript = ''
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript
        if (event.results[i].isFinal) {
          finalTranscript += transcript + ' '
        }
      }
      if (finalTranscript) {
        setTranscription(prev => prev + finalTranscript)
      }
    }

    recognition.onerror = (event: any) => {
      console.error('Speech recognition error:', event.error)
      setIsListening(false)
      setIsRecording(false)
    }

    recognition.onend = () => {
      setIsListening(false)
      setIsRecording(false)
    }

    recognitionRef.current = recognition
    recognition.start()
  }

  const stopSpeechRecognition = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop()
      setIsListening(false)
      setIsRecording(false)
    }
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 bg-white/80 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-white/30">
          <Link href="/" className="group flex items-center space-x-3 text-violet-600 hover:text-violet-800 transition-all duration-300">
            <div className="p-2 rounded-full bg-violet-100 group-hover:bg-violet-200 transition-colors duration-200">←</div>
            <span className="font-semibold">Back to Home</span>
          </Link>
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-violet-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent">Voice Transcribe</h1>
            <p className="text-sm text-gray-600 mt-1 font-medium">AI-Powered Speech Recognition</p>
          </div>
          <div className="w-32"></div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/40">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Live Speech Recognition</h2>
              <div className="text-center">
                {!speechSupported && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
                    <div className="text-red-600 font-medium">⚠️ Speech recognition not supported. Please use Chrome or Edge browser.</div>
                  </div>
                )}
                
                <button
                  onClick={isRecording ? stopSpeechRecognition : startSpeechRecognition}
                  disabled={!speechSupported}
                  className={`${!speechSupported ? 'bg-gray-400 cursor-not-allowed' : isRecording ? 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700' : 'bg-gradient-to-r from-violet-500 to-purple-600 hover:from-violet-600 hover:to-purple-700'} text-white font-bold py-6 px-10 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-3 mx-auto`}
                >
                  <span className="text-2xl">{isRecording ? '⏹️' : '🎤'}</span>
                  <span className="text-lg">{isRecording ? 'Stop Listening' : 'Start Speaking'}</span>
                </button>
                
                {isListening && (
                  <div className="mt-6 p-4 bg-gradient-to-r from-red-50 to-pink-50 rounded-xl border border-red-200">
                    <div className="flex items-center justify-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                      <span className="text-red-600 font-semibold">Listening... Speak now!</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/90 backdrop-blur-sm p-8 rounded-2xl shadow-xl border border-white/40">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800">Transcription</h2>
                {transcription && (
                  <button onClick={() => setTranscription('')} className="text-red-500 hover:text-red-700 font-medium px-4 py-2 rounded-lg hover:bg-red-50 transition-all duration-200">🗑️ Clear</button>
                )}
              </div>
              
              <div className="min-h-[400px] border-2 border-gray-200 rounded-2xl p-6 bg-gradient-to-br from-gray-50 to-white">
                {transcription ? (
                  <textarea value={transcription} onChange={(e) => setTranscription(e.target.value)} className="w-full h-full min-h-[350px] bg-transparent border-none resize-none focus:outline-none text-gray-800 text-lg leading-relaxed" placeholder="Your transcription will appear here..." />
                ) : (
                  <div className="flex items-center justify-center h-full text-gray-400">
                    <div className="text-center">
                      <div className="text-6xl mb-4">🎙️</div>
                      <div className="text-xl font-medium">Ready to transcribe</div>
                      <div className="text-sm mt-2">Click "Start Speaking" to begin</div>
                    </div>
                  </div>
                )}
              </div>

              {transcription && (
                <div className="mt-6 flex gap-3">
                  <button onClick={() => navigator.clipboard.writeText(transcription)} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-xl font-medium transition-all duration-200 transform hover:scale-105 shadow-lg flex items-center space-x-2">
                    <span>📋</span><span>Copy Text</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
