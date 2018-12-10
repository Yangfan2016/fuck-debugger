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

module.exports = {
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