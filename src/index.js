const path = require("path");
const fs = require("fs");
const walk = require("walk");

// https://misc.flogisoft.com/bash/tip_colors_and_formatting
const style = {
    "Red": 31,
    "Green": 32,
    "Yellow": 33,
    "Light red": 91,
    "Light green": 92,
    "Light yellow": 93,
    "Light cyan": 96,
};

function logger(str, color) {
    console.log(`\x1B[${style[color]}m${str}`);
}
const yf = {
    log(str) {
        logger(str, "Light green");
    },
    info(str) {
        logger(str, "Light cyan");
    },
    warn(str) {
        logger(str, "Light yellow");
    },
    error(str) {
        logger(str, "Light red");
    }
};




class FuckDebugger {
    constructor(options) {
        if (!options) throw new ReferenceError("We need param 'entry'");
        if (!options.entry) throw new ReferenceError("We need param 'entry'");
        let defaultConf = {
            ext: ["cshtml", "html", "js"],
        };
        this.config = Object.assign({}, defaultConf, options);

        !(this.config.ext instanceof Array) ? this.config.ext = [this.config.ext] : 0;

        this.flattenFile(this.config.entry);
    }
    flattenFile(input) {
        let walker = walk.walk(input);
        let files = [];
        let startTime = 0;
        let endTime = 0;

        walker.on('file', (root, stat, next) => {
            yf.info("Reading...");
            startTime = this.timeTravel();
            let fileName = stat.name;
            let filePath = path.join(root, fileName);
            let extName = path.extname(fileName).slice(1); // .js -> js
            let isMatch = this.config.ext.includes(extName);
            isMatch && files.push({
                path: filePath,
                name: fileName,
                extName: extName,
            });
            next();
        });
        walker.on('end', () => {
            yf.info("Ok, Happy day");
            files.map(fileInfo => {
                fs.readFile(fileInfo.path, { encoding: 'utf-8' }, (err, data) => {
                    if (err) { return yf.error(err); }
                    if (data === "") {
                        yf.warn("The file is empty");
                        return;
                    }
                    let extName = fileInfo.extName;
                    let isJsFile = extName === "js";
                    if (isJsFile) {
                        fileInfo.data = this.fuckJs(data);
                    } else {
                        fileInfo.data = this.fuckHtml(data);
                    }
                    fs.writeFile(fileInfo.path, fileInfo.data, (err) => {
                        if (!err) {
                            endTime = this.timeTravel();
                            yf.log(`${endTime - startTime}ms | ${fileInfo.path}`);
                        }
                    });
                });
            });
        });
    }
    fuckJs(str) {
        let reg = /\bdebugger\b;?/g;
        let consoleReg = /console\.log(\([^)]*)\);?/g;
        str = str.replace(reg, "").replace(consoleReg, "");
        return str;
    }
    fuckHtml(str) {
        let reg = /(?<=<script([^>]*)>)([^<]+)(?=<\/script>)/g;
        str = str.replace(reg, (all) => {
            return this.fuckJs(all);
        });
        return str;
    }
    timeTravel() {
        return Date.now();
    }
}

module.exports = FuckDebugger;