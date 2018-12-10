## fuck-debugger 
[![NPM version](https://img.shields.io/npm/v/fuck-debugger.svg?style=flat)](https://www.npmjs.com/package/fuck-debugger)
[![Build Status](https://travis-ci.org/Yangfan2016/fuck-debugger.svg?branch=master)](https://travis-ci.org/Yangfan2016/fuck-debugger)
[![Coverage Status](https://coveralls.io/repos/github/Yangfan2016/fuck-debugger/badge.svg?branch=master)](https://coveralls.io/github/Yangfan2016/fuck-debugger?branch=master)

This is tool clear &quot;debugger&quot; and &quot;console&quot; of your files

### Installation
```bash
$ npm install fuck-debugger
```

### Example
Use Cli
```bash
fd -s ./examples
fd -s ./examples -x cshtml,html
```
Use Api
```js
const FuckDebugger = require('fuck-debugger');

new FuckDebugger({
    entry: "./examples",
    ext: ["cshtml", "html", "js"],
});
```

### Contributing
- Fork this Repo first
- Clone your Repo
- Install dependencies by `$ npm install`
- Checkout a feature branch
- Feel free to add your features
- Make sure your features are fully tested
- Publish your local branch, Open a pull request
- Enjoy hacking <3

### MIT license
Copyright (c) 2018 Yangfan

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the &quot;Software&quot;), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED &quot;AS IS&quot;, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

---
built upon love by [docor](https://github.com/turingou/docor.git) v0.3.0
