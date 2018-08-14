module.exports = {
    apps : [
        {
          name: "<MyMovieList>",
          script: "./server/index.js",
          watch: true,
          env: {
              "PORT": 3080,
              "NODE_ENV": "development"
          },
          env_production: {
              "PORT": 3080,
              "NODE_ENV": "production",
          }
        }
    ]
  }