# Elecktron WebSocket API with TypeScript Example
## Overview

[Elektron WebSocket API](https://developers.thomsonreuters.com/websocket-api) enables easy integration into a multitude of client technology environments such as scripting and web.  This API runs directly on your TREP infrastructure or the Thomson Reuters platform and presents data in an open (JSON) readable format. The API supports all Thomson Reuters Elektron data models and can be integrated into multiple client technology standards e.g. Python, R, .Net etc.

[TypeScript](https://www.typescriptlang.org) programming language is a typed superset of JavaScript that compiles to readable, standards-based JavaScript. The language is designed for application-scale JavaScript by adding optional types, classes, modules, ECMAScript 2015 features and future proposals to JavaScript. TypeScript supports tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript is as a first-class programming language in Microsoft Visual Studio, [Angular](https://angularjs.org/) web application platform. It also supported by various application frameworks like [React](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter), [NodeJS and Express framework](https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter), [ASP.Net Core](https://www.typescriptlang.org/docs/handbook/asp-net-core.html), [Vue.js](https://github.com/Microsoft/TypeScript-Vue-Starter#typescript-vue-starter) and more. 

This example shows how to implement the Elektron WebSocket API JavaScript web application with TypeScript. The web application source codes are implemented in TypeScript language to connect, consume and display data from the ADS server via the Elektron WebSocket API in the web browsers. All source codes will be compiled to readable JavaScript with [Webpack](https://webpack.js.org/) JavaScript module bundler.

*Note: The initial release of this API is for deployed TREP customers only (i.e. to use it you will need an installed version of TREP 3.2). 

## Supported Web Browsers
The example supports Chrome, Firefox and IE11 (based on the WebSocket and Web Workers browser supported platform).

## Prerequisite
This example requires the following dependencies softwares.
1. [Node.js](https://nodejs.org/en/) - version 6.10 or higher.
2. [npm](https://www.npmjs.com/) package manager (included in Node.js)
3. [TypeScript](https://www.typescriptlang.org) compiler
4. [Express.js](https://expressjs.com/) web framework

This example also uses the following 3rd party libraries for UI presentation.
1. [jQuery 3.2.1](https://jquery.com/) 
2. [Bootstrap 3.3.7](https://getbootstrap.com/docs/3.3/)

jQuery,Bootstrap and Express.js are distributed under the [MIT license](https://opensource.org/licenses/MIT). Please see more detail in the LICENSE.md file.

## Package
The project includes complete TypeScript source codes, a simple Express.js web server applciation file, CSS files and all required static dependencies. The dynamic dependencies for compiling and building JavaScript source file are defined in *package.json* file which can be installed via ```npm install``` command.

The project includes the following files and folder
- *src/* folder: The folder that contains all TypeScript source files
- *web/* folder: The folder that contains all application web page files
    - *web/dist* folder: The folder that the compiled JavaScript file named *web_app.js* will be generated
    - *web/index.html*: The application HTML page
    - *web/css/cover.css*: The application CSS file
    - *web/libs/jquery-3.2.1.min.js*: jQuery library file
    - *web/bootstrap/css*, *web/bootstarp/fonts* and *web/bootstrap/js* folders: The folders for Bootstrap CSS and libraries files
- package.json: Project's NPM dependencies file
- tsconfig.json: Project's TypeSccript compiler options file
- webpack.config.js: Project's Webpack compiler options file
- server.js: Project's simple web server application file. 

## How to run this example application
1. Unzip or download the example project folder into a directory of your choice 
2. Run ```$> npm install``` in the command prompt to install all the dependencies required to run the sample in a subdirectory called *node_modules/*.

![npm command display](images/npm_install.png "npm command display")

3. If the machine is behind a proxy server, you need to configure Node.js uses proxy instead of a direct HTTP connection via the following command in command prompt: ```set https_proxy=http://<proxy.server>:<port>```
4. Run ```$> npx webpack``` in the command prompt to build and compile all TypeScript files in *src* into JavaScript source file (*/web/dist/* folder)

![webpack command display](images/webpack_screen2.png "webpack command display")

5. Run ```$> node server.js``` in the command prompt to start the web server at HTTP port 8080

![application display](images/run_server.png "run server")

6. Open web browser (IE11, Chorme and Firefox), then navigate to index.html of the web server at ```http://localhost:8080/index.html```

![application display](images/application_screen.png "application display")

## References
For further details, please check out the following resources:
* [Thomson Reuters Elektron WebSocket API page](https://developers.thomsonreuters.com/websocket-api) on the [Thomson Reuters Developer Community](https://developers.thomsonreuters.com/) web site.
* [Developer Webinar Recording: Introduction to Electron Websocket API](https://www.youtube.com/watch?v=CDKWMsIQfaw)
* [TypeScript programming language: Documentation](https://www.typescriptlang.org/docs/home.html).
* [Mozilla Developer Network: Web Workers API page](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

For any question related to this article or Elektron WebSocket API page, please use the Developer Community [Q&A Forum](https://community.developers.thomsonreuters.com/).
