import { element, text } from "./element.js";

export const raceInfoBoxTable = (data) => {
  return element.table(
    {
      className: ["infobox race"],
      style: "text-align: left; width: 240px; font-size: 100%",
    },
    [
      element.tbody({}, [
        element.tr({}, [
          element.th({ colspan: 2, className: ["infobox-above"] }, [
            text(data.race),
          ]),
        ]),
        element.tr({}, [
          element.td({ colspan: 2 }, [element.img({ src: data.image })]),
        ]),
        element.tr({}, [element.th({ colspan: 2 }, [text("Statistics")])]),
        element.tr({}, [
          element.td({}, [text("Size")]),
          element.td({}, [text(data.size)]),
        ]),
        element.tr({}, [
          element.td({}, [text("Alignment")]),
          element.td({}, [text(data.alignment)]),
        ]),
        element.tr({}, [
          element.th({ colspan: 2 }, [text("General Information")]),
        ]),
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
