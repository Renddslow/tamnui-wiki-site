import { unified } from "unified";
import { join } from "path";
import { readFile } from "fs/promises";
import remarkParse from "remark-parse";

export const processFile = async (filepath) => {
  const file = await readFile(filepath, "utf8");
  const { messages, data } = await unified().use(remarkParse).process(file);
};
