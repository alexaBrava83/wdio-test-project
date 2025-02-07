export const config = {

    runner: 'local',
    maxInstances: 1,
    specs: [
        './test/specs/**/*.js'  
    ],
    capabilities: [{
        browserName: 'edge', 
        'ms:edgeOptions': {
            args: ['--headless'] 
        }
    }],
    baseUrl: 'https://www.saucedemo.com',
    framework: 'mocha',
    waitforTimeout: 10000,
    connectionRetryTimeout: 30000,
    connectionRetryCount: 3,
    reporters: ['spec'],

    mochaOpts: {
        ui: 'bdd',          
        timeout: 60000       
    },

    onPrepare: function() {
        console.log('Тестування почалося...');
    },
    onComplete: function() {
        console.log('Тестування завершено!');
    }
};