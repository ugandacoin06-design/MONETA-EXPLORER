export interface BlockItem {
  height: number;
  hash: string;
  txCount: number;
  validator: string;
  size: string;
  time: string;
  timestamp: string;
  gasUsed: string;
  gasLimit: string;
  status: 'confirmed' | 'pending';
}

export interface TransactionItem {
  hash: string;
  from: string;
  to: string;
  amount: string;
  fee: string;
  time: string;
  timestamp: string;
  block: number;
  nonce: number;
  status: 'success' | 'pending' | 'failed';
  tokenSymbol?: string;
}

export interface ValidatorItem {
  id: string;
  name: string;
  address: string;
  status: 'active' | 'inactive';
  blocks: number;
  uptime: string;
  votingPower: string;
  reputation: number;
  commission: string;
  totalStaked: string;
}

export interface TokenItem {
  name: string;
  symbol: string;
  type: string;
  decimals: number;
  totalSupply: string;
  circulating: string;
  price: string;
  change24h?: string;
  holders: number;
  contract: string;
  description: string;
  peg?: string;
  collateralRatio?: string;
}

export const LATEST_BLOCKS: BlockItem[] = [
  { 
    height: 1459203, 
    hash: '0x3f5ca982e041e48f729bb9c4a896d8e23f044d08129a738c8241b712c7519a2b', 
    txCount: 142, 
    validator: 'MonetaNode-01', 
    size: '25.4 KB', 
    time: '12s ago',
    timestamp: '2026-05-24 12:46:12 UTC',
    gasUsed: '1,248,910',
    gasLimit: '15,000,000',
    status: 'confirmed' 
  },
  { 
    height: 1459202, 
    hash: '0x8b1a457c0e86b245fd3971c08d9e79435b80a13876cd64fa915a78214fa84f3e', 
    txCount: 89, 
    validator: 'Consortium-Alpha', 
    size: '18.2 KB', 
    time: '24s ago',
    timestamp: '2026-05-24 12:46:00 UTC',
    gasUsed: '840,120',
    gasLimit: '15,000,000',
    status: 'confirmed' 
  },
  { 
    height: 1459201, 
    hash: '0x1c9d74998274ac4df50ae80ef025ebca971cbb70094b8e0186120593b4f62e1f', 
    txCount: 215, 
    validator: 'MonetaNode-03', 
    size: '32.1 KB', 
    time: '36s ago',
    timestamp: '2026-05-24 12:45:48 UTC',
    gasUsed: '2,150,440',
    gasLimit: '15,000,000',
    status: 'confirmed' 
  },
  { 
    height: 1459200, 
    hash: '0x9e4fd9128a1c8f4756209b1836e4b47ac908381289fe000980bb6e541a2b3c4d', 
    txCount: 56, 
    validator: 'Partner-Gov', 
    size: '12.8 KB', 
    time: '48s ago',
    timestamp: '2026-05-24 12:45:36 UTC',
    gasUsed: '512,300',
    gasLimit: '15,000,000',
    status: 'confirmed' 
  },
  { 
    height: 1459199, 
    hash: '0x2a3b8c9d00928f6236bbd12975816da0183bce4901968d9047bca89104f98c9d', 
    txCount: 198, 
    validator: 'MonetaNode-02', 
    size: '30.0 KB', 
    time: '1m ago',
    timestamp: '2026-05-24 12:45:24 UTC',
    gasUsed: '1,990,000',
    gasLimit: '15,000,000',
    status: 'confirmed' 
  },
];

export const LATEST_TRANSACTIONS: TransactionItem[] = [
  { 
    hash: '0xa1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d', 
    from: '0x71C8360537aaC1bFa199C96dd3007049Abf1973E', 
    to: '0x82D46944eFeF169c62A3a2336D04C0560a2c451A', 
    amount: '1,250 MNTA', 
    fee: '0.0012 MNTA', 
    time: '12s ago',
    timestamp: '2026-05-24 12:46:12 UTC',
    block: 1459203,
    nonce: 142,
    status: 'success',
    tokenSymbol: 'MNTA'
  },
  { 
    hash: '0xb2c3d4e5f6a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e', 
    from: '0x99B167520e53a99E256F8e93Ab1F1864a789124C', 
    to: '0x33A535c593E9Ea65759160537C9081e6F37b765B', 
    amount: '4,500 MINT', 
    fee: '0.0008 MNTA', 
    time: '18s ago',
    timestamp: '2026-05-24 12:46:06 UTC',
    block: 1459203,
    nonce: 88,
    status: 'success',
    tokenSymbol: 'MINT'
  },
  { 
    hash: '0xc3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f', 
    from: '0x21F890a8274bc361a8080bc40f98319abcc8889D', 
    to: '0x44E2019483017cb83629471f00847921a910231F', 
    amount: '10,000 MNTA', 
    fee: '0.0020 MNTA', 
    time: '21s ago',
    timestamp: '2026-05-24 12:46:03 UTC',
    block: 1459202,
    nonce: 312,
    status: 'pending',
    tokenSymbol: 'MNTA'
  },
  { 
    hash: '0xd4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f60718293a4b5c6d7e8f901a', 
    from: '0x55C908172938164098192a83018247910293332A', 
    to: '0x11B382910485918237462019283746192839998E', 
    amount: '250 USDC', 
    fee: '0.0010 MNTA', 
    time: '34s ago',
    timestamp: '2026-05-24 12:45:50 UTC',
    block: 1459201,
    nonce: 9,
    status: 'success',
    tokenSymbol: 'USDC'
  },
  { 
    hash: '0xe5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f60718293a4b5c', 
    from: '0x88D392019283746192083948572019283744455B', 
    to: '0x22C918273645192837465918273645192831112C', 
    amount: '0.5 wBTC', 
    fee: '0.0015 MNTA', 
    time: '45s ago',
    timestamp: '2026-05-24 12:45:39 UTC',
    block: 1459200,
    nonce: 67,
    status: 'failed',
    tokenSymbol: 'wBTC'
  },
];

