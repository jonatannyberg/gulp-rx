/// <reference types="vinyl" />
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';
import * as Vinyl from 'vinyl';
export declare type Task = string | ((cb: (error?: Error) => void) => void) | (() => Observable<any>) | (() => Promise<any>);
export declare function task(this: Observable<Vinyl>, task: Task): Observable<void>;
