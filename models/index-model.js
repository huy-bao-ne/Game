const { createScoreTable } = require("./score-model");
const { createUserTable } = require("./user-model");
const { createSettingTable } = require("./setting-model");
const { createGameStateTable } = require("./game-model");
// This file initializes all models by creating necessary tables in the database
const initModels = async () => {
  await createUserTable();
  await createScoreTable();
  await createSettingTable();
  await createGameStateTable();
};

module.exports = { initModels };
