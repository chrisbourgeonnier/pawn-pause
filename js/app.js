let gameState = createEmptyGame();

let textSaveTimer = null;
let lastEditedTextField = null;

const TEXT_SAVE_DELAY = 600;

function createPlayerId() {
  if (window.crypto && typeof window.crypto.randomUUID === "function") {
    return `player-${window.crypto.randomUUID()}`;
  }

  return `player-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

function createPlayersToMatchCount(playerCount) {
  const currentPlayers = gameState.players.slice();

  if (currentPlayers.length > playerCount) {
    const remainingPlayers = currentPlayers.slice(0, playerCount);
    const remainingPlayerIds = new Set(
      remainingPlayers.map((player) => player.id)
    );

    gameState = {
      ...gameState,
      players: remainingPlayers,
      currentPlayerId: remainingPlayerIds.has(gameState.currentPlayerId)
        ? gameState.currentPlayerId
        : null,
      propertyStates: Object.fromEntries(
        Object.entries(gameState.propertyStates).map(
          ([propertyId, propertyState]) => [
            propertyId,
            {
              ...propertyState,
              ownerId: remainingPlayerIds.has(propertyState.ownerId)
                ? propertyState.ownerId
                : null
            }
          ]
        )
      )
    };

    return;
  }

  while (currentPlayers.length < playerCount) {
    const playerNumber = currentPlayers.length + 1;

    currentPlayers.push(
      createPlayer(createPlayerId(), `Player ${playerNumber}`)
    );
  }

  gameState = {
    ...gameState,
    players: currentPlayers
  };
}

function normalisePropertyStates() {
  const edition = getEditionById(gameState.editionId);

  if (!edition) {
    return;
  }

  const playerIds = new Set(gameState.players.map((player) => player.id));
  const nextPropertyStates = {};

  edition.properties.forEach((property) => {
    const savedPropertyState = gameState.propertyStates[property.id] || {};
    const ownerId = playerIds.has(savedPropertyState.ownerId)
      ? savedPropertyState.ownerId
      : null;
    const requestedBuildings = Number(savedPropertyState.buildings);
    const buildings =
      property.canBuild &&
      Number.isInteger(requestedBuildings) &&
      requestedBuildings >= 0 &&
      requestedBuildings <= 5
        ? requestedBuildings
        : 0;

    nextPropertyStates[property.id] = {
      ownerId,
      buildings
    };
  });

  gameState = {
    ...gameState,
    propertyStates: nextPropertyStates
  };
}

function normaliseGameState() {
  const edition = getEditionById(gameState.editionId) || EDITIONS[0];

  gameState = {
    ...gameState,
    editionId: edition.id,
    gameName: typeof gameState.gameName === "string" ? gameState.gameName : "",
    players: Array.isArray(gameState.players) ? gameState.players : [],
    propertyStates:
      gameState.propertyStates && typeof gameState.propertyStates === "object"
        ? gameState.propertyStates
        : {},
    currentPlayerId:
      typeof gameState.currentPlayerId === "string"
        ? gameState.currentPlayerId
        : null
  };

  gameState.players = gameState.players
    .slice(0, 6)
    .map((player) => ({
      id:
        typeof player.id === "string" && player.id
          ? player.id
          : createPlayerId(),
      name: typeof player.name === "string" ? player.name : "",
      pawn: typeof player.pawn === "string" ? player.pawn : "",
      money:
        typeof player.money === "number" && Number.isFinite(player.money)
          ? Math.max(0, Math.round(player.money))
          : 0,
      positionId:
        getBoardSpaceById(edition.id, player.positionId)
          ? player.positionId
          : "start",
      hasJailFreeCard: Boolean(player.hasJailFreeCard),
      notes: typeof player.notes === "string" ? player.notes : ""
    }));

  const playerIds = new Set(gameState.players.map((player) => player.id));

  if (!playerIds.has(gameState.currentPlayerId)) {
    gameState.currentPlayerId = null;
  }

  normalisePropertyStates();
}

function renderAndSave() {
  normaliseGameState();
  gameState = saveGame(gameState);
  renderApp(gameState);
  setSaveStatus("Saved automatically on this device.");
}

function renderWithoutSaving() {
  normaliseGameState();
  renderApp(gameState);
}

function saveTextChanges() {
  window.clearTimeout(textSaveTimer);
  textSaveTimer = null;

  renderAndSave();

  if (lastEditedTextField?.isConnected) {
    const field = lastEditedTextField;
    const cursorPosition = field.value.length;

    field.focus();
    field.setSelectionRange(cursorPosition, cursorPosition);
  }

  lastEditedTextField = null;
}

function scheduleTextSave(inputElement) {
  window.clearTimeout(textSaveTimer);
  lastEditedTextField = inputElement;

  textSaveTimer = window.setTimeout(saveTextChanges, TEXT_SAVE_DELAY);
}

function getPlayerById(playerId) {
  return gameState.players.find((player) => player.id === playerId) || null;
}

function updatePlayerField(playerId, fieldName, value) {
  const player = getPlayerById(playerId);

  if (!player) {
    return;
  }

  const updatedPlayer = {
    ...player,
    [fieldName]: value
  };

  gameState = {
    ...gameState,
    players: gameState.players.map((existingPlayer) =>
      existingPlayer.id === playerId ? updatedPlayer : existingPlayer
    )
  };
}

function handleGameSetupChange(event) {
  const target = event.target;

  if (target.id === "edition-select") {
    const selectedEdition = getEditionById(target.value);

    if (!selectedEdition) {
      return;
    }

    gameState = {
      ...gameState,
      editionId: selectedEdition.id
    };

    normalisePropertyStates();
    renderAndSave();
    return;
  }

  if (target.id === "game-name") {
    gameState = {
      ...gameState,
      gameName: target.value.slice(0, 80)
    };

    renderAndSave();
    return;
  }

  if (target.id === "player-count") {
    const playerCount = Number(target.value);

    if (!Number.isInteger(playerCount) || playerCount < 2 || playerCount > 6) {
      return;
    }

    const isReducingPlayerCount = playerCount < gameState.players.length;

    if (
      isReducingPlayerCount &&
      !window.confirm(
        "Reducing the player count removes the last player records and unassigns any properties they own. Continue?"
      )
    ) {
      renderWithoutSaving();
      return;
    }

    createPlayersToMatchCount(playerCount);
    renderAndSave();
  }
}

function handlePlayerChange(event, shouldDebounce = false) {
  const target = event.target;
  const playerId = target.dataset.playerId;
  const fieldName = target.dataset.field;

  if (!playerId || !fieldName) {
    return;
  }

  if (fieldName === "currentPlayerId") {
    gameState = {
      ...gameState,
      currentPlayerId: playerId
    };

    renderAndSave();
    return;
  }

  const player = getPlayerById(playerId);

  if (!player) {
    return;
  }

  let value = target.value;

  if (fieldName === "money") {
    const parsedMoney = Number(value);
    value =
      Number.isFinite(parsedMoney) && parsedMoney >= 0
        ? Math.round(parsedMoney)
        : 0;
  }

  if (fieldName === "hasJailFreeCard") {
    value = target.checked;
  }

  if (fieldName === "name") {
    value = value.slice(0, 40);
  }

  if (fieldName === "pawn") {
    value = value.slice(0, 40);
  }

  if (fieldName === "notes") {
    value = value.slice(0, 500);
  }

  updatePlayerField(playerId, fieldName, value);

  if (
    shouldDebounce &&
    ["name", "pawn", "money", "notes"].includes(fieldName)
  ) {
    scheduleTextSave(target);
    return;
  }

  renderAndSave();
}

function handlePropertyChange(event) {
  const target = event.target;
  const propertyId = target.dataset.propertyId;
  const fieldName = target.dataset.field;

  if (!propertyId || !fieldName) {
    return;
  }

  const edition = getEditionById(gameState.editionId);
  const property = edition?.properties.find(
    (editionProperty) => editionProperty.id === propertyId
  );

  if (!property) {
    return;
  }

  const existingPropertyState = gameState.propertyStates[propertyId] || {
    ownerId: null,
    buildings: 0
  };

  let updatedPropertyState = {
    ...existingPropertyState
  };

  if (fieldName === "ownerId") {
    const ownerId = target.value || null;
    const playerExists = gameState.players.some(
      (player) => player.id === ownerId
    );

    updatedPropertyState.ownerId = playerExists ? ownerId : null;

    if (updatedPropertyState.ownerId === null) {
      updatedPropertyState.buildings = 0;
    }
  }

  if (fieldName === "buildings" && property.canBuild) {
    const buildings = Number(target.value);

    updatedPropertyState.buildings =
      Number.isInteger(buildings) && buildings >= 0 && buildings <= 5
        ? buildings
        : 0;
  }

  gameState = {
    ...gameState,
    propertyStates: {
      ...gameState.propertyStates,
      [propertyId]: updatedPropertyState
    }
  };

  renderAndSave();
}

function handleReset() {
  const shouldReset = window.confirm(
    "Reset the saved game? This permanently removes all Pawn Pause game details stored in this browser on this device."
  );

  if (!shouldReset) {
    return;
  }

  gameState = resetGame();
  createPlayersToMatchCount(4);
  renderAndSave();
  setSaveStatus("Saved game reset. A new blank game is ready.");
}

function registerEventListeners() {
  const gameForm = document.getElementById("game-form");
  const resetButton = document.getElementById("reset-game-button");

  if (gameForm) {
    gameForm.addEventListener("change", (event) => {
      const target = event.target;

      if (
        target.id === "edition-select" ||
        target.id === "player-count"
      ) {
        handleGameSetupChange(event);
        return;
      }

      if (
        target.dataset.playerId &&
        !["name", "pawn", "money", "notes"].includes(target.dataset.field)
      ) {
        handlePlayerChange(event);
        return;
      }

      if (target.dataset.propertyId) {
        handlePropertyChange(event);
      }
    });

    gameForm.addEventListener("input", (event) => {
      const target = event.target;

      if (target.id === "game-name") {
        gameState = {
          ...gameState,
          gameName: target.value.slice(0, 80)
        };

        scheduleTextSave(target);
        return;
      }

      if (target.dataset.playerId) {
        handlePlayerChange(event, true);
      }
    });

    gameForm.addEventListener("focusout", (event) => {
      const target = event.target;

      const isTextField =
        target.id === "game-name" ||
        ["name", "pawn", "money", "notes"].includes(target.dataset.field);

      if (isTextField && textSaveTimer) {
        saveTextChanges();
      }
    });
  }

  if (resetButton) {
    resetButton.addEventListener("click", handleReset);
  }
}

function initialiseApp() {
  gameState = loadGame();
  normaliseGameState();

  if (gameState.players.length < 2) {
    createPlayersToMatchCount(4);
  }

  normaliseGameState();
  registerEventListeners();
  renderAndSave();
}

document.addEventListener("DOMContentLoaded", initialiseApp);
