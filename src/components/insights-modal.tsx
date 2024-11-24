'use client'

import { useState, useRef, useEffect } from 'react'
import { X, Send } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { getResponseFromGPT } from "./chat"
interface InsightsModalProps {
  isOpen: boolean
  onClose: () => void
  proposalTitle: string
  proposal: object,
  proposals: object[],
}

interface Message {
  sender: 'user' | 'agent'
  content: string
}

export function InsightsModal({ isOpen, onClose, proposalTitle, proposal, allProposals }: InsightsModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'agent', content: "Hello, what would you like to find out?" }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '') return

    const newMessages = [
      ...messages,
      { sender: 'user', content: inputMessage } as Message
    ]
    setMessages(newMessages)
    const tempInputMessage = inputMessage;
    setInputMessage('')

    const response = await getResponseFromGPT(tempInputMessage) || "";
    setTimeout(() => {
      setMessages([...newMessages, { sender: 'agent', content: response }])
    }, 1000)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">AI Agents Insights: {proposalTitle}</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-6 flex flex-col h-[calc(80vh-100px)]">
          <div
            ref={scrollContainerRef}
            className="flex-grow overflow-y-auto space-y-4 pr-4"
          >
            {messages.map((message, index) => (
              <div key={index} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${message.sender === 'user' ? 'bg-green-600' : 'bg-zinc-800'}`}>
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex items-center space-x-2">
            <Input
              type="text"
              placeholder="Type your message..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-grow bg-zinc-800 text-white border-zinc-700"
            />
            <Button
              onClick={handleSendMessage}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Send className="h-4 w-4" />
              <span className="sr-only">Send message</span>
            </Button>
          </div>
        </div>
        <Button
          variant="ghost"
          className="absolute right-4 top-4 text-gray-400 hover:text-white"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </DialogContent>
    </Dialog>
  )
}

