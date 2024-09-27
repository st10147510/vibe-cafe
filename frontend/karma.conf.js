// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client: {
      jasmine: {
        // You can add configuration options for Jasmine here
        // The possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // For example, you can disable random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false // Leave Jasmine Spec Runner output visible in the browser
    },
    jasmineHtmlReporter: {
      suppressAll: true // Removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/app'),
      subdir: '.',
      reporters: [
        { type: 'html' },
        { type: 'text-summary' }
      ]
    },
    reporters: ['progress', 'kjhtml'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessNoSandbox'], // Use ChromeHeadlessNoSandbox in CI environments
    customLaunchers: {
      ChromeHeadlessNoSandbox: {
        base: 'ChromeHeadless',
        flags: [
          '--no-sandbox',
          '--disable-gpu',
          '--disable-setuid-sandbox',
          '--headless',
          '--disable-dev-shm-usage',
          '--remote-debugging-port=9222',
          '--disable-software-rasterizer'
        ]
      }
    },
    singleRun: false,
    restartOnFileChange: true
  });
};
