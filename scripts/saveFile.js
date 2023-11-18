import fs from "fs/promises";
import path from "path";
import templite from "templite";

export const saveFile = async (file) => {
  try {
    await fs.mkdir(path.join(process.cwd(), "dist"));
  } catch (e) {}

  const template = await fs.readFile(
    path.join(process.cwd(), "baseof.template.html"),
    "utf-8",
  );

  await fs.writeFile(
    path.join(process.cwd(), `dist/${file.slug}.html`),
    templite(template, {
      ...file.data,
      content: file.content,
    }),
  );
};
