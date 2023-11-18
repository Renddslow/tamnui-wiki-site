import { findFiles } from "./findFiles.js";
import { processFile } from "./processFile.js";

(async () => {
  findFiles()
    .then((files) => Promise.all(files.map(processFile)))
    .then((files) => Promise.all(files.map(saveFile)));
})();
