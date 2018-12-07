const path = require("path");
const fs = require("fs");
const walk = require("walk");

/**
 * How to use
 *  new FuckDebugger({
 *      entry:"./examples",
 *      ext:"html", // or ["html","js"]
 *      output:"./output",
 *  });
 * 
 * 
 * 
 * 
 */
class FuckDebugger {
    constructor(options) {
        if (!options) return;
        if (!options.entry) return;
        let defaultConf = {
            ext: ["cshtml", "html", "js"],
        };
        this.config = Object.assign({}, defaultConf, options);

        !(this.config.ext instanceof Array) ? this.config.ext = [this.config.ext] : 0;

        this.init();
    }
    init() {
        this.flattenFile(this.config.entry);
    }
    flattenFile(input) {
        let walker = walk.walk(input);
        this.files = [];

        walker.on('file', (root, stat, next) => {
            let fileName = stat.name;
            let filePath = root + '/' + fileName;
            let extName = path.extname(fileName).slice(1); // .js -> js
            let isMatch = this.config.ext.includes(extName);
            isMatch && this.files.push({
                path: filePath,
                name: fileName,
                extName: extName,
            });
            next();
        });
        walker.on('end', () => {
            this.files.forEach(fileInfo => {
                fs.readFile(fileInfo.path, { encoding: 'utf-8' }, (err, data) => {
                    if (!err) {
                        if (data === "") {
                            return;
                        }
                        let extName = fileInfo.extName;
                        let isJsFile = extName === "js";
                        if (isJsFile) {
                            this.fuckJs(data);
                        } else {
                            this.fuckHtml(data);
                        }
                    }
                });
            });

        });
    }
    fuckJs(str) {
        let debuReg = /\bdebugger\b;?/g;
        let consoleReg=/console\.log(\([^)]*)\);?/g;
        str=str.replace(debuReg,"").replace(consoleReg,"");
        console.log(str);
    }
    fuckHtml(str) {
        let scriptReg=/<script(\s[^>]*)?>([^<]+)<\/script>/g;
        // TODO
    }
}


new FuckDebugger({
    entry: path.resolve(__dirname, "../examples"),
    // ext: ["html","js"], // or ["html","js"]
    // output: "./output",
});