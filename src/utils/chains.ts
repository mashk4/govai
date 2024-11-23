import {
    type Chain
} from 'viem'

export const cypher_testnet = {
    id: 10111,
    name: 'Cypher Testnet',
    nativeCurrency: {
        name: 'DEAI',
        symbol: 'DEAI',
        decimals: 18
    },
    rpcUrls: {
        default: {
            http: ['https://testnet-rpc.cypher.z1labs.ai']
        },
    },
    blockExplorers
        : {
        default
            : {
            name: 'CypherScan', url
                : 'https://testnet.cypherscan.ai/'
        },
    },
    contracts: {},
} as const
