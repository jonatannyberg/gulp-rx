"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const vfs = require("vinyl-fs");
function write(path, options) {
    return Observable_1.Observable.fromVinylStream(this.toVinylStream().pipe(vfs.dest(path, options)));
}
exports.write = write;
