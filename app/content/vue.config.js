// Need this for VSCode debugging
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
let widget_name = "content"
module.exports = {
  productionSourceMap: false,
  css: {
    extract: true // bundle the CSS with JS and apply dynamically
  },
  configureWebpack: {
    devtool: 'source-map',
    // Uncomment to run the bundle analyzer
    //plugins: [new BundleAnalyzerPlugin()],
    optimization: {
      splitChunks: false,
      minimize: false,
    },
    output: {
      filename: `${widget_name}.js`,
      chunkFilename: `${widget_name}.chunk.js`
    },
    module: {
      rules: [
        {
          exclude: /hxclasses_es6\.js/
        }
      ]
    }
  },
  chainWebpack: config => {
    if (config.plugins.has("extract-css")) {
      const extractCSSPlugin = config.plugin("extract-css");
      extractCSSPlugin &&
        extractCSSPlugin.tap(() => [
          {
            filename: `${widget_name}.css`
          }
        ]);
    }
  }
}