export const VALIDATORS: ValidatorItem[] = [
  { 
    id: 'val_01', 
    name: 'MonetaNode-01', 
    address: '0x99B167520e53a99E256F8e93Ab1F1864a789124C',
    status: 'active', 
    blocks: 145023, 
    uptime: '99.99%', 
    votingPower: '18.5%', 
    reputation: 98,
    commission: '2.5%',
    totalStaked: '18,500,000 MNTA'
  },
  { 
    id: 'val_02', 
    name: 'Consortium-Alpha', 
    address: '0x82D46944eFeF169c62A3a2336D04C0560a2c451A',
    status: 'active', 
    blocks: 132901, 
    uptime: '99.95%', 
    votingPower: '15.2%', 
    reputation: 95,
    commission: '3.0%',
    totalStaked: '15,200,000 MNTA'
  },
  { 
    id: 'val_03', 
    name: 'MonetaNode-02', 
    address: '0x71C8360537aaC1bFa199C96dd3007049Abf1973E',
    status: 'active', 
    blocks: 140500, 
    uptime: '99.98%', 
    votingPower: '16.0%', 
    reputation: 97,
    commission: '2.0%',
    totalStaked: '16,000,000 MNTA'
  },
  { 
    id: 'val_04', 
    name: 'Partner-Gov', 
    address: '0x33A535c593E9Ea65759160537C9081e6F37b765B',
    status: 'active', 
    blocks: 95200, 
    uptime: '99.50%', 
    votingPower: '10.5%', 
    reputation: 90,
    commission: '4.0%',
    totalStaked: '10,500,000 MNTA'
  },
  { 
    id: 'val_05', 
    name: 'Global-Trust', 
    address: '0x44E2019483017cb83629471f00847921a910231F',
    status: 'inactive', 
    blocks: 45000, 
    uptime: '85.20%', 
    votingPower: '4.1%', 
    reputation: 72,
    commission: '5.0%',
    totalStaked: '4,100,000 MNTA'
  },
  { 
    id: 'val_06', 
    name: 'MonetaNode-03', 
    address: '0x21F890a8274bc361a8080bc40f98319abcc8889D',
    status: 'active', 
    blocks: 138000, 
    uptime: '99.97%', 
    votingPower: '14.8%', 
    reputation: 96,
    commission: '2.5%',
    totalStaked: '14,800,000 MNTA'
  },
];

export const TOKENS: TokenItem[] = [
  {
    name: 'MONETA Native Token',
    symbol: 'MNTA',
    type: 'Native Gas & Governance',
    decimals: 18,
    totalSupply: '1,000,000,000 MNTA',
    circulating: '420,000,000 MNTA',
    price: '$4.85 USD',
    change24h: '+3.4%',
    holders: 14820,
    contract: '0x0000000000000000000000000000000000000001',
    description: 'The native utility, gas fee payment, and validator staking token of MONETA Chain.'
  },
  {
    name: 'MONETA Mint Stablecoin',
    symbol: 'MINT',
    type: 'Algorithmic Consortium Stablecoin',
    decimals: 6,
    totalSupply: '78,500,000 MINT',
    circulating: '78,500,000 MINT',
    price: '$1.00 USD',
    peg: '1.0002 USD',
    collateralRatio: '142%',
    holders: 8310,
    contract: '0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D',
    description: 'Protocol-governed sovereign stable settlement unit pegged to USD for zero-slippage enterprise settlement.'
  },
  {
    name: 'USD Coin (Bridged)',
    symbol: 'USDC',
    type: 'Interoperability Stablecoin',
    decimals: 6,
    totalSupply: '52,400,000 USDC',
    circulating: '52,400,000 USDC',
    price: '$1.00 USD',
    holders: 6190,
    contract: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
    description: 'Bridged Circle USD Coin secured by the MONETA Cross-Chain Validator Gateway.'
  },
  {
    name: 'Wrapped Bitcoin',
    symbol: 'wBTC',
    type: 'Interoperability Asset',
    decimals: 8,
    totalSupply: '1,250 wBTC',
    circulating: '1,250 wBTC',
    price: '$89,450.00 USD',
    change24h: '+1.8%',
    holders: 1940,
    contract: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599',
    description: '1:1 Bitcoin representation bridged into the MONETA EVM-compatible execution layer.'
  },
  {
    name: 'Consortium Credit Settlement',
    symbol: 'M-CRED',
    type: 'Permissioned Token',
    decimals: 18,
    totalSupply: '250,000,000 M-CRED',
    circulating: '194,000,000 M-CRED',
    price: 'Fixed Par ($1.00)',
    holders: 48,
    contract: '0x5FbDB2315678afecb367f032d93F642f64180aa3',
    description: 'Role-gated liquidity credit facility used by verified consortium members for instant gross settlement.'
  }
];

