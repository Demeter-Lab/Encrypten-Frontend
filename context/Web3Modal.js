'use client'

import { createWeb3Modal, defaultConfig } from '@web3modal/ethers/react'

// 1. Get projectId at https://cloud.walletconnect.com
const projectId = '9a4b5a26abe0f8427056e21b695a2cf6'

// 2. Set chains
const tenTestnet = {
  chainId: 443,
  name: 'Ten Testnet',
  currency: 'ETH',
  explorerUrl: 'https://testnet.tenscan.io',
  rpcUrl: 'https://cloudflare-eth.com'
}

// 3. Create modal
const metadata = {
  name: 'Encrypten',
  description: 'Encrypten - Voting with hidden votes until round completes',
  url: 'https://encrypten.xyz', 
  icons: ['https://avatars.mywebsite.com/']
}

createWeb3Modal({
  ethersConfig: defaultConfig({ metadata }),
  chains: [tenTestnet],
  includeWalletIds: [
    'c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96',
    '4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0'
  ],
  projectId,
  enableAnalytics: true // Optional - defaults to your Cloud configuration
})

export function Web3ModalProvider({ children }) {
  return children
}