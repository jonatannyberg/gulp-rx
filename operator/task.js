"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Subject_1 = require("rxjs/Subject");
require("rxjs/add/operator/map");
require("rxjs/add/operator/mergeAll");
const gulp = require("gulp");
function task(task) {
    return this.map(() => {
        const subject = new Subject_1.Subject();
        try {
            const emitter = gulp.series(task);
            emitter((err) => {
                if (err) {
                    subject.error(err);
                }
                else {
                    subject.next();
                    subject.complete();
                }
            });
        }
        catch (e) {
            subject.error(e);
        }
        return subject.map(() => { return; });
    }).mergeAll();
}
exports.task = task;
