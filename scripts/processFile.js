import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeTOC from "@jsdevtools/rehype-toc";
import remarkHeadingId from "remark-heading-id";
import rehypeWrap from "rehype-wrap";
import { read } from "to-vfile";
import path from "path";
import slugify from "slugify";
import { matter } from "vfile-matter";
import remarkFrontmatter from "remark-frontmatter";

import { obsidianPlugin } from "./obsidianParser.js";
import { infoBoxParser } from "./infoBoxParser.js";

export const processFile = async (filepath) => {
  const data = await unified()
    .use(remarkParse)
    .use(() => (tree, file) => {
      matter(file, { strip: true });
    })
    .use(remarkFrontmatter)
    .use(obsidianPlugin)
    .use(remarkGfm)
    .use(remarkHeadingId, { defaults: true })
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeWrap, { wrapper: "main.content" })
    .use(rehypeTOC, {
      headings: ["h2"],
      position: "beforebegin",
      customizeTOC: (table) => {
        const navHasChildren = table.children.every(
          (child) => child.children.length > 1,
        );
        return navHasChildren && table;
      },
    })
    .use(infoBoxParser)
    .use(rehypeStringify, { allowDangerousHtml: true })
    .process(await read(filepath));

  return {
    filepath,
    data: {
      ...data.data,
      title: data.data.title || path.basename(filepath, path.extname(filepath)),
    },
    content: String(data),
    slug: slugify(path.basename(filepath, path.extname(filepath)), {
      lower: true,
    }),
  };
};
