## ADDED Requirements

### Requirement: Selectable emphasis target
The selected 23 techniques MUST expose bold, italic and highlight as independent target options in their parameter controls, for Preview mode only.

#### Scenario: Change target on a technique card
- **WHEN** the user changes the target parameter
- **THEN** the shared preview compiler applies the same visual rules to strong, em or mark according to the choice
- **AND** only the target parameter value is saved
- **AND** updating installed CSS remains an explicit action

### Requirement: Complete portable styling
Each parameterized technique MUST specify the styling needed for the same appearance on each supported target instead of depending on the default appearance of the tag.

#### Scenario: Compare the three targets
- **WHEN** the same technique is rendered on each target in Preview mode
- **THEN** typography, backgrounds and decorations including pseudoelements have equivalent computed styles
- **AND** unselected targets remain unchanged

### Requirement: Independent parameter dimensions
Target selection MUST coexist with ordinary visual parameters and MUST NOT accept arbitrary selector input.

#### Scenario: Configure target and another parameter
- **WHEN** target and spacing are edited independently
- **THEN** both values are respected by compilation
- **AND** unsupported target values are rejected
