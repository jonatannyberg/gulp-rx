/// <reference types="vinyl" />
/// <reference types="node" />
import { IScheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
import * as Vinyl from 'vinyl';
export declare class VinylStreamObservable extends Observable<Vinyl> {
    private stream;
    private scheduler;
    static create(stream: NodeJS.ReadWriteStream, scheduler?: IScheduler): Observable<Vinyl>;
    protected constructor(stream: NodeJS.ReadWriteStream, scheduler?: IScheduler);
    protected _subscribe(subscriber: Subscriber<Vinyl>): TeardownLogic;
}
