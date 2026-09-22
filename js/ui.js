function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getPositionOptions(edition, selectedPositionId) {
  return edition.boardSpaces
    .slice()
    .sort((firstSpace, secondSpace) => firstSpace.space - secondSpace.space)
    .map((space) => {
      const isSelected = space.id === selectedPositionId ? " selected" : "";
      const subtitle = space.subtitle ? ` — ${space.subtitle}` : "";

      return `
        <option value="${escapeHtml(space.id)}"${isSelected}>
          ${space.space}. ${escapeHtml(space.name)}${escapeHtml(subtitle)}
        </option>
      `;
    })
    .join("");
}

function renderPlayerCard(player, playerNumber, edition, currentPlayerId) {
  const safePlayerId = escapeHtml(player.id);
  const playerName = escapeHtml(player.name);
  const playerPawn = escapeHtml(player.pawn);
  const playerNotes = escapeHtml(player.notes);
  const isCurrentPlayer = player.id === currentPlayerId;
  const checkedJailCard = player.hasJailFreeCard ? " checked" : "";
  const checkedCurrentPlayer = isCurrentPlayer ? " checked" : "";

  return `
    <article class="player-card" data-player-id="${safePlayerId}" aria-labelledby="player-title-${safePlayerId}">
      <header class="player-card-header">
        <h3 id="player-title-${safePlayerId}">Player ${playerNumber}</h3>
        ${
          isCurrentPlayer
            ? '<span class="current-player-label">Current player</span>'
            : ""
        }
      </header>

      <div class="player-form-grid">
        <div class="form-field">
          <label for="player-name-${safePlayerId}">
            Player name
          </label>
          <input
            id="player-name-${safePlayerId}"
            name="playerName"
            type="text"
            value="${playerName}"
            maxlength="40"
            autocomplete="off"
            data-field="name"
            data-player-id="${safePlayerId}"
            aria-required="true"
            required
          >
        </div>

        <div class="form-field">
          <label for="player-pawn-${safePlayerId}">
            Pawn or token <span class="optional">(optional)</span>
          </label>
          <input
            id="player-pawn-${safePlayerId}"
            name="playerPawn"
            type="text"
            value="${playerPawn}"
            maxlength="40"
            autocomplete="off"
            placeholder="For example: Shoe, car, red token"
            data-field="pawn"
            data-player-id="${safePlayerId}"
          >
        </div>

        <div class="form-field">
          <label for="player-money-${safePlayerId}">
            Money
          </label>
          <input
            id="player-money-${safePlayerId}"
            name="playerMoney"
            type="number"
            inputmode="numeric"
            min="0"
            step="1"
            value="${Number.isFinite(player.money) ? player.money : 0}"
            data-field="money"
            data-player-id="${safePlayerId}"
            aria-describedby="player-money-help-${safePlayerId}"
          >
          <p id="player-money-help-${safePlayerId}" class="field-help">
            Enter the amount currently held by this player.
          </p>
        </div>

        <div class="form-field">
          <label for="player-position-${safePlayerId}">
            Pawn position
          </label>
          <select
            id="player-position-${safePlayerId}"
            name="playerPosition"
            data-field="positionId"
            data-player-id="${safePlayerId}"
          >
            ${getPositionOptions(edition, player.positionId)}
          </select>
        </div>

        <div class="checkbox-field">
          <input
            id="jail-card-${safePlayerId}"
            name="jailCard"
            type="checkbox"
            data-field="hasJailFreeCard"
            data-player-id="${safePlayerId}"
            ${checkedJailCard}
          >
          <label for="jail-card-${safePlayerId}">
            Has a Get Out of Jail Free card
          </label>
        </div>

        <div class="radio-field">
          <input
            id="current-player-${safePlayerId}"
            name="currentPlayer"
            type="radio"
            value="${safePlayerId}"
            data-field="currentPlayerId"
            data-player-id="${safePlayerId}"
            ${checkedCurrentPlayer}
          >
          <label for="current-player-${safePlayerId}">
            Current player
          </label>
        </div>
      </div>

      <div class="form-field">
        <label for="player-notes-${safePlayerId}">
          Notes and special cards <span class="optional">(optional)</span>
        </label>
        <textarea
          id="player-notes-${safePlayerId}"
          name="playerNotes"
          maxlength="500"
          placeholder="For example: Cơ hội card: Collect 500 when passing Bắt đầu."
          data-field="notes"
          data-player-id="${safePlayerId}"
        >${playerNotes}</textarea>
        <p class="field-help">
          Record held Cơ hội or other special cards, house rules, loans, or reminders.
        </p>
      </div>
    </article>
  `;
}

