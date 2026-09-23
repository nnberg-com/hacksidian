## ADDED Requirements

### Requirement: Separate special callout syntax
The catalog MUST place techniques requiring custom callout types or a special content structure in the composition category. Standard callout styling MUST remain in callout.

#### Scenario: Discover a ticket or question-answer technique
- **WHEN** a user opens the compositions category
- **THEN** callout-ticket and callout-qna appear there and are absent from the standard callout category
- **AND** the category explains that the example markup is required

#### Scenario: Audit all categories
- **WHEN** catalog verification runs
- **THEN** custom callout types in CSS and Markdown outside composition fail verification

### Requirement: Preserve installed styles during regrouping
The plugin MUST add the composition module without overwriting existing CSS and MUST move an installed technique only on explicit application or update.

#### Scenario: Update an installed composition
- **WHEN** the user updates a technique marked with previousTargets containing its old module
- **THEN** its marked block moves to the composition module
- **AND** unrelated CSS remains unchanged
- **AND** repeated updates are idempotent

#### Scenario: Malformed installed blocks
- **WHEN** the old block is incomplete or duplicated
- **THEN** the update fails without changing the style
