const path = require("path");

exports.default = {
  asar: false,
  appId: "com.gi-de",
  files: ["../../node_modules/**/*", "../../output/build/**/*", "../../electron/*"],
  directories: {
    app: path.join(__dirname, "../../"),
    output: path.join(__dirname, "../../output/compile")
    // buildResources: path.join(__dirname, "../../output/build")
  },
  nsis: {
    oneClick: false,
    allowToChangeInstallationDirectory: true
  }
};
