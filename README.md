# Change Notifier
<!-- badge -->
![How the project is going on?](https://img.shields.io/badge/status-abandoned😣-red.svg)
![Does it build?](https://img.shields.io/badge/build-passing😍-brightgreen.svg)
![When has it been done?](https://img.shields.io/badge/year-2016-lightgrey.svg)
![Where can it be used?](https://img.shields.io/badge/platform-windows💻-blue.svg)
[![Downloads?](https://img.shields.io/badge/download-exe👏-blue.svg)](https://github.com/marianfx/change-notifier/archive/master.zip)
<!-- endbadge -->

## What is this?
> I  would really love to have such an app that could notify me when something changes on a the teacher's website.

That's something I used to say regularly during University, while waiting for a teacher to post up test results and stuff like that. So, two ears later, in my last year there, as an experiment, I crafted this simple application that, given a website (page), notifies you of each change on that website. Too bad I did not got to use it so much.

It's built with **Electron** for **Windows** and it's capable of running _diffs_ on the page you provide and show you only what's changed, using _native notifications_. 

## Developer(s) thingies

#### Using the code
- `npm start` to run the application _(it uses bootstrapper.js as startup, which loads the application first transpiling using babel)_
- The code is organized as follows:
    - The directories `style, js, img` and the file `index.html` are all the required stuff for the front-end;
    - `boottrapper.js, main.js` and everything inside `scripts` directory is the backend

#### Main Tech
- **JavaScript** _(ES2015 with Babel)_
- **Node.JS** _(v4)_
- **Electron** _(v1.4)_

#### Packeges Used
##### General
- **babel-register** _(v6.3)_ and **babel-preset-es2015**_(v6.3)_
    > for transforming ES2015 code into Node compatible code (Node wasn't supporting this back then) 
- **eslint** _(v3)_ and **eslint-config-es2015**_(v1)_
    > for code parsing / validation
- **electron** _(v1.4)_
    > embedding Node.JS Applications into a nice WebView and run them on Windows (this case) platform
##### Frontend
- **materialize**
    > Frontend framework
- **jQuery** _(v3.1)_
    > DOM handling & extras
- **lodash** _(v4.16)_
    > Array  & Object handling
- **sweetalert** _(v1.1)_
    >  beautiful alerts for users
##### Backend
- **Node.js** _(v4)_
    > you know what it is
- **zombie** _(v5.0)_
    > headless browser, for virtual navigation to websites
- **diff** _(v3.0)_
    > for getting just the differences between different page eversions
- **node-notifier** _(v4.6)_
    > for displaying native (Windows) notifications

## Using the Application
1. Start the application, after downloading it, from `change-notifier.exe` file
2. Insert, in the big input from the main screeen, the address of the web page you want to check
3. Specify the interval (in seconds) in which you want the check to repeat itself.
4. Toggle the switch to make everything running. Then you are done, you can minimize it, the application will check the address you specified at the given interval and will notify you if something changes (and what changes).

### System Requirements
- **Hardware**: Laptop/PC
- **Operating System**: Windows
- **RAM**: 1 GB
- **CPU**: any decent one


## Video Demo
<iframe width="560" height="315" src="https://www.youtube.com/embed/fPaP4FSLEfc?rel=0" frameborder="0" allowfullscreen></iframe>

## License
> Released under MIT License