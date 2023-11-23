import { raceInfoBoxTable } from "./infoBoxes/race.js";

export const infoBoxParser = () => (tree, file) => {
  if (Object.keys(file.data?.matter ?? {}).length === 0) return;

  let infoBox;
  switch (file.data.matter?.info_box_type) {
    case "race":
      infoBox = raceInfoBoxTable(file.data.matter);
      break;
  }

  if (infoBox) {
    tree.children.unshift(infoBox);
  }
};
