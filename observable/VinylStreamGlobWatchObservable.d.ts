/// <reference types="vinyl" />
import { IScheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
import * as Vinyl from 'vinyl';
export declare class VinylStreamGlobWatchObservable extends Observable<Vinyl> {
    private glob;
    private scheduler;
    static create(glob: string | string[], scheduler?: IScheduler): Observable<Vinyl>;
    private constructor(glob, scheduler?);
    protected _subscribe(subscriber: Subscriber<Vinyl>): TeardownLogic;
}
