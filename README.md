# Elecktron WebSocket API with TypeScript Example
## Overview

[Elektron WebSocket API](https://developers.thomsonreuters.com/elektron/websocket-api-early-access) enables easy integration into a multitude of client technology environments such as scripting and web.  This API runs directly on your TREP infrastructure or the Thomson Reuters platform and presents data in an open (JSON) readable format. The API supports all Thomson Reuters Elektron data models and can be integrated into multiple client technology standards e.g. Python, R, .Net etc.

[TypeScript](https://www.typescriptlang.org) programming language is a typed superset of JavaScript that compiles to readable, standards-based JavaScript. The language is designed for application-scale JavaScript by adding optional types, classes, modules, ECMAScript 2015 features and future proposals to JavaScript. TypeScript supports tools for large-scale JavaScript applications for any browser, for any host, on any OS. TypeScript is as a first-class programming language in Microsoft Visual Studio, [Angular](https://angularjs.org/) web application platform. It also supported by various application frameworks like [React](https://github.com/Microsoft/TypeScript-React-Starter#typescript-react-starter), [NodeJS and Express framework](https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter), [ASP.Net Core](https://www.typescriptlang.org/docs/handbook/asp-net-core.html), [Vue.js](https://github.com/Microsoft/TypeScript-Vue-Starter#typescript-vue-starter) and more. 

This example shows how to implement the Elektron WebSocket API JavaScript web application with TypeScript. The web application source codes are implemented in TypeScript language to connect, consume and display data from the ADS server via the Elektron WebSocket API in the web browsers. All source codes will be compiled to readable JavaScript with [Webpack](https://webpack.js.org/) JavaScript module bundler.

## Supported Web Browsers
The example supports Chrome, Firefox and IE11 (based on the WebSocket and Web Workers browser supported platform).

## Prerequisite
This example requires the following dependencies softwares.
1. [Node.js](https://nodejs.org/en/) - version 6.10 or higher.
2. [npm](https://www.npmjs.com/) package manager (included in Node.js)
2. [TypeScript](https://www.typescriptlang.org)

This example also uses the following 3rd party libraries for UI presentation.
1. [jQuery 3.2.1](https://jquery.com/) 
2. [Bootstrap 3.3.7](https://getbootstrap.com/docs/3.3/)

Both of jQuery and Bootstrap are distributed under the [MIT license](https://opensource.org/licenses/MIT). Please see more detail in the LICENSE.md file.

## How to run this example application
1. Unzip or download the example project folder into a directory of your choice 
2. Run ```$> npm install``` in the command prompt to install all the dependencies required to run the sample in a subdirectory called *node_modules/*.
3. Run ```$> webpack``` in the command prompt to build and compile all TypeScript files into JavaScript
4. Deploy the project in any web server (recommend [http-server](https://www.npmjs.com/package/http-server) for quick dev/testing)


## References
For further details, please check out the following resources:
* [Thomson Reuters Elektron WebSocket API page](https://developers.thomsonreuters.com/elektron/websocket-api-early-access) on the [Thomson Reuters Developer Community](https://developers.thomsonreuters.com/) web site.
* [TypeScript programming language: Documentation](https://www.typescriptlang.org/docs/home.html).
* [Mozilla Developer Network: Web Workers API page](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)

For any question related to this article or Elektron WebSocket API page, please use the Developer Community [Q&A Forum](https://community.developers.thomsonreuters.com/).

npm install -g webpack
npm install --save-dev jquery
npm install --save-dev bootstrap@3
npm install --save @types/jquery
npm install --save @types/websocket
npm install --save-dev typescript awesome-typescript-loader source-map-loader
npm install --save-dev bulma