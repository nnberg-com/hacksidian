# GPT-5.6 Terra

> For the complete documentation index, see [llms.txt](/llms.txt). Markdown versions of documentation pages are available by appending `.md` to the page URL.

> GPT-5.6 model that balances intelligence and cost

Model ID: `gpt-5.6-terra`

GPT-5.6 Terra is designed for workloads that balance intelligence and cost.
It roughly corresponds to the mini model tier used in earlier GPT-5 families.
Reasoning.effort supports: none, low, medium (default), high, xhigh, and max.

## Model details

- Default snapshot: `gpt-5.6-terra`
- Input modalities: text, image
- Output modalities: text
- 1,050,000 context window
- Maximum input tokens: 922,000
- 128,000 max output tokens
- Feb 16, 2026 knowledge cutoff
- Reasoning token support

## Pricing

Pricing is based on the number of tokens used, or other metrics based on the model type. For tool-specific models, like search and computer use, there’s a fee per tool call. See details in the [pricing page](/api/docs/pricing).

### Text tokens

| Metric | Price | Unit |
| --- | ---: | --- |
| Input | $2 | 1M tokens |
| Cached input | $0.2 | 1M tokens |
| Output | $12 | 1M tokens |

- Prompts with >272K input tokens are priced at 2x input and 1.5x output for the full request.
- Cache writes are billed at 1.25x the uncached input token rate.

