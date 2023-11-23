import cssnanoPlugin from "cssnano";
import atImportPlugin from "postcss-import";

export default {
  plugins: [
    atImportPlugin({
      from: ["./styles"],
    }),
    cssnanoPlugin({
      preset: "default",
    }),
  ],
};
