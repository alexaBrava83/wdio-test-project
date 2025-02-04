// wdio.conf.js

exports.config = {
    // Дефолтні параметри для конфігурації
    runner: 'local',

    // Кількість паралельних інстансів для тестів
    maxInstances: 1,

    // Шлях до тестових файлів
    specs: [
        './test/specs/**/*.js'  // Потрібно вказати правильний шлях до тестів
    ],

    // Браузер для тестування
    capabilities: [{
        browserName: 'edge',  // або 'chrome' якщо хочеш використовувати Chrome
        'ms:edgeOptions': {
            args: ['--headless'] // щоб запускати без відображення вікна (вікно не з'являтиметься)
        }
    }],

    // Фреймворк для тестів
    framework: 'mocha',

    // Тайм-аут для очікування елементів
    waitforTimeout: 10000,

    // Тайм-аут для сесії браузера
    connectionRetryTimeout: 30000,

    // Кількість спроб підключення при помилці
    connectionRetryCount: 3,

    // Репортери для зручного перегляду результатів
    reporters: ['spec'],

    // Mocha налаштування
    mochaOpts: {
        ui: 'bdd',           // Тестові підходи
        timeout: 60000       // Тайм-аут для кожного тесту
    },

    // Інші налаштування
    onPrepare: function() {
        console.log('Тестування почалося...');
    },
    onComplete: function() {
        console.log('Тестування завершено!');
    }
};
