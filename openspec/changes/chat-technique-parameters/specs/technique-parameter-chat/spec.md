## ADDED Requirements

### Requirement: Parameter chat is scoped to a technique page
The plugin SHALL scope relative parameter configuration to the current technique card. It MAY preconfigure a uniquely recommended technique when the current user request explicitly supplies the desired parameter intent.

#### Scenario: Ordinary page or experiment collection
- **WHEN** the current page is not a technique card
- **THEN** chat uses the catalog recommendation flow; only a uniquely grounded recommendation with explicitly requested parameter intent may preconfigure its own declared fields

#### Scenario: Request another technique on a card
- **WHEN** the user asks for catalog recommendations
- **THEN** the catalog flow handles the request with the same unique-result configuration and command rules

### Requirement: Ground changes in current parameter metadata
The model SHALL receive current parameter values, allowed options and numeric constraints, and SHALL return only variable IDs and form input values.

#### Scenario: Maximum line spacing
- **WHEN** the user requests maximum spacing and the relevant parameter has a maximum
- **THEN** the model is instructed to choose that declared boundary and the local validator checks the result

#### Scenario: Ambiguous or unsupported adjustment
- **WHEN** the intended parameter is unclear or unavailable
- **THEN** chat asks a question or explains the limitation without modifying CSS

### Requirement: Atomic validated source updates
The plugin SHALL validate the complete batch before writing recipe.css using the same field validators and queue as the form.

#### Scenario: Valid update
- **WHEN** all returned parameter inputs are valid and context is unchanged
- **THEN** one source write updates the form and preview, while installed snippets remain unchanged unless the current request unambiguously commands application

#### Scenario: Stale context or invalid result
- **WHEN** the page or CSS changed during the request, or any change is invalid
- **THEN** no part of the response is written

### Requirement: Durable request accounting
The plugin SHALL record received usage before parsing and applying the model result.

#### Scenario: Paid rejected response
- **WHEN** a response is malformed, invalid or cannot be applied
- **THEN** known usage remains in the expense ledger and the attempt records failure


### Requirement: Preconfigure an unambiguous recommendation in the same search response
The plugin SHALL accept validated parameter input values alongside one retrieved applicable technique recommendation when the user explicitly requests its adjustable appearance.

#### Scenario: Thick dashed quote border
- **WHEN** the user asks for quotes with a thick dashed left border and the retrieved technique has corresponding declared options
- **THEN** the search response may recommend that technique and preconfigure its width and line style without another parameter-selection request
- **AND** the response shows the actual saved values and enables it only if the current request unambiguously commands application

#### Scenario: Ambiguous, ungrounded or stale recommendation
- **WHEN** multiple recommendations contain adjustments, the ID is not retrieved, fields are unavailable or invalid, or source CSS changed during search
- **THEN** no preset is written

#### Scenario: Stale remote parameter information
- **WHEN** the searchable record predates parameter metadata
- **THEN** fresh local field descriptions provide the allowed inputs and retrieved record evidence still gates technique selection


### Requirement: Execute only an unambiguous command for one technique
The plugin SHALL distinguish application commands from parameter intent. It SHALL apply or update one verified technique only for an unambiguous current command, supported by an exact quote from the current request. Missing or uncertain commands SHALL NOT enable a technique.

#### Scenario: Maximum table padding and application
- **WHEN** the request commands maximum horizontal table-cell padding and uniquely identifies table-e015
- **THEN** the declared maximum is saved and the technique is enabled or its existing block updated

#### Scenario: Apply without configuration
- **WHEN** one technique is selected with an unambiguous application command and no parameter changes
- **THEN** its current saved CSS is applied

#### Scenario: One result without an application command
- **WHEN** a search returns one technique with show or uncertain command intent
- **THEN** requested valid parameters may be saved but installed snippets are unchanged
- **AND** its page opens in a new active tab

#### Scenario: Multiple results
- **WHEN** search returns multiple recommendations
- **THEN** only the list is shown, even if the model supplied parameter changes or commands
- **AND** no source, installed style or active tab is changed

#### Scenario: Applied search result
- **WHEN** a single searched technique is successfully applied
- **THEN** its page also opens in a new active tab
