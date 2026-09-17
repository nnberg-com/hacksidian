# GPT-6 Astra

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

> Our most capable model, built for the hardest end-to-end work

Model ID: `gpt-6-astra`

GPT-6 Astra is our most capable model, built for the hardest end-to-end work.
Use it for complex reasoning, coding, computer use, research, and document creation.
`reasoning.effort` supports `low`, `medium`, `high`, `xhigh`, and `max`.

Get started with GPT-6 Astra using the [model guide](/api/docs/guides/latest-model?model=gpt-6-astra).

## Model details

- Default snapshot: `gpt-6-astra`
- Input modalities: text, image
- Output modalities: text
- 1,050,000 context window
- Maximum input tokens: 922,000
- 128,000 max output tokens
- Apr 30, 2026 knowledge cutoff
- Reasoning token support

## Pricing

Pricing is based on the number of tokens used, or other metrics based on the model type. For tool-specific models, like search and computer use, there’s a fee per tool call. See details in the [pricing page](/api/docs/pricing).

### Text tokens

| Metric | Price | Unit |
| --- | ---: | --- |
| Input | $10 | 1M tokens |
| Cached input | $1 | 1M tokens |
| Cache writes | $12.5 | 1M tokens |
| Output | $50 | 1M tokens |

- Prompts with more than 272K input tokens are priced at 2x input and cache rates and 1.5x output for the full request.
- Cache writes are billed at 1.25x the uncached input token rate.
- Batch and Flex are priced at 50% of Standard rates. Fast mode is priced at 2x the applicable rates.

