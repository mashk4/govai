'use client'

import { useState } from "react"
import { Header } from "../components/header"
import { ProposalCard } from "../components/proposal-card"
import { ProposalInfoModal } from "../components/proposal-info-modal"
import { InsightsModal } from "../components/insights-modal"

const proposals = [
  {
    id: 1,
    title: "Transition to Proof-of-Stake Consensus Mechanism",
    description: "The current Proof-of-Work mechanism, while reliable, has significant drawbacks, including high energy consumption and limited scalability. Transitioning to Proof-of-Stake would reduce the network's environmental impact and improve overall efficiency by eliminating the need for intensive computational power.",
    fullDescription: "The current Proof-of-Work mechanism, while reliable, has significant drawbacks, including high energy consumption and limited scalability. Transitioning to Proof-of-Stake would reduce the network's environmental impact and improve overall efficiency by eliminating the need for intensive computational power. This change would encourage a more decentralized and inclusive ecosystem, as token holders could participate in network validation by staking their assets.\n\nThis upgrade would require investment in infrastructure and robust community engagement to ensure a smooth transition. The process would include a test phase on a separate chain, thorough documentation, and training for stakeholders. Implementing Proof-of-Stake aligns the DAO with modern sustainability goals while enhancing security and operational effectiveness."
  },
  {
    id: 2,
    title: "Dynamic Transaction Fee Adjustment Mechanism",
    description: "The existing fixed transaction fee structure can lead to inefficiencies during fluctuating network usage. Implementing a dynamic fee adjustment system would allow transaction costs to automatically vary based on network activity.",
    fullDescription: "The existing fixed transaction fee structure can lead to inefficiencies during fluctuating network usage. Implementing a dynamic fee adjustment system would allow transaction costs to automatically vary based on network activity. During low activity periods, fees would drop to encourage usage, while higher activity periods would see moderate fee increases to manage congestion and maintain throughput.\n\nThis system would rely on a smart contract-driven fee oracle that monitors network conditions in real time, ensuring transparency and fairness. By balancing demand and incentivizing optimal network utilization, this mechanism benefits both users and the DAO treasury, creating a more resilient and adaptive ecosystem."
  },
  {
    id: 3,
    title: "Introducing Tiered Governance Token Voting Power",
    description: "Governance in its current form can disproportionately favor large token holders, which risks centralizing decision-making power. A tiered voting system would address this by granting additional voting weight to long-term token holders.",
    fullDescription: "Governance in its current form can disproportionately favor large token holders, which risks centralizing decision-making power. A tiered voting system would address this by granting additional voting weight to long-term token holders. This incentivizes commitment and fosters a stable community, discouraging speculative behavior that might undermine governance integrity.\n\nSuch a model ensures that governance power is distributed more equitably, rewarding contributors who demonstrate loyalty and alignment with the DAO's long-term vision. By aligning incentives, the DAO can strengthen its governance framework while empowering a broader range of participants."
  },
  {
    id: 4,
    title: "Establishing a DAO Insurance Fund for Smart Contract Risks",
    description: "The decentralized nature of the DAO exposes users to risks like smart contract vulnerabilities and exploits. To address this, an insurance fund can be established, sourced through a minimal percentage of transaction fees or a small allocation from the DAO treasury.",
    fullDescription: "The decentralized nature of the DAO exposes users to risks like smart contract vulnerabilities and exploits. To address this, an insurance fund can be established, sourced through a minimal percentage of transaction fees or a small allocation from the DAO treasury. This fund would provide compensation to affected users in the event of unexpected incidents, such as a hack or code error.\n\nA transparent governance process would oversee fund allocation, ensuring accountability and fairness. This initiative would enhance trust in the DAO by protecting stakeholders against unforeseen risks, making the ecosystem safer and more resilient."
  },
  {
    id: 5,
    title: "Implementing a Revenue-Sharing Model for DAO Contributors",
    description: "Active contributors are critical to the success of the DAO, but their efforts are often undervalued. By introducing a revenue-sharing model, the DAO could allocate a portion of its profits to reward members who contribute to governance, development, and other key activities.",
    fullDescription: "Active contributors are critical to the success of the DAO, but their efforts are often undervalued. By introducing a revenue-sharing model, the DAO could allocate a portion of its profits to reward members who contribute to governance, development, and other key activities. Rewards would be distributed proportionally based on measurable contributions, ensuring fairness and motivating engagement.\n\nThis model not only aligns incentives but also fosters a more collaborative community. Recognizing and rewarding active participation strengthens the DAO's operational efficiency and reinforces a sense of shared ownership among its members."
  }
]

export default function Home() {
  const [selectedProposal, setSelectedProposal] = useState<typeof proposals[0] | null>(null)
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false)
  const [isInsightsModalOpen, setIsInsightsModalOpen] = useState(false)

  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="hero"></div>
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

