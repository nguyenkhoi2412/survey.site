module.exports = {
  plugins: ["react"], // use the plugin rules within ESLint
  settings: {
    "import/resolver": {
      alias: [
        ["@app", "./src/app"],
        ["@assets", "./src/assets"],
        ["@dashboard", "./src/dashboard"],
        ["@components", "./src/components"],
        ["@surveys", "./src/www/survey"],
        ["@transports", "./src/www/transport"],
        ["@redux", "./src/redux"],
        ["@utils", "./src/utils"],
        ["@services", "./src/services"],
        ["@stores", "./src/stores"],
      ],
    },
  },
};