export const GOVERNANCE_PROPOSALS = [
  { id: 'MIP-42', title: 'Increase Block Gas Target to 20M', status: 'active', yes: 65, no: 20, abstain: 15, deadline: '2 days', creator: 'Consortium-Alpha' },
  { id: 'MIP-41', title: 'Reduce Base Transaction Fee by 10%', status: 'passed', yes: 85, no: 10, abstain: 5, deadline: 'Ended', creator: 'MonetaNode-01' },
  { id: 'MIP-40', title: 'Add New Consortium Validator Node', status: 'rejected', yes: 30, no: 60, abstain: 10, deadline: 'Ended', creator: 'Partner-Gov' },
];

export const CHART_DATA = [
  { time: '00:00', tps: 120, volume: 4000, gas: 18.2 },
  { time: '04:00', tps: 150, volume: 5000, gas: 21.4 },
  { time: '08:00', tps: 200, volume: 7500, gas: 28.6 },
  { time: '12:00', tps: 350, volume: 12000, gas: 36.1 },
  { time: '16:00', tps: 280, volume: 9000, gas: 31.0 },
  { time: '20:00', tps: 190, volume: 6000, gas: 24.5 },
  { time: '24:00', tps: 140, volume: 4500, gas: 19.8 },
];

export const RPC_METHODS = [
  {
    name: 'moneta_getBlockByNumber',
    desc: 'Returns information about a block by block height number.',
    params: '["1459203", true]',
    returns: '{ height: 1459203, hash: "0x3f5c...", parentHash: "0x8b1a...", txCount: 142, validator: "MonetaNode-01", ... }'
  },
  {
    name: 'moneta_getBlockByHash',
    desc: 'Returns information about a block by cryptographic block hash.',
    params: '["0x3f5ca982...9a2b", true]',
    returns: '{ height: 1459203, hash: "0x3f5ca9...", transactions: [...], timestamp: 1748090772 }'
  },
  {
    name: 'moneta_getTransactionByHash',
    desc: 'Returns the transaction details for a specified transaction hash.',
    params: '["0xa1b2c3d4...5c6d"]',
    returns: '{ hash: "0xa1b2c...", from: "0x71C...", to: "0x82D...", value: "0x44b82fa09b0000", blockNumber: "0x16447b" }'
  },
  {
    name: 'moneta_getBalance',
    desc: 'Returns the balance of the account of given address.',
    params: '["0x71C8360537aaC1bFa199C96dd3007049Abf1973E", "latest"]',
    returns: '"0x2b5e3af16b1880000" (12,500 MNTA in wei)'
  },
  {
    name: 'moneta_sendRawTransaction',
    desc: 'Creates new message call transaction or a contract creation for signed transaction.',
    params: '["0xf86c018504a817c80082520894..."]',
    returns: '"0xa1b2c3d4e5f60718293a4b5c6d7e8f901a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d"'
  },
  {
    name: 'moneta_getValidators',
    desc: 'Returns the list of active consortium validator nodes and their current voting weights.',
    params: '[]',
    returns: '[{ id: "val_01", address: "0x99B1...", votingPower: 18.5, status: "active" }, ...]'
  },
  {
    name: 'moneta_getTokenSupply',
    desc: 'Returns the circulating and total supply for native and consortium tokens (MNTA, MINT, etc.).',
    params: '["MINT"]',
    returns: '{ symbol: "MINT", totalSupply: "78500000000000", circulating: "78500000000000", decimals: 6 }'
  }
];

export const NETWORK_INFO = {
  chainId: '0x4d4e',
  chainIdDecimal: 19790,
  networkName: 'MONETA Chain Devnet / Testnet',
  isSimulated: true,
  consensus: 'Proof of Authority + Privacy Rollup (Consortium PBFT)',
  blockTime: '2.4s',
  averageTps: '350',
  currentBlock: 1459203,
  activeValidators: 42,
  totalValidators: 50,
  nativeCurrency: {
    name: 'MONETA',
    symbol: 'MNTA',
    decimals: 18
  }
};
