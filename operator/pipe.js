"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
function pipe(destination) {
    return Observable_1.Observable.fromVinylStream(this.toVinylStream().pipe(destination));
}
exports.pipe = pipe;
