import { unified } from "unified";
import { join } from "path";
import { readFile } from "fs/promises";

const buildFile = async (filepath) => {
  const file = await readFile(filepath, "utf8");
};
