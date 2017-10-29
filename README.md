# World Cleanup Day Dummy data importer

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Table of Contents

- [Prepare to work with project](#prepare-to-work-with-project)
  - [Install Node.js and NPM](#install-nodejs-and-npm)
    - [Windows](#windows)
    - [Ubuntu](#ubuntu)
  - [Install yarn and create-react-app](#install-yarn-and-create-react-app)
  - [Install project dependencies](#install-project-dependencies)
- [Development mode](#development-mode)
- [Builds the app for production](#builds-the-app-for-production)
- [Run for import data](#run-for-import-data)

## Prepare to work with project
If you do not have installed Node.JS, NPM, Yarn and Create-react-app, to modify this application or build it production version, you need to prepare your computer. Follow the instructions below for this.

### Install Node.js and NPM
#### Windows
1. Download the Windows installer from the [Nodes.js web site](http://nodejs.org/) .
2. Run the installer (the .msi file you downloaded)
3. Follow the prompts in the installer (Accept the license agreement, click the NEXT button a bunch of times and accept the default installation settings).

#### Ubuntu
1. Run `sudo apt-get install ubuntu-make`
2. Run `sudo umake nodejs`
3. Run `sudo apt-get install npm`

### Install yarn and create-react-app
Run `npm install -g create-react-app yarn` in command prompt

### Install project dependencies
Go to project folder and run `yarn install` in command prompt.

## Development mode
Go to project folder and run `npm run start`. Open http://localhost:3000 to view it in the browser.

The page will reload if you make edits. You will also see any lint errors in the console.

## Builds the app for production
Run `npm run build` for creates a `build` directory with a production build of your app.
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.

After completing `npm run build` without errors, use the files in the `build` folder for deployment.

## Run for import data
Run `npm run static` for start local static server with application. Wait message `serving "./build" at http://127.0.0.1:8085` and after that open in your browser http://localhost:8085.
On first screen enter API URl (something like this: http://192.168.0.0:50000/api/v1) and Facebook App ID with authorisation for website `http://localhost:8085/` (you may try use this id: `135649593654536`).
Wait when app prepared all data. When data is prepared - click on "Start import" button.

