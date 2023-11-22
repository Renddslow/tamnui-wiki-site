import { visit } from "unist-util-visit";
import { toString } from "mdast-util-to-string";
import { toMarkdown } from "mdast-util-to-markdown";
import { gfmFootnoteToMarkdown } from "mdast-util-gfm-footnote";
import { gfmStrikethroughToMarkdown } from "mdast-util-gfm-strikethrough";
import remarkParse from "remark-parse";
import remarkHtml from "remark-html";
import remarkGfm from "remark-gfm";
import remarkFrontmatter from "remark-frontmatter";
import { remark } from "remark";
import { unified } from "unified";
import fs from "fs";
import slugify from "slugify";

export const BRACKET_LINK_REGEX =
  /\[\[([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)#?([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\|?([a-zA-ZÀ-ÿ0-9-'?%.():&,+/€! ]+)?\]\]/g;
export const EMBED_LINK_REGEX = /!\[\[(.*?)]]/g;
export const CODE_BLOCK_REGEX = /(```[\s\S]*?```)|(?:`[^`]*?`)/g;

const handleBracketLink = (paragraph, node) => {
  const html = paragraph.replace(
    BRACKET_LINK_REGEX,
    (bracketLink, link, heading, text) => {
      const href = `/${slugify(link, { lower: true })}`;

      if (
        node.children.some(
          ({ value, type }) => value === bracketLink && type === "inlineCode",
        )
      ) {
        return bracketLink;
      }

      if (heading && text) {
        return `<a href="${href}#${slugify(heading, {
          lower: true,
        })}" title="${text}">${text}</a>`;
      }

      if (heading) {
        return `<a href="${href}#${slugify(heading, {
          lower: true,
        })}" title="${link}">${link}</a>`;
      }

      if (text) {
        return `<a href="${href}" title="${text}">${text}</a>`;
      }

      return `<a href="${href}" title="${link}">${link}</a>`;
    },
  );

  if (html === paragraph) return node;

  delete node.children; // eslint-disable-line

  return Object.assign(node, { type: "html", value: html });
};

export const obsidianPlugin = () => (tree) => {
  visit(tree, "paragraph", (node, index, parent) => {
    const markdown = toMarkdown(node, {
      extensions: [gfmFootnoteToMarkdown(), gfmStrikethroughToMarkdown],
    });
    const paragraph = String(
      unified().use(remarkParse).use(remarkHtml).processSync(markdown),
    );

    if (paragraph.match(EMBED_LINK_REGEX)) {
      const [, fileName] = EMBED_LINK_REGEX.exec(paragraph);

      if (node.children.some(({ type }) => type === "inlineCode")) {
        return node;
      }

      const isImage = fileName.match(/(png|jpg|jpeg|gif|svg)$/);

      const embedTree = remark()
        .use(remarkFrontmatter)
        .use(remarkGfm)
        .parse(
          isImage
            ? `![embedded](${
                fileName.startsWith("images") ? fileName : `/images/${fileName}`
              })`
            : "",
        );

      obsidianPlugin()(embedTree);

      parent.children.splice(index, 1, embedTree);

      return node;
    }

    if (paragraph.match(BRACKET_LINK_REGEX)) {
      handleBracketLink(paragraph, node);
    }
  });
  visit(tree, "heading", (node) => {
    const markdown = toMarkdown(node, {
      extensions: [gfmFootnoteToMarkdown(), gfmStrikethroughToMarkdown],
    });
    const paragraph = String(
      unified().use(remarkParse).use(remarkHtml).processSync(markdown),
    );
    if (paragraph.match(BRACKET_LINK_REGEX)) {
      handleBracketLink(paragraph, node);
    }
  });

  visit(tree, "paragraph", (node) => {
    const paragraph = toString(node);
    const highlightRegex = /==(.*)==/g;

    if (paragraph.match(highlightRegex)) {
      const html = paragraph.replace(highlightRegex, (markdown, text) => {
        if (
          node.children.some(
            ({ value, type }) => value === markdown && type === "inlineCode",
          )
        ) {
          return markdown;
        }

        if (
          node.children.some((n) => n.type === "strong" && text === toString(n))
        ) {
          return `<mark><b>${text}</b></mark>`;
        }

        return `<mark>${text}</mark>`;
      });

      if (html === paragraph) return node;

      delete node.children; // eslint-disable-line

      return Object.assign(node, { type: "html", value: `<p>${html}</p>` });
    }

    return node;
  });
};
