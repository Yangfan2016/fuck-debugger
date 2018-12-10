const path = require("path");
const fs = require("fs");
const walk = require("walk");
const color = require("./color");

class FuckDebugger {
    constructor(options) {
        if (!options) {
            color.error("An unexpected error ocurred");
            throw new TypeError("We need param 'entry'");
        }
        if (!options.entry) throw new TypeError("We need param 'entry'");
        let defaultConf = {
            ext: ["cshtml", "html", "js"],
        };
        this.config = Object.assign({}, defaultConf, options);

        !(this.config.ext instanceof Array) ? this.config.ext = [this.config.ext] : 0;
    }
    fuckIt() {
        this.flattenFile(this.config.entry);
    }
    flattenFile(input) {
        let walker = walk.walk(input);
        let files = [];
        let startTime = 0;
        let endTime = 0;

        walker.on('file', (root, stat, next) => {
            color.info("Reading...");
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
            color.info("Ok, Happy day");
            files.map(fileInfo => {
                fs.readFile(fileInfo.path, { encoding: 'utf-8' }, (err, data) => {
                    if (err) { return color.error(err); }
                    if (data === "") {
                        color.warn("The file is empty");
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
                            color.log(`${endTime - startTime}ms | ${fileInfo.path}`);
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