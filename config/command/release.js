const fs = require("fs"),
  archiver = require("archiver"),
  moment = require("moment");

/** gulp release */
const timestamp = moment().format("YYYY-MM-DD HH.mm.ss");
!fs.existsSync("build/package") ? fs.mkdirSync("output/build") : {};
const output = fs.createWriteStream("./output/release " + timestamp + ".zip");
const archive = archiver("zip", {
  prefix: "release"
});
archive.pipe(output);
archive.directory("./output/build", false);
archive.finalize();
