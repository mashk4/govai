import { ChevronRight } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface ProposalCardProps {
  number: number
  title: string
  description: string
  onInfoClick: () => void
  onInsightsClick: () => void
}

export function ProposalCard({ number, title, description, onInfoClick, onInsightsClick }: ProposalCardProps) {
  return (
    <div className="proposal-card">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <h3 className="proposal-title">
            {number}. {title}
          </h3>
          <p className="proposal-description">{description}</p>
        </div>
        <div className="flex items-center space-x-4">
          <Button
            variant="secondary"
            className="button button-secondary"
            onClick={onInsightsClick}
          >
            Get insights
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-primary hover:bg-primary/10"
            onClick={onInfoClick}
          >
            <ChevronRight className="h-6 w-6" />
            <span className="sr-only">View proposal details</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

