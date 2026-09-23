## ADDED Requirements

### Requirement: Modern color roles
Palette recipes MUST use complete native color variables and MUST NOT generate deprecated RGB/HSL aliases. Palette mixing MUST use OKLCH.

#### Scenario: Generate any light palette
- **WHEN** the generator produces one of the eleven variants
- **THEN** no deprecated RGB/HSL copies are included
- **AND** source HEX or OKLCH colors retain their values

### Requirement: Consistent manual overrides
Manual semantic colors MUST override full-palette named colors independently of application order.

#### Scenario: Both recipes enabled
- **WHEN** the user enables both recipes in either order
- **THEN** all eight manual colors are used by their dependent text, code and callout roles
- **AND** disabling the manual recipe restores the selected full-palette colors

### Requirement: Isolated palette comparison
Palette examples MUST show the selected source palette without inheriting manual overrides from the host page.

#### Scenario: Host has manual colors
- **WHEN** a user compares expanded palette variants with manual semantic colors active on the host
- **THEN** all examples retain their own palette colors
