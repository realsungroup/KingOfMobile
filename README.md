# ts-vscode-boilerplate
Boilerplate Visual Studio Code TypeScript project.

Please visit [blog.wolksoftware.com](http://blog.wolksoftware.com/setting-up-your-typescript-vs-code-development-environment) to learn more about this template.

# How to use this template?

1) Download `.zip` and unzip it:
```
$ wget https://github.com/remojansen/ts-vscode-boilerplate/archive/master.zip
$ unzip master.zip
```

2) Install dependencies and their type definitions:

> Note: Before running the following commands, make sure you have [Node.js]() installed and 
that you have installed typings and gulp as global packages:
```
$ npm -g install gulp
$ npm -g install typings
```
wallaby 
```
$ cd ts-vscode-boilerplate
$ npm install
$ typings install
```

3) Open in VS Code

4) Use `Shift` + `Command` + `p` to open command panel and type "run task":

![](https://raw.githubusercontent.com/remojansen/ts-vscode-boilerplate/master/assets/run-task.png)

5) Select "run task" to see available gulp tasks:

![](https://raw.githubusercontent.com/remojansen/ts-vscode-boilerplate/master/assets/task-list.png)

6) Use `Shift` + `Command` + `=` and select "Start":

![](https://raw.githubusercontent.com/remojansen/ts-vscode-boilerplate/master/assets/enable-wallaby.png)

7) Enjoy real-time tests results powered by [Wallaby.js](http://wallabyjs.com/):
 
![](https://raw.githubusercontent.com/remojansen/ts-vscode-boilerplate/master/assets/wallaby.gif)
 
8) Enjoy coding with TypeScript