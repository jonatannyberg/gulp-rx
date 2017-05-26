"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const pipe_1 = require("../../operator/pipe");
Observable_1.Observable.prototype.pipe = pipe_1.pipe;
