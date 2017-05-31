/// <reference types="vinyl" />
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeAll';
import * as Vinyl from 'vinyl';
export declare function task(this: Observable<Vinyl>, task: string | Function): Observable<void>;
