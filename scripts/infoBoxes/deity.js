import { element, text } from "./element.js";
import { infoBoxHeader } from "./components.js";

export const deityInfoBoxTable = (data) => {
  console.log(data);
  return element.table(
    {
      className: ["infobox race"],
      style: "text-align: left; width: 300px",
    },
    [
      element.tbody({}, [
        element.tr({}, [infoBoxHeader(data?.name ?? "", "#d7d6dc")]),
        element.tr({}, [
          element.td({ colspan: 2 }, [element.img({ src: data?.image || "" })]),
        ]),
        element.tr({}, [infoBoxHeader("Basic Information", "#d7d6dc")]),
        element.tr({}, [
          element.td({}, [text("Title(s)")]),
          element.td({}, [
            element.ul(
              {},
              (data?.titles ?? []).map((title) =>
                element.li({}, [text(title)]),
              ),
            ),
          ]),
        ]),
      ]),
      element.tr({}, [
        element.td({}, [text("Pantheon")]),
        element.td({}, [
          element.ul(
            {},
            (data?.pantheons ?? []).map((pantheon) =>
              element.li({}, [
                element.a(
                  {
                    href: `/${pantheon
                      .toLowerCase()
                      .replace(/\w/g, "-")}-pantheon`,
                  },
                  [text(`${pantheon} Pantheon`)],
                ),
              ]),
            ),
          ),
        ]),
      ]),
      element.tr({}, [
        element.td({}, [text("Gender")]),
        element.td({}, [text(data?.gender ?? "")]),
      ]),
      element.tr({}, [infoBoxHeader("Statistics", "#d7d6dc")]),
      element.tr({}, [
        element.td({}, [text("Alignment")]),
        element.td({}, [text(data?.alignment ?? "")]),
      ]),
      element.tr({}, [
        element.td({}, [text("Symbol")]),
        element.td({}, [text(data?.symbol ?? "")]),
      ]),
      element.tr({}, [
        element.td({}, [text("Abode(s)")]),
        element.td({}, [
          element.ul(
            {},
            (data?.abodes ?? []).map((abode) => element.li({}, [text(abode)])),
          ),
        ]),
      ]),
      element.tr({}, [
        element.td({}, [text("Domains")]),
        element.td({}, [
          element.ul(
            {},
            (data?.domains ?? []).map((domain) =>
              element.li({}, [text(domain)]),
            ),
          ),
        ]),
      ]),
    ],
  );
};
