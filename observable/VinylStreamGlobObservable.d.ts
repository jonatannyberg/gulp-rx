/// <reference types="vinyl" />
import { IScheduler } from 'rxjs/Scheduler';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { TeardownLogic } from 'rxjs/Subscription';
import * as Vinyl from 'vinyl';
import * as vfs from 'vinyl-fs';
export interface ISourceOptions extends vfs.SrcOptions {
}
export declare class VinylStreamGlobObservable extends Observable<Vinyl> {
    private glob;
    private options;
    private scheduler;
    static create(glob: string | string[], options?: ISourceOptions, scheduler?: IScheduler): Observable<Vinyl>;
    private constructor(glob, options?, scheduler?);
    protected _subscribe(subscriber: Subscriber<Vinyl>): TeardownLogic;
}
