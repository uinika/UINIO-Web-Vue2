const fs = require("fs"),
  archiver = require("archiver"),
  moment = require("moment");

/** npm run release */
if(fs.existsSync("output/build")){
  const timestamp = moment().format("YYYY-MM-DD HH.mm.ss");
  const output = fs.createWriteStream("./output/release " + timestamp + ".zip");

  const archive = archiver("zip", {
    prefix: "release"
  });

  archive.pipe(output);
  archive.directory("./output/build", false);
  archive.finalize();
}
