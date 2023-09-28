# React Native Web CLI
This is Command Line tool to create a React Native Project with `web` support. By default `react-native` only initializes `android` and `iOS` support, but this CLI tool  can be used to initialize a project with `web` support.

# Web Platform Files
Seee repository [`sinhapaurush/rn-web-files`](https://github.com/sinhapaurush/rn-web-files) for files and Contirbution in files.

- It uses conventional `npx react-native init` command only to initialize React Native project, and then adds packages and files required for `web` support.

- You can add `web` support to existing React Native projects too with this tool.

- It is not using `create-react-app` to initialize `web` platform, instead it is using `webpack` directly.

- It uses `react-native-web` under the hood

## Commands
### sinha-rn-web init
Use this command to initialize the project, it runs `npx react-native@latest init` command hence it will take few more time maybe few minutes to initialize project. It the adds support to the created project.

Use command below to initialize the app
```bash
npx sinha-rn-web@latest init MyTestApp
```
### sinha-rn-web add-web
This command adds `web` platform support to existing `React Native` projects, hence if you have an existing project then navigate to your project root and run the command below to add `web` support.

```bash
npx sinha-rn-web@latest add-web
```

## Testing and Building
### Test
To test the `web` platform while development, run the command below in your project.
```bash
npm run web
```
### Building
To create production build of your project for web, run the command below.
```bash
npm run web-build
```
You will get your production build in `build` folder in your project's `web` directory. Hence in `./web/build/`
