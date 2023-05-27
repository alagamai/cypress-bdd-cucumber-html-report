const { defineConfig } = require('cypress');
const preprocessor = require('@badeball/cypress-cucumber-preprocessor');
const browserify = require('@badeball/cypress-cucumber-preprocessor/browserify');
const cypress = require('cypress');

//https://www.way2automation.com/write-a-feature-file-in-cypress-using-cucumber-bdd/

async function setupNodeEvents(on, config) {
	// This is required for the preprocessor to be able to generate JSON reports after each run, and more,
	await preprocessor.addCucumberPreprocessorPlugin(on, config);

	on('file:preprocessor', browserify.default(config));

	// Make sure to return the config object as it might have been modified by the plugin.
	return config;
}

module.exports = defineConfig({
	'cypress-cucumber-preprocessor': {
		nonGlobalStepDefinitions: true,
	},
	experimentalStudio: true,
	e2e: {
		specPattern: '**/*.feature',
		setupNodeEvents,
		baseUrl: 'https://demo.nopcommerce.com/',
	},
	env: {},
});
