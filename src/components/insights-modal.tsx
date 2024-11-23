import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface InsightsModalProps {
  isOpen: boolean
  onClose: () => void
  proposalTitle: string
}

export function InsightsModal({ isOpen, onClose, proposalTitle }: InsightsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-zinc-900 text-white">
        <DialogHeader>
          <DialogTitle>AI Insights for {proposalTitle}</DialogTitle>
          <DialogDescription className="text-gray-400">
            Here are the AI-generated insights for this proposal...
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

