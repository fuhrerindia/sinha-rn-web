#! /usr/bin/env node
import chalk from "chalk";
import Box from 'cli-box';
import shelljs from "shelljs";
import fs from 'fs';

const ACTION = process.argv[2];
const API_KEY = "ef2d2010-9399-4a50-b506-33bb07132ce6";
const PROJECT_BUCKET = "rn-web-files";
function downloadFile(serverFileName, outPutFileName) {
    shelljs.exec(`curl -L -H "Authorization: Bearer ${API_KEY}" "https://sourceforge.net/projects/${PROJECT_BUCKET}/files/${serverFileName}" -o ${outPutFileName}`);
}
function modifyPackageJson() {
    fs.readFile('package.json', 'utf8', (err, data) => {
        if (err) {
            console.log(chalk.bold.red(err));
        } else {
            let packageData = JSON.parse(data);
            packageData['scripts']['web'] = `webpack-dev-server --mode development --open --hot`;
            packageData['scripts']['web-build'] = `webpack --mode production`;
            const updatedPackage = JSON.stringify(packageData, null, 2);
            fs.writeFile('package.json', updatedPackage, 'utf8', (err) => {
                if (err) {
                    console.log(chalk.bold.red("Error in Updating package.json"));
                } else {
                    shelljs.rm('yarn.lock');
                    shelljs.rm('package-lock.json');
                    shelljs.exec('npm install');
                }
            });
        }
    });
}

function addWebSupport(initial) {
    shelljs.exec('npm install react react-dom react-native-web');
    shelljs.exec('npm install @babel/core @babel/preset-env @babel/preset-react babel-loader html-webpack-plugin webpack webpack-cli webpack-dev-server --save-dev');
    if (initial) {
        shelljs.rm('App.*');
        downloadFile('App.tsx', 'App.jsx');
    }
    downloadFile('webpack.config.js', 'webpack.config.js');
    shelljs.mkdir('web');
    shelljs.cd('web');
    downloadFile('index.html', 'index.html');
    downloadFile('index.js', 'index.js');
    shelljs.cd('..');
    modifyPackageJson();

    console.log(Box({ w: 50, h: 5 }, chalk.bold.green('Success: Web Modules were added to the project')));
    console.log(chalk.blue('Run `npm run web` to test on WEB'))

}

if (ACTION === 'init') {
    if (process.argv[3] === undefined) {
        console.log(chalk.bold.yellow('Error: No Project Name Provided'));
    } else {
        const appName = process.argv[3];
        var b5 = Box({ w: 40, h: 3 }, chalk.bold.blue(`Creating React Native Project: ${appName}`));
        console.log(b5.toString());
        shelljs.exec(`npx react-native@latest init ${appName}`)
        shelljs.cd(appName);
        addWebSupport(true);
    }
} else if (ACTION === 'add-web') {
    addWebSupport(false);
}