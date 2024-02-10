const path = require("path");

module.exports = {
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      network_id: "*",
      host: "0.0.0.0",
      port: 7545, // for ganache gui
      // port: 7545, // for ganache-cli
    },
  },
};
