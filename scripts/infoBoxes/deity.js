import { element, text } from "./element.js";
import { infoBoxHeader } from "./components.js";

export const deityInfoBoxTable = (data) => {
  return element.table(
    {
      className: ["infobox race"],
      style: "text-align: left; width: 240px",
    },
    [
      element.tbody({}, [
        element.tr({}, [infoBoxHeader(data?.name ?? "", "#d7d6dc")]),
        element.tr({}, [
          element.td({ colspan: 2 }, [element.img({ src: data?.image || "" })]),
        ]),
      ]),
    ],
  );
};
