# Generate cucumber html report  using Cypress bdd cucumber framework

# Prerequisites

The first thing we need to do is to setup our environment. So here are some things that you should have to start this project:

VSCode: https://code.visualstudio.com/download </br>
NPM: https://www.npmjs.com/get-npm </br>
NodeJS: https://nodejs.org/en/download

# Steps to install html report dependencies
1. Go to - https://github.com/cucumber/json-formatter & https://github.com/cucumber/json-formatter/releases/tag/v19.0.0
2. Download cucumber-json-formatter-darwin-amd64
3. rename it to cucumber-json-formatter
4. Place it in root directory of project
5. Add the below links in package.json (just above dependencies)
  "cypress-cucumber-preprocessor": {
    "json": {
      "enabled": true,
      "output": "cypress/cucumber-json/cucumber-report.json"
    },
    "html": {
      "enabled": true
    },
    "messages": {
      "enabled": true
    }
  },
6. https://www.npmjs.com/package/multiple-cucumber-html-reporter
	npm install multiple-cucumber-html-reporter
7. Create a new file - cucucmber-html-report.js in root dir of project and paste the code given at https://www.npmjs.com/package/multiple-cucumber-html-reporter section: cucumber-js 2.x and lower
8. Update the file as below 
  	  jsonDir: 'cypress/cucumber-json/',     // Do not add file name here; only the folder path should be given 
   	 reportPath: 'cypress/cucumber-json/cucumber-report.html',
9. Run the tool as below to generate html report from json file 
	 sudo node cucumber-html-report.js  


# Screenshots
![cypress-cloud-runner-report](https://github.com/alagamai/cypress-api-automation-framework/blob/main/cypress/images/cypress-cloud-runner-report.png "cypress-cloud-runner-report")
![cypress-cloud-runner-view-report](https://github.com/alagamai/cypress-api-automation-framework/blob/main/cypress/images/cloud-runner-view-output.png "cypress-cloud-runner-view-report")


## Use

1. Checkout the project from git - git clone https://github.com/alagamai/cypress-api-automation-framework.git
2. Navigate to the project root directory -cypress-bdd-cucumber-html-report
3. Install dependencies with `npm install` 
4. See scripts in `package.json` and run the tests. The main ones are
* `npm run cy:open` - runs Cypress in GUI mode
* `npm run cy:test` - runs cypress test in headless mode
5. run node cucumber-html-report.js  
6. view report at cypress/cucumber-json/cucumber-report.html/index.html
    
# Application under test

https://demo.nopcommerce.com/
