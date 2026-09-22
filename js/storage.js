const STORAGE_KEY = "pawn-pause-game-v1";

function createEmptyGame() {
  return {
    version: 1,
    editionId: "vietnam-foxi",
    gameName: "",
    players: [],
    propertyStates: {},
    currentPlayerId: null,
    updatedAt: ""
  };
}

function createPlayer(id, name = "") {
  return {
    id,
    name,
    pawn: "",
    money: 0,
    positionId: "start",
    hasJailFreeCard: false,
    notes: ""
  };
}

function isValidGameState(gameState) {
  return (
    gameState &&
    typeof gameState === "object" &&
    gameState.version === 1 &&
    typeof gameState.editionId === "string" &&
    typeof gameState.gameName === "string" &&
    Array.isArray(gameState.players) &&
    gameState.players.every(
      (player) =>
        player &&
        typeof player.id === "string" &&
        typeof player.name === "string" &&
        typeof player.pawn === "string" &&
        typeof player.money === "number" &&
        typeof player.positionId === "string" &&
        typeof player.hasJailFreeCard === "boolean" &&
        typeof player.notes === "string"
    ) &&
    gameState.propertyStates &&
    typeof gameState.propertyStates === "object" &&
    (typeof gameState.currentPlayerId === "string" ||
      gameState.currentPlayerId === null) &&
    typeof gameState.updatedAt === "string"
  );
}

function loadGame() {
  const savedGame = localStorage.getItem(STORAGE_KEY);

  if (!savedGame) {
    return createEmptyGame();
  }

  try {
    const gameState = JSON.parse(savedGame);

    if (isValidGameState(gameState)) {
      return gameState;
    }
  } catch (error) {
    console.warn("Pawn Pause could not read the saved game.", error);
  }

  return createEmptyGame();
}

function saveGame(gameState) {
  const gameToSave = {
    ...gameState,
    updatedAt: new Date().toISOString()
  };

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameToSave));
    return gameToSave;
  } catch (error) {
    console.error("Pawn Pause could not save the game.", error);
    return gameState;
  }
}

function resetGame() {
  localStorage.removeItem(STORAGE_KEY);
  return createEmptyGame();
}
