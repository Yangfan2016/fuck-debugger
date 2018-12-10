const expect = require("chai").expect;
const FuckDebugger = require("../src/index");
const path = require("path");
const fs = require("fs");

function readFile2Str(path) {
    return fs.readFileSync(path, { encoding: "utf-8" });
}
function takeJsFromScripTag(str) {
    let reg = /(?<=<script([^>]*)>)([^<]+)(?=<\/script>)/g;
    let res=[];
    str.replace(reg, (all) => {
        res.push(all);
    });
    return res.join("\\n");
}

let examplesPath = path.resolve(__dirname, "../examples");

describe("Strong", () => {
    it("No options", () => {
        try {
            new FuckDebugger();
        } catch (err) {
            expect(err)
                .to
                .be
                .instanceOf(TypeError);
        }
    });
    it("No entry", () => {
        try {
            new FuckDebugger({});
        } catch (err) {
            expect(err)
                .to
                .be
                .instanceOf(TypeError);
        }
    });
});
describe("File type: js", () => {
    let fd = new FuckDebugger({
        entry: examplesPath,
        ext: "js",
    });
    fd.fuckIt();
    it("No debugger", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.js"));
            expect(str)
                .to
                .not
                .match(/\bdebugger\b/g);
            done();
        }, 3e3);
    });
    it("No console.log", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.js"));
            expect(str)
                .to
                .not
                .match(/console\.log(\([^)]*)\);?/g);
            done();
        }, 3e3);
    });
});
describe("File type: html", () => {
    let fd = new FuckDebugger({
        entry: examplesPath,
        ext: "html",
    });
    fd.fuckIt();
    it("No debugger", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.html"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/\bdebugger\b/g);
            done();
        }, 3e3);
    });
    it("No console.log", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.html"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/console\.log(\([^)]*)\);?/g);
            done();
        }, 3e3);
    });
});
describe("File type: cshtml", () => {
    let fd = new FuckDebugger({
        entry: examplesPath,
        ext: "html",
    });
    fd.fuckIt();
    it("No debugger", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.cshtml"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/\bdebugger\b/g);
            done();
        }, 3e3);
    });
    it("No console.log", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.cshtml"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/console\.log(\([^)]*)\);?/g);
            done();
        }, 3e3);
    });
});
describe("File type: cshtml", () => {
    let fd = new FuckDebugger({
        entry: examplesPath,
        ext: "cshtml",
    });
    fd.fuckIt();
    it("No debugger", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.cshtml"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/\bdebugger\b/g);
            done();
        }, 3e3);
    });
    it("No console.log", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.cshtml"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/console\.log(\([^)]*)\);?/g);
            done();
        }, 3e3);
    });
});
describe("Default", () => {
    let fd = new FuckDebugger({
        entry: examplesPath,
    });
    fd.fuckIt();
    it("No debugger", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.cshtml"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/\bdebugger\b/g);
            done();
        }, 3e3);
    });
    it("No console.log", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.cshtml"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/console\.log(\([^)]*)\);?/g);
            done();
        }, 3e3);
    });
    it("No debugger", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.html"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/\bdebugger\b/g);
            done();
        }, 3e3);
    });
    it("No console.log", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.html"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/console\.log(\([^)]*)\);?/g);
            done();
        }, 3e3);
    });
    it("No debugger", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.js"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/\bdebugger\b/g);
            done();
        }, 3e3);
    });
    it("No console.log", (done) => {
        setTimeout(() => {
            let str = readFile2Str(path.resolve(__dirname, "../examples/index.js"));
            str=takeJsFromScripTag(str);
            expect(str)
                .to
                .not
                .match(/console\.log(\([^)]*)\);?/g);
            done();
        }, 3e3);
    });
});
