import { element, text } from "./element.js";

export const infoBoxHeader = (label, color) => {
  return element.th(
    {
      colspan: 2,
      style: `min-width:15em; text-align: center; background-color: ${
        color ?? "transparent"
      }`,
    },
    [text(label)],
  );
};
