# 🦞 Clawd LiveKit Voice Agent

A Python LiveKit agent that handles voice, vision, and Solana trading. Built on the LiveKit Agents SDK with AssemblyAI Universal-3 Pro Streaming for STT, OpenAI GPT-4.1 for reasoning, Cartesia Sonic-3 for TTS, and Claude Haiku 4.5 for vision.

## Pipeline

| Stage | Provider |
| --- | --- |
| STT | AssemblyAI `u3-rt-pro` (punctuation-based EOT) |
| Turn detection | AssemblyAI STT (`min_turn_silence=100`, `max_turn_silence=1000`) |
| LLM | OpenAI `gpt-4.1` |
| TTS | Cartesia `sonic-3` |
| Noise cancellation | LiveKit BVC |
| Vision | Anthropic Claude `haiku-4.5` |
| Trading | DFlow Trading API `/order` (primary), Jupiter (price + comparison) |
| RPC | Configurable: mainnet beta, Helius, Triton, Ankr, etc. |

## Tools

| Tool | What it does |
| --- | --- |
| `get_token_price` | Jupiter price for symbol or mint |
| `get_wallet_balance` | SOL balance via Solana RPC |
| `quote_swap` | Jupiter v6 swap quote |
| `quote_dflow_order` | DFlow `/order` quote with route plan, price impact, execution mode |
| `get_priority_fees` | Live DFlow priority fee estimates |
| `get_network_status` | Slot and recent TPS |
| `analyze_vision` | Claude vision over the latest video frame |
| `list_supported_tokens` | Known symbols |

## Quick start

```bash
cd livekit-agent
cp .env.example .env.local
# fill in keys (see below)
pip install -r requirements.txt
python agent.py download-files   # silero, turn detector, noise cancellation
python agent.py dev
```

Then connect via the [LiveKit Agents Playground](https://agents-playground.livekit.io) or your own LiveKit frontend.

## Required env vars

| Var | Required | Notes |
| --- | --- | --- |
| `LIVEKIT_URL` | yes | `wss://solanaos-zn3w8h4f.livekit.cloud` |
| `LIVEKIT_API_KEY` | yes | `APIdrfcEgLatYaG` |
| `LIVEKIT_API_SECRET` | yes | (from LiveKit Cloud) |
| `ASSEMBLYAI_API_KEY` | yes | STT |
| `OPENAI_API_KEY` | yes | LLM |
| `CARTESIA_API_KEY` | yes | TTS |
| `ANTHROPIC_API_KEY` | for vision | Falls back to "vision unavailable" if missing |
| `DFLOW_API_KEY` | for DFlow trading | Falls back to Jupiter only if missing |
| `SOLANA_RPC_URL` | optional | Defaults to mainnet beta |

## Deploy

```bash
# Register the agent with LiveKit Cloud
lk agent create --name clawd-voice-agent

# Or deploy via Docker
docker build -t clawd-voice-agent .
docker run --env-file .env.local clawd-voice-agent
```

Registers and deploys to LiveKit Cloud. See [LiveKit Agents docs](https://docs.livekit.io/agents/) for production deployment options.

## Webhook endpoint

The Cheshire Terminal server exposes a LiveKit webhook endpoint at `POST /api/livekit/webhook` that receives events like `room_started`, `participant_joined`, `participant_left`, `track_published`, etc. Configure this URL in your LiveKit Cloud dashboard under Settings → Webhooks.

## Notes

- The agent quotes trades. It does not sign or submit. The user signs the `transaction` returned by `/order` in their own wallet.
- Vision frames are sampled at ~1Hz from the first subscribed remote video track. `analyze_vision` always uses the latest.
- The agent uses STT-driven turn detection (recommended for U3 Pro Streaming). `min_turn_silence=100`, `max_turn_silence=1000`.
- For dictation of long entities like email or wallet addresses, raise `max_turn_silence` mid-stream via `stt.update_options(...)`.
