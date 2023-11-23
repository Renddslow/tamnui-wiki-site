import { element, text } from "./element.js";
import { infoBoxHeader } from "./components.js";

export const raceInfoBoxTable = (data) => {
  return element.table(
    {
      className: ["infobox race"],
      style: "text-align: left; width: 240px",
    },
    [
      element.tbody({}, [
        element.tr({}, [infoBoxHeader(data?.race ?? "", "#d7d6dc")]),
        element.tr({}, [
          element.td({ colspan: 2 }, [element.img({ src: data?.image || "" })]),
        ]),
        element.tr({}, [infoBoxHeader("Statistics", "#d7d6dc")]),
        element.tr({}, [
          element.td({}, [text("Size")]),
          element.td({}, [text(data.size)]),
        ]),
        element.tr({}, [
          element.td({}, [text("Alignment")]),
          element.td({}, [text(data.alignment)]),
        ]),
        element.tr({}, [infoBoxHeader("General Information", "#d7d6dc")]),
        element.tr({}, [
          element.td({}, [text("Average lifespan")]),
          element.td({}, [text(data.average_lifespan)]),
        ]),
        element.tr({}, [
          element.td({}, [text("Languages")]),
          element.td({}, [text(data.languages ?? "")]),
        ]),
      ]),
    ],
  );
};
