'use client'

import { ConnectButton } from '@rainbow-me/rainbowkit'

export function Header() {
  return (
    <header className="flex items-center justify-between p-6">
      <h1 className="text-2xl font-bold text-foreground">GovAI</h1>
      <ConnectButton />
    </header>
  )
}

