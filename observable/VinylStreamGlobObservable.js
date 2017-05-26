"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
const vfs = require("vinyl-fs");
class VinylStreamGlobObservable extends Observable_1.Observable {
    constructor(glob, options, scheduler) {
        super();
        this.glob = glob;
        this.options = options;
        this.scheduler = scheduler;
    }
    static create(glob, options, scheduler) {
        return new VinylStreamGlobObservable(glob, options, scheduler);
    }
    _subscribe(subscriber) {
        const stream = vfs.src(this.glob, this.options);
        const scheduler = this.scheduler;
        if (scheduler == null) {
            stream.addListener('data', (data) => subscriber.next(data));
            stream.addListener('end', () => subscriber.complete());
            stream.addListener('error', (err) => subscriber.error(err));
        }
        else {
            stream.addListener('data', (data) => !subscriber.closed && subscriber.add(scheduler.schedule(subscriber.next, 0, data)));
            stream.addListener('end', () => !subscriber.closed && subscriber.add(scheduler.schedule(subscriber.complete, 0)));
            stream.addListener('error', (err) => !subscriber.closed && subscriber.add(scheduler.schedule(subscriber.error, 0, err)));
        }
    }
}
exports.VinylStreamGlobObservable = VinylStreamGlobObservable;
