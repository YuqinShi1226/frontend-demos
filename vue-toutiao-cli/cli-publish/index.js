module.exports = api => {
    api.registerCommand('publish', args => { 
        // Copy dist to desktop
        const webpackConfig = api.resolveWebpackConfig()
        console.log('webpackConfig::', webpackConfig)
    }); 
};