module.exports = {
  configureWebpack: config => {
    return {
      externals: {
        moment: 'moment'
      }
    }
  }
}
