"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const task_1 = require("../../operator/task");
Observable_1.Observable.prototype.task = task_1.task;
