"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Observable_1 = require("rxjs/Observable");
class VinylStreamObservable extends Observable_1.Observable {
    constructor(stream, scheduler) {
        super();
        this.stream = stream;
        this.scheduler = scheduler;
    }
    static create(stream, scheduler) {
        stream.pause();
        return new VinylStreamObservable(stream, scheduler);
    }
    _subscribe(subscriber) {
        const stream = this.stream;
        const scheduler = this.scheduler;
        if (scheduler == null) {
            stream.addListener('data', (data) => subscriber.next(data));
            stream.addListener('end', () => subscriber.complete());
            stream.addListener('error', (err) => subscriber.error(err));
        }
        else {
            stream.addListener('data', (data) => {
                if (!subscriber.closed)
                    subscriber.add(scheduler.schedule(subscriber.next, 0, data));
            });
            stream.addListener('end', () => {
                if (!subscriber.closed)
                    subscriber.add(scheduler.schedule(subscriber.complete, 0));
            });
            stream.addListener('error', (err) => {
                if (!subscriber.closed)
                    subscriber.add(scheduler.schedule(subscriber.error, 0, err));
            });
        }
        stream.resume();
    }
}
exports.VinylStreamObservable = VinylStreamObservable;
