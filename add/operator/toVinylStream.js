"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const toVinylStream_1 = require("../../operator/toVinylStream");
Observable_1.Observable.prototype.toVinylStream = toVinylStream_1.toVinylStream;
