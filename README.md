# OpenClawd Framework

<p align="center">
  <img src="./assets/openclawd-banner.svg" alt="OpenClawd Framework banner" width="100%" />
</p>

<p align="center">
  <strong>Build sovereign Solana agents with a runtime, CLI, payment rails, wallet flows, MCP tools, and a large prompt/skill library.</strong>
</p>

<p align="center">
  <img alt="node lts" src="https://img.shields.io/badge/node-20%20to%2024-0B7285">
  <img alt="runtime" src="https://img.shields.io/badge/runtime-verified-147D64">
  <img alt="mcp" src="https://img.shields.io/badge/mcp%20server-packed-1E5AA8">
  <img alt="x402" src="https://img.shields.io/badge/x402-packed-C85C2B">
</p>

OpenClawd is the repo behind the lobster stack:

- `@openclawdsolana/leviathan`: the sovereign runtime
- `@openclawdsolana/clawd`: the operator CLI / TUI
- `@pump-fun/mcp-server`: Solana MCP server
- `@pump-fun/x402`: HTTP 402 payment primitives on Solana
- `library/`: agent definitions, prompts, and knowledge assets
- `examples/`: runnable demos across wallets, trading, payments, and orchestration

## Why This Exists

Most agent repos stop at chat. OpenClawd is opinionated about the harder parts:

- identity: agents have wallets, state, and long-lived shell files
- economics: agents can earn, pay, and gate access
- sovereignty: the runtime can operate without a hosted control plane
- composition: MCP, CLIs, examples, and libraries live in one repo
- lore: the product is memorable enough to market, not just technically correct

## Verified Status

Validated in this checkout on May 14, 2026:

| Package | Status | Notes |
| --- | --- | --- |
| `@openclawdsolana/leviathan` | `npm install` + `npm run build` + `npm pack --dry-run` passed | Root dependency conflicts fixed |
| `@pump-fun/mcp-server` | `npm install` + `npm run build` + `npm pack --dry-run` passed | Publish contents tightened so `.env` is no longer packed |
| `@pump-fun/x402` | `npm install` + `npm run build` + `npm pack --dry-run` passed | Publish contents trimmed to built artifacts |
| `@openclawdsolana/clawd` | `npm run build` + `npm pack --dry-run` passed | Import namespace mismatch fixed |
| `@openclawdsolana/clawd-standalone` | `npm pack --dry-run` passed | Ships prebuilt |

Important caveat:

- `packages/clawd` should be treated as a Node LTS package. On this machine, full install scripts under `node 25.6.1` hit a transitive `sharp` build failure. Use Node `20.x`, `22.x`, or `24.x`.

## Quick Start

```bash
git clone <your-fork-or-repo-url>
cd openclawd-framework
export PATH=/opt/homebrew/bin:$PATH

npm install
npm run build
```

Spawn a runtime agent:

```bash
node dist/index.js --spawn --name "Snippy" --creator <YOUR_SOLANA_PUBKEY>
node dist/index.js --run
node dist/index.js --status
```

Run package-level checks:

```bash
# Root runtime
npm run build
npm pack --dry-run

# MCP server
cd mcp-server && npm install && npm run build && npm pack --dry-run

# x402
cd ../x402 && npm install && npm run build && npm pack --dry-run

# Clawd CLI
cd ../packages/clawd && npm install --ignore-scripts && npm run build && npm pack --dry-run
```

## Package Map

| Path | Purpose |
| --- | --- |
| `src/` | root runtime source for the Leviathan |
| `packages/clawd/` | terminal operator experience and tools |
| `packages/cli-standalone/` | prebuilt standalone CLI package |
| `mcp-server/` | Pump-focused MCP server |
| `x402/` | Solana-flavored x402 payment package |
| `library/` | prompt / agent library and automation scripts |
| `examples/` | end-to-end demos |
| `skills/` | installable or bundled skills |
| `knowledge/` | docs, internal conventions, and design notes |
| `vendor/` | vendored experiments and satellite packages |
| `pay/` | payment-related side projects and references |

## Runnable Demos

```bash
npx tsx examples/blockchain-buddies-demo.ts
npx tsx examples/ooda-loop.ts
npx tsx examples/x402-solana.ts
npx tsx examples/listen-wallet.ts
npx tsx examples/lobster-trader.ts
npx tsx examples/auto-research-client.ts
npx tsx examples/orchestrator-client.ts
npx tsx examples/clawd-wallet-demo.ts
npx tsx examples/x402-payment-demo.ts
```

## Environment

```bash
CREATOR_PUBKEY=<your-solana-pubkey>
SOLANA_RPC_URL=https://mainnet.helius-rpc.com/?api-key=<key>
HELIUS_API_KEY=<key>

# Optional
SOLANA_PRIVATE_KEY=<base58>
OPENAI_API_KEY=<key>
XAI_API_KEY=<key>
```

## What Changed In This Cleanup

- fixed the root Metaplex dependency set so install works again
- fixed the broken `build:all` script path
- removed non-existent root `LICENSE` from publish files
- fixed `packages/clawd` imports to use `@openclawdsolana/leviathan`
- tightened tarball contents for `mcp-server`, `x402`, and `clawd`
- documented the real Node compatibility boundary
- replaced the README with a launch-friendly version and animated banner

## Brand Hooks

If you want this repo to spread, lean into the parts people remember:

- sovereign lobster agents with wallets
- agents that can pay and get paid
- Solana-native MCP tooling
- a CLI that feels like a creature, not a dashboard

The shell molts. The laws do not.
