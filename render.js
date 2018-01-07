const fs = require('fs');
const conf = require('./conf');
const MAX = conf.MAX_RANGE ;
const target = conf.TARGET_FILE_PATH ;
function init(cb) {
    getResult(cb);
}

function getResult(cb) {
    let data = fs.readFileSync(target, 'utf8');
    let strArr = data === '' ? [] : data.split('|').filter(x=>x!=='');
    return !!cb && typeof cb === 'function' ? cb(strArr) : strArr;
}

function getRandomInt(min = 0, max = MAX) {

    let res = Math.floor(Math.random() * (max - min)) + min;
    return String(res).padStart(6,'0');
}

function recordInt(res) {
    // if(res in arr)return false ;
    fs.appendFileSync(target, String(res) + '|');
}

function clearRecord(res) {
    fs.writeFileSync(target,'');
}

function checkVal (val) {
    let arr = new Set (getResult()) ;

    return arr.has(val);
}
module.exports = {
    init, getRandomInt, clearRecord, recordInt, checkVal, getResult
}