function renderPlayers(gameState, edition) {
  const container = document.getElementById("players-container");

  if (!container) {
    return;
  }

  container.setAttribute("aria-busy", "true");

  if (!gameState.players.length) {
    container.innerHTML = '<p class="empty-state">Player details will appear here.</p>';
    container.setAttribute("aria-busy", "false");
    return;
  }

  container.innerHTML = gameState.players
    .map((player, index) =>
      renderPlayerCard(player, index + 1, edition, gameState.currentPlayerId)
    )
    .join("");

  container.setAttribute("aria-busy", "false");
}

function getOwnerOptions(players, selectedOwnerId) {
  const bankSelected = selectedOwnerId === null ? " selected" : "";

  const playerOptions = players
    .map((player) => {
      const selected = player.id === selectedOwnerId ? " selected" : "";

      return `
        <option value="${escapeHtml(player.id)}"${selected}>
          ${escapeHtml(player.name || "Unnamed player")}
        </option>
      `;
    })
    .join("");

  return `
    <option value=""${bankSelected}>Bank / Unowned</option>
    ${playerOptions}
  `;
}

function getBuildingOptions(property, buildings) {
  if (!property.canBuild) {
    return `
      <option value="0" selected>
        Buildings not available
      </option>
    `;
  }

  const options = [
    { value: 0, label: "No buildings" },
    { value: 1, label: "1 house" },
    { value: 2, label: "2 houses" },
    { value: 3, label: "3 houses" },
    { value: 4, label: "4 houses" },
    { value: 5, label: "Hotel" }
  ];

  return options
    .map((option) => {
      const selected = option.value === buildings ? " selected" : "";

      return `
        <option value="${option.value}"${selected}>
          ${option.label}
        </option>
      `;
    })
    .join("");
}

function renderPropertyCard(property, propertyState, players) {
  const safePropertyId = escapeHtml(property.id);
  const ownerId = propertyState?.ownerId ?? null;
  const buildings = Number.isInteger(propertyState?.buildings)
    ? propertyState.buildings
    : 0;
  const categoryLabel =
    property.type === "transport"
      ? "Transport"
      : property.type === "utility"
        ? "Utility"
        : "Buildable property";

  return `
    <article class="property-card" data-property-id="${safePropertyId}" aria-labelledby="property-title-${safePropertyId}">
      <header class="property-card-header">
        <div>
          <h3 id="property-title-${safePropertyId}">${escapeHtml(property.name)}</h3>
          <p class="field-help">${categoryLabel}</p>
        </div>
      </header>

      <div class="property-form-grid">
        <div class="form-field">
          <label for="property-owner-${safePropertyId}">Owner</label>
          <select
            id="property-owner-${safePropertyId}"
            name="propertyOwner"
            data-property-id="${safePropertyId}"
            data-field="ownerId"
          >
            ${getOwnerOptions(players, ownerId)}
          </select>
        </div>

        <div class="form-field">
          <label for="property-buildings-${safePropertyId}">
            Houses or hotel
          </label>
          <select
            id="property-buildings-${safePropertyId}"
            name="propertyBuildings"
            data-property-id="${safePropertyId}"
            data-field="buildings"
            ${property.canBuild ? "" : " disabled"}
          >
            ${getBuildingOptions(property, buildings)}
          </select>
        </div>
      </div>
    </article>
  `;
}

function formatGroupName(groupName) {
  return groupName
    .replaceAll("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function renderProperties(gameState, edition) {
  const container = document.getElementById("properties-container");

  if (!container) {
    return;
  }

  container.setAttribute("aria-busy", "true");

  if (!edition.properties.length) {
    container.innerHTML =
      '<p class="empty-state">Property data is not available for this edition yet.</p>';
    container.setAttribute("aria-busy", "false");
    return;
  }

  const propertiesByGroup = edition.properties.reduce((groups, property) => {
    const groupName = property.colourGroup || "other";

    if (!groups[groupName]) {
      groups[groupName] = [];
    }

    groups[groupName].push(property);
    return groups;
  }, {});

  container.innerHTML = Object.entries(propertiesByGroup)
    .map(
      ([groupName, properties]) => `
        <section class="property-group" aria-labelledby="property-group-${escapeHtml(groupName)}">
          <h3 id="property-group-${escapeHtml(groupName)}" class="property-group-title">
            ${escapeHtml(formatGroupName(groupName))}
          </h3>
          ${properties
            .map((property) =>
              renderPropertyCard(
                property,
                gameState.propertyStates[property.id],
                gameState.players
              )
            )
            .join("")}
        </section>
      `
    )
    .join("");

  container.setAttribute("aria-busy", "false");
}

function formatMoney(amount) {
  return new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 0
  }).format(amount);
}

