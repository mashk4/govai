'use client'

import { useState, useRef, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface ProposalInfoModalProps {
  isOpen: boolean
  onClose: () => void
  proposal: {
    title: string
    fullDescription: string
  }
}

type VoteOption = 'for' | 'against' | 'abstain'

export function ProposalInfoModal({ isOpen, onClose, proposal }: ProposalInfoModalProps) {
  const [selectedVote, setSelectedVote] = useState<VoteOption | null>(null)
  const [isExpanded, setIsExpanded] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [showViewMore, setShowViewMore] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setIsExpanded(false);
      setSelectedVote(null)

      const checkOverflow = () => {
        if (contentRef.current) {
          const hasOverflow = contentRef.current.scrollHeight > 200
          setShowViewMore(hasOverflow)
        }
      }

      checkOverflow()

      const timer = setTimeout(checkOverflow, 100)

      return () => clearTimeout(timer)
    }
  }, [isOpen])

  const handleVote = () => {
    if (!selectedVote) return
    console.log('Voted:', selectedVote)
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white max-w-2xl p-0 overflow-hidden">
        <DialogHeader className="p-6 pb-0">
          <DialogTitle className="text-2xl font-bold">{proposal.title}</DialogTitle>
        </DialogHeader>
        <div className="p-6 space-y-6 max-h-[calc(80vh-100px)] overflow-y-auto">
          <div
            ref={contentRef}
            className={`space-y-4 ${isExpanded ? '' : 'max-h-[200px] overflow-hidden relative'}`}
          >
            {proposal.fullDescription.split('\n\n').map((paragraph, index) => (
              <p key={index} className="text-gray-300">{paragraph}</p>
            ))}
            {!isExpanded && showViewMore && (
              <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-zinc-900 to-transparent" />
            )}
          </div>
          {showViewMore && (
            <button
              className="text-green-400 p-0 bg-transparent hover:bg-transparent hover:text-green-300 transition-colors duration-200"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? "Show less" : "Show more"}
            </button>
          )}

          <div className="space-y-4">
            <h3 className="text-xl font-semibold">Cast your vote</h3>
            <div className="flex space-x-4">
              {(['for', 'against', 'abstain'] as const).map((option) => (
                <button
                  key={option}
                  className={`flex-1 py-2 px-4 rounded-full text-sm font-medium transition-colors ${selectedVote === option
                    ? option === 'for'
                      ? 'bg-green-600 text-white'
                      : option === 'against'
                        ? 'bg-red-600 text-white'
                        : 'bg-gray-600 text-white'
                    : 'bg-zinc-800 text-white hover:bg-zinc-700'
                    }`}
                  onClick={() => setSelectedVote(option)}
                >
                  {option.charAt(0).toUpperCase() + option.slice(1)}
                </button>
              ))}
            </div>
            <Button
              className={`w-full transition-colors ${selectedVote
                ? 'bg-white text-zinc-900 hover:bg-gray-200'
                : 'bg-gray-600 text-gray-300 hover:bg-gray-700'
                }`}
              size="lg"
              onClick={handleVote}
              disabled={!selectedVote}
            >
              Vote
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

