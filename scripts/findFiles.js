import fs from "fs/promises";
import path from "path";

export const findFiles = async () => {
  const dir = path.join(process.cwd(), "tamnui-wiki");
  const files = await fs.readdir(dir);
  return files
    .filter((file) => path.extname(file) === ".md")
    .map((file) => path.join(dir, file));
};
