module.exports = {
  apps : [{
    name   : "peek-pi-server",
    script : "./index.mjs",
    env_production: {
      NODE_ENV: "production"
    },
    env_development: {
      NODE_ENV: "development"
    }
  }]
}