function getPropertyCount(playerId, propertyStates) {
  return Object.values(propertyStates).filter(
    (propertyState) => propertyState.ownerId === playerId
  ).length;
}

function renderSummary(gameState, edition) {
  const currentPlayerContainer = document.getElementById(
    "current-player-summary"
  );
  const summaryContainer = document.getElementById("summary-container");
  const lastSavedTime = document.getElementById("last-saved-time");

  if (!currentPlayerContainer || !summaryContainer || !lastSavedTime) {
    return;
  }

  const currentPlayer = gameState.players.find(
    (player) => player.id === gameState.currentPlayerId
  );

  currentPlayerContainer.innerHTML = currentPlayer
    ? `<p><strong>Current player:</strong> ${escapeHtml(currentPlayer.name || "Unnamed player")}</p>`
    : "<p>No current player has been selected.</p>";

  if (!gameState.players.length) {
    summaryContainer.innerHTML =
      '<p class="empty-state">Player summaries will appear here.</p>';
  } else {
    summaryContainer.innerHTML = gameState.players
      .map((player) => {
        const position = getBoardSpaceById(edition.id, player.positionId);
        const positionName = position
          ? `${position.space}. ${position.name}`
          : "Unknown position";

        return `
          <article class="summary-card">
            <header class="summary-card-header">
              <h3>${escapeHtml(player.name || "Unnamed player")}</h3>
              ${
                player.id === gameState.currentPlayerId
                  ? '<span class="current-player-label">Current player</span>'
                  : ""
              }
            </header>

            <dl class="summary-details">
              <div>
                <dt>Pawn</dt>
                <dd>${escapeHtml(player.pawn || "Not set")}</dd>
              </div>
              <div>
                <dt>Money</dt>
                <dd>${formatMoney(player.money)}</dd>
              </div>
              <div>
                <dt>Position</dt>
                <dd>${escapeHtml(positionName)}</dd>
              </div>
              <div>
                <dt>Properties</dt>
                <dd>${getPropertyCount(player.id, gameState.propertyStates)}</dd>
              </div>
            </dl>
          </article>
        `;
      })
      .join("");
  }

  if (!gameState.updatedAt) {
    lastSavedTime.textContent = "Not saved yet";
    lastSavedTime.removeAttribute("datetime");
    return;
  }

  const savedDate = new Date(gameState.updatedAt);

  if (Number.isNaN(savedDate.getTime())) {
    lastSavedTime.textContent = "Unknown";
    lastSavedTime.removeAttribute("datetime");
    return;
  }

  lastSavedTime.dateTime = gameState.updatedAt;
  lastSavedTime.textContent = new Intl.DateTimeFormat(undefined, {
    dateStyle: "medium",
    timeStyle: "short"
  }).format(savedDate);
}

function renderApp(gameState) {
  const edition = getEditionById(gameState.editionId);

  if (!edition) {
    return;
  }

  const editionSelect = document.getElementById("edition-select");
  const gameNameInput = document.getElementById("game-name");
  const playerCountSelect = document.getElementById("player-count");

  if (editionSelect) {
    editionSelect.value = gameState.editionId;
  }

  if (gameNameInput) {
    gameNameInput.value = gameState.gameName;
  }

  if (playerCountSelect) {
    playerCountSelect.value = String(
      Math.min(Math.max(gameState.players.length || 2, 2), 6)
    );
  }

  renderPlayers(gameState, edition);
  renderProperties(gameState, edition);
  renderSummary(gameState, edition);
}

function setSaveStatus(message, isError = false) {
  const saveStatus = document.getElementById("save-status");

  if (!saveStatus) {
    return;
  }

  saveStatus.textContent = message;
  saveStatus.style.color = isError
    ? "var(--colour-danger)"
    : "var(--colour-success)";
}
