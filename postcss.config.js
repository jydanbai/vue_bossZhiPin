module.exports = {
  plugins: {
    autoprefixer: {
      overrideBrowserslist: [
        "Android >= 4",
        "iOS >= 8",
        "Chrome > 31",
        "ff > 31",
        "ie >= 8"
      ]
    },
    "postcss-pxtorem": {
      rootValue: 37.5,
      propList: ["*"]
    }
  }
};
