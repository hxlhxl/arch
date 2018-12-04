module.exports = {
    plugins: {
      'autoprefixer': {},
      'postcss-reporter': {},
      'postcss-browser-reporter': {},
      'postcss-pxtorem': {
        rootValue: 100,
        propList: ['*'],
        minPixelValue: 1.001
      }
    }
  }
  