"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const Vinyl = require("vinyl");
const fs = require("fs");
const watch = require('glob-watcher');
class VinylStreamGlobWatchObservable extends Observable_1.Observable {
    constructor(glob, scheduler) {
        super();
        this.glob = glob;
        this.scheduler = scheduler;
    }
    static create(glob, scheduler) {
        return new VinylStreamGlobWatchObservable(glob, scheduler);
    }
    _subscribe(subscriber) {
        const watcher = watch(this.glob);
        const scheduler = this.scheduler;
        const next = (path) => {
            fs.readFile(path, (err, data) => {
                if (err) {
                    scheduler == null
                        ? subscriber.error(err)
                        : !subscriber.closed && subscriber.add(scheduler.schedule(subscriber.error, 0, err));
                }
                else {
                    scheduler == null
                        ? subscriber.next(new Vinyl({ path: path, contents: data }))
                        : !subscriber.closed && subscriber.add(scheduler.schedule(subscriber.next, 0, new Vinyl({ path: path, contents: data })));
                }
            });
        };
        const unlink = (path) => {
            scheduler == null
                ? subscriber.next(new Vinyl({ path: path, contents: null }))
                : !subscriber.closed && subscriber.add(scheduler.schedule(subscriber.next, 0, new Vinyl({ path: path, contents: null })));
        };
        watcher.on('add', next);
        watcher.on('change', next);
        watcher.on('unlink', unlink);
    }
}
exports.VinylStreamGlobWatchObservable = VinylStreamGlobWatchObservable;
