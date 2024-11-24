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
import OpenAI from "openai"
import { getResponseFromGpt } from './chat'

interface InsightsModalProps {
  isOpen: boolean
  onClose: () => void
  proposalTitle: string
}

interface Message {
  role: 'user' | 'assistant'
  content: string
}

// console.log(process.env?.OPENAI_API_KEY || "Not found wtf");
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY || "",
//   dangerouslyAllowBrowser: true
// });

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function InsightsModal({ isOpen, onClose, proposalTitle }: InsightsModalProps) {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hey there! What would you like to find out?" }
  ])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleSendMessage = async () => {
    if (inputMessage.trim() === '' || isLoading) return

    setMessages(prevMessages => [...prevMessages, { role: 'user', content: inputMessage }])
    setInputMessage('')
    setIsLoading(true)

    try {
      // const thread = await openai.beta.threads.create();

      // await openai.beta.threads.messages.create(
      //   thread.id,
      //   {
      //     role: "user",
      //     content: inputMessage
      //   }
      // );

      // let run = await openai.beta.threads.runs.createAndPoll(
      //   thread.id,
      //   {
      //     assistant_id: "asst_kyZZu1t3NiYdfGVDvpk6cdYZ",
      //   },
      // );

      // const newMessages = await openai.beta.threads.messages.list(
      //   run.thread_id
      // );

      // const assistantMessages = newMessages.data
      //   .filter(message => message.role === 'assistant')
      //   .map(message => ({
      //     role: message.role,
      //     content: message.content[0].type === 'text' ? message.content[0].text.value : ''
      //   }));

      // const body = JSON.stringify({ message: inputMessage })
      // const chatResponse = await fetch("/api/chat", { method: "POST", body })
      const assistantMessages = await getResponseFromGpt(inputMessage);
      // const assistantMessages: Message[] = [{ role: 'assistant', content: chatResponse }]

      setMessages(prevMessages => [...prevMessages, ...assistantMessages]);
    } catch (error) {
      console.error('Error in API call:', error);
      setMessages(prevMessages => [
        ...prevMessages,
        { role: 'assistant', content: "I'm sorry, I encountered an error while processing your request." }
      ]);
    } finally {
      setIsLoading(false)
    }
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
              <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[70%] p-3 rounded-lg ${message.role === 'user' ? 'bg-green-600' : 'bg-zinc-800'}`}>
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
              disabled={isLoading}
            />
            <Button
              onClick={handleSendMessage}
              className="bg-green-600 hover:bg-green-700 text-white"
              disabled={isLoading}
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

