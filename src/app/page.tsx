'use client'

import { useState } from "react"
import { Header } from "../components/header"
import { ProposalCard } from "../components/proposal-card"
import { ProposalInfoModal } from "../components/proposal-info-modal"
import { InsightsModal } from "../components/insights-modal"

const proposals = [
  {
    id: 1,
    title: "Change consensus algorithm to POS",
    description: "We would like to Horem ipsum dolor sit amet, consectetur adipiscing elit... We would like to Horem ipsum dolor sit amet, consectetur adipiscing elit..."
  },
  {
    id: 2,
    title: "Change consensus algorithm to POS",
    description: "We would like to Horem ipsum dolor sit amet, consectetur adipiscing elit... We would like to Horem ipsum dolor sit amet, consectetur adipiscing elit..."
  },
  {
    id: 3,
    title: "Change consensus algorithm to POS",
    description: "We would like to Horem ipsum dolor sit amet, consectetur adipiscing elit... We would like to Horem ipsum dolor sit amet, consectetur adipiscing elit..."
  }
]

export default function Home() {
  const [selectedProposal, setSelectedProposal] = useState<typeof proposals[0] | null>(null)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isInsightsModalOpen, setIsInsightsModalOpen] = useState(false)

return (
  <div className="min-h-screen relative overflow-hidden">
    <div className="background"></div>
    <div className="content">
      <Header />
      <main className="flex-grow px-6 py-12">
        <h2 className="h4--scalingSize mb-8">Ongoing proposals</h2>
        <div className="space-y-6">
          {proposals.map((proposal) => (
            <ProposalCard
              key={proposal.id}
              number={proposal.id}
              title={proposal.title}
              description={proposal.description}
              onInfoClick={() => {
                setSelectedProposal(proposal)
                setIsInfoModalOpen(true)
              }}
              onInsightsClick={() => {
                setSelectedProposal(proposal)
                setIsInsightsModalOpen(true)
              }}
            />
          ))}
        </div>
      </main>
    </div>

    {selectedProposal && (
      <>
        <ProposalInfoModal
          isOpen={isInfoModalOpen}
          onClose={() => setIsInfoModalOpen(false)}
          proposal={selectedProposal}
        />
        <InsightsModal
          isOpen={isInsightsModalOpen}
          onClose={() => setIsInsightsModalOpen(false)}
          proposalTitle={selectedProposal.title}
        />
      </>
    )}
  </div>
)
}

