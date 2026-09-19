## ADDED Requirements

### Requirement: CSS is the parameter source
The plugin SHALL derive fields from Doxygen comments immediately preceding unique technique-specific CSS custom properties and persist current values in the same recipe.css.

#### Scenario: Edit a valid parameter
- **WHEN** the user enters a valid number, selects a declared option, or enters a short string
- **THEN** only the selected declaration value is changed, and the preview refreshes without changing installed snippets

#### Scenario: Invalid or conflicting input
- **WHEN** input is invalid, a save fails, or another editor changed the same variable
- **THEN** the editor shows an error and does not overwrite the last successfully saved CSS

### Requirement: Explicit update of installed style
The plugin SHALL offer “Обновить уже существующий стиль” for a parameterized installed technique and wait for its pending source writes before applying.

#### Scenario: Update an enabled technique
- **WHEN** the user presses the update button
- **THEN** only that technique's marked block is replaced with current recipe.css and other blocks remain unchanged

#### Scenario: Disable and re-enable
- **WHEN** a technique is disabled and later enabled
- **THEN** source values persist and the latest saved values are applied

### Requirement: Shared card architecture
The plugin SHALL use the same parameter editor for individual cards and embedded cards, and preserve existing behavior for techniques without annotated variables.

#### Scenario: Two visible cards
- **WHEN** one editor saves a parameter
- **THEN** another editor of the same technique observes the persisted value
