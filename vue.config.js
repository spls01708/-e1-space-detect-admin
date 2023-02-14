const path = require('path');
const webpack = require('webpack');

const cesiumSource = 'node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
const cesiumThirdParty = '../Build/Cesium/ThirdParty'; 
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
    context: __dirname,
    // create an alias for cesium module, to facilitate import and require more
    resolve: {
      alias: {
        cesium: path.resolve(__dirname, cesiumSource)
      }
    },
    amd: {
      // Enable webpack-friendly use of require in Cesium
      // Tells Cesium that the version of AMD webpack uses to evaluate require statements is not compliant with the standard toUrl function
      toUrlUndefined: true
    },
    plugins: [
      new CopyWebpackPlugin([
        {from: path.join(cesiumSource, cesiumWorkers), to: 'Cesium/Workers'},
        {from: path.join(cesiumSource, cesiumThirdParty), to: 'Cesium/ThirdParty'},
        {from: path.join(cesiumSource, 'Assets'), to: 'Cesium/Assets'},
        {from: path.join(cesiumSource, 'Widgets'), to: 'Cesium/Widgets'}
      ]),
      new webpack.DefinePlugin({
        // Define relative base path in cesium for loading assets
        CESIUM_BASE_URL: JSON.stringify('Cesium')
      })
    ]
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/elements/'
    : '/',
  devServer: {
    host: '127.0.0.1',
    port: 8080,
    public: 'localhost:8080',
    https: true,
  },
  
}

