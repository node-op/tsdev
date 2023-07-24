const mod = require('node:module')

function register() {
  Object.entries(mod._extensions).forEach(([typeOfFile, callbacks]) => {
    mod._extensions[typeOfFile] = (modd, pathToFile) => {
      if (process.send) {
        process.send({pathToFile, nodeModules: modd.paths})
      }
      return callbacks(modd, pathToFile)
    }
  });
}

register()