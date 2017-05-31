"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/mergeMap");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeAll");
const gulp = require("gulp");
//import * as Orchestrator from 'Orchestrator';
function task(task) {
    return this.map(() => {
        const subject = new Subject_1.Subject();
        const done = (cb) => {
            subject.next();
            subject.complete();
            cb();
        };
        (gulp.series(task, done))();
        return subject.map(() => { return; });
    }).mergeAll();
}
exports.task = task;
