const proxy = require('http-proxy-middleware')

module.exports = function(app) {
  app.use(
    proxy(["/"], {target: "http://localhost:3001"})
  )
}

//DONT FORGET TO CHANGE PACKAGE.JSON
// ADD: "proxy": "http://localhost:3001",