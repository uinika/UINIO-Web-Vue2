const gulp = require("gulp"),
  fs = require("fs"),
  archiver = require("archiver"),
  moment = require("moment");

/** gulp release */
const timestamp = moment().format("YYYY-MM-DD HH.mm.ss");
!fs.existsSync("build/package") ? fs.mkdirSync("build/package") : {};
const output = fs.createWriteStream("./build/release " + timestamp + ".zip");
const archive = archiver("zip", {
  prefix: "release"
});
archive.pipe(output);
archive.directory("./build", false);
archive.finalize();
