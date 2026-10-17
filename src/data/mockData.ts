export const LATEST_BLOCKS = [
  { height: 1459203, hash: '0x3f5c...9a2b', txCount: 142, validator: 'MonetaNode-01', size: '25 KB', time: '12s ago', status: 'confirmed' },
  { height: 1459202, hash: '0x8b1a...4f3e', txCount: 89, validator: 'Consortium-Alpha', size: '18 KB', time: '24s ago', status: 'confirmed' },
  { height: 1459201, hash: '0x1c9d...2e1f', txCount: 215, validator: 'MonetaNode-03', size: '32 KB', time: '36s ago', status: 'confirmed' },
  { height: 1459200, hash: '0x9e4f...1a2b', txCount: 56, validator: 'Partner-Gov', size: '12 KB', time: '48s ago', status: 'confirmed' },
  { height: 1459199, hash: '0x2a3b...8c9d', txCount: 198, validator: 'MonetaNode-02', size: '30 KB', time: '1m ago', status: 'confirmed' },
];

export const LATEST_TRANSACTIONS = [
  { hash: '0xa1b2c3d4...e5f6', from: '0x71C...973E', to: '0x82D...451A', amount: '1,250 MNT', fee: '0.001 MNT', time: '12s ago', status: 'success' },
  { hash: '0xb2c3d4e5...f6a1', from: '0x99B...124C', to: '0x33A...765B', amount: '45.5 MNT', fee: '0.001 MNT', time: '18s ago', status: 'success' },
  { hash: '0xc3d4e5f6...a1b2', from: '0x21F...889D', to: '0x44E...231F', amount: '10,000 MNT', fee: '0.002 MNT', time: '21s ago', status: 'pending' },
  { hash: '0xd4e5f6a1...b2c3', from: '0x55C...332A', to: '0x11B...998E', amount: '0.1 MNT', fee: '0.001 MNT', time: '34s ago', status: 'success' },
  { hash: '0xe5f6a1b2...c3d4', from: '0x88D...445B', to: '0x22C...112C', amount: '500 MNT', fee: '0.001 MNT', time: '45s ago', status: 'failed' },
];

export const VALIDATORS = [
  { id: 'val_01', name: 'MonetaNode-01', status: 'active', blocks: 145023, uptime: '99.99%', votingPower: '18.5%', reputation: 98 },
  { id: 'val_02', name: 'Consortium-Alpha', status: 'active', blocks: 132901, uptime: '99.95%', votingPower: '15.2%', reputation: 95 },
  { id: 'val_03', name: 'MonetaNode-02', status: 'active', blocks: 140500, uptime: '99.98%', votingPower: '16.0%', reputation: 97 },
  { id: 'val_04', name: 'Partner-Gov', status: 'active', blocks: 95200, uptime: '99.50%', votingPower: '10.5%', reputation: 90 },
  { id: 'val_05', name: 'Global-Trust', status: 'inactive', blocks: 45000, uptime: '85.20%', votingPower: '4.1%', reputation: 72 },
  { id: 'val_06', name: 'MonetaNode-03', status: 'active', blocks: 138000, uptime: '99.97%', votingPower: '14.8%', reputation: 96 },
];

export const GOVERNANCE_PROPOSALS = [
  { id: 'MIP-42', title: 'Increase Block Size Limit to 4MB', status: 'active', yes: 65, no: 20, abstain: 15, deadline: '2 days', creator: 'Consortium-Alpha' },
  { id: 'MIP-41', title: 'Reduce Base Transaction Fee by 10%', status: 'passed', yes: 85, no: 10, abstain: 5, deadline: 'Ended', creator: 'MonetaNode-01' },
  { id: 'MIP-40', title: 'Add New Consortium Member (Global-Trust)', status: 'rejected', yes: 30, no: 60, abstain: 10, deadline: 'Ended', creator: 'Partner-Gov' },
];

export const CHART_DATA = [
  { time: '00:00', tps: 120, volume: 4000 },
  { time: '04:00', tps: 150, volume: 5000 },
  { time: '08:00', tps: 200, volume: 7500 },
  { time: '12:00', tps: 350, volume: 12000 },
  { time: '16:00', tps: 280, volume: 9000 },
  { time: '20:00', tps: 190, volume: 6000 },
  { time: '24:00', tps: 140, volume: 4500 },
];
