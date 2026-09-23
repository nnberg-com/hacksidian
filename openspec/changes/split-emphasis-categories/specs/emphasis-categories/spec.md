## ADDED Requirements

### Requirement: Separate semantic categories
The catalog MUST separate single emphasis, strikethrough techniques and combinations of emphasis markup.

#### Scenario: Browse categories
- **WHEN** the user opens strikethrough
- **THEN** s28–s31 and s37 are listed
- **WHEN** the user opens emphasis-combinations
- **THEN** s32–s35 are listed
- **AND** none of these nine techniques remain in emphasis

### Requirement: Meaningful visible titles
All 37 former emphasis techniques MUST have descriptive visible titles without numeric prefixes, while preserving stable IDs and links.

#### Scenario: Update an installed moved technique
- **WHEN** the user explicitly updates a moved technique
- **THEN** its marked CSS moves from g-emphasis into its new category module
- **AND** unrelated CSS remains unchanged
