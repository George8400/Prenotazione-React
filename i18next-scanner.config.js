module.exports = {
  /**
   * Input folder (source code)
   **/
  input: [
    "**/*.{tsx, ts}",
    "classes/**/*.ts",
    "models/**/*.ts",
    "utils/**/*.ts",
  ],
  /**
   * Output folder (translations)
   **/
  output: "./",
  options: {
    removeUnusedKeys: true,
    /**
     * Whether to sort translation keys in alphabetical order
     **/
    sort: true,
    func: {
      /**
       * List of function names which mark translation strings
       **/
      list: ["i18next.t", "i18n.t", "t", "__"],
      extensions: [".mjs", ".js", ".tsx", ".ts"],
    },
    /**
     * List of supported languages
     **/
    lngs: ["en", "it"],
    defaultLng: "it",
    /**
     * Default value returned for missing translations
     **/
    defaultValue: "",
    resource: {
      /**
       * Where translation files should be loaded from
       **/
      loadPath: "i18n/translations/{{lng}}.json",
      /**
       * Where translation files should be saved to
       **/
      savePath: "i18n/translations/{{lng}}.json",
      jsonIndent: 2,
      lineEnding: "\n",
    },
    keySeparator: ".",
    pluralSeparator: "_",
    contextSeparator: "_",
    contextDefaultValues: [],
    /**
     * Values surrounded by {{ }} are treated as params
     * e.g. "Hello {{ name }}" - "name" must be provided at runtime
     **/
    interpolation: {
      prefix: "{{",
      suffix: "}}",
    },
  },
};
