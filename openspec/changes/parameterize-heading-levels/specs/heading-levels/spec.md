## ADDED Requirements

### Requirement: Selectable heading level
Portable heading techniques MUST expose an independent H1–H6 selection for Preview mode.

#### Scenario: Change level
- **WHEN** a user selects H1 instead of H3
- **THEN** compilation targets H1 and its Obsidian wrappers
- **AND** native heading variable references follow H1
- **AND** other parameter values remain unchanged

### Requirement: Matching preview
The example MUST render the selected heading level without editing source Markdown or fenced code.

#### Scenario: Preview H6
- **WHEN** H6 is selected
- **THEN** ATX headings of the original target level in the example render as H6
- **AND** the stored example and fenced code remain unchanged

### Requirement: Preserve compound heading techniques
Techniques whose logic depends on multiple heading levels MUST remain fixed pending a separate design.

#### Scenario: Hierarchy-sensitive techniques
- **WHEN** the catalog is parameterized
- **THEN** heading-e012, heading-e039 and heading-e043 remain unchanged
