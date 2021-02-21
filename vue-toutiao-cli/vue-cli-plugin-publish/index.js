var fsExtra = require('fs-extra')

module.exports = api => {
    api.registerCommand('publish', args => { 
        // Copy dist to desktop
        const webpackConfig = api.resolveWebpackConfig()
        const distDir = webpackConfig.output.path
        console.log('webpackConfig::', distDir)
        fsExtra.copy(
            distDir,
            '/Users/Yuqin/Desktop/online'
        )
    })
}