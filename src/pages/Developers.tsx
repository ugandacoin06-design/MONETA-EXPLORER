import React, { useState } from 'react';
import { Code, Terminal, Database, Server, Copy, Check, Play, BookOpen, AlertTriangle } from 'lucide-react';
import { RPC_METHODS, NETWORK_INFO } from '../data/mockData';

export function Developers() {
  const [selectedMethod, setSelectedMethod] = useState(RPC_METHODS[0]);
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [isExecuting, setIsExecuting] = useState(false);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCode(id);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const executeRpcTest = () => {
    setIsExecuting(true);
    setTestOutput(null);
    setTimeout(() => {
      setIsExecuting(false);
      setTestOutput(JSON.stringify(JSON.parse(selectedMethod.returns.replace(/([a-zA-Z0-9_]+):/g, '"$1":')), null, 2));
    }, 400);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#202328] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-widest text-[#1677FF] font-semibold">Technical Reference</span>
            <span className="text-[#A7ADB5]">·</span>
            <span className="text-xs text-[#A7ADB5] font-mono">JSON-RPC 2.0</span>
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight flex items-center gap-3">
            <Code className="w-7 h-7 text-[#1677FF]" />
            Developer Documentation & RPC Spec
          </h1>
          <p className="text-sm text-[#A7ADB5] mt-1 max-w-2xl">
            Complete technical specification for integrating client applications, indexing services, and node infrastructure with MONETA Chain.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded bg-[#15171A] border border-[#202328] text-xs text-[#A7ADB5] flex items-center gap-2 self-start md:self-auto font-mono">
          <span className="w-1.5 h-1.5 rounded-full bg-[#1677FF]"></span>
          <span>EVM + Consortium Engine</span>
        </div>
      </div>

      {/* Backend Requirements Callout */}
      <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328] relative overflow-hidden">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded bg-[#E5A93C]/10 border border-[#E5A93C]/30 flex items-center justify-center text-[#E5A93C] shrink-0 mt-0.5">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="space-y-3">
            <div>
              <h2 className="text-base font-bold text-white">Missing Backend Connectivity & RPC Requirements</h2>
              <p className="text-xs text-[#A7ADB5] mt-1 leading-relaxed">
                This deployment of MONETASCAN operates in frontend demonstration mode with simulated deterministic fixtures. 
                To stream live transactions, verify real-time blocks, and query actual validator states, connect a verified MONETA Chain RPC provider.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
              <div className="p-3 rounded bg-[#0E1012] border border-[#202328] text-xs font-mono">
                <span className="text-[#5D646E] block mb-1">Target Chain ID</span>
                <span className="text-white font-bold">{NETWORK_INFO.chainId} ({NETWORK_INFO.chainIdDecimal})</span>
              </div>
              <div className="p-3 rounded bg-[#0E1012] border border-[#202328] text-xs font-mono">
                <span className="text-[#5D646E] block mb-1">Gas Currency</span>
                <span className="text-white font-bold">MNTA (18 decimals)</span>
              </div>
              <div className="p-3 rounded bg-[#0E1012] border border-[#202328] text-xs font-mono">
                <span className="text-[#5D646E] block mb-1">Default HTTP Port</span>
                <span className="text-white font-bold">:8545 (JSON-RPC)</span>
              </div>
              <div className="p-3 rounded bg-[#0E1012] border border-[#202328] text-xs font-mono">
                <span className="text-[#5D646E] block mb-1">Default WSS Port</span>
                <span className="text-white font-bold">:8546 (WebSockets)</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive JSON-RPC Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Method List */}
        <div className="bg-[#15171A] border border-[#202328] rounded-xl overflow-hidden flex flex-col">
          <div className="px-4 py-3 bg-[#0E1012] border-b border-[#202328] text-xs font-semibold uppercase tracking-wider text-[#A7ADB5]">
            Supported RPC Methods
          </div>
          <div className="divide-y divide-[#202328]/50 overflow-y-auto max-h-[500px]">
            {RPC_METHODS.map((method) => (
              <button
                key={method.name}
                type="button"
                onClick={() => {
                  setSelectedMethod(method);
                  setTestOutput(null);
                }}
                className={`w-full text-left px-4 py-3 transition-colors ${
                  selectedMethod.name === method.name
                    ? 'bg-[#1C2026] text-white border-l-2 border-[#1677FF]'
                    : 'text-[#A7ADB5] hover:bg-[#181B20] hover:text-white'
                }`}
              >
                <div className="font-mono text-xs font-semibold">{method.name}</div>
                <div className="text-[11px] text-[#5D646E] truncate mt-0.5">{method.desc}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Method Detail & Test Runner */}
        <div className="lg:col-span-2 bg-[#15171A] border border-[#202328] rounded-xl p-6 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-mono font-bold text-white">{selectedMethod.name}</h3>
                <p className="text-xs text-[#A7ADB5] mt-0.5">{selectedMethod.desc}</p>
              </div>
              <button
                type="button"
                onClick={executeRpcTest}
                disabled={isExecuting}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#1677FF] hover:bg-[#1366DB] text-white text-xs font-medium rounded transition-colors shrink-0"
              >
                <Play className="w-3.5 h-3.5" />
                <span>{isExecuting ? 'Running...' : 'Test Request'}</span>
              </button>
            </div>

            {/* Request Payload */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#A7ADB5] mb-1 font-mono">
                <span>cURL / JSON-RPC Request Example:</span>
                <button
                  type="button"
                  onClick={() => handleCopy(`curl -X POST --data '{"jsonrpc":"2.0","method":"${selectedMethod.name}","params":${selectedMethod.params},"id":1}' -H "Content-Type: application/json" http://localhost:8545`, 'curl')}
                  className="text-[#1677FF] hover:underline"
                >
                  {copiedCode === 'curl' ? 'Copied!' : 'Copy cURL'}
                </button>
              </div>
              <pre className="p-3.5 rounded bg-[#0E1012] border border-[#202328] text-xs font-mono text-[#A7ADB5] overflow-x-auto leading-relaxed">
{`curl -X POST --data '{
  "jsonrpc": "2.0",
  "method": "${selectedMethod.name}",
  "params": ${selectedMethod.params},
  "id": 1
}' -H "Content-Type: application/json" https://rpc.monetachain.org`}
              </pre>
            </div>

            {/* Response Preview */}
            <div>
              <div className="text-xs text-[#A7ADB5] mb-1 font-mono">
                {testOutput ? 'Live Execution Result (Mock Node Response):' : 'Expected Response Schema:'}
              </div>
              <pre className="p-3.5 rounded bg-[#0E1012] border border-[#202328] text-xs font-mono text-[#10B981] overflow-x-auto max-h-48 leading-relaxed">
{testOutput ? testOutput : `{
  "jsonrpc": "2.0",
  "id": 1,
  "result": ${selectedMethod.returns}
}`}
              </pre>
            </div>
          </div>
        </div>
      </div>

      {/* Integration Guide */}
      <div className="p-6 rounded-xl bg-[#15171A] border border-[#202328]">
        <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
          <Server className="w-5 h-5 text-[#1677FF]" />
          Connecting with Web3 Libraries (ethers.js / viem / web3.js)
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#A7ADB5] font-mono">
              <span>TypeScript (viem)</span>
              <button 
                type="button" 
                onClick={() => handleCopy(`import { createPublicClient, http, defineChain } from 'viem';\n\nexport const monetaChain = defineChain({\n  id: 19790,\n  name: 'MONETA Chain',\n  nativeCurrency: { name: 'MONETA', symbol: 'MNTA', decimals: 18 },\n  rpcUrls: { default: { http: ['https://rpc.monetachain.org'] } }\n});\n\nexport const client = createPublicClient({\n  chain: monetaChain,\n  transport: http()\n});`, 'viem')}
                className="text-[#1677FF] hover:underline"
              >
                {copiedCode === 'viem' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-3 rounded bg-[#0E1012] border border-[#202328] text-xs font-mono text-[#A7ADB5] overflow-x-auto">
{`import { createPublicClient, http, defineChain } from 'viem';

export const monetaChain = defineChain({
  id: 19790,
  name: 'MONETA Chain',
  nativeCurrency: { name: 'MONETA', symbol: 'MNTA', decimals: 18 },
  rpcUrls: { default: { http: ['https://rpc.monetachain.org'] } }
});

export const client = createPublicClient({
  chain: monetaChain,
  transport: http()
});`}
            </pre>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs text-[#A7ADB5] font-mono">
              <span>Ethers.js v6</span>
              <button 
                type="button" 
                onClick={() => handleCopy(`import { JsonRpcProvider } from 'ethers';\n\nconst provider = new JsonRpcProvider(\n  'https://rpc.monetachain.org',\n  {\n    chainId: 19790,\n    name: 'MONETA Chain'\n  }\n);\n\nconst block = await provider.getBlock('latest');\nconsole.log(block.number);`, 'ethers')}
                className="text-[#1677FF] hover:underline"
              >
                {copiedCode === 'ethers' ? 'Copied!' : 'Copy'}
              </button>
            </div>
            <pre className="p-3 rounded bg-[#0E1012] border border-[#202328] text-xs font-mono text-[#A7ADB5] overflow-x-auto">
{`import { JsonRpcProvider } from 'ethers';

const provider = new JsonRpcProvider(
  'https://rpc.monetachain.org',
  {
    chainId: 19790,
    name: 'MONETA Chain'
  }
);

const block = await provider.getBlock('latest');
console.log('Block height:', block.number);`}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
}
