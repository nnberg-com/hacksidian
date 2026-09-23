## ADDED Requirements

### Requirement: Common parameter value tables
A technique SHALL use one shared CSS structure for all values of a system-selection parameter. All variants SHALL define the same derived variable schema. Installation and all previews SHALL resolve the same selected values.

#### Scenario: Changing the system
- **WHEN** the user changes text-system from USWDS to Carbon
- **THEN** all H1–H6 properties use Carbon's table and no values leak from the previous system
- **AND** fonts and the user’s base text size remain unchanged.

### Requirement: Source-grounded complete heading systems
Each text-system option SHALL explicitly describe H1–H6. Source facts and adaptations SHALL be distinguished in documentation accessible from the technique. Missing levels MAY be adapted from source data and principles, as authorized by the user.

#### Scenario: Source lacks lower heading levels
- **WHEN** an original sample contains only H2
- **THEN** the resulting six-level mapping identifies H1 and H3–H6 as adaptations and gives their construction rule.

### Requirement: Optional authored expanded page
Every parameterized technique SHALL support an optional expanded.md in its own directory, linked from its card when present. Its author SHALL be able to enumerate an arbitrary subset of parameter assignments, including recommended combinations of several parameters.

#### Scenario: Compare without modifying
- **WHEN** the user scrolls an expanded page containing multiple examples
- **THEN** all examples coexist in isolated scopes and no source or installed style changes.

#### Scenario: Select a recommendation
- **WHEN** the user selects an expanded example
- **THEN** its assignments are validated and saved atomically using the normal parameter storage
- **AND** unspecified values and unrelated source bytes remain unchanged
- **AND** installed style changes require a separate explicit apply/update.

### Requirement: Light appearance only in the current delivery
The current catalogue SHALL expose a single palette technique with light variants only. Dark recipe branches and dark demo controls SHALL be absent. Future dark-mode support SHALL remain a separate unimplemented change.

#### Scenario: Browse the palette choices now
- **WHEN** the user opens the palette card or its expanded page
- **THEN** only the eleven light variants are offered
- **AND** the page contains no dark-mode switch or dark specimen.
