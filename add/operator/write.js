"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const write_1 = require("../../operator/write");
Observable_1.Observable.prototype.write = write_1.write;